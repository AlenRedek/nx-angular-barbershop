import { Router } from '@angular/router';
import { BarbersApiService } from '@app-core/services';

import { AppointmentComponent } from './appointment.component';

describe('AppointmentComponent', () => {
  let component: AppointmentComponent;
  let barbersApiService: BarbersApiService;
  let router: Router;

  beforeEach(() => {
    barbersApiService = {} as BarbersApiService;
    router = {} as Router;
    component = new AppointmentComponent(barbersApiService, router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
