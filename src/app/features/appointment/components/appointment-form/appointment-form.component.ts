import { Component } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'nx-angular-barbershop-appointment-form',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    CalendarModule,
    InputTextModule,
  ],
  templateUrl: './appointment-form.component.html',
  styleUrls: ['./appointment-form.component.scss'],
})
export class AppointmentFormComponent {
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
