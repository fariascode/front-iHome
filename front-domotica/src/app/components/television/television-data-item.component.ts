import { Component } from '@angular/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';

import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-television-data-item',
  standalone: true,
  imports: [
    MatCardModule,
    MatTooltipModule,
    MatButtonModule,
    MatIconModule,
    CommonModule,
    MatSlideToggleModule,
    FontAwesomeModule,
    MatSnackBarModule,
    FormsModule
  ],
  templateUrl: './television-data-item.component.html',
  styleUrl: './television-data-item.component.scss'
})
export class TelevisionDataItemComponent {   
  toggleState = false;

  onToggleChange(event: any) {
    this.toggleState = event.target.checked;
    console.log('Toggle state:', this.toggleState);
  }
}
