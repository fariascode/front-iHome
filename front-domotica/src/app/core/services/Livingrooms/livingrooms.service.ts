import { iApiResponse, iLastApiResponse } from '../../interfaces/i-ApiResponse';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiUrl } from '../../constants/apiUrl.constant';

@Injectable({
  providedIn: 'root'
})
export class LivingroomsService {
  constructor(private http:HttpClient
    ) { }

    getAllLivingrooms(): Observable<iApiResponse>{
      return this.http.get<iApiResponse>(`${apiUrl}/livingrooms/?limit=500`);    
    }

    getLastData(location: string): Observable<iLastApiResponse> {
      return this.http.get<iLastApiResponse>(
        `${apiUrl}/livingrooms/last?location=${location}`
      );
    }
  

    getLivingroomData(location: string): Observable <iApiResponse> {
      return this.http.get<iApiResponse>(`${apiUrl}/livingrooms/?location=${location}&limit=500`);
    }
}
