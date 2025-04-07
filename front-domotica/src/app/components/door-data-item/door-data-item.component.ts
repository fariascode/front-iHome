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

@Component({
  selector: 'app-door-data-item',
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
  templateUrl: './door-data-item.component.html',
  styleUrl: './door-data-item.component.scss',
})
export class DoorDataItemComponent {
  constructor(
    private componentService: ComponentControlService,
    private loadingService: LoadingService,
    private _snackbar: MatSnackBar,
    private router: Router
  ) {}
  @Input('door-data') doorData: iActuatorsData | null | undefined = undefined;

  @Input('component-room-name') componentRoomName: string | null = null;
  @Input('component-location') componentLocation: string | null = null;
  @Input('component-name') componentName: string | null = null;

  @Output('actuator-updated') actuatorUpdated: EventEmitter<void> =
    new EventEmitter<void>();

    public isLoading: boolean = false;
    public toggleState: boolean = false;
    public doorImage: string = 'assets/image/door_closed.jpg';


    
  ngOnInit(): void {
    this.updateDoorState();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['doorData'] && !changes['doorData'].isFirstChange()) {
      this.updateDoorState();
    }
  }

  private updateDoorState(): void {
    if (this.doorData && this.doorData.actions.length > 0) {
      const doorAction = this.doorData.actions.find(action => action.name === 'Activación mecánica');
      if (doorAction) {
        this.toggleState = doorAction.value === 'true';
        this.doorImage = this.toggleState ? 'assets/image/door_open.jpg' : 'assets/image/door_closed.jpg';
      }
    }
  }

  

  closeDoor(arduinoIp: string) {
    this.isLoading = true;
    this.loadingService.showLoading();
    this._snackbar.open('Puerta cerrada', 'Cerrar', {
      duration: 2.5 * 1000,
    });
    this.componentService.doorClose(arduinoIp).subscribe(
      (res) => {
        this.isLoading = false;
        this.loadingService.hideLoading();
        this.toggleState = false;
        this.doorImage = 'assets/image/door_closed.jpg';
        this.actuatorUpdated.emit();
      },
      (err) => {
        this.isLoading = false;
        this.loadingService.hideLoading();
        this.actuatorUpdated.emit();
      }
    );
  }

  openDoor(arduinoIp: string) {
    this.isLoading = true;
    this.loadingService.showLoading();
    this._snackbar.open('Puerta abierta correctamente', 'Cerrar', {
      duration: 2.5 * 1000,
    });
    this.componentService.doorOpen(arduinoIp).subscribe(
      (res) => {
        this.isLoading = false;
        this.loadingService.hideLoading();
        this.toggleState = true;
        this.doorImage = 'assets/image/door_open.jpg';
        this.actuatorUpdated.emit();
      },
      (err) => {
        this.isLoading = false;
        this.loadingService.hideLoading();
        this.actuatorUpdated.emit();
      }
    );
  }

  onToggleChange(event: any) {
    if (this.doorData) {
      const newState = event.target.checked ? 'true' : 'false'; 
      const data = { value: newState };
      
      if (event.target.checked) {
        this.componentService.doorOpen(this.doorData.arduinoIp).subscribe(
          (res) => {
            this.toggleState = true;
            this.doorImage = 'assets/image/door_open.jpg';
            this.actuatorUpdated.emit();
          },
          (err) => {
            console.error('Error al abrir la puerta:', err);
          }
        );
      } else {
        this.componentService.doorClose(this.doorData.arduinoIp).subscribe(
          (res) => {
            this.toggleState = false;
            this.doorImage = 'assets/image/door_closed.jpg';
            this.actuatorUpdated.emit();
          },
          (err) => {
            console.error('Error al cerrar la puerta:', err);
          }
        );
      }
    }
  }
  
  
}
