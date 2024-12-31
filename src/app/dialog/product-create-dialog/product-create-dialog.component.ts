import { Component, Inject } from '@angular/core';
import { Material_Imports } from '../../../Imports/material-imports';
import { FormControl, FormGroup } from '@angular/forms';
import { ProductService } from '../../Services/product/product.service';
import {provideNativeDateAdapter} from '@angular/material/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-product-create-dialog',
  providers: [provideNativeDateAdapter()],
  imports: [Material_Imports],
  templateUrl: './product-create-dialog.component.html',
  styleUrl: './product-create-dialog.component.css'
})
export class ProductCreateDialogComponent {

  productForm: FormGroup; 
  readonly expiryDate = new Date(2025, 0, 1);
  readonly productionDate = new Date(2024, 0, 1);

  constructor(private productService : ProductService, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.productForm = new FormGroup({
      productName: new FormControl(''),
      unit: new FormControl(''),
      productPrice: new FormControl(''),
      buyRate: new FormControl(''),
      productionDate: new FormControl(''),
      expiryDate: new FormControl(''),
      symbol: new FormControl(''),
      description: new FormControl(''),
      openingStockRate: new FormControl(''),
      minimumStock: new FormControl(''),
    });

    if(data){
      this.productForm.patchValue(data);
      this.onEditProduct()
    }
  }


  OnSave(){
    if(this.productForm.valid){
      const productData = this.productForm.value;
      console.log('Saving Product:', productData);

      this.productService.CreateProduct(productData).subscribe({
        next: (response) =>{
          console.log('Product saved successfully', response);
          alert('Product saved successfully!');
        },
        error: (error) => {
          console.error('Error saving product', error);
          alert('An error occurred while saving the product.');
        },
      });
    }else {
      alert('Please fill out all required fields correctly.');
    }
  }

  onEditProduct(){
    const productData = this.productForm.value;
    this.productService.UpdateProduct(productData).subscribe({
      next : (response)=>{
        console.log('Product update successfully', response);
          alert('Product update successfully!');
      },
      error : (error)=>{
        console.error('Error update product', error);
          alert('An error occurred while updating the product.');
      }
    })
  }
}
