import { Component, EventEmitter, Input, Output, SimpleChanges, inject } from '@angular/core';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Observable, Subscription } from 'rxjs';

import { CommonModule } from '@angular/common';
import { ComponentControlService } from '../../core/services/ComponentControl/component-control.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LoadingService } from '../../core/services/Loading/loading.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router } from '@angular/router';
import { iActuatorsData } from '../../core/interfaces/i-ActuatorsData.interface';
import {MatMenuModule} from '@angular/material/menu';

import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-window-double-data-item',
  standalone: true,
  imports: [
    MatCardModule,
    MatTooltipModule,
    MatButtonModule,
    MatIconModule,
    CommonModule,
    MatSlideToggleModule,
    FontAwesomeModule,
    MatSnackBarModule,
    FormsModule,
    MatMenuModule
  ],
  templateUrl: './window-double-data-item.component.html',
  styleUrl: './window-double-data-item.component.scss',
})
export class WindowDoubleDataItemComponent {

  
  private router = inject(Router);
  private componentsService = inject(ComponentControlService);
  private loadingService = inject(LoadingService);
  private _snackbar = inject(MatSnackBar);

  public isLoading: boolean = false;
  public toggleState: boolean = false;
  public windowsImage: string = 'assets/image/ventanaRL.jpg';

  //@Input('windowDoubleData') windowDoubleData: iActuatorsData | null | undefined = undefined;

  @Input('component-room-name') componentRoomName: string | null = null;
  @Input('component-location') componentLocation: string | null = null;
  @Input('component-name') componentName: string | null = null;

  @Output('actuator-updated') actuatorUpdated: EventEmitter<void> =
    new EventEmitter<void>();
    @Input() windowDoubleData: any; // Ajusta el tipo según corresponda


    ngOnInit(): void {
      this.updateWindowRState();
    }

    ngOnChanges(changes: SimpleChanges): void {
      if (changes['windowDoubleData'] && !changes['windowRightData'].isFirstChange()){
        this.updateWindowRState();
      }
    }

    private updateWindowRState(): void {
      if (this.windowDoubleData && this.windowDoubleData.actions.length > 0) {
        const windowAction = this.windowDoubleData.actions.find((a: { name: string }) => a.name === 'Activación mecánica');
        if (windowAction){
          this.toggleState = windowAction.value === 'Abierta';
          this.windowsImage = this.toggleState ? 'assets/image/ventana_der.jpg' : 'assets/image/ventanaRL.jpg';
        }
      }
    }

    openWindow(arduinoIp: string) {
      this.isLoading = true;
      this.loadingService.showLoading();
      this._snackbar.open('Ventana derecha abierta correctamente', 'Cerrar', {
        duration: 2.5 * 100,
      });
      this.componentsService.doubleWindowsRightOpen(arduinoIp).subscribe(
        (res) => {
          this.loadingService.hideLoading();
          this.isLoading = false;
          this.toggleState = true;
          this.windowsImage = 'assets/image/ventana_der.jpg';
          this.actuatorUpdated.emit();
        },
        (err) => {
          this.loadingService.hideLoading();
          this.isLoading = false;
          this.actuatorUpdated.emit();
        }
      );
    }



    closeWindow(arduinoIp: string) {
      this.isLoading = true;
      this.loadingService.showLoading();
      this._snackbar.open('Ventana Izquierda Cerrada Correctamente', 'Cerrar', {
        duration: 2.5 * 1000,
      });
      this.componentsService.doubleWindowsRightClose(arduinoIp).subscribe(
        (res) => {
          this.loadingService.hideLoading();
          this.isLoading = false;
          this.toggleState = false;
          this.windowsImage = 'assets/image/ventanaRL.jpg';
          this.actuatorUpdated.emit();
        },
        (err) => {
          this.loadingService.hideLoading();
          this.isLoading = false;
          this.actuatorUpdated.emit();
        }
      );
    }

  

  onToggleChange(event: any) {
    if(this.windowDoubleData){
      const newState = event.target.checked ? 'Abierta' : 'Cerrada';
      const data = { value : newState };

      if(event.target.checked) {
        this.componentsService.doubleWindowsRightOpen(this.windowDoubleData.arduinoIp).subscribe(
          (res) => {
            this.toggleState = true;
            this.windowsImage = 'assets/image/ventana_der.jpg'
            this.actuatorUpdated.emit();
          },
          (err) => {
            console.error('Error al abrir la ventana', err);
          }
        );
      } else {
        this.componentsService.doubleWindowsRightClose(this.windowDoubleData.arduinoIp).subscribe(
          (res) => {
            this.toggleState = false;
            this.windowsImage = 'assets/image/ventanaRL.jpg';
            this.actuatorUpdated.emit();
          },
          (err) => {
            console.error('Error al cerrar la ventana', err);
          }
        );
      }
    }
  }

}
