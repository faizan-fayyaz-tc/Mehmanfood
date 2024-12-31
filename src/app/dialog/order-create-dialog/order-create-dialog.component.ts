import { Component, Inject } from '@angular/core';
import { Material_Imports } from '../../../Imports/material-imports';
import { FormControl, FormGroup } from '@angular/forms';
import { OrderService } from '../../Services/order/order.service';
import {provideNativeDateAdapter} from '@angular/material/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-order-create-dialog',
  providers: [provideNativeDateAdapter()],
  imports: [Material_Imports],
  templateUrl: './order-create-dialog.component.html',
  styleUrl: './order-create-dialog.component.css'
})
export class OrderCreateDialogComponent {
  orderForm : FormGroup;
  readonly expiryDate = new Date(2025, 0, 1);
  readonly productionDate = new Date(2024, 0, 1);
  
  constructor(private orderService : OrderService,  @Inject(MAT_DIALOG_DATA) public data: any){
    this.orderForm = new FormGroup({
      Customer : new FormControl(''),
      Location : new FormControl(''),
      PhoneNo : new FormControl(''),
      PaidAmount : new FormControl(''),
      PaymentStatus : new FormControl(''),
      CustomerId : new FormControl(''),

      customerNotes : new FormControl(''),
      customerLastOrderDate : new FormControl('')
    });

    if(data){
      this.orderForm.patchValue(data);
      this.onEditProduct()
    }
  }

  customers = [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Smith' },
    { id: 3, name: 'Michael Johnson' }
  ];
  


  OnSave(){
    if(this.orderForm.valid){
      const customerData = this.orderForm.value;
      console.log('Saving Product:', this.orderForm);

      this.orderService.CreateOrders(customerData).subscribe({
        next: (response) =>{
          console.log('order saved successfully', response);
          alert('order saved successfully!');
        },
        error: (error) => {
          console.error('Error saving order', error);
          alert('An error occurred while saving the order.');
        },
      });
    }else {
      alert('Please fill out all required fields correctly.');
    }
  }

  onEditProduct(){
    const orderData = this.orderForm.value;
    this.orderService.UpdateOrder(orderData).subscribe({
      next : (response)=>{
        console.log('order update successfully', response);
          alert('order update successfully!');
      },
      error : (error)=>{
        console.error('Error update order', error);
          alert('An error occurred while updating the order.');
      }
    })
  }
}
