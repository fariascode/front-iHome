import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  iApiResponse,
  iLastApiResponse,
} from '../../core/interfaces/i-ApiResponse';

import { ActivatedRoute } from '@angular/router';
import { BuzzerDataItemComponent } from '../../components/buzzer-data-item/buzzer-data-item.component';
import { DoorDataItemComponent } from '../../components/door-data-item/door-data-item.component';
import { ExLightDataItemComponent } from '../../components/ex-light-data-item/ex-light-data-item.component';
import { GaragesService } from './../../core/services/Garages/garages.service';
import { GateDoubleDataItemComponent } from '../../components/gate-double-data-item/gate-double-data-item.component';
import { InLightDataItemComponent } from '../../components/in-light-data-item/in-light-data-item.component';
import { LoadingService } from '../../core/services/Loading/loading.service';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { PhotoresistorDataItemComponent } from '../../components/photoresistor-data-item/photoresistor-data-item.component';
import { PresenceDataItemComponent } from '../../components/presence-data-item/presence-data-item.component';
import { ProximityDataItemComponent } from '../../components/proximity-data-item/proximity-data-item.component';
import { iActuatorsData } from '../../core/interfaces/i-ActuatorsData.interface';
import { iSensorsData } from '../../core/interfaces/iSensorsData.interface';
import { pollingIntervalTime } from '../../core/constants/pollingInterval';

import { CarDataItemComponent } from '../../components/car-data-item/car-data-item.component';
import { TemperatureDataItemComponent } from '../../components/temperature-data-item/temperature-data-item.component';

@Component({
  selector: 'app-garages-page',
  standalone: true,
  imports: [
    MatButtonModule,
    CommonModule,
    MatIconModule,
    MatDividerModule,
    PhotoresistorDataItemComponent,
    ProximityDataItemComponent,
    PresenceDataItemComponent,
    InLightDataItemComponent,
    DoorDataItemComponent,
    ExLightDataItemComponent,
    BuzzerDataItemComponent,
    GateDoubleDataItemComponent,
    CarDataItemComponent,
    GateDoubleDataItemComponent,
    TemperatureDataItemComponent

  ],
  templateUrl: './garages-page.component.html',
  styleUrl: './garages-page.component.scss',
})
export class GaragesPageComponent implements OnInit {
  constructor(
    private garagesService: GaragesService,
    private route: ActivatedRoute,
    private loadingService: LoadingService
  ) {}
  public garageSensor!: { _id: string; lastRecord: iSensorsData }[];
  public garageActuators!: { _id: string; lastRecord: iActuatorsData }[];
  public garageName: string | null = '';
  public presenceData: iSensorsData | undefined = undefined;
  public dhtData: iSensorsData | undefined = undefined;
  public ldrData: iSensorsData | undefined = undefined;
  public proximityData: iSensorsData | null | undefined = undefined;
  public fanData: iActuatorsData | undefined = undefined;
  public doorData: iActuatorsData | null | undefined = undefined;
  public windowLeftData: iActuatorsData | undefined = undefined;
  public windowRightData: iActuatorsData | undefined = undefined;
  public inLightData: iActuatorsData | null | undefined = undefined;
  public exLightData: iActuatorsData | null | undefined = undefined;
  public buzzerData: iActuatorsData | undefined = undefined;
  public gateLeftData: iActuatorsData | null | undefined = undefined;
  public gateRightData: iActuatorsData | null | undefined = undefined;

  private pollingInterval: any;

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.garageName = params.get('location');

      this.getGaragesData(this.garageName!);
    });

    this.pollingInterval = setInterval(() => {
      this.getGaragesData(this.garageName!);
    }, pollingIntervalTime); // 5000 milisegundos = 5 segundos
  }

  ngOnDestroy(): void {
    clearInterval(this.pollingInterval);
  }

  getGaragesData(location: string) {
    this.loadingService.showLoading();
    console.log(`Obteniendo Datos en ${this.garageName}`);

    this.garagesService.getLastData(location).subscribe(
      (response: iLastApiResponse) => {
        console.log(response);
        this.garageActuators = response.actuatorsData;
        this.garageSensor = response.sensorsData;

        if (this.garageActuators && this.garageSensor) {
          this.dhtData = this.garageSensor.find(({ lastRecord }) =>
            lastRecord.name.toLowerCase().includes('temperatura')
          )?.lastRecord;

          console.log(this.dhtData);
          
          this.ldrData = this.garageSensor.find(
            ({ lastRecord }) => lastRecord.name === 'Fotorresistencia'
          )?.lastRecord;

          console.log(this.ldrData);

          this.doorData = this.garageActuators.find(
            ({ lastRecord }) => lastRecord.name === 'Puerta'
          )?.lastRecord || null;

          console.log(this.doorData);

          

          this.inLightData = this.garageActuators.find(
            ({ lastRecord }) => lastRecord.name === 'Releay'
          )?.lastRecord || null;

          console.log(this.inLightData);

          this.exLightData = this.garageActuators.find(
            ({ lastRecord }) => lastRecord.name === 'Led Exterior'
          )?.lastRecord || null;

          console.log(this.exLightData);

          this.buzzerData = this.garageActuators.find(
            ({ lastRecord }) => lastRecord.name === 'Alarma'
          )?.lastRecord;

          console.log(this.buzzerData);

          this.gateLeftData = this.garageActuators.find(
            ({ lastRecord }) => lastRecord.name === 'Porton Izquierda'
          )?.lastRecord || null;

          console.log(this.gateLeftData);

          this.gateRightData = this.garageActuators.find(
            ({ lastRecord }) => lastRecord.name === 'Porton Derecha'
          )?.lastRecord || null;

          console.log(this.gateRightData);

          this.proximityData = this.garageSensor.find(
            ({ lastRecord }) => lastRecord.name === 'Proximidad'
          )?.lastRecord || null;

          console.log(this.proximityData);

          this.presenceData = this.garageSensor.find(
            ({ lastRecord }) => lastRecord.name === 'Presencia'
          )?.lastRecord;

          console.log(this.presenceData);

        }
        this.loadingService.hideLoading();
        console.log(this.garageName);
      },
      (error) => {
        console.log(`Datos No Obtenidos en ${this.garageName}`);
        this.loadingService.hideLoading();
        console.error(error);
      }
    );
  }

  onActuatorUpdate() {
    this.getGaragesData(this.garageName!);
  }
}
