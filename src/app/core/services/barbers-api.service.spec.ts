import { HttpClient } from '@angular/common/http';
import { EMPTY } from 'rxjs';

import { BarbersApiService } from './barbers-api.service';

jest.mock('rxjs', () => {
  const original = jest.requireActual('rxjs');

  return {
    ...original,
    lastValueFrom: () =>
      new Promise((resolve) => {
        resolve(true);
      }),
  };
});

describe('BarbersApiService', () => {
  let service: BarbersApiService;
  let httpClient: Partial<HttpClient>;

  beforeEach(() => {
    httpClient = {
      get: jest.fn().mockReturnValue(EMPTY),
      post: jest.fn().mockReturnValue(EMPTY),
    };
    service = new BarbersApiService(httpClient as HttpClient);
  });

  it('should create appointment via POST request', async () => {
    await service.createAppointment({});

    expect(httpClient.post).toBeCalled();
  });

  it('should retrieve appointments via GET request', async () => {
    await service.getAppointments();

    expect(httpClient.get).toBeCalled();
  });

  it('should retrieve barbers via GET request', async () => {
    await service.getBarbers();

    expect(httpClient.get).toBeCalled();
  });

  it('should retrieve barber gifs via GET request', async () => {
    await service.getBarberGifs();

    expect(httpClient.get).toBeCalled();
  });

  it('should retrieve services via GET request', async () => {
    await service.getServices();

    expect(httpClient.get).toBeCalled();
  });
});
