import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router } from '@angular/router';
import { iSensorsData } from '../../core/interfaces/iSensorsData.interface';

import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-gas-data-item',
  standalone: true,
  imports: [MatCardModule, MatTooltipModule, MatButtonModule, MatIconModule, CommonModule, FormsModule],
  templateUrl: './gas-data-item.component.html',
  styleUrl: './gas-data-item.component.scss'
})
export class GasDataItemComponent {

  constructor(private router: Router) {}

  @Input("gas-data") gasData: iSensorsData | null | undefined = undefined; 

  @Input('component-room-name') componentRoomName: string | null = null;
  @Input('component-location') componentLocation: string | null = null;
  @Input('component-name') componentName: string | null = null;

  gasImage = 'assets/image/gas_full.jpg';

  getGasReading(): { value: number; measurementUnit: string } {
    const reading = this.gasData?.readings.find(reading =>
      reading.name.toLowerCase().includes('detección de gas')
    );
    return reading || { value: 0, measurementUnit: '' };
  }

  getGasValue(): number {
    return this.getGasReading().value;
  }

} 