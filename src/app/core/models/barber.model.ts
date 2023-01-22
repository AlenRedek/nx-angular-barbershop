import { WorkHour } from './work-hour.model';

export interface Barber {
  firstName: string;
  id: number;
  lastName: string;
  workHours: WorkHour[];
}
