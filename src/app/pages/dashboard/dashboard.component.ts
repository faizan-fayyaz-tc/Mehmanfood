import { Component } from '@angular/core';
import { Material_Imports } from '../../../Imports/material-imports';

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}

@Component({
  selector: 'app-dashboard',
  imports: [Material_Imports],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  
  

}
