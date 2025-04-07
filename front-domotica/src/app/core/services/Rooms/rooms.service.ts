import { iActuatorRecordsResponse, iSensorRecordsResponse } from '../../interfaces/iRecordsResponse';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiUrl } from '../../constants/apiUrl.constant';
import { iApiResponse } from '../../interfaces/i-ApiResponse';

@Injectable({
  providedIn: 'root'
})
export class RoomsService {

  constructor(
    private http: HttpClient
  ) { }

  getAllRooms(): Observable<iApiResponse> {
    return this.http.get<iApiResponse>(`${apiUrl}/rooms/`);
  }

  getSensorRecords(location: string, room: string, sensorName: string): Observable<iSensorRecordsResponse> {
    return this.http.get<iSensorRecordsResponse>(`${apiUrl}/${room}/sensor/?location=${location}&sensorName=${sensorName}`);
  }

  getActuatorRecords(location: string, room: string, actuatorName: string): Observable<iActuatorRecordsResponse> {
    return this.http.get<iActuatorRecordsResponse>(`${apiUrl}/${room}/actuator/?location=${location}&actuatorName=${actuatorName}`);
  }
}
