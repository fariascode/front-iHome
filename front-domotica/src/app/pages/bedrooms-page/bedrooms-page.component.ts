import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import {
  iApiResponse,
  iLastApiResponse,
} from '../../core/interfaces/i-ApiResponse';

import { BedroomsService } from '../../core/services/Bedrooms/bedrooms.service';
import { DoorDataItemComponent } from '../../components/door-data-item/door-data-item.component';
import { ExLightDataItemComponent } from '../../components/ex-light-data-item/ex-light-data-item.component';
import { FanDataItemComponent } from '../../components/fan-data-item/fan-data-item.component';
import { InLightDataItemComponent } from '../../components/in-light-data-item/in-light-data-item.component';
import { LoadingService } from '../../core/services/Loading/loading.service';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { PhotoresistorDataItemComponent } from '../../components/photoresistor-data-item/photoresistor-data-item.component';
import { TemperatureDataItemComponent } from '../../components/temperature-data-item/temperature-data-item.component';
import { iActuatorsData } from '../../core/interfaces/i-ActuatorsData.interface';
import { iSensorsData } from '../../core/interfaces/iSensorsData.interface';
import { pollingIntervalTime } from '../../core/constants/pollingInterval';

import { TelevisionDataItemComponent } from '../../components/television/television-data-item.component';
import { LaptopDataItemComponent } from '../../components/laptop/laptop-data-item.component';
import { WindowDoubleDataItemComponent } from '../../components/window-double-data-item/window-double-data-item.component';
import { WindowLeftDataItemComponent } from '../../components/windowLeft-data-item/window-left-data-item.component';


@Component({
  selector: 'app-bedrooms-page',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    TemperatureDataItemComponent,
    PhotoresistorDataItemComponent,
    FanDataItemComponent,
    InLightDataItemComponent,
    DoorDataItemComponent,
    ExLightDataItemComponent,
    WindowDoubleDataItemComponent,
    TelevisionDataItemComponent,
    LaptopDataItemComponent,
    WindowLeftDataItemComponent,
    WindowDoubleDataItemComponent
  ],
  templateUrl: './bedrooms-page.component.html',
  styleUrl: './bedrooms-page.component.scss',
})
export class BedroomsPageComponent implements OnInit {
  public sensorsData!: { _id: string; lastRecord: iSensorsData }[];
  public actuatorsData!: { _id: string; lastRecord: iActuatorsData }[];
  public bedroomName: string | null = '';
  public room: string | null = '';

  public dhtData: iSensorsData | undefined = undefined;
  public ldrData: iSensorsData | null| undefined = undefined;
  public fanData: iActuatorsData |null| undefined = undefined;
  public doorData: iActuatorsData | null | undefined = undefined;
  public windowLeftData: iActuatorsData |null | undefined = undefined;
  public windowDoubleData: iActuatorsData |null | undefined = undefined;
  public inLightData: iActuatorsData |null | undefined = undefined;
  public exLightData: iActuatorsData |null | undefined = undefined;

  private pollingInterval: any;


  constructor(
    private bedroomsService: BedroomsService,
    private route: ActivatedRoute,
    private router: Router,
    private loadingService: LoadingService, // Inyecta el servicio
  ) {}

  public roomPath: string = '';

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.room = this.bedroomName = params.get('location');
      console.log(this.router.url);
      this.roomPath = this.router.url;
      this.getBedroomData(this.bedroomName!);
    });

    this.pollingInterval = setInterval(() => {
      this.getBedroomData(this.bedroomName!);
    }, pollingIntervalTime);
  }

  ngOnDestroy(): void {
    clearInterval(this.pollingInterval);
  }
  onActuatorUpdate() {
    console.log('Actuador actualizado');
    // Aquí puedes agregar más lógica según lo necesites
  }
  

  getBedroomData(location: string) {
    this.loadingService.showLoading();
    console.log(`Obteniendo Datos en ${this.bedroomName}`);
  
    this.bedroomsService.getLastData(location).subscribe(
      (response: iLastApiResponse) => {
        console.log(response);
        this.actuatorsData = response.actuatorsData || [];
        this.sensorsData = response.sensorsData || [];
  
        // Asegurar que haya datos antes de actualizar el servicio
        if (this.actuatorsData.length > 0) {
          this.bedroomsService.actualizarActuadores(this.actuatorsData);
        } else {
          console.warn("⚠ No se recibieron datos de actuadores.");
        }
  
        if (this.sensorsData.length > 0) {
          this.bedroomsService.actualizarSensores(this.sensorsData);
        } else {
          console.warn("⚠ No se recibieron datos de sensores.");
        }
  
        // Buscar datos específicos de sensores y actuadores
        this.dhtData = this.sensorsData.find(({ lastRecord }) =>
          lastRecord.name.toLowerCase().includes('temperatura')
        )?.lastRecord || undefined;
  
        this.ldrData = this.sensorsData.find(
          ({ lastRecord }) => lastRecord.name === 'Fotorresistencia'
        )?.lastRecord || null;
  
        this.fanData = this.actuatorsData.find(
          ({ lastRecord }) => lastRecord.name === 'Ventilador'
        )?.lastRecord || null;
  
        this.doorData = this.actuatorsData.find(
          ({ lastRecord }) => lastRecord.name === 'Puerta'
        )?.lastRecord || null;
  
        this.windowLeftData = this.actuatorsData.find(
          ({ lastRecord }) => lastRecord.name === 'Ventana_Izquierda'
        )?.lastRecord || null;
  
        this.windowDoubleData = this.actuatorsData.find(
          ({ lastRecord }) => lastRecord.name === 'Ventana_Derecha'
        )?.lastRecord || null;
  
        this.inLightData = this.actuatorsData.find(
          ({ lastRecord }) => lastRecord.name === 'Releay'
        )?.lastRecord || null;
  
        this.exLightData = this.actuatorsData.find(
          ({ lastRecord }) => lastRecord.name === 'Led Exterior'
        )?.lastRecord || null;
  
        console.log("Datos procesados correctamente en", this.bedroomName);
        this.loadingService.hideLoading();
      },
      (error) => {
        console.error(`❌ Error al obtener datos en ${this.bedroomName}`, error);
        this.loadingService.hideLoading();
      }
    );
  }
}  
