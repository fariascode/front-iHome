import * as Highcharts from 'highcharts';

import { CommonModule, Location } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

import { ActivatedRoute } from '@angular/router';
import { HighchartsChartModule } from 'highcharts-angular';
import { LoadingService } from '../../core/services/Loading/loading.service';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RoomsService } from '../../core/services/Rooms/rooms.service';
import { SensorChartComponent } from '../../components/sensor-chart/sensor-chart.component';
import { iActuatorsData } from '../../core/interfaces/i-ActuatorsData.interface';
import { iSensorsData } from '../../core/interfaces/iSensorsData.interface';
import { pollingIntervalTime } from '../../core/constants/pollingInterval';

@Component({
  standalone: true,
  selector: 'app-sensor-information-page',
  imports: [
    MatTableModule,
    HighchartsChartModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    CommonModule,
    MatExpansionModule,
    SensorChartComponent,
  ],
  templateUrl: './sensor-information-page.component.html',
  styleUrls: ['./sensor-information-page.component.scss'],
})
export class SensorInformationPageComponent implements OnInit {
  Highcharts: typeof Highcharts = Highcharts;

  displayedColumns: string[] = [
    'registro',
    'ubicacion',
    'estatus',
    'lecturas',
    'fecha',
  ]; // Definir las columnas a mostrar

  dataSource = new MatTableDataSource<iSensorsData | iActuatorsData>(); // DataSource para la tabla
  sensorName: string = '';
  roomName: string = '';
  specifications: any[] = [];
  records: iSensorsData[] = [];
  chartOptions!: Highcharts.Options;

  private roomsService = inject(RoomsService);
  private route = inject(ActivatedRoute);
  private loadingService = inject(LoadingService);
  private location = inject(Location);

