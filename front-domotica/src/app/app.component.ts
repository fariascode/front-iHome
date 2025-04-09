import { Component, ViewChild } from '@angular/core';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { LoaderComponent } from './components/loader/loader.component';
import { LoadingService } from './core/services/Loading/loading.service';
import { MatButtonModule } from '@angular/material/button';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { SidenavComponent } from './components/sidenav/sidenav.component';

import { NgChartsModule } from 'ng2-charts';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';

// Corregir la importación de DashboardComponent con la ruta correcta
import { DashboardComponent } from './pages/dashboard/dashboard.component'; 

// Asegúrate de usar la ruta correcta para WindowLeftDataItemComponent
import { WindowLeftDataItemComponent } from './components/windowLeft-data-item/window-left-data-item.component';
import { WindowDoubleDataItemComponent } from './components/window-double-data-item/window-double-data-item.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    MatSidenavModule,
    MatButtonModule,
    SidenavComponent,
    LoaderComponent,
    CommonModule,
    NgChartsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    DashboardComponent,  // Asegúrate de importar DashboardComponent aquí
    WindowLeftDataItemComponent,  // Importación de WindowLeftDataItemComponent
    WindowDoubleDataItemComponent,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  showLayout: boolean = true;
  @ViewChild(MatSidenav) sidenav!: MatSidenav;

  //constructor(private loadingService: LoadingService) {}
  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const currentRoute = event.urlAfterRedirects;
        this.showLayout = !(currentRoute.includes('/login') || currentRoute.includes('/register'));
      }
    });
  }


  toggleSidenav() {
    this.sidenav.toggle();
  }
}