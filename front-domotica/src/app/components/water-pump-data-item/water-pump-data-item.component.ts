import { Component, EventEmitter, Input, Output, SimpleChanges, inject } from '@angular/core';

import { CommonModule } from '@angular/common';
import { ComponentControlService } from '../../core/services/ComponentControl/component-control.service';
import { LoadingService } from '../../core/services/Loading/loading.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router } from '@angular/router';
import { iActuatorsData } from '../../core/interfaces/i-ActuatorsData.interface';


import { FormsModule } from '@angular/forms';
import { Action } from 'rxjs/internal/scheduler/Action';

@Component({
  selector: 'app-water-pump-data-item',
  standalone: true,
  imports: [
    MatCardModule,
    MatTooltipModule,
    MatButtonModule,
    MatIconModule,
    CommonModule,
    MatSlideToggleModule,
    FormsModule
  ],
  templateUrl: './water-pump-data-item.component.html',
  styleUrl: './water-pump-data-item.component.scss',
})
export class WaterPumpDataItemComponent {
  private router = inject(Router);
  private loadingService = inject(LoadingService);
  private _snackbar = inject(MatSnackBar);
  private componentService = inject(ComponentControlService);

  @Input('waterPump') waterPumpData: iActuatorsData | null | undefined = undefined;

  @Input('component-room-name') componentRoomName: string | null = null;
  @Input('component-location') componentLocation: string | null = null;
  @Input('component-name') componentName: string | null = null;

  @Output('actuator-updated') actuatorUpdated: EventEmitter<void> =
    new EventEmitter<void>();


  public isLoading: boolean = false;
  public toggleState: boolean = false;
  public tankImage: string = 'assets/image/tank_off.jpg';

  ngOnInit(): void {
    this.updateWaterState();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['waterPumpData'] && !changes['waterPumpData'].isFirstChange()){
      this.updateWaterState();
    }
  }

  private updateWaterState(): void {
    if(this.waterPumpData && this.waterPumpData.actions.length > 0) {
      const waterAction = this.waterPumpData.actions.find(action => action.name === 'Activación eléctrica');
      if(waterAction) {
        this.toggleState = waterAction.value === 'Encendido';
        this.tankImage = this.toggleState ? 'assets/image/tank_on.jpg' : 'assets/image/tank_off.jpg';
      }
    }
  }

  onToggleChange(event: any) {
    if(this.waterPumpData) {
      const newState = event.target.checked ? 'Encendido' : 'Apagado';
      const data = {value: newState};
      
      if(event.target.checked) {
        this.componentService.waterOn(this.waterPumpData.arduinoIp).subscribe(
          (res) => {
            this.toggleState = true;
            this.tankImage = 'assets/image/tank_on.jpg';
            this.actuatorUpdated.emit();
          },
          (err) => {
            console.error('Error al encender bomba de agua')
          }
        );
      }else{
        this.componentService.waterOff(this.waterPumpData.arduinoIp).subscribe(
          (res) => {
            this.toggleState = false;
            this.tankImage = 'assets/image/tank_off.jpg';
            this.actuatorUpdated.emit();
          },
          (err) => {
            console.error('Error al apagar bomba de agua');
          }
        );
      }
    }
  }

  
}
