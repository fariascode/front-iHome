import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiUrl } from '../../constants/apiUrl.constant';
import { iApiResponse } from '../../interfaces/i-ApiResponse';

@Injectable({
  providedIn: 'root'
})
export class ComponentControlService {

  constructor(private http: HttpClient) { }
  private url = "http://";

  /*lightInOn(arduinoIp: string, method: 'GET' | 'POST' = 'GET', data: any = {}): Observable<any> {
    const url = `${this.url}${arduinoIp}/ledIndoorOn`;
  
    if (method === 'POST') {
      console.warn("Encendiendo Luz Interior con POST");
      console.log(url);
      return this.http.post<any>(url, data);
    } else {
      console.warn("Encendiendo Luz Interior con GET");
      console.log(url);
      return this.http.get<any>(url);
    }
  }
*/
lightInOn(arduinoIp: string): Observable<any> {
  console.warn("Encendiendo Luz Interior");
  console.log(`${this.url}${arduinoIp}/ledIndoorOn`);
  const lightIn = this.http.get<any>(`${this.url}${arduinoIp}/ledIndoorOn`);
  
  return lightIn;
}

lightInOff(arduinoIp: string): Observable<any> {
  console.warn("Apagando Luz Interior");
  console.log(`${this.url}${arduinoIp}/ledInOff`);
  const lightIn = this.http.get<any>(`${this.url}${arduinoIp}/ledInOff`);
  
  return lightIn;
}

/*
  lightInOff(arduinoIp: string, method: 'GET' | 'POST' = 'GET', data: any = {}): Observable<any> {
    const url = `${this.url}${arduinoIp}/ledIndoorOff`;
  
    if (method === 'POST') {
      console.warn("Apagando Luz Interior con POST");
      console.log(url);
      return this.http.post<any>(url, data);
    } else {
      console.warn("Apagando Luz Interior con GET");
      console.log(url);
      return this.http.get<any>(url);
    }
  }
    */
  lightOutOn(arduinoIp: string): Observable<any> {
    console.warn("Encendiendo Luz Exterior");
    console.log(`${this.url}${arduinoIp}/ledOutOn`);
    const luz = this.http.get<any>(`${this.url}${arduinoIp}/ledOutOn`);
    return luz;
  }
  
  lightOutOff(arduinoIp: string): Observable<any> {
    console.warn("Apagando Luz Exterior");
    console.log(`${this.url}${arduinoIp}/ledOutOff`);
    const luz = this.http.get<any>(`${this.url}${arduinoIp}/ledOutOff`);
    return luz;
  }

  /*

  doubleWindowsLeftOpen(arduinoIp: string, method: 'GET' | 'POST' = 'GET', data: any = {}): Observable<any> {
    const url = `${this.url}${arduinoIp}/windowsLeftOpen`;
  
    if (method === 'POST') {
      console.warn("Abriendo Ventanas Dobles Izquierda con POST");
      console.log(url);
      return this.http.post<any>(url, data);
    } else {
      console.warn("Abriendo Ventanas Dobles Izquierda con GET");
      console.log(url);
      return this.http.get<any>(url);
    }
  }
  */
  doubleWindowsLeftOpen(arduinoIp: string): Observable<any> {
    console.warn("Abriendo Ventanas Dobles Izquierda");
    console.log(`${this.url}${arduinoIp}/windowsLeftOpen`);
    const ventanaLeft = this.http.get<any>(`${this.url}${arduinoIp}/windowsLeftOpen`);
    return ventanaLeft;
  }
  
  doubleWindowsLeftClose(arduinoIp: string): Observable<any> {
    console.warn("Cerrando Ventanas Dobles Izquierda");
    console.log(`${this.url}${arduinoIp}/windowsLeftClose`);
    const ventanaLeft = this.http.get<any>(`${this.url}${arduinoIp}/windowsLeftClose`);
    return ventanaLeft;
  }
  /*
  doubleWindowsLeftClose(arduinoIp: string, method: 'GET' | 'POST' = 'GET', data: any = {}): Observable<any> {
    const url = `${this.url}${arduinoIp}/windowsLeftClose`;
  
    if (method === 'POST') {
      console.warn("Cerrando Ventanas Dobles Izquierda con POST");
      console.log(url);
      return this.http.post<any>(url, data);
    } else {
      console.warn("Cerrando Ventanas Dobles Izquierda con GET");
      console.log(url);
      return this.http.get<any>(url);
    }
  }
    */
  
