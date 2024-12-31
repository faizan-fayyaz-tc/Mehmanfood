import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Material_Imports } from '../../../../Imports/material-imports';

@Component({
  selector: 'app-order-details-dialog',
  imports: [Material_Imports],
  templateUrl: './order-details-dialog.component.html',
  styleUrl: './order-details-dialog.component.css'
})
export class OrderDetailsDialogComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data : any){}

  
}
