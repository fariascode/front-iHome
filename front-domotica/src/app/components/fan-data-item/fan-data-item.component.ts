import { Component, EventEmitter, Input, Output, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';

import { CommonModule } from '@angular/common';
import { ComponentControlService } from '../../core/services/ComponentControl/component-control.service';
import { LoadingService } from '../../core/services/Loading/loading.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router } from '@angular/router';
import { iActuatorsData } from '../../core/interfaces/i-ActuatorsData.interface';

import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-fan-data-item',
  standalone: true,
  imports: [MatCardModule, MatTooltipModule, MatButtonModule, MatIconModule, CommonModule, 
    MatSlideToggleModule, MatSnackBarModule, MatCheckboxModule, FormsModule, ],
  templateUrl: './fan-data-item.component.html',
  styleUrl: './fan-data-item.component.scss'
})
export class FanDataItemComponent {

  constructor(
    private componentService: ComponentControlService, 
    private loadingService: LoadingService, 
    private _snackbar: MatSnackBar,
    private router: Router) {
    
  }

  @Input("fan-data") fanData: iActuatorsData | null | undefined = undefined;

  @Input('component-room-name') componentRoomName: string | null = null;
  @Input('component-location') componentLocation: string | null = null;
  @Input('component-name') componentName: string | null = null;

  @Output('actuator-updated') actuatorUpdated: EventEmitter<void> =
    new EventEmitter<void>();

    public isChecked: boolean = false;
    public isLoading: boolean = false;
    public toggleState: boolean = false;
    public fanImage: string = 'assets/image/fan_off.jpg';
    public sliderValue: number = 0;
    public valuePosition: string = '0%';
    public showSlider: boolean = false;

    ngOnChanges(changes: SimpleChanges) {
      if (changes['fanData']) {
        this.updateFanState();
      }
    }
  
    private updateFanState() {
      if (this.fanData && this.fanData.status === 'Encendido') {
        this.toggleState = true;
        this.fanImage = 'assets/image/fan_on.jpg';
        this.showSlider = true;
        const action = this.fanData.actions.find(action => action.name === 'Activación mecánica');
        if (action) {
          this.sliderValue = Number(action.value);
          this.updateSliderPosition();
        }
      } else {
        this.toggleState = false;
        this.fanImage = 'assets/image/fan_off.jpg';
        this.showSlider = false;
      }
    }
  
    onToggleChange(event: any) {
      this.toggleState = event.target.checked;
      this.fanImage = this.toggleState ? 'assets/image/fan_on.jpg' : 'assets/image/fan_off.jpg';
      this.showSlider = this.toggleState;
  
      if (this.toggleState) {
        this.fanOn(this.fanData!.arduinoIp);
      } else {
        this.fanOff(this.fanData!.arduinoIp);
      }
    }
  
    fanOn(arduinoIp: string) {
      this.isLoading = true;
      this.loadingService.showLoading();
      this._snackbar.open("Ventilador Encendido", "Cerrar", { duration: 2.5 * 1000 });
      this.componentService.fanOn(arduinoIp).subscribe(
        (res) => {
          this.loadingService.hideLoading();
          this.isLoading = false;
          this.actuatorUpdated.emit();
        },
        (err) => {
          this.loadingService.hideLoading();
          this.isLoading = false;
          this.actuatorUpdated.emit();
        }
      );
    }
  
    fanOff(arduinoIp: string) {
      this.isLoading = true;
      this.loadingService.showLoading();
      this._snackbar.open("Ventilador Apagado", "Cerrar", { duration: 2.5 * 1000 });
      this.componentService.fanOff(arduinoIp).subscribe(
        (res) => {
          this.loadingService.hideLoading();
          this.isLoading = false;
          this.actuatorUpdated.emit();
        },
        (err) => {
          this.loadingService.hideLoading();
          this.isLoading = false;
          this.actuatorUpdated.emit();
        }
      );
    }
  
    updateValue(event: Event): void {
      const target = event.target as HTMLInputElement;
      this.sliderValue = Number(target.value);
      this.updateSliderPosition();
    }
  
    private updateSliderPosition(): void {
      const valuePercentage = (this.sliderValue / 100) * 100;
      this.valuePosition = `calc(${valuePercentage}% - 10px)`;
    }
  
}
