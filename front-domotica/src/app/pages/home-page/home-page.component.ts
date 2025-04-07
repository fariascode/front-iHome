import { Component, OnInit, OnDestroy } from '@angular/core';

import { LoadingService } from '../../core/services/Loading/loading.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { RoomsService } from '../../core/services/Rooms/rooms.service';
import { RouterLink } from '@angular/router';
import { iApiResponse } from '../../core/interfaces/i-ApiResponse';
import { pollingIntervalTime } from '../../core/constants/pollingInterval';

import {MatMenuModule} from '@angular/material/menu';

import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

import { DataService } from '../../core/services/data.service';


@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    MatCardModule,
    MatDividerModule,
    MatButtonModule,
    MatIconModule,
    RouterLink,
    MatMenuModule,
    CommonModule
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent implements OnInit, OnDestroy {

  
  temperaturaData: number | undefined;
  private subscription: Subscription = new Subscription();
  
  constructor(
    private roomsService: RoomsService,
    private loadingService: LoadingService,

    public dataService : DataService
  ) {}
  public rooms: any = {};

  private pollingInterval: any;
  
  currentTime: string = '';

  ngOnInit(): void {
    this.updateTime(); // Mostrar la hora al cargar el componente
    setInterval(() => this.updateTime(), 1000); // Actualizar cada segundo
    this.getRoomsNames();
    
    this.pollingInterval = setInterval(() => {
      this.getRoomsNames();
    }, pollingIntervalTime);

    this.subscription.add(
      this.dataService.temperature$.subscribe(data => {
        console.log('TEMPERATURA RECIBIDA:', data);
        this.temperaturaData = data;
      })
    );
    
  }
  updateTime() {
    const now = new Date();
    this.currentTime = now.toLocaleString(); // Formato de fecha y hora local
  }

  ngOnDestroy(): void {
    clearInterval(this.pollingInterval);
    this.subscription.unsubscribe();
  }

  getRoomsNames() {
    this.loadingService.showLoading();
    this.roomsService.getAllRooms().subscribe((res: iApiResponse) => {
      console.log(res);
      this.rooms = res.roomsNames;
      this.loadingService.hideLoading();
    });
  }
  
}
