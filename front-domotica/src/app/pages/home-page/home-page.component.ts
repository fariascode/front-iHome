import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';

import { LoadingService } from '../../core/services/Loading/loading.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { RoomsService } from '../../core/services/Rooms/rooms.service';
import { RouterLink } from '@angular/router';
import { iApiResponse } from '../../core/interfaces/i-ApiResponse';
import { pollingIntervalTime } from '../../core/constants/pollingInterval';
import { MatMenuModule } from '@angular/material/menu';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { DataService } from '../../core/services/data.service';

// AMCharts
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

// jQuery + DataTables
import $ from 'jquery';
import 'datatables.net';

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
export class HomePageComponent implements OnInit, OnDestroy, AfterViewInit {

  temperaturaData: number | undefined;
  private subscription: Subscription = new Subscription();
  private pollingInterval: any;
  private chartRoot!: am5.Root;
  currentTime: string = '';
  public rooms: any = {};

  constructor(
    private roomsService: RoomsService,
    private loadingService: LoadingService,
    public dataService: DataService
  ) {}

  ngOnInit(): void {
    this.updateTime();
    setInterval(() => this.updateTime(), 1000);

    this.getRoomsNames();
    this.pollingInterval = setInterval(() => this.getRoomsNames(), pollingIntervalTime);

    this.subscription.add(
      this.dataService.temperature$.subscribe(data => {
        console.log('TEMPERATURA RECIBIDA:', data);
        this.temperaturaData = data;
      })
    );
  }

  ngAfterViewInit(): void {
    // === Gráfica de línea: Temperatura Histórica ===
    this.chartRoot = am5.Root.new("amchart-container");
    this.chartRoot.setThemes([am5themes_Animated.new(this.chartRoot)]);

    const chart = this.chartRoot.container.children.push(
      am5xy.XYChart.new(this.chartRoot, {
        panX: true,
        panY: true,
        wheelX: "panX",
        wheelY: "zoomX",
        layout: this.chartRoot.verticalLayout
      })
    );

    const xAxis = chart.xAxes.push(
      am5xy.DateAxis.new(this.chartRoot, {
        baseInterval: { timeUnit: "day", count: 1 },
        renderer: am5xy.AxisRendererX.new(this.chartRoot, {})
      })
    );

    const yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(this.chartRoot, {
        renderer: am5xy.AxisRendererY.new(this.chartRoot, {})
      })
    );

    const series = chart.series.push(
      am5xy.LineSeries.new(this.chartRoot, {
        name: "Temperatura",
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "value",
        valueXField: "date",
        tooltip: am5.Tooltip.new(this.chartRoot, {
          labelText: "{valueY} ºC"
        })
      })
    );

    series.data.setAll([
      { date: new Date(2025, 3, 6).getTime(), value: 22 },
      { date: new Date(2025, 3, 7).getTime(), value: 24 },
      { date: new Date(2025, 3, 8).getTime(), value: 26 },
      { date: new Date(2025, 3, 9).getTime(), value: 25 },
      { date: new Date(2025, 3, 10).getTime(), value: 23 }
    ]);

    series.appear(1000);
    chart.appear(1000, 100);

    // === NUEVA: Gráfica de Barras ===
    const barChartRoot = am5.Root.new("bar-chart-container");
    barChartRoot.setThemes([am5themes_Animated.new(barChartRoot)]);

    const barChart = barChartRoot.container.children.push(
      am5xy.XYChart.new(barChartRoot, {
        layout: barChartRoot.verticalLayout
      })
    );

    const categoryAxis = barChart.xAxes.push(
      am5xy.CategoryAxis.new(barChartRoot, {
        categoryField: "room",
        renderer: am5xy.AxisRendererX.new(barChartRoot, {
          minGridDistance: 30
        })
      })
    );

    const valueAxis = barChart.yAxes.push(
      am5xy.ValueAxis.new(barChartRoot, {
        renderer: am5xy.AxisRendererY.new(barChartRoot, {})
      })
    );

    const columnSeries = barChart.series.push(
      am5xy.ColumnSeries.new(barChartRoot, {
        name: "Temperatura",
        xAxis: categoryAxis,
        yAxis: valueAxis,
        valueYField: "value",
        categoryXField: "room",
        tooltip: am5.Tooltip.new(barChartRoot, {
          labelText: "{categoryX}: {valueY} ºC"
        })
      })
    );

    const barChartData = [
      { room: "Recámara 1", value: 24.5 },
      { room: "Recámara 2", value: 22.8 },
      { room: "Recámara 3", value: 25.1 }
    ];

    columnSeries.data.setAll(barChartData);
    categoryAxis.data.setAll(barChartData);

    columnSeries.appear(1000);
    barChart.appear(1000, 100);

    // === Inicializar DataTable ===
    ($('#tablaDatos') as any).DataTable({
      responsive: true,
      pageLength: 5,
      language: {
        url: "//cdn.datatables.net/plug-ins/1.13.4/i18n/es-ES.json"
      }
    });
  }

  updateTime() {
    const now = new Date();
    this.currentTime = now.toLocaleString();
  }

  getRoomsNames() {
    this.loadingService.showLoading();
    this.roomsService.getAllRooms().subscribe((res: iApiResponse) => {
      console.log(res);
      this.rooms = res.roomsNames;
      this.loadingService.hideLoading();
    });
  }

  ngOnDestroy(): void {
    clearInterval(this.pollingInterval);
    this.subscription.unsubscribe();
    if (this.chartRoot) {
      this.chartRoot.dispose();
    }
  }
}