import { HttpClient } from '@angular/common/http';

import { BarbersApiService } from './barbers-api.service';

describe('BarbersApiService', () => {
  let service: BarbersApiService;
  let httpClient: HttpClient;

  beforeEach(() => {
    httpClient = {} as HttpClient;
    service = new BarbersApiService(httpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
