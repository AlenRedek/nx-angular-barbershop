import { Barber, Service } from '@app-core/models';

export interface AppointmentData {
  barber: Barber;
  date: Date;
  service: Service;
}
