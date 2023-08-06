import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, shareReplay, tap } from 'rxjs';

@Injectable()
export class CountryService {
  private requestFields = ['name', 'flag', 'currencies', 'languages'];

  private apiUrl = 'https://restcountries.com/v3.1/name';

  constructor(private http: HttpClient) {}

  getCountry(countryName: string): Observable<any> {
    const params = {
      fields: this.requestFields.join(','),
      fullText: true,
    };
    return this.http.get<any[]>(`${this.apiUrl}/${countryName}`, { params });
  }
}
