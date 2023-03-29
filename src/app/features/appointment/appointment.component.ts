import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

import { AppRoute } from '@app-core/enums';
import { Appointment, Barber, Service } from '@app-core/models';
import { BarbersApiService } from '@app-core/services';

import { AppointmentFormComponent } from './components';

@Component({
  selector: 'rdx-appointment',
  standalone: true,
  imports: [ToastModule, AppointmentFormComponent],
  providers: [MessageService],
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.scss'],
})
export class AppointmentComponent implements OnInit {
  public appointments: Array<Appointment> = [];
  public barbers: Array<Barber> = [];
  public services: Array<Service> = [];
  //
  public constructor(
    private readonly barbersApiService: BarbersApiService,
    private readonly messageService: MessageService,
    private readonly router: Router,
  ) {}

  public async ngOnInit(): Promise<void> {
    try {
      const [appointments, barbers, services] = await Promise.all([
        await this.barbersApiService.getAppointments(),
        await this.barbersApiService.getBarbers(),
        await this.barbersApiService.getServices(),
      ]);

      this.appointments = appointments;
      this.barbers = barbers;
      this.services = services;
    } catch {
      this.showError('Error loading data');
    }
  }

  public async onFormSubmit(params: Appointment): Promise<void> {
    try {
      await this.barbersApiService.createAppointment(params);

      this.router.navigate([AppRoute.Success]);
    } catch {
      this.showError('Error while creating new appointment');
    }
  }

  private showError(message: string) {
    setTimeout(() => {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: message,
      });
    }, 0);
  }
}