  private pollingInterval: any;

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.sensorName = params.get('sensorName') || '';
      this.roomName = params.get('location') || '';
      this.getSensorRecords(
        params.get('location') || '',
        params.get('room') || '',
        params.get('sensorName') || ''
      );
    });

    this.pollingInterval = setInterval(() => {
      this.getSensorRecords(
        this.route.snapshot.params['location'],
        this.route.snapshot.params['room'],
        this.route.snapshot.params['sensorName']
      );
    }, pollingIntervalTime);
  }

  ngOnDestroy(): void {
    clearInterval(this.pollingInterval);
  }
  getSensorRecords(location: string, room: string, sensorName: string) {
    this.loadingService.showLoading();
    this.roomsService.getSensorRecords(location, room, sensorName).subscribe(
      (res) => {
        console.log(res);
        this.dataSource.data = res.records; // Asignar los datos al dataSource
        this.specifications = res.records[0].specifications;
        this.records = res.records;

        this.getCharts();
        console.log('Current date', new Date(this.records[0].registeredDate));
        this.loadingService.hideLoading();
      },
      (error) => {
        console.error(error);
        this.loadingService.hideLoading();
      }
    );
  }
  getReadings(record: iSensorsData): any {
    let readings: string = '';
    if (record.readings.length > 1) {
      return record.readings
        .map((read) => `${read.value} ${read.measurementUnit}`)
        .join(', ');
    }
    return record.readings.map((read) => {
      if (read.measurementUnit) {
        return `${read.value} ${read.measurementUnit}.`;
      }
      return `${read.value}`;
    });
  }

  getCharts() {
    const formattedRecords = this.records.map((record) => ({
      ...record,
      formattedDate: Highcharts.dateFormat(
        '%d/%m %H:%m',
        Date.parse(record.registeredDate)
      ),
    }));
    if (this.sensorName.toLocaleLowerCase().includes('temperatura')) {
      return (this.chartOptions = {
        chart: {
          scrollablePlotArea: {
            minWidth: 700,
            scrollPositionX: 1,
          },
        },
        scrollbar: {
          enabled: true,
        },
        time: {
          timezone: 'America/Mexico_City',
        },
        title: {
          text: 'Temperatura y Humedad',
        },
        xAxis: {
          type: 'datetime',
          margin: 2,
          title: {
            text: 'Fecha y Hora',
          },
          tickWidth: 1,
          lineWidth: 1,
          categories: formattedRecords.map((record) => record.formattedDate), // Usar las fechas formateadas
        },
        yAxis: {
          title: {
            text: 'Temperatura y Humedad',
          },
          lineWidth: 1,
          tickWidth: 1,
          tickInterval: 10,
        },
        plotOptions: {
          spline: {
            lineWidth: 2,
            states: {
              hover: {
                lineWidth: 3,
              },
            },
            // pointInterval: 1
          },
          series: {
            turboThreshold: 600
          }
        },
        series: [
          {
            type: 'spline',
            name: 'Temperatura',
            color: '#10b981',
            tooltip: {
              valueSuffix: ' °C',
            },
            data: this.records.map((record, index) => {
              return {
                y: record.readings[0].value,
                name: 'Detección de Temperatura',
                color: '#059669',
              };
            }),
          },
          {
            type: 'spline',
            name: 'Humedad',
            color: '#475569',
            tooltip: {
              valueSuffix: ' %',
            },
            data: this.records.map((record, index) => {
              return {
                y: record.readings[1].value,
                color: '#0f172a',
                name: 'Detección de Humedad',
              };
            }),
          },
        ],
      });
    } else {
      let chartTitle: string = '';
      let chartName: string = '';
      let chartSuffix: string = '';

      if (this.records[0].name.toLocaleLowerCase().includes('presencia')) {
        chartTitle = 'Presencia';
        chartName = 'Detección de Presencia';
        return (this.chartOptions = {
          chart: {
            scrollablePlotArea: {
              minWidth: 700,
              scrollPositionX: 1,
            },
          },
          time: {
            timezone: 'America/Mexico_City',
          },
          title: {
            text: chartTitle,
          },
          xAxis: {
            type: 'datetime',
            categories: formattedRecords.map((record) => record.formattedDate), // Usar las fechas formateadas
          },
          yAxis: {
            title: {
              text: 'Presencia',
            },
            lineWidth: 1,
            tickWidth: 1,
          },
          plotOptions: {
            spline: {
              lineWidth: 2,
              states: {
                hover: {
                  lineWidth: 3,
                },
              },
              // pointInterval: 1
            },
            series: {
              turboThreshold: 600
            }
          },
          series: [
            {
              type: 'column',
              color: '#10b981',
              name: chartName,
              data: this.records.map((record, index) => {
                return {
                  x: index,
                  color: '#059669',
                  y: record.readings[0].value,
                  name: chartName,
                };
              }),
            },
          ],
        });
      }
      if (this.records[0].name.toLocaleLowerCase().includes('proximidad')) {
        (chartTitle = 'Registros de Proximidad'),
          (chartName = 'Detección de Proximidad');
        chartSuffix = ' cm';
      } else if (
        this.records[0].name.toLocaleLowerCase().includes('fotorresistencia')
      ) {
        (chartTitle = 'Registros de Iluminación'),
          (chartName = 'Detección de Iluminación');
      } else if (this.records[0].name.toLocaleLowerCase().includes('gas')) {
        (chartTitle = 'Lecturas de Presencia de Gas'),
          (chartName = 'Detección de Gas'),
          (chartSuffix = ' ppm');
      }

      return (this.chartOptions = {
        chart:{
          scrollablePlotArea: {
            minWidth: 700,
            scrollPositionX: 1
          }
        },
        time: {
          timezone: 'America/Mexico_City',
        },
        title: {
          text: chartTitle,
        },
        xAxis: {
          type: 'datetime',
          categories: formattedRecords.map((record) => record.formattedDate), // Usar las fechas formateadas
        },
        plotOptions: {
          spline: {
            lineWidth: 2,
            states: {
              hover: {
                lineWidth: 3,
              },
            },
            // pointInterval: 1
          },
          series: {
            turboThreshold: 600
          }
        },
        series: [
          {
            type: 'area',
            color: '#10b981',
            name: chartName,
            tooltip: {
              valueSuffix: chartSuffix,
            },
            data: this.records.map((record, index) => {
              return {
                x: index,
                color: '#059669',
                y: record.readings[0].value,
                name: chartName,
              };
            }),
          },
        ],
      });
    }
  }

  goBack() {
    this.location.back();
  }
}
