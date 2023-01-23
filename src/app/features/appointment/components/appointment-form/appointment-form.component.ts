import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';
import { combineLatest, of, Subscription } from 'rxjs';

import { Appointment, Barber, Service } from '@app-core/models';
import { AppointmentForm } from '@app-features/appointment/models';
import { FormFieldErrorDirective } from '@app-shared/directives';

@Component({
  selector: 'nx-angular-barbershop-appointment-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    CalendarModule,
    InputTextModule,
    FormFieldErrorDirective,
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
    time: [{ value: '', disabled: true }, Validators.required],
    price: [{ value: '', disabled: true }, Validators.required],
  });
  public minDate = new Date();

  private readonly subscriptions: Subscription = new Subscription();

  public constructor(private readonly formBuilder: FormBuilder) {}

  public ngOnInit(): void {
    this.subscriptions.add(
      combineLatest([
        this.appointmentForm.get('barber')?.valueChanges ?? of(null),
        this.appointmentForm.get('service')?.valueChanges ?? of(null),
        this.appointmentForm.get('date')?.valueChanges ?? of(null),
      ]).subscribe(([barber, service, date]) => {
        const day = date?.getDay();
        console.log(barber, service, day);
      }),
    );
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
