import { Component, EventEmitter, Input, Output, SimpleChanges, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentControlService } from '../../core/services/ComponentControl/component-control.service';
import { LoadingService } from '../../core/services/Loading/loading.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router } from '@angular/router';
import { iActuatorsData } from '../../core/interfaces/i-ActuatorsData.interface';

@Component({
  selector: 'app-ex-light-data-item',
  standalone: true,
  imports: [
    MatCardModule,
    MatTooltipModule,
    MatButtonModule,
    MatIconModule,
    CommonModule,
    MatSlideToggleModule,
    MatCheckboxModule,
  ],
  templateUrl: './ex-light-data-item.component.html',
  styleUrls: ['./ex-light-data-item.component.scss'],
})
export class ExLightDataItemComponent {
  private router = inject(Router);
  private componentService = inject(ComponentControlService);
  private loadingService = inject(LoadingService);
  private _snackbar = inject(MatSnackBar);

  public isLoading: boolean = false;
  public isChecked: boolean = false;
  public lightImage: string = 'assets/image/light.jpg';

  @Input('exlight-data') exLightData: iActuatorsData | null | undefined = undefined;

  @Input('component-room-name') componentRoomName: string | null = null;
  @Input('component-location') componentLocation: string | null = null;
  @Input('component-name') componentName: string | null = null;
  @Output('actuator-updated') actuatorUpdated: EventEmitter<void> =
    new EventEmitter<void>();

    ngOnChanges(changes: SimpleChanges) {
      if (changes['exLightData'] && this.exLightData) {
        const action = this.exLightData.actions.find(a => a.name === 'Activación eléctrica');
        if (action?.value <= 'true') {
          this.isChecked = true;
          this.lightImage = 'assets/image/light_on.jpg';
        } else {
          this.isChecked = false;
          this.lightImage = 'assets/image/light.jpg';
        }
      }
    }

  onCheckboxChange() {
    this.isChecked = !this.isChecked;
    this.isChecked
      ? this.lightOn(this.exLightData!.arduinoIp)
      : this.lightOff(this.exLightData!.arduinoIp);
  }


  lightOff(arduinoIp: string){
    this.toggleLight(arduinoIp, false);
  }

  lightOn(arduinoIp: string){
    this.toggleLight(arduinoIp, true);
  }

  private toggleLight(arduinoIp: string, isStatus: boolean){
    this.isLoading = true;
    this.loadingService.showLoading();
    const toggleMethod = isStatus ? this.componentService.lightOutOn : this.componentService.lightOutOff;
    toggleMethod(arduinoIp).subscribe(
      res => {
        this.isLoading = false;
        this.loadingService.hideLoading();
        this.lightImage = isStatus ? 'assets/image/light_on.jpg' : 'assets/image/light.jpg';
        this.actuatorUpdated.emit();
      },
      err => {
        this.isLoading = false;
        this.loadingService.hideLoading();
        this._snackbar.open('Error al obtener datos de la luz exterior', 'Cerrar', {duration: 3000});
      }
    );
  }

}
