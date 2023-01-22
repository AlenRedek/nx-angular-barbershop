import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';

import { Appointment, Barber, Service } from '../models';

@Injectable({
  providedIn: 'root',
})
export class BarbersApiService {
  public constructor(private readonly httpClient: HttpClient) {}

  public getAppointments(): Promise<Array<Appointment>> {
    return lastValueFrom(
      this.httpClient.get<Array<Appointment>>('/api/appointments'),
    );
  }

  public getBarbers(): Promise<Array<Barber>> {
    return lastValueFrom(this.httpClient.get<Array<Barber>>('/api/barbers'));
  }

  public getServices(): Promise<Array<Service>> {
    return lastValueFrom(this.httpClient.get<Array<Service>>('/api/services'));
  }
}
