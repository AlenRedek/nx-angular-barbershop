import { Barber, Service } from '@app-core/models';

export interface AppointmentData {
  barber?: Barber | null;
  date?: Date | null;
  service?: Service | null;
}
