import { Component, EventEmitter, Input, Output, inject, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentControlService } from '../../core/services/ComponentControl/component-control.service';
import { LoadingService } from '../../core/services/Loading/loading.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router } from '@angular/router';
import { iActuatorsData } from '../../core/interfaces/i-ActuatorsData.interface';
import { FormsModule } from '@angular/forms';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-gate-double-data-item',
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
  templateUrl: './gate-double-data-item.component.html',
  styleUrls: ['./gate-double-data-item.component.scss'],
})
export class GateDoubleDataItemComponent implements OnInit, OnChanges {
  toggleState = false;
  garajeImage = 'assets/image/garage.jpg';

  private router = inject(Router);
  private loadingService = inject(LoadingService);
  private componentService = inject(ComponentControlService);
  private _snackbar = inject(MatSnackBar);

  @Input('gateLeft-data') gateLeftData: iActuatorsData | null | undefined = undefined;
  @Input('gateRight-data') gateRightData: iActuatorsData | null | undefined = undefined;

  @Input('component-room-name') componentRoomName: string | null = null;
  @Input('component-location') componentLocation: string | null = null;
  @Input('component-name') componentName: string | null = null;

  @Output('actuator-updated') actuatorUpdated: EventEmitter<void> = new EventEmitter<void>();

  public isLoading: boolean = false;

  ngOnInit(): void {
    this.updateGateState();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['gateLeftData'] || changes['gateRightData']) {
      this.updateGateState();
    }
  }

  private updateGateState(): void {
    const leftGateOpen = this.gateLeftData?.actions.some(action => action.name === 'Activación mecánica' && action.value === 'Abierta') ?? false;
    const rightGateOpen = this.gateRightData?.actions.some(action => action.name === 'Activación mecánica' && action.value === 'Abierta') ?? false;
    this.toggleState = leftGateOpen && rightGateOpen;
    this.garajeImage = this.toggleState ? 'assets/image/garage_open.jpg' : 'assets/image/garage.jpg';
  }

  closePorton(arduinoIpLeft: string, arduinoIpRight: string) {
    this.isLoading = true;
    this.loadingService.showLoading();
    this._snackbar.open('Portón Cerrado Correctamente', 'Cerrar', {
      duration: 2.5 * 1000,
    });

    const leftClose$ = this.componentService.GateLeftClosed(arduinoIpLeft);
    const rightClose$ = this.componentService.GateRightClosed(arduinoIpRight);

    forkJoin([leftClose$, rightClose$]).subscribe(
      (res) => {
        this.loadingService.hideLoading();
        this.isLoading = false;
        this.updateGateState();
        this.actuatorUpdated.emit();
      },
      (err) => {
        this.loadingService.hideLoading();
        this.isLoading = false;
        this.actuatorUpdated.emit();
      }
    );
  }

  openPorton(arduinoIpLeft: string, arduinoIpRight: string) {
    this.isLoading = true;
    this.loadingService.showLoading();
    this._snackbar.open('Portón Abierto Correctamente', 'Cerrar', {
      duration: 2.5 * 1000,
    });

    const leftOpen$ = this.componentService.GateLeftOpen(arduinoIpLeft);
    const rightOpen$ = this.componentService.GateRightOpen(arduinoIpRight);

    forkJoin([leftOpen$, rightOpen$]).subscribe(
      (res) => {
        this.loadingService.hideLoading();
        this.isLoading = false;
        this.updateGateState();
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
    const newState = event.target.checked;
    if (newState) {
      this.openPorton(this.gateLeftData?.arduinoIp!, this.gateRightData?.arduinoIp!);
    } else {
      this.closePorton(this.gateLeftData?.arduinoIp!, this.gateRightData?.arduinoIp!);
    }
  }
}