  /*
  doubleWindowsRightOpen(arduinoIp: string, method: 'GET' | 'POST' = 'GET', data: any = {}): Observable<any> {
    const url = `${this.url}${arduinoIp}/windowsRightOpen`;
  
    if (method === 'POST') {
      console.warn("Abriendo Ventanas Dobles Derecha con POST");
      console.log(url);
      return this.http.post<any>(url, data);
    } else {
      console.warn("Abriendo Ventanas Dobles Derecha con GET");
      console.log(url);
      return this.http.get<any>(url);
    }
  }
*/


doubleWindowsRightOpen(arduinoIp: string): Observable<any> {
  console.warn("Abriendo Ventanas Dobles Derecha");
  console.log(`${this.url}${arduinoIp}/windowsRightOpen`);
  const ventanaRight = this.http.get<any>(`${this.url}${arduinoIp}/windowsRightOpen`);
  return ventanaRight;
}

doubleWindowsRightClose(arduinoIp: string): Observable<any> {
  console.warn("Cerrando Ventanas Dobles Derecha");
  console.log(`${this.url}${arduinoIp}/windowsRightClose`);
  const ventanaRight = this.http.get<any>(`${this.url}${arduinoIp}/windowsRightClose`);
  return ventanaRight;
}

/*
  doubleWindowsRightClose(arduinoIp: string, method: 'GET' | 'POST' = 'GET', data: any = {}): Observable<any> {
    const url = `${this.url}${arduinoIp}/windowsRightClose`;
  
    if (method === 'POST') {
      console.warn("Cerrando Ventanas Dobles Derecha con POST");
      console.log(url);
      return this.http.post<any>(url, data);
    } else {
      console.warn("Cerrando Ventanas Dobles Derecha con GET");
      console.log(url);
      return this.http.get<any>(url);
    }
  }

*//*
  simpleWindowOpen(arduinoIp: string, method: 'GET' | 'POST' = 'GET', data: any = {}): Observable<any> {
    const url = `${this.url}${arduinoIp}/windowOpen`;
  
    if (method === 'POST') {
      console.warn("Abriendo Ventana con POST");
      console.log(url);
      return this.http.post<any>(url, data);
    } else {
      console.warn("Abriendo Ventana con GET");
      console.log(url);
      return this.http.get<any>(url);
    }
  }
*/

simpleWindowOpen(arduinoIp: string): Observable<any> {
  console.warn("Abriendo Ventana");
  console.log(`${this.url}${arduinoIp}/windowOpen`);
  const ventana = this.http.get<any>(`${this.url}${arduinoIp}/windowOpen`);
  return  ventana;
}

simpleWindowClose(arduinoIp: string): Observable<any> {
  console.warn("Cerrando Ventana");
  console.log(`${this.url}${arduinoIp}/windowClose`);
  const ventana = this.http.get<any>(`${this.url}${arduinoIp}/windowClose`);
  return ventana;
}

/*
  simpleWindowClose(arduinoIp: string, method: 'GET' | 'POST' = 'GET', data: any = {}): Observable<any> {
    const url = `${this.url}${arduinoIp}/windowClose`;
  
    if (method === 'POST') {
      console.warn("Cerrando Ventana con POST");
      console.log(url);
      return this.http.post<any>(url, data);
    } else {
      console.warn("Cerrando Ventana con GET");
      console.log(url);
      return this.http.get<any>(url);
    }
  }

  */
  //Puerta aqui inicia
  /*doorOpen(arduinoIp: string, method: 'GET' | 'POST' = 'GET', data: any = {}): Observable<any> {
    const url = `${this.url}${arduinoIp}/doorOpen`;
  
    if (method === 'POST') {
      console.warn("Abriendo Puerta con POST");
      console.log(url);
      return this.http.post<any>(url, data);
    } else {
      console.warn("Abriendo Puerta con GET");
      console.log(url);
      return this.http.get<any>(url);
    }
  }*/   
  doorOpen(arduinoIp: string): Observable<any> {
    console.warn("Abriendo Puerta");
    console.log(`${this.url}${arduinoIp}/doorOpen`);
    const door = this.http.get<any>(`${this.url}${arduinoIp}/doorOpen`);
    
    return door;
  }
  
  doorClose(arduinoIp: string): Observable<any> {
    console.warn("Cerrando Puerta");
    console.log(`${this.url}${arduinoIp}/doorClose`);
    const door = this.http.get<any>(`${this.url}${arduinoIp}/doorClose`);
    
    return door;
  }
  /*doorClose(arduinoIp: string, method: 'GET' | 'POST' = 'GET', data: any = {}): Observable<any> {
    const url = `${this.url}${arduinoIp}/doorClose`;
  
    if (method === 'POST') {
      console.warn("Cerrando Puerta con POST");
      console.log(url);
      return this.http.post<any>(url, data);
    } else {
      console.warn("Cerrando Puerta con GET");
      console.log(url);
      return this.http.get<any>(url);
    }
  }*/

