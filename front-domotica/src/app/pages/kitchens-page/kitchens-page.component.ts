import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { iApiResponse, iLastApiResponse } from '../../core/interfaces/i-ApiResponse';

import { ActivatedRoute } from '@angular/router';
import { BuzzerDataItemComponent } from '../../components/buzzer-data-item/buzzer-data-item.component';
import { DoorDataItemComponent } from '../../components/door-data-item/door-data-item.component';
import { ExLightDataItemComponent } from '../../components/ex-light-data-item/ex-light-data-item.component';
import { FanDataItemComponent } from '../../components/fan-data-item/fan-data-item.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { GasDataItemComponent } from '../../components/gas-data-item/gas-data-item.component';
import { InLightDataItemComponent } from '../../components/in-light-data-item/in-light-data-item.component';
import { KitchensService } from '../../core/services/kitchens/kitchens.service';
import { LoadingService } from '../../core/services/Loading/loading.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { PhotoresistorDataItemComponent } from '../../components/photoresistor-data-item/photoresistor-data-item.component';
import { TemperatureDataItemComponent } from '../../components/temperature-data-item/temperature-data-item.component';
import { iActuatorsData } from '../../core/interfaces/i-ActuatorsData.interface';
import { iSensorsData } from '../../core/interfaces/iSensorsData.interface';
import { pollingIntervalTime } from '../../core/constants/pollingInterval';


import { TelevisionDataItemComponent } from '../../components/television/television-data-item.component';
import { LaptopDataItemComponent } from '../../components/laptop/laptop-data-item.component';
import { VentanaDDDataItemComponent } from '../../components/ventanas-cocina/ventana-derecha/ventanaD-derecha/ventanaR-data-item.component';
import { VentanaIDDataItemComponent } from '../../components/ventanas-cocina/ventana-izquierda/ventanaL-derecha/ventanaR-data-item.component';
import { VentanaIIDataItemComponent } from '../../components/ventanas-cocina/ventana-izquierda/ventanaL-izquierda/ventanaL-data-item.component';
import { VentanaDIDataItemComponent } from '../../components/ventanas-cocina/ventana-derecha/ventanaD-izquierda/ventanaL-data-item.component';

@Component({
  selector: 'app-kitchens-page',
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
    DoorDataItemComponent,
    FanDataItemComponent,
    GasDataItemComponent,
    BuzzerDataItemComponent,
    ExLightDataItemComponent,
    InLightDataItemComponent,
    TelevisionDataItemComponent,
    LaptopDataItemComponent,
    VentanaDDDataItemComponent,
    VentanaIDDataItemComponent,
    VentanaIIDataItemComponent,
    VentanaDIDataItemComponent
  ],
  templateUrl: './kitchens-page.component.html',
  styleUrl: './kitchens-page.component.scss',
})
export class KitchensPageComponent implements OnInit {
  public sensorsData!: { _id: string; lastRecord: iSensorsData }[];
  public actuatorsData!: { _id: string; lastRecord: iActuatorsData }[];
  public kitchenName: string | null = '';

  public dhtData: iSensorsData | undefined = undefined;
  public ldrData: iSensorsData | null | undefined = undefined;
  public fanData: iActuatorsData | null| undefined = undefined;
  public doorData: iActuatorsData | null | undefined = undefined;
  public inLightData: iActuatorsData | null | undefined = undefined;
  public exLightData: iActuatorsData | null | undefined = undefined;
  public buzzerData: iActuatorsData | null | undefined = undefined;
  public gasData: iSensorsData | null | undefined = undefined;
  public windowDLeftData: iActuatorsData | null | undefined = undefined;
  public windowDRightData: iActuatorsData | null | undefined = undefined;
  public windowILeftData: iActuatorsData | null | undefined = undefined;
  public windowIRightData: iActuatorsData | null | undefined = undefined;

  constructor(
    private kitchensService: KitchensService,
    private route: ActivatedRoute,
    private loadingService: LoadingService
  ) {}

  private pollingInterval: any;


  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.kitchenName = params.get('location');

      this.getKitchenData(this.kitchenName!);
    });

    this.pollingInterval = setInterval(() => {
      this.getKitchenData(this.kitchenName!);
    }, pollingIntervalTime);
  }

  ngOnDestroy(): void {
    clearInterval(this.pollingInterval);
  }

  getKitchenData(location: string) {
    this.loadingService.showLoading();
    console.log(`Obteniendo datos en ${this.kitchenName}`)
    console.log(`Datos Obtenidos en ${this.kitchenName}`)
    
    this.kitchensService.getLastData(location).subscribe(
      (response: iLastApiResponse) => {
        console.log(response);
        this.actuatorsData = response.actuatorsData;
        this.sensorsData = response.sensorsData;
        
        if (this.actuatorsData && this.sensorsData) {
          this.dhtData = this.sensorsData.find(({ lastRecord }) =>
            lastRecord.name.toLowerCase().includes('temperatura')
          )?.lastRecord;

          console.log(this.dhtData);

          this.gasData = this.sensorsData.find(({ lastRecord }) =>
            lastRecord.name.toLowerCase().includes('gas')
          )?.lastRecord || null;

          console.log(this.gasData);

          this.ldrData = this.sensorsData.find(
            ({ lastRecord }) => lastRecord.name === 'Fotorresistencia'
          )?.lastRecord || null;

          console.log(this.ldrData);

          // Separar los datos de actuadores en variables individuales
          this.fanData = this.actuatorsData.find(
            ({ lastRecord }) => lastRecord.name === 'Ventilador'
          )?.lastRecord || null;

          console.log(this.fanData);

          this.doorData = this.actuatorsData.find(
            ({ lastRecord }) => lastRecord.name === 'Puerta'
          )?.lastRecord || null;

          console.log(this.doorData);



          this.windowDLeftData = this.actuatorsData.find(
            ({ lastRecord }) => lastRecord.name === 'Ventana_Izquierda_D'
          )?.lastRecord || null;

          console.log (this.windowDLeftData);

          this.windowDRightData = this.actuatorsData.find(
            ({ lastRecord }) => lastRecord.name === 'Ventana_Derecha_D'
          )?.lastRecord || null;

          console.log (this.windowDRightData);



          this.windowILeftData = this.actuatorsData.find(
            ({ lastRecord }) => lastRecord.name === 'Ventana_Izquierda_I'
          )?.lastRecord || null;

          console.log (this.windowILeftData);

          this.windowIRightData = this.actuatorsData.find(
            ({ lastRecord }) => lastRecord.name === 'Ventana_Derecha_I'
          )?.lastRecord || null;

          console.log (this.windowIRightData);



          this.inLightData = this.actuatorsData.find(
            ({ lastRecord }) => lastRecord.name === 'Releay'
          )?.lastRecord || null;

          console.log(this.inLightData);

          this.exLightData = this.actuatorsData.find(
            ({ lastRecord }) => lastRecord.name === 'Led Exterior'
          )?.lastRecord || null;

          console.log(this.exLightData);
        }
        console.log(`Datos Obtenidos en ${this.kitchenName}`)
        this.loadingService.hideLoading();
      },
      (error) => {
        console.log(`Datos No Obtenidos en ${this.kitchenName}`)
        this.loadingService.hideLoading();
        console.error(error);
      }
      );
  }

  onActuatorUpdate() {
    this.getKitchenData(this.kitchenName!);
  }
}
