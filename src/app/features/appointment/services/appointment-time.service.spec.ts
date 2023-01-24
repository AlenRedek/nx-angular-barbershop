import { AppointmentTimeService } from './appointment-time.service';

describe('AppointmentTimeService', () => {
  let service: AppointmentTimeService;

  beforeEach(() => {
    service = new AppointmentTimeService();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
