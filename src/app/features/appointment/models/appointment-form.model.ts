import { Validators } from '@angular/forms';

import { Barber, Service } from '@app-core/models';

export interface AppointmentForm {
  firstName: Array<string | Validators>;
  lastName: Array<string | Validators>;
  email: Array<string | Validators>;
  contactNumber: Array<string | Validators>;
  barber: Array<Barber | null | Validators>;
  service: Array<Service | null | Validators>;
  date: Array<Date | null | Validators>;
  time: Array<string | Validators>;
  price: Array<string | Validators>;
}
