import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NxWelcomeComponent } from './nx-welcome.component';

@Component({
  standalone: true,
  imports: [RouterModule, NxWelcomeComponent],
  selector: 'nx-angular-barbershop-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'nx-angular-barbershop';
}
