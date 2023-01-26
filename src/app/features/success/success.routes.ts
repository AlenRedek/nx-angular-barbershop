import { Route } from '@angular/router';

import { SuccessResolverService } from './services';
import { SuccessComponent } from './success.component';

export const SUCCESS_ROUTES: Array<Route> = [
  {
    path: '',
    component: SuccessComponent,
    resolve: { barberGifs: SuccessResolverService },
  },
];
