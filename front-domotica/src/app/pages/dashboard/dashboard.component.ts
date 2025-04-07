import { Chart, registerables } from 'chart.js';
import { SensorService } from '../../services/sensor.service';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { NgChartsModule } from 'ng2-charts';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { BedroomsService } from '../../core/services/Bedrooms/bedrooms.service';



@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    NgChartsModule,
    MatPaginatorModule,
    MatSortModule,
    
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewInit {
  public sensorsData: any[] = [];
  public actuatorsData: any[] = [];
  public sensores: any[] = [];
  public actuadores: any[] = [];

   // Definir las columnas que se mostrarán en la tabla
   displayedColumns: string[] = ['id', 'nombre','tipo', 'valor', 'fecha']; 

  constructor(
    private sensorService: SensorService,
    private bedroomsService: BedroomsService // Se corrige la inyección del servicio
  ) {}

  ngOnInit(): void {
    // Suscribirse a los datos de sensores y actuadores del servicio
    // this.bedroomsService.sensorsData$.subscribe((data) => {
    //   this.sensorsData = data;
    // });

    // this.bedroomsService.actuatorsData$.subscribe((data) => {
    //   this.actuatorsData = data;
    // });

    this.bedroomsService.actualizarActuadores(this.actuatorsData);
    this.bedroomsService.actualizarSensores(this.sensorsData);

    // Cargar datos de sensores y actuadores
    this.cargarDatos();
  }

  ngAfterViewInit(): void {
    // Esperamos a que el DOM esté listo antes de actualizar la gráfica
    setTimeout(() => {
      this.actualizarGrafica();
    }, 500);
  }

  cargarDatos() {
    this.sensorService.getSensores().subscribe((data) => {
      if (data && data.length > 0) {
        this.sensores = data;
        this.actualizarGrafica();
        console.log('Sensores:', this.sensores);
      } else {
        console.warn('No hay datos de sensores disponibles.');
      }
    });
  
    this.sensorService.getActuadores().subscribe((data) => {
      if (data && data.length > 0) {
        this.actuadores = data;
        console.log('Actuadores:', this.actuadores);
      } else {
        console.warn('No hay datos de actuadores disponibles.');
      }
    });
  }
  

  actualizarGrafica() {
    if (!this.sensores || this.sensores.length === 0) {
      console.warn('No hay datos de sensores para graficar.');
      return;
    }
  
    const ctx = document.getElementById('sensorChart') as HTMLCanvasElement;
    if (!ctx) {
      console.error('No se encontró el elemento del gráfico.');
      return;
    }
  
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: this.sensores.map((s) => s.fecha),
        datasets: [
          {
            label: 'Valores de Sensores',
            data: this.sensores.map((s) => s.valor),
            borderColor: 'blue',
            fill: false,
          },
        ],
      },
    });
  }
}  