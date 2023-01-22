import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BarbersApiService {
  public constructor(private readonly httpClient: HttpClient) {}

  public getBarbers() {
    return lastValueFrom(this.httpClient.get('/api/barbers'));
  }
}
