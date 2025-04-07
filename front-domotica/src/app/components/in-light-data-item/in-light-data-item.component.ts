import { Component, EventEmitter, Input, Output, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { CommonModule } from '@angular/common';
import { ComponentControlService } from '../../core/services/ComponentControl/component-control.service';
import { LoadingService } from '../../core/services/Loading/loading.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router } from '@angular/router';
import { iActuatorsData } from '../../core/interfaces/i-ActuatorsData.interface';


import { FormsModule } from '@angular/forms';
import { Action } from 'rxjs/internal/scheduler/Action';

@Component({
  selector: 'app-in-light-data-item',
  standalone: true,
  imports: [
    MatCardModule,
    MatTooltipModule,
    MatButtonModule,
    MatIconModule,
    CommonModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    FormsModule
  ],
  templateUrl: './in-light-data-item.component.html',
  styleUrl: './in-light-data-item.component.scss',
})
export class InLightDataItemComponent {
  constructor(
    private componentService: ComponentControlService,
    private loadingService: LoadingService,
    private _snackbar: MatSnackBar,
    private router: Router
  ) {}
  @Input('inlight-data') inLightData: iActuatorsData | null | undefined = undefined;

  @Input('component-room-name') componentRoomName: string | null = null;
  @Input('component-location') componentLocation: string | null = null;
  @Input('component-name') componentName: string | null = null;

  @Output('actuator-updated') actuatorUpdated: EventEmitter<void> =
    new EventEmitter<void>();

  public toggleState: boolean = false;
  public lightImage:string = 'assets/image/luz_off.jpg';
  public isLoading: boolean = false;


  ngOnInit(): void {
    this.updateLightInState();
  }

  ngOnChanges(changes: SimpleChanges): void {
   if (changes['inLightData'] && !changes['inLightData'].isFirstChange()){
    this.updateLightInState();
   }
    
  }

  private updateLightInState (): void {
    if (this.inLightData && this.inLightData.actions.length > 0) {
      const inLightAction = this.inLightData.actions.find(Action => Action.name === 'Activación eléctrica');
      if(inLightAction){
        this.toggleState = inLightAction.value  === 'Encendido';
        this.lightImage = this.toggleState ? 'assets/image/luz_on.jpg' : 'assets/image/luz_off.jpg';
      }
    }
  }

  turnOff(arduinoIp: string) {
    this.isLoading = true;
    this.loadingService.showLoading();
    this._snackbar.open('Luz Interior Apagada Correctamente', 'Cerrar', {
      duration: 2.5 * 1000,
    });
    this.componentService.lightInOff(arduinoIp).subscribe(
      (res) => {
        this.loadingService.hideLoading();
        this.isLoading = false;
        this.toggleState = false;
        this.lightImage = 'assets/image/luz_off.jpg';
        this.actuatorUpdated.emit();
      },
      (err) => {
        this.loadingService.hideLoading();
        this.isLoading = false;
        this.actuatorUpdated.emit();
        // this._snackbar.open('Error al Apagar la Luz Interior', 'Cerrar', {
        //   duration: 2.5 * 1000,
        // });
      }
    );
  }
  turnOn(arduinoIp: string) {
    this.isLoading = true;
    this.loadingService.showLoading();
    this._snackbar.open('Luz Interior Encendida Correctamente', 'Cerrar', {
      duration: 2.5 * 1000,
    });
    this.componentService.lightInOn(arduinoIp).subscribe(
      (res) => {
        this.loadingService.hideLoading();
        this.isLoading = false;
        this.toggleState = true;
        this.lightImage = 'assets/image/luz_on.jpg';
        this.actuatorUpdated.emit();
      },
      (err) => {
        this.loadingService.hideLoading();
        this.isLoading = false;
        this.actuatorUpdated.emit();
        // this._snackbar.open('Error al Encender la Luz Interior', 'Cerrar', {
        //   duration: 2.5 * 1000,
        // });
      }
    );
  }

  onToggleChange(event: any) {
    if (this.inLightData){
      const newState = event.tarjet.checked ? 'Encendido' : 'Apagado';
      const data = {value: newState};

      if(event.target.checked) {
        this.componentService.lightInOn(this.inLightData.arduinoIp).subscribe(
          (res) => {
            this.toggleState = true;
            this.lightImage = 'assets/image/luz_on.jpg';
            this.actuatorUpdated.emit();
          },
          (err) => {
            console.error('Error en encender luz interior', err);
          }
        );
      }else{
        this.componentService.lightInOff(this.inLightData.arduinoIp).subscribe(
          (res) => {
            this.toggleState = false;
            this.lightImage = 'assets/image/luz_off.jpg';
            this.actuatorUpdated.emit();
          },
          (err) => {
            console.error('Error al apagar la luz interior');
          }
        );
      }
    }
  }

}
