import { BusyHour } from './busy-hour.model';

export interface WorkHour {
  day: number;
  endHour: number;
  id: number;
  lunchTime: BusyHour;
  startHour: number;
}
