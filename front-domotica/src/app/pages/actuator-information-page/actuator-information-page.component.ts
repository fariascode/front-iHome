import { CommonModule, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

import { ActivatedRoute } from '@angular/router';
import { HighchartsChartModule } from 'highcharts-angular';
import { LoadingService } from '../../core/services/Loading/loading.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RoomsService } from '../../core/services/Rooms/rooms.service';
import { iActuatorsData } from '../../core/interfaces/i-ActuatorsData.interface';
import { iSensorsData } from '../../core/interfaces/iSensorsData.interface';
import { pollingIntervalTime } from '../../core/constants/pollingInterval';

@Component({
  selector: 'app-actuator-information-page',
  standalone: true,
  imports: [
    HighchartsChartModule, 
    CommonModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatExpansionModule
  ],
  templateUrl: './actuator-information-page.component.html',
  styleUrl: './actuator-information-page.component.scss'
})
export class ActuatorInformationPageComponent implements OnInit {
  displayedColumns: string[] = [
    'registro',
    'ubicacion',
    'estatus',
    'lecturas',
    'fecha',
  ];

  dataSource = new MatTableDataSource<iSensorsData | iActuatorsData>(); // DataSource para la tabla
  actuatorName: string = '';
  roomName: string = '';
  specifications: any[] = [];

  private pollingInterval: any;


  constructor(
    private roomsService: RoomsService,
    private route: ActivatedRoute,
    private loadingService: LoadingService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.actuatorName = params.get('actuatorName') || '';
      this.roomName = params.get('location') || '';
      this.getActuatorRecords(
        params.get('location') || '',
        params.get('room') || '',
        params.get('actuatorName') || ''
      );
    });
    
    this.pollingInterval = setInterval(() => {
      this.getActuatorRecords(
        this.roomName,
        this.route.snapshot.params['room'],
        this.actuatorName
      );
    }, pollingIntervalTime);
  }

  ngOnDestroy(): void {
    clearInterval(this.pollingInterval);
  }

  getActuatorRecords(location: string, room: string, actuatorName: string) {
    this.loadingService.showLoading();
    this.roomsService.getActuatorRecords(location, room, actuatorName).subscribe(
      (res) => {
        console.log(res);
        this.dataSource.data = res.records; // Asignar los datos al dataSource
        this.specifications = res.records[0].specifications;
        this.loadingService.hideLoading();
      },
      (error) => {
        console.error(error);
        this.loadingService.hideLoading();
      }
    );
  }

  getActions(record: iActuatorsData): any {
    if (this.actuatorName.includes("Ventilador")) {
      return record.actions.map((action) => {
        if (action.value) {
          return "Encendido";
        } 
        return "Apagado";
      });
    }
    if (this.actuatorName.startsWith("Puerta") || this.actuatorName.startsWith("Ventana")) {
      return record.actions.map((action) => {
        if (action.value) {
          return "Abierta";
        } 
        return "Cerrada";
      });
    }
    if (this.actuatorName.startsWith("Luz") || this.actuatorName.includes("Led") || this.actuatorName.startsWith("Alarma")) {
      return record.actions.map((action) => {
        if (action.value) {
          return "Encendida";
        } 
        return "Apagada";
      });
    }
  }

  goBack() {
    this.location.back();
  }
}