    /*

  fanOn(arduinoIp: string, method: 'GET' | 'POST' = 'GET', data: any = {}): Observable<any> {
    const url = `${this.url}${arduinoIp}/fanOn`;
  
    if (method === 'POST') {
      console.warn("Encendiendo Ventilador con POST");
      console.log(url);
      return this.http.post<any>(url, data);
    } else {
      console.warn("Encendiendo Ventilador con GET");
      console.log(url);
      return this.http.get<any>(url);
    }
  }
  */


  fanOn(arduinoIp: string): Observable<any> {
    console.warn("Ventilador encendido");
    console.log(`${this.url}${arduinoIp}/fanOn`);
    const fan = this.http.get<any>(`${this.url}${arduinoIp}/fanOn`);
    return fan;
  }
  
  fanOff(arduinoIp: string): Observable<any> {
    console.warn("Ventilador apagado");
    console.log(`${this.url}${arduinoIp}/fanOff`);
    const fan = this.http.get<any>(`${this.url}${arduinoIp}/fanOff`);
    return fan;
  }


  /*

  fanOff(arduinoIp: string, method: 'GET' | 'POST' = 'GET', data: any = {}): Observable<any> {
    const url = `${this.url}${arduinoIp}/fanOff`;
  
    if (method === 'POST') {
      console.warn("Apagando Ventilador con POST");
      console.log(url);
      return this.http.post<any>(url, data);
    } else {
      console.warn("Apagando Ventilador con GET");
      console.log(url);
      return this.http.get<any>(url);
    }
  }
    */
  
  controlOn(arduinoIp: string): Observable<any> {
    console.warn("Encendiendo Modo Manual Led Exterior");
    console.log(`${this.url}${arduinoIp}/controlLedOutOn`);
    return this.http.get<any>(`${this.url}${arduinoIp}/controlLedOutOn`);
  }
  
  controlOff(arduinoIp: string): Observable<any> {
    console.warn("Apagando Modo Manual Led Exterior");
    console.log(`${this.url}${arduinoIp}/controlLedOutOff`);
    return this.http.get<any>(`${this.url}${arduinoIp}/controlLedOutOff`);
  }
  
  controlFOn(arduinoIp: string): Observable<any> {
    console.warn("Encendiendo Modo Manual Ventilador");
    console.log(`${this.url}${arduinoIp}/controlFanOn`);
    return this.http.get<any>(`${this.url}${arduinoIp}/controlFanOn`);
  }
  
  controlFOff(arduinoIp: string): Observable<any> {
    console.warn("Apagando Modo Manual Ventilador");
    console.log(`${this.url}${arduinoIp}/controlFanOff`);
    return this.http.get<any>(`${this.url}${arduinoIp}/controlFanOff`);
  }

//falta probar
 /* waterOn(arduinoIp: string, method: 'GET' | 'POST' = 'GET', data: any = {}): Observable<any> {
    const url = `${this.url}${arduinoIp}/waterOn`;
  
    if (method === 'POST') {
      console.warn("Bomba de agua encendida con POST");
      console.log(url);
      return this.http.post<any>(url, data);
    } else {
      console.warn("Bomba de agua encendida con GET");
      console.log(url);
      return this.http.get<any>(url);
    }
  }
*/
waterOn(arduinoIp: string): Observable<any> {
  console.warn("Bomba de agua encendida");
  console.log(`${this.url}${arduinoIp}/waterOn`);
  const water = this.http.get<any>(`${this.url}${arduinoIp}/waterOn`);
  return water;
}

waterOff(arduinoIp: string): Observable<any> {
  console.warn("Bomba de agua apagada");
  console.log(`${this.url}${arduinoIp}/waterOff`);
  const water = this.http.get<any>(`${this.url}${arduinoIp}/waterOff`);
  return water;
}

/*
  waterOff(arduinoIp: string, method: 'GET' | 'POST' = 'GET', data: any = {}): Observable<any> {
    const url = `${this.url}${arduinoIp}/waterOff`;
  
    if (method === 'POST') {
      console.warn("Bomba de agua apagada con POST");
      console.log(url);
      return this.http.post<any>(url, data);
    } else {
      console.warn("Bomba de agua apagada con GET");
      console.log(url);
      return this.http.get<any>(url);
    }
  }
*/
/*
  GateRightOpen(arduinoIp: string, method: 'GET' | 'POST' = 'GET', data: any = {}): Observable<any> {
    const url = `${this.url}${arduinoIp}/gaterdoorOn`;
  
    if (method === 'POST') {
      console.warn("Porton derecho abierto con POST");
      console.log(url);
      return this.http.post<any>(url, data);
    } else {
      console.warn("Porton abierto con GET");
      console.log(url);
      return this.http.get<any>(url);
    }
  }
    */
  GateRightOpen(arduinoIp: string): Observable<any> {
    console.warn("Porton derecho abierto");
    console.log(`${this.url}${arduinoIp}/gaterdoorOpen`);
    const gateRight = this.http.get<any>(`${this.url}${arduinoIp}/gaterdoorOpen`);
    return gateRight;
  }
  
