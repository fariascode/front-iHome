import { Component, EventEmitter, inject, Input, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { iSensorsData } from '../../core/interfaces/iSensorsData.interface';
import { ComponentControlService } from '../../core/services/ComponentControl/component-control.service';
import { LoadingService } from '../../core/services/Loading/loading.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-nivel-data-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './nivel-data-item.component.html',
  styleUrls: ['./nivel-data-item.component.scss'],
})
export class NivelDataItemComponent {
  constructor() {}

  private router = inject(Router);
  private componentService = inject(ComponentControlService);
  private loadingService = inject(LoadingService);
  private _snackbar = inject(MatSnackBar);

  public isLoading: boolean = false;
  public isChecked: boolean = false;
  public nivelImage: string = 'assets/image/nivel_bajo.jpg';

  @Input('proximity-data') proximityData: iSensorsData | null | undefined = undefined;
  @Input('component-room-name') componentRoomName: string | null = null;
  @Input('component-location') componentLocation: string | null = null;
  @Input('component-name') componentName: string | null = null;

  @Output('actuator-updated') actuatorUpdated: EventEmitter<void> = new EventEmitter<void>();

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['proximityData'] && this.proximityData) {
      const action = this.proximityData.readings.find(a => a.name === 'Detección de distancia');

      if (action?.value <= 25) {
        this.isChecked = true;
        this.nivelImage = 'assets/image/nivel_alto.jpg';
      } else {
        this.isChecked = false;
        this.nivelImage = 'assets/image/nivel_bajo.jpg';
      }
    }
  }

  onCheckboxChange() {
    this.isChecked = !this.isChecked;
    this.isChecked
      ? this.nivelAlto(this.proximityData!.arduinoIp)
      : this.nivelBajo(this.proximityData!.arduinoIp);
    
  }

  nivelAlto(arduinoIp: string) {
    this.toggleNivel(arduinoIp, true);
  }

  nivelBajo(arduinoIp: string) {
    this.toggleNivel(arduinoIp, false);
  }

  private toggleNivel(arduinoIp: string, isAlto: boolean) {
    this.isLoading = true;
    this.loadingService.showLoading();
    const toggleMethod = isAlto ? this.componentService.nivelAlto : this.componentService.nivelBajo;
    toggleMethod(arduinoIp).subscribe(
      res => {
        this.isLoading = false;
        this.loadingService.hideLoading();
        this.nivelImage = isAlto ? 'assets/image/nivel_alto.jpg' : 'assets/image/nivel_bajo.jpg';
        this.actuatorUpdated.emit();
      },
      err => {
        this.isLoading = false;
        this.loadingService.hideLoading();
        this._snackbar.open('Error al cambiar el nivel', 'Cerrar', { duration: 3000 });
      }
    );
  }
}
