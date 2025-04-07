import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { iApiResponse, iLastApiResponse } from '../../core/interfaces/i-ApiResponse';

import { DoorDataItemComponent } from '../../components/door-data-item/door-data-item.component';
import { ExLightDataItemComponent } from '../../components/ex-light-data-item/ex-light-data-item.component';
import { FanDataItemComponent } from '../../components/fan-data-item/fan-data-item.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { InLightDataItemComponent } from '../../components/in-light-data-item/in-light-data-item.component';
import { LivingroomsService } from './../../core/services/Livingrooms/livingrooms.service';
import { LoadingService } from '../../core/services/Loading/loading.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { PhotoresistorDataItemComponent } from '../../components/photoresistor-data-item/photoresistor-data-item.component';
import { TemperatureDataItemComponent } from '../../components/temperature-data-item/temperature-data-item.component';
import { WindowDoubleDataItemComponent } from '../../components/window-double-data-item/window-double-data-item.component';
import { iActuatorsData } from '../../core/interfaces/i-ActuatorsData.interface';
import { iSensorsData } from '../../core/interfaces/iSensorsData.interface';
import { pollingIntervalTime } from '../../core/constants/pollingInterval';
import { DataService } from '../../core/services/data.service';
import { WindowLeftDataItemComponent } from '../../components/windowLeft-data-item/window-left-data-item.component';

@Component({
  selector: 'app-livingrooms',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    CommonModule,
    MatIconModule,
    MatDividerModule,
    TemperatureDataItemComponent,
    PhotoresistorDataItemComponent,
    FontAwesomeModule,
    MatSlideToggleModule,
    FanDataItemComponent,
    InLightDataItemComponent,
    DoorDataItemComponent,
    ExLightDataItemComponent,
    WindowDoubleDataItemComponent,
    WindowLeftDataItemComponent 
  ],
  templateUrl: './livingrooms.component.html',
  styleUrl: './livingrooms.component.scss',
})
export class LivingroomsComponent implements OnInit {
  constructor(
    private LivingroomsService: LivingroomsService,
    private route: ActivatedRoute,
    // * --------- *
    private router: Router,
    // * --------- *
    private loadingService: LoadingService,

    private dataService: DataService
  ) {}

  public livingroomsSensor!: { _id: string; lastRecord: iSensorsData }[];
  public livingroomsActuators!: { _id: string; lastRecord: iActuatorsData }[];
  // * --------- *
  public livingroomName: string | null = '';
  public roomPath: string = '';
  public room: string | null = '';
  // * --------- *

  public dhtData: iSensorsData | undefined = undefined;
  public ldrData: iSensorsData | null | undefined = undefined;
  public fanData: iActuatorsData | null | undefined = undefined;
  public doorData: iActuatorsData | null | undefined = undefined;
  public windowLeftData: iActuatorsData | null | undefined = undefined;
  public windowDoubleData: iActuatorsData | null | undefined = undefined;
  public inLightData: iActuatorsData | null | undefined = undefined;
  public exLightData: iActuatorsData | null | undefined = undefined;

  private pollingInterval: any;

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      // * --------
      this.room = this.livingroomName = params.get('location');
      this.roomPath = this.router.url;
      // * --------
      this.getLivingroomData(this.livingroomName!);
    });

    this.pollingInterval = setInterval(() => {
      this.getLivingroomData(this.livingroomName!);
    }, pollingIntervalTime);
  }

  ngOnDestroy(): void {
    clearInterval(this.pollingInterval);
  }

  getLivingroomData(location: string) {
    console.log(`Obteniendo Datos en ${this.livingroomName}`);
    this.loadingService.showLoading();
    this.LivingroomsService.getLastData(location).subscribe(
      (response: iLastApiResponse) => {
        console.log(response);
        this.livingroomsActuators = response.actuatorsData;
        this.livingroomsSensor = response.sensorsData;

        if (this.livingroomsActuators && this.livingroomsSensor) {
          // Separar los datos de sensores en variables individuales
          this.dhtData = this.livingroomsSensor.find(({lastRecord}) => lastRecord.name.toLowerCase().includes('temperatura'))?.lastRecord;

          console.log(this.dhtData);

          if (this.dhtData && this.dhtData.readings && this.dhtData.readings.length > 0) {
            const temperaturaReading = this.dhtData.readings.find(reading => {
              return typeof reading.name === 'string' && reading.name.toLowerCase().includes('temperatura');
            });
          
            if (temperaturaReading) {
              const temperaturaValue = temperaturaReading.value;
              this.dataService.setTemperature(temperaturaValue);
              console.log(temperaturaValue);
            }
          } 
          
          this.ldrData = this.livingroomsSensor.find(
            ({ lastRecord }) => lastRecord.name === 'Fotorresistencia'
          )?.lastRecord || null;

          console.log(this.ldrData);

          // Separar los datos de actuadores en variables individuales
          this.fanData = this.livingroomsActuators.find(
            ({ lastRecord }) => lastRecord.name === 'Ventilador'
          )?.lastRecord || null;

          console.log(this.fanData);

          this.doorData = this.livingroomsActuators.find(
            ({ lastRecord }) => lastRecord.name === 'Puerta'
          )?.lastRecord || null;

          console.log(this.doorData);

          this.windowLeftData = this.livingroomsActuators.find(
            ({ lastRecord }) => lastRecord.name === 'Ventana_Izquierda'
          )?.lastRecord || null;

          console.log(this.windowLeftData);

          this.windowDoubleData = this.livingroomsActuators.find(
            ({ lastRecord }) => lastRecord.name === 'Ventana_Derecha'
          )?.lastRecord || null;

          console.log(this.windowDoubleData);

          this.inLightData = this.livingroomsActuators.find(
            ({ lastRecord }) => lastRecord.name === 'Releay'
          )?.lastRecord || null;

          console.log(this.inLightData);

          this.exLightData = this.livingroomsActuators.find(
            ({ lastRecord }) => lastRecord.name === 'Led Exterior'
          )?.lastRecord || null;

          console.log(this.exLightData);
        }
        console.log(`Datos Obtenidos en ${this.livingroomName}`)
        this.loadingService.hideLoading();
      },
      (error) => {
        console.log(`Datos No Obtenidos en ${this.livingroomName}`)
        this.loadingService.hideLoading();
        console.error(error);
      }
    );
  }

  onActuatorUpdate() {
    this.getLivingroomData(this.livingroomName!);
  }
}