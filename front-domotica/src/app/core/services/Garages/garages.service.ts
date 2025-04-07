import { iApiResponse, iLastApiResponse } from '../../interfaces/i-ApiResponse';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiUrl } from '../../constants/apiUrl.constant';

@Injectable({
  providedIn: 'root'
})
export class GaragesService {
  constructor(private http: HttpClient) {}

  getAllGarages(): Observable<iApiResponse> {
    return this.http.get<iApiResponse>(`${apiUrl}/garages/?limit=500`);
  }

  getLastData(location: string): Observable<iLastApiResponse> {
    return this.http.get<iLastApiResponse>(
      `${apiUrl}/garages/last?location=${location}`
    );
  }


  getGaragesData(location: string): Observable<iApiResponse> {
    return this.http.get<iApiResponse>(`${apiUrl}/garages/?location=${location}&limit=500`)
  }
}
