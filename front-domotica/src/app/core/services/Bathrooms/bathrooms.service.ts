import { iApiResponse, iLastApiResponse } from '../../interfaces/i-ApiResponse';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiUrl } from '../../constants/apiUrl.constant';

@Injectable({
  providedIn: 'root'
})
export class BathroomsService {
  constructor(
    private http: HttpClient
  ) { }
  getAllBathrooms(): Observable<iApiResponse> {
    return this.http.get<iApiResponse>(`${apiUrl}/bathrooms/?limit=500`)
  }

  getLastData(location: string): Observable<iLastApiResponse> {
    return this.http.get<iLastApiResponse>(
      `${apiUrl}/bathrooms/last?location=${location}`
    );
  }

  getBathroomsData(location: string): Observable<iApiResponse> {
    return this.http.get<iApiResponse>(`${apiUrl}/bathrooms/?location=${location}&limit=500`)
  }
}