  GateRightClosed(arduinoIp: string): Observable<any> {
    console.warn("Porton derecho cerrado");
    console.log(`${this.url}${arduinoIp}/gaterdoorClose`);
    const gateRight = this.http.get<any>(`${this.url}${arduinoIp}/gaterdoorClose`);
    return gateRight;
  }
  
/*
  GateRightClosed(arduinoIp: string, method: 'GET' | 'POST' = 'GET', data: any = {}): Observable<any> {
    const url = `${this.url}${arduinoIp}/gaterdoorOff`;
  
    if (method === 'POST') {
      console.warn("Porton derecho cerrado con POST");
      console.log(url);
      return this.http.post<any>(url, data);
    } else {
      console.warn("Porton cerrado con GET");
      console.log(url);
      return this.http.get<any>(url);
    }
  }
    */
/*
  GateLeftOpen(arduinoIp: string, method: 'GET' | 'POST' = 'GET', data: any = {}): Observable<any> {
    const url = `${this.url}${arduinoIp}/gateldoorOn`;
  
    if (method === 'POST') {
      console.warn("Porton abierto con POST");
      console.log(url);
      return this.http.post<any>(url, data);
    } else {
      console.warn("Porton abierto con GET");
      console.log(url);
      return this.http.get<any>(url);
    }
  }
*/
GateLeftOpen(arduinoIp: string): Observable<any> {
  console.warn("Porton izquierdo abierto");
  console.log(`${this.url}${arduinoIp}/gateldoorOpen`);
  const gateLeft = this.http.get<any>(`${this.url}${arduinoIp}/gateldoorOpen`);
  return gateLeft;
}

GateLeftClosed(arduinoIp: string): Observable<any> {
  console.warn("Porton izquierdo cerrado");
  console.log(`${this.url}${arduinoIp}/gateldoorClose`);
  const gateLeft = this.http.get<any>(`${this.url}${arduinoIp}/gateldoorClose`);
  return gateLeft;
}
/*
  GateLeftClosed(arduinoIp: string, method: 'GET' | 'POST' = 'GET', data: any = {}): Observable<any> {
    const url = `${this.url}${arduinoIp}/gateldoorOn`;
  
    if (method === 'POST') {
      console.warn("Porton cerrado con POST");
      console.log(url);
      return this.http.post<any>(url, data);
    } else {
      console.warn("Porton cerrado con GET");
      console.log(url);
      return this.http.get<any>(url);
    }
  }
  
*/
  //Solo GET

  gas(arduinoIp: string): Observable<any> {
    console.warn("Mostrando cantidad de gas");
    console.log(`${this.url}${arduinoIp}/gas`);
    const gas = this.http.get<any>(`${this.url}${arduinoIp}/gas`);
    
    return gas;
  }

  car(arduinoIp: string): Observable<any> {
    console.warn("Garaje sin automóvil");
    console.log(`${this.url}${arduinoIp}/car`);
    const car = this.http.get<any>(`${this.url}${arduinoIp}/car`);
    return car;
  }
  
  carOccupy(arduinoIp: string): Observable<any> {
    console.warn("Garaje con automóvil");
    console.log(`${this.url}${arduinoIp}/carOccupy`);
    const car = this.http.get<any>(`${this.url}${arduinoIp}/carOccupy`);
    return car;
  }

  nivelAlto(arduinoIp: string): Observable<any> {
    console.warn("Nivel de agua alto");
    console.log(`${this.url}${arduinoIp}/nivelAlto`);
    const nivel = this.http.get<any>(`${this.url}${arduinoIp}/nivelAlto`);
    return nivel;
  }

  nivelBajo(arduinoIp: string): Observable<any> {
    console.warn("Nivel de agua bajo");
    console.log(`${this.url}${arduinoIp}/nivelBajo`);
    const nivel = this.http.get<any>(`${this.url}${arduinoIp}/nivelBajo`);
    return nivel;
  }

}


