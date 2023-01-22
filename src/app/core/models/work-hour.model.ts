import { LunchTime } from './lunch-time.model';

export interface WorkHour {
  day: number;
  endHour: string;
  id: number;
  lunchTime: LunchTime;
  startHour: number;
}
