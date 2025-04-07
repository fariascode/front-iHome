import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private temperatureSubject = new BehaviorSubject<number | undefined>(this.getTemperatureFromStorage());
  temperature$ = this.temperatureSubject.asObservable();

  constructor() {}

  setTemperature(data: number | undefined) {
    console.log('TEMPERATURA COMPARTIDA:', data);
    this.temperatureSubject.next(data);
    this.setTemperatureToStorage(data);
  }

  getCurrentTemperature(): number | undefined {
    return this.temperatureSubject.getValue();
  }

  private setTemperatureToStorage(data: number | undefined): void {
    if (data !== undefined) {
      localStorage.setItem('temperature', data.toString());
    } else {
      localStorage.removeItem('temperature');
    }
  }

  private getTemperatureFromStorage(): number | undefined {
    const storedTemperature = localStorage.getItem('temperature');
    return storedTemperature ? Number(storedTemperature) : undefined;
  }
}
