import { Component, EventEmitter, Input, Output, SimpleChanges, inject } from '@angular/core';

import { CommonModule } from '@angular/common';
import { ComponentControlService } from '../../core/services/ComponentControl/component-control.service';
import { LoadingService } from '../../core/services/Loading/loading.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { iActuatorsData } from '../../core/interfaces/i-ActuatorsData.interface';

import { FormsModule } from '@angular/forms';
import { error } from 'highcharts';

@Component({
  selector: 'app-simple-window',
  standalone: true,
  imports: [MatCardModule, CommonModule, MatButtonModule, MatSlideToggleModule, MatButtonModule, MatIconModule, FormsModule],
  templateUrl: './simple-window.component.html',
  styleUrl: './simple-window.component.scss',
})
export class SimpleWindowComponent {
  private router = inject(Router);
  private componentsService = inject(ComponentControlService);
  private loadingService = inject(LoadingService);
  private _snackbar = inject(MatSnackBar);
  public isLoading: boolean = false;
  public toggleState: boolean = false;
  public windowsImage: string = 'assets/image/ventana_simple_close.jpg';
  

  @Input('window-data') windowData: iActuatorsData | null | undefined = undefined;;

  @Input('component-room-name') componentRoomName: string | null = null;
  @Input('component-location') componentLocation: string | null = null;
  @Input('component-name') componentName: string | null = null;

  @Output('actuator-updated') actuatorUpdated: EventEmitter<void> =
    new EventEmitter<void>();

  ngOnInit(): void {
    this.updateWindowState(); 
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['windowData'] && !changes['windowData'].isFirstChange()){
      this.updateWindowState();
    }
  }

  private updateWindowState(): void{
    if (this.windowData && this.windowData.actions.length > 0){
      const windowAction = this.windowData.actions.find(a => a.name === 'Activación mecánica');
      if (windowAction) {
        this.toggleState = windowAction.value === 'Abierta';
        this.windowsImage = this.toggleState ? 'assets/image/ventana_simple_open.jpg' : 'assets/image/ventana_simple_close.jpg';
      }
    }
  }

  openWindow(arduinoIp: string) {
    this.isLoading = true;
    this.loadingService.showLoading();
    this._snackbar.open('Ventana Abierta Correctamente', 'Cerrar', {
      duration: 2.5 * 1000,
    });
    this.componentsService.simpleWindowOpen(arduinoIp).subscribe(
      (res) => {
        this.loadingService.hideLoading();
        this.isLoading = false;
        this.toggleState = true;
        this.windowsImage = 'assets/image/ventana_simple_open.jpg';
        this.actuatorUpdated.emit();
      },
      (err) => {
        this.loadingService.hideLoading();
        this.isLoading = false;
        this.actuatorUpdated.emit();
        // this._snackbar.open('Error al Abrir Ventana', 'Cerrar', {
        //   duration: 2.5 * 1000,
        // });
      }
    );
  }
  closeWindow(arduinoIp: string) {
    this.isLoading = true;
    this.loadingService.showLoading();
    this._snackbar.open('Ventana Cerrada Correctamente', 'Cerrar', {
      duration: 2.5 * 1000,
    });
    this.componentsService.simpleWindowClose(arduinoIp).subscribe(
      (res) => {
        this.loadingService.hideLoading();
        this.isLoading = false;
        this.toggleState = false;
        this.windowsImage = 'assets/image/ventana_simple_close.jpg';
        this.actuatorUpdated.emit();
      },
      (err) => {
        this.loadingService.hideLoading();
        this.isLoading = false;
        this.actuatorUpdated.emit();
        // this._snackbar.open('Error al Cerrar Ventana', 'Cerrar', {
        //   duration: 2.5 * 1000,
        // });
      }
    );
  }

  onToggleChange(event: any) {
    if(this.windowData){
      const newState = event.target.checked ? 'Abierta' : 'Cerrada';
      const data = { value : newState};

      if(event.target.checked) {
        this.componentsService.simpleWindowOpen(this.windowData.arduinoIp).subscribe(
          (res) => {
            this.toggleState = true;
            this.windowsImage = 'assets/image/ventana_simple_open.jpg';
            this.actuatorUpdated.emit();
          },
          (err)=> {
            console.error('Error al abrir ventana', err);
          }
        );
      } else {
        this.componentsService.simpleWindowClose(this.windowData.arduinoIp).subscribe(
          (res) => {
            this.toggleState = false;
            this.windowsImage = 'assets/image/ventana_simple_close.jpg';
            this.actuatorUpdated.emit();
          },
          (err) => {
            console.error('Error al cerrar ventana', err);
          }
        );
      }
    }
  }
}
