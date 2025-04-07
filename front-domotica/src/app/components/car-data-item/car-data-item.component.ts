import { Component, EventEmitter, inject, Input, Output, SimpleChanges } from '@angular/core';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { iSensorsData } from '../../core/interfaces/iSensorsData.interface';
import { Router } from '@angular/router';
import { ComponentControlService } from '../../core/services/ComponentControl/component-control.service';
import { LoadingService } from '../../core/services/Loading/loading.service';

@Component({
  selector: 'app-car-data-item',
  standalone: true,
  imports: [
    CommonModule,
    FontAwesomeModule,
    MatSnackBarModule,
  ],
  templateUrl: './car-data-item.component.html',
  styleUrl: './car-data-item.component.scss',
})
export class CarDataItemComponent { 
  
  constructor() {}

  private router = inject(Router);
  private componentService = inject(ComponentControlService);
  private loadingService = inject(LoadingService);
  private _snackbar = inject(MatSnackBar);

  public isLoading: boolean = false;
  public isChecked: boolean = false;
  public carImage: string = 'assets/image/car2.jpg';

  @Input('proximity-data') proximityData: iSensorsData | null | undefined = undefined;
  
  @Input('component-room-name') componentRoomName: string | null = null;
  @Input('component-location') componentLocation: string | null = null;
  @Input('component-name') componentName: string | null = null;
  @Output('actuator-updated') actuatorUpdated: EventEmitter<void> =
  new EventEmitter<void>();

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['proximityData'] && this.proximityData){
      const action = this.proximityData.readings.find(a => a.name === 'Detección de distancia');
      if (action?.value <= 80) {
        this.isChecked = true;
        this.carImage = 'assets/image/car_occupy.jpg';
      } else {
        this.isChecked = false;
        this.carImage = 'assets/image/car2.jpg';
      }
    }
  }

  onCheckboxChange(){
    this.isChecked = !this.isChecked;
    this.isChecked
      ? this.car(this.proximityData!.arduinoIp)
      : this.carOccupy(this.proximityData!.arduinoIp);
  }

  car(arduinoIp: string){
    this.toggleCar(arduinoIp, true);
  }

  carOccupy(arduinoIp: string){
    this.toggleCar(arduinoIp, false);
  }


  private toggleCar(arduinoIp: string, isCar: boolean){
    this.isLoading = true;
    this.loadingService.showLoading();
    const toggleMethod = isCar ? this.componentService.car : this.componentService.carOccupy;
    toggleMethod(arduinoIp).subscribe(
      res => {
        this.isLoading = false;
        this.loadingService.hideLoading();
        this.carImage = isCar ? 'assets/image/car_occupy.jpg' : 'assets/image/car2.jpg';
        this.actuatorUpdated.emit();
      }, 
      err => {
        this.isLoading = false;
        this.loadingService.hideLoading();
      }
    );
  }

 
}
