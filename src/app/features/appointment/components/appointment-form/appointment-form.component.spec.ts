import { FormBuilder } from '@angular/forms';

import { AppointmentFormComponent } from './appointment-form.component';

describe('AppointmentFormComponent', () => {
  let component: AppointmentFormComponent;
  let formBuilder: FormBuilder;

  beforeEach(() => {
    formBuilder = new FormBuilder();
    component = new AppointmentFormComponent(formBuilder);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
