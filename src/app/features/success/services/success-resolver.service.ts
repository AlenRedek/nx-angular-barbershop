import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

import { BarberGifs } from '@app-core/models';
import { BarbersApiService } from '@app-core/services';

@Injectable({
  providedIn: 'root',
})
export class SuccessResolverService implements Resolve<BarberGifs> {
  public constructor(private readonly barbersApiService: BarbersApiService) {}

  public async resolve(): Promise<BarberGifs> {
    return await this.barbersApiService.getBarberGifs();
  }
}
