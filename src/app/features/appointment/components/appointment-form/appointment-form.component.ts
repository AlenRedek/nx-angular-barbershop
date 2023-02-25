import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Dayjs } from 'dayjs';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';
import { combineLatest, filter, map, of, Subscription } from 'rxjs';

import { Appointment, Barber, Service } from '@app-core/models';
import {
  AppointmentData,
  AppointmentForm,
} from '@app-features/appointment/models';
import { AppointmentTimeService } from '@app-features/appointment/services';
import { FormFieldErrorDirective } from '@app-shared/directives';
import { DateFormatPipe } from '@app-shared/pipes';

@Component({
  selector: 'rdx-appointment-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    CalendarModule,
    InputTextModule,
    FormFieldErrorDirective,
    DateFormatPipe,
  ],
  templateUrl: './appointment-form.component.html',
  styleUrls: ['./appointment-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppointmentFormComponent implements OnInit, OnDestroy {
  @Input()
  public appointments: Array<Appointment> = [];

  @Input()
  public barbers: Array<Barber> = [];

  @Input()
  public services: Array<Service> = [];

  @Output()
  public formSubmit = new EventEmitter<Appointment>();

  public appointmentForm = this.formBuilder.group<AppointmentForm>({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    contactNumber: [
      '',
      [Validators.required, Validators.pattern('^0[0-9]{8}$')],
    ],
    barber: [null, Validators.required],
    service: [null, Validators.required],
    date: [null, Validators.required],
    time: [{ value: null, disabled: true }, Validators.required],
    price: [{ value: '', disabled: true }, Validators.required],
  });
  public times: Array<Dayjs> = [];
  public minDate = new Date();

  private readonly subscriptions: Subscription = new Subscription();

  public constructor(private readonly formBuilder: FormBuilder) {}

  public ngOnInit(): void {
    this.handleFormChanges();
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  public onFormSubmit(): void {
    const { barber, service, time } = this.appointmentForm.value;

    this.formSubmit.next({
      barberId: barber?.id,
      serviceId: service?.id,
      startDate: time?.unix(),
    });
  }

  private handleFormChanges(): void {
    this.subscriptions.add(
      combineLatest([
        this.appointmentForm.get('barber')?.valueChanges ?? of(null),
        this.appointmentForm.get('date')?.valueChanges ?? of(null),
        this.appointmentForm.get('service')?.valueChanges ?? of(null),
      ])
        .pipe(
          filter((appointmentData) => appointmentData.every((item) => !!item)),
          map(([barber, date, service]) => ({ barber, date, service })),
        )
        .subscribe((appointmentData: AppointmentData) =>
          this.updateTimeControl(appointmentData),
        ),
    );
  }

  private updateTimeControl(appointmentData: AppointmentData): void {
    const appointmentTimeService = new AppointmentTimeService(
      appointmentData,
      this.appointments,
      this.services,
    );
    this.times = appointmentTimeService.getTimes();

    this.times.length
      ? this.appointmentForm.get('time')?.enable()
      : this.appointmentForm.get('time')?.disable();

    this.appointmentForm.get('time')?.patchValue(null);
  }
}
