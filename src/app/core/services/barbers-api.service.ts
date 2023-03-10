import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';

import { Appointment, Barber, BarberGifs, Service } from '@app-core/models';
import { environment } from '@app-env/environment';

@Injectable({
  providedIn: 'root',
})
export class BarbersApiService {
  public constructor(private readonly httpClient: HttpClient) {}

  public createAppointment(params: Appointment): Promise<Appointment> {
    return lastValueFrom(
      this.httpClient.post<Appointment>('/api/appointments', params),
    );
  }

  public getAppointments(): Promise<Array<Appointment>> {
    return lastValueFrom(
      this.httpClient.get<Array<Appointment>>('/api/appointments'),
    );
  }

  public getBarbers(): Promise<Array<Barber>> {
    return lastValueFrom(this.httpClient.get<Array<Barber>>('/api/barbers'));
  }

  public getBarberGifs(): Promise<BarberGifs> {
    return lastValueFrom(
      this.httpClient.get<BarberGifs>(environment.barberGifsApiUrl),
    );
  }

  public getServices(): Promise<Array<Service>> {
    return lastValueFrom(this.httpClient.get<Array<Service>>('/api/services'));
  }
}
