import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';

import { Appointment, Barber, Service } from '@app-core/models';
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
})
export class AppointmentFormComponent {
  @Input()
  public appointments: Array<Appointment> = [];

  @Input()
  public barbers: Array<Barber> = [];

  @Input()
  public services: Array<Service> = [];

  public appointmentForm = this.formBuilder.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    contactNumber: [
      '',
      [Validators.required, Validators.pattern('^0[0-9]{8}$')],
    ],
    barber: ['', Validators.required],
    service: ['', Validators.required],
    date: ['', Validators.required],
    time: ['', Validators.required],
    price: [{ value: '', disabled: true }, Validators.required],
  });

  public constructor(private readonly formBuilder: FormBuilder) {}
}
