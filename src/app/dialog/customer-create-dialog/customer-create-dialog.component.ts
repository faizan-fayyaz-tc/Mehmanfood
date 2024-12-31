import { Component, Inject } from '@angular/core';
import { Material_Imports } from '../../../Imports/material-imports';
import { FormControl, FormGroup } from '@angular/forms';
import { CustomerService } from '../../Services/customer/customer.service';
import {provideNativeDateAdapter} from '@angular/material/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-customer-create-dialog',
  providers: [provideNativeDateAdapter()],
  imports: [Material_Imports],
  templateUrl: './customer-create-dialog.component.html',
  styleUrl: './customer-create-dialog.component.css'
})
export class CustomerCreateDialogComponent {
  customerForm : FormGroup;
  isEditMode: boolean;
  
  constructor(private customerService : CustomerService,  @Inject(MAT_DIALOG_DATA) public data: any){
    this.isEditMode = !!data;
    this.customerForm = new FormGroup({
      customerId : new FormControl(''),
      fullName : new FormControl(''),
      phoneNumber : new FormControl(''),
      email : new FormControl(''),
      address : new FormControl(''),
      isActive : new FormControl(true),
      preferredContactMethod : new FormControl(''),
      notes : new FormControl(''),
      //customerLastOrderDate : new FormControl(''),
      //customerRegisteredAtDate : new FormControl('')
    });

    if(this.isEditMode){
      this.customerForm.patchValue(data);
    }
  }

onSave(){
  if(this.customerForm.valid){
    const customerData = this.customerForm.value;

    if(this.isEditMode){
      this.onUpdateCustomer(customerData);
    }else{
      this.OnCreateCustomer(customerData)
    }
  }else{
    alert('Please fill out all required fields correctly.');
  }
}

  OnCreateCustomer(customerData: any){
      this.customerService.CreateCustomer(customerData).subscribe({
        next: (response) =>{
          console.log('Customer Saved Successfully', response);
          alert('Customer Saved Successfully!');
        },
        error: (error) => {
          console.error('Error Saving Customer', error);
          alert('An error occurred while saving the Customer.');
        },
      });
    }

  onUpdateCustomer(customerData : any){
    this.customerService.UpdateCustomer(customerData).subscribe({
      next : (response)=>{
        console.log('Customer Update Successfully', response);
          alert('Product update successfully!');
      },
      error : (error)=>{
        console.error('Customer Update Successfully', error);
          alert('An error occurred while updating the customer.');
      }
    })
  }
}
