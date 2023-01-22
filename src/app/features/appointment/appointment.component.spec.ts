import { BarbersApiService } from '@app-core/services';
import { AppointmentComponent } from './appointment.component';

describe('AppointmentComponent', () => {
  let component: AppointmentComponent;
  let barbersApiService: BarbersApiService;

  beforeEach(() => {
    barbersApiService = {} as BarbersApiService;
    component = new AppointmentComponent(barbersApiService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
