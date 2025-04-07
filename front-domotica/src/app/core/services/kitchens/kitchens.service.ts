import {
  iApiResponse,
  iLastApiResponse,
  iSensorChartResponse,
} from '../../interfaces/i-ApiResponse';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiUrl } from '../../constants/apiUrl.constant';

@Injectable({
  providedIn: 'root',
})
export class KitchensService {
  constructor(private http: HttpClient) {}

  getAllKitchens(): Observable<iApiResponse> {
    return this.http.get<iApiResponse>(`${apiUrl}/kitchens/?limit=500`);
  }

  getKitchenData(location: string): Observable<iApiResponse> {
    return this.http.get<iApiResponse>(
      `${apiUrl}/kitchens/?location=${location}&limit=500`
    );
  }

  getLastData(location: string): Observable<iLastApiResponse> {
    return this.http.get<iLastApiResponse>(
      `${apiUrl}/kitchens/last?location=${location}`
    );
  }

  getSensorChartData(
    location: string,
    sensorName: string
  ): Observable<iSensorChartResponse> {
    return this.http.get<iSensorChartResponse>(
      `${apiUrl}/kitchens/sensor/chart/?location=${location}&sensorName=${sensorName}`
    );
  }
}
