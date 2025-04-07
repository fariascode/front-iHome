import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { LoadingService } from '../../core/services/Loading/loading.service';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [MatProgressSpinnerModule, CommonModule],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.scss'
})
export class LoaderComponent {
  isLoading$ = this.loadingService.isLoading$;

  constructor(
    private loadingService: LoadingService
  ) {
    
  }
}
