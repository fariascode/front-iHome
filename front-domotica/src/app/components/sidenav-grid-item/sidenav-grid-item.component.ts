import { Component, Input } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-sidenav-grid-item',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './sidenav-grid-item.component.html',
  styleUrl: './sidenav-grid-item.component.scss'
})
export class SidenavGridItemComponent {
  @Input('title-room') titleRoom = "";

}
