import { iApiResponse, iLastApiResponse, iSensorChartResponse } from '../../interfaces/i-ApiResponse';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable,BehaviorSubject } from 'rxjs';
import { apiUrl } from '../../constants/apiUrl.constant';

@Injectable({
  providedIn: 'root',
})
export class BedroomsService {
  private sensorsDataSubject = new BehaviorSubject<any[]>([]);
  private actuatorsDataSubject = new BehaviorSubject<any[]>([]);

  actualizarSensores(datos: any[]) {
    this.sensorsDataSubject.next(datos);
  }
  
  actualizarActuadores(datos: any[]) {
    this.actuatorsDataSubject.next(datos);
  }
  
  constructor(private http: HttpClient) {}

  getAllBedrooms(): Observable<iApiResponse> {
    return this.http.get<iApiResponse>(`${apiUrl}/bedrooms/?limit=500`);
  }

  getBedroomData(location: string): Observable<iApiResponse> {
    return this.http.get<iApiResponse>(
      `${apiUrl}/bedrooms/?location=${location}&limit=500`
    );
  }

  getLastData(location: string): Observable<iLastApiResponse> {
    return this.http.get<iLastApiResponse>(
      `${apiUrl}/bedrooms/last?location=${location}`
    );
  }

  getSensorChartData(location: string, sensorName: string): Observable<iSensorChartResponse> {
    return this.http.get<iSensorChartResponse>(
      `${apiUrl}/bedrooms/sensor/chart/?location=${location}&sensorName=${sensorName}`
    );
  }
}
