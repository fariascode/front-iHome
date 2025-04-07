// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class SensorService {
//   private apiUrl = 'http://localhost:3000/sensor'; // Ajusta con tu endpoint

//   constructor(private http: HttpClient) {}

//   getSensorData(): Observable<any> {
//     return this.http.get<any>(this.apiUrl);
//   }
// }
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SensorService {
  private apiUrl = 'http://localhost:3000/api/v1'; // Asegúrate de que esta URL sea correcta

  constructor(private http: HttpClient) {}

  getSensorData(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl); // Retorna un array de objetos
  }
  getSensores(): Observable<any> {
    return this.http.get<any>('url-de-la-api');
  }

  getActuadores(): Observable<any> {
    return this.http.get<any>('url-de-la-api');
  }
}

