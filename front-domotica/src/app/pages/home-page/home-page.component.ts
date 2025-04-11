import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { LoadingService } from '../../core/services/Loading/loading.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { RoomsService } from '../../core/services/Rooms/rooms.service';
import { Router, RouterLink } from '@angular/router';
import { iApiResponse } from '../../core/interfaces/i-ApiResponse';
import { pollingIntervalTime } from '../../core/constants/pollingInterval';
import { MatMenuModule } from '@angular/material/menu';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { DataService } from '../../core/services/data.service';

import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

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
    CommonModule,
    FormsModule
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent implements OnInit, OnDestroy, AfterViewInit {

  temperaturaData: number | undefined;
  private subscription: Subscription = new Subscription();
  private pollingInterval: any;
  currentTime: string = '';
  public rooms: any = {};
  tablaData: { fecha: string, hora: string, temperatura: number, estado: string }[] = [];

  habitaciones: string[] = [];
  registrosTotales: any[] = [];
  registrosFiltrados: any[] = [];
  selectedRoom: string = '';

  constructor(
    private roomsService: RoomsService,
    private loadingService: LoadingService,
    public dataService: DataService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.updateTime();
    setInterval(() => this.updateTime(), 1000);

    this.getRoomsNames();
    this.pollingInterval = setInterval(() => this.getRoomsNames(), pollingIntervalTime);

    this.subscription.add(
      this.dataService.temperature$.subscribe(data => {
        this.temperaturaData = data;
      })
    );

    this.getTodosLosRegistros();
  }

  ngAfterViewInit(): void {
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

    this.getTemperaturasPorHabitacion().then(barChartData => {
      columnSeries.data.setAll(barChartData);
      categoryAxis.data.setAll(barChartData);
    });

    columnSeries.appear(1000);
    barChart.appear(1000, 100);

    ($('#tablaDatos') as any).DataTable({
      responsive: true,
      pageLength: 5,
      language: {
        url: "//cdn.datatables.net/plug-ins/1.13.4/i18n/es-ES.json"
      }
    });

    this.getDatosParaTabla();
  }

  getTemperaturasPorHabitacion(): Promise<{ room: string, value: number }[]> {
    const urls = [
      { name: 'Recámara 1', url: 'http://localhost:3000/api/v1/bedrooms/last?location=Recámara 1' },
      { name: 'Recámara 2', url: 'http://localhost:3000/api/v1/bedrooms/last?location=Recámara 2' },
      { name: 'Sala',       url: 'http://localhost:3000/api/v1/livingrooms/last?location=Sala' }
    ];

    const requests = urls.map(loc =>
      fetch(loc.url)
        .then(res => res.json())
        .then(data => {
          const sensor = data.sensorsData?.find((s: any) => s.lastRecord?.readings);
          const lectura = sensor?.lastRecord.readings.find((r: any) =>
            r.name.toLowerCase().includes('temperatura')
          );
          return {
            room: loc.name,
            value: lectura?.value ?? 0
          };
        })
        .catch(() => ({ room: loc.name, value: 0 }))
    );

    return Promise.all(requests);
  }

  getDatosParaTabla(): Promise<void> {
    const urls = [
      { name: 'Recámara 1', url: 'http://localhost:3000/api/v1/bedrooms/last?location=Recámara 1' },
      { name: 'Recámara 2', url: 'http://localhost:3000/api/v1/bedrooms/last?location=Recámara 2' },
      { name: 'Sala',       url: 'http://localhost:3000/api/v1/livingrooms/last?location=Sala' }
    ];

    const requests = urls.map(loc =>
      fetch(loc.url)
        .then(res => res.json())
        .then(data => {
          const sensor = data.sensorsData?.find((s: any) => s.lastRecord?.readings);
          const lectura = sensor?.lastRecord.readings.find((r: any) =>
            r.name.toLowerCase().includes('temperatura')
          );
          const fechaHora = new Date(sensor?.lastRecord?.registeredDate);
          return {
            fecha: fechaHora.toLocaleDateString(),
            hora: fechaHora.toLocaleTimeString(),
            temperatura: lectura?.value ?? 0,
            estado: loc.name
          };
        })
        .catch(() => ({
          fecha: '-', hora: '-', temperatura: 0, estado: loc.name
        }))
    );

    return Promise.all(requests).then(result => {
      this.tablaData = result;
      this.renderizarTabla();
    });
  }

  getTodosLosRegistros(): void {
    const urls = [
      { name: 'Recámara 1', url: 'http://localhost:3000/api/v1/bedrooms/last?location=Recámara 1' },
      { name: 'Recámara 2', url: 'http://localhost:3000/api/v1/bedrooms/last?location=Recámara 2' },
      { name: 'Sala',       url: 'http://localhost:3000/api/v1/livingrooms/last?location=Sala' },
      { name: 'Cocina',     url: 'http://localhost:3000/api/v1/kitchens/last?location=Cocina' },
      { name: 'Comedor',    url: 'http://localhost:3000/api/v1/diningrooms/last?location=Comedor' },
      { name: 'Baño',       url: 'http://localhost:3000/api/v1/bathrooms/last?location=Baño 1' },
      { name: 'Garage',     url: 'http://localhost:3000/api/v1/garages/last?location=Garaje' }

    ];

    const requests = urls.map(loc =>
      fetch(loc.url)
        .then(res => res.json())
        .then(data => {
          const sensores = data.sensorsData || [];
          const actuadores = data.actuatorsData || [];
          const registros = [...sensores, ...actuadores].map(item => {
            const r = item.lastRecord;
            return {
              fecha: new Date(r.registeredDate).toLocaleDateString(),
              hora: new Date(r.registeredDate).toLocaleTimeString(),
              tipo: r.type,
              ubicacion: r.location,
              nombre: r.name,
              lecturas: r.readings || []
            };
          });
          return registros;
        })
        .catch(() => [])
    );

    Promise.all(requests).then((result) => {
      this.registrosTotales = result.flat();
      this.habitaciones = [...new Set(this.registrosTotales.map(r => r.ubicacion))];
      this.selectedRoom = this.habitaciones[0];
      this.filtrarPorHabitacion();
    });
  }

  filtrarPorHabitacion(): void {
    this.registrosFiltrados = this.registrosTotales.filter(r => r.ubicacion === this.selectedRoom);

    const tablaExistente = ($('#tablaFiltrada') as any).DataTable?.();
    if (tablaExistente) {
      tablaExistente.destroy();
    }

    setTimeout(() => {
      ($('#tablaFiltrada') as any).DataTable({
        responsive: true,
        pageLength: 5,
        language: {
          url: "//cdn.datatables.net/plug-ins/1.13.4/i18n/es-ES.json"
        }
      });
    }, 200);
  }

  renderizarTabla() {
    const tabla = ($('#tablaDatos') as any).DataTable();
    tabla.clear();
    this.tablaData.forEach(row => {
      tabla.row.add([
        row.fecha,
        row.hora,
        `${row.temperatura} ºC`,
        row.estado
      ]);
    });
    tabla.draw();
  }

  updateTime() {
    const now = new Date();
    this.currentTime = now.toLocaleString();
  }

  getRoomsNames() {
    this.loadingService.showLoading();
    this.roomsService.getAllRooms().subscribe((res: iApiResponse) => {
      this.rooms = res.roomsNames;
      this.loadingService.hideLoading();
    });
  }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  ngOnDestroy(): void {
    clearInterval(this.pollingInterval);
    this.subscription.unsubscribe();
  }
}