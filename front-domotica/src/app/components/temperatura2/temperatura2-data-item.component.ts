import { Router, RouterLink } from '@angular/router';
import { Component, Input } from '@angular/core';

import { CommonModule } from '@angular/common';
import { iSensorsData } from '../../core/interfaces/iSensorsData.interface';

@Component({
  selector: 'app-temperatura2-data-item',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
  ],
  templateUrl: './temperatura2-data-item.component.html',
  styleUrl: './temperatura2-data-item.component.scss',
})
export class TemperaturaDataItemComponent {
  // * ----------
  constructor(private router: Router) {}
  // * ----------
  
  @Input('dht-data') dhtData: iSensorsData | null = null;
  
  // * ----------
  @Input('component-room-name') componentRoomName: string | null = null;
  @Input('component-location') componentLocation: string | null = null;
  @Input('component-name') componentName: string | null = null;
  // * ----------
  

  
}
