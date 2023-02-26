import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

import { BarbersApiService } from './barbers-api.service';

describe('BarbersApiService', () => {
  let service: BarbersApiService;
  let httpClient: Partial<HttpClient>;

  beforeEach(() => {
    httpClient = {
      get: jest.fn().mockReturnValue(of([])),
      post: jest.fn().mockReturnValue(of({})),
    };
    service = new BarbersApiService(httpClient as HttpClient);
  });

  it('should create appointment via POST request', async () => {
    await service.createAppointment({});

    expect(httpClient.post).toBeCalledWith('/api/appointments', {});
  });

  it('should retrieve appointments via GET request', async () => {
    await service.getAppointments();

    expect(httpClient.get).toBeCalledWith('/api/appointments');
  });

  it('should retrieve barbers via GET request', async () => {
    await service.getBarbers();

    expect(httpClient.get).toBeCalledWith('/api/barbers');
  });

  it('should retrieve barber gifs via external GET request', async () => {
    await service.getBarberGifs();

    expect(httpClient.get).toBeCalledWith(
      expect.not.stringMatching(/^\/api\//),
    );
  });

  it('should retrieve services via GET request', async () => {
    await service.getServices();

    expect(httpClient.get).toBeCalledWith('/api/services');
  });
});
