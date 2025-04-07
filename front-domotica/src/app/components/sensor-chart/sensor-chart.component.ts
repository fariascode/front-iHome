import * as Highcharts from 'highcharts';

import { Component, Input } from '@angular/core';

import { HighchartsChartModule } from 'highcharts-angular';
import { iSensorsData } from '../../core/interfaces/iSensorsData.interface';

@Component({
  selector: 'app-sensor-chart',
  standalone: true,
  imports: [HighchartsChartModule],
  templateUrl: './sensor-chart.component.html',
  styleUrl: './sensor-chart.component.scss'
})
export class SensorChartComponent {
  @Input("dht-data") dhtData!: iSensorsData;
  @Input("ldr-data") ldrData!: iSensorsData;

  Highcharts: typeof Highcharts = Highcharts;
   
  chartOptions: Highcharts.Options = {
    series: [{
      data: [50, 40, 60, 45, 70, 42, 60],
      type: 'line'
    }]
  };
}
