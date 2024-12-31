import { AfterViewInit, Component, OnInit, ViewChild, inject } from '@angular/core';
import { Material_Imports } from '../../../Imports/material-imports';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { OrderService } from '../../Services/order/order.service';
import { MatDialog } from '@angular/material/dialog';
import { OrderCreateDialogComponent } from '../../dialog/order-create-dialog/order-create-dialog.component';
import { Router } from '@angular/router';
import { OrderDetailsDialogComponent } from '../../dialog/order-detail-dialog/order-details-dialog/order-details-dialog.component';

@Component({
  selector: 'app-order',
  imports: [Material_Imports],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css'
})
export class OrderComponent implements OnInit,AfterViewInit{
  displayedColumns: string[] = ['InvoiceNo', 'InvoiceTo', 'PhoneNo', 'Location', 'SubTotalCost', 'PaidAmount', 'Balance', 'PaymentStatus', 'Actions'];
    dataSource = new MatTableDataSource<any>()
    readonly dialog = inject(MatDialog);
  
    ngOnInit(): void {
      this.onFetchOrders();
    }
  
    constructor(private orderService : OrderService, private router: Router) {}
  
    @ViewChild(MatPaginator) paginator!: MatPaginator;
  
    ngAfterViewInit() {
      this.dataSource.paginator = this.paginator;
    }
  
    OpenAddNewProductDialog(){
      const dialogRef = this.dialog.open(OrderCreateDialogComponent);
      dialogRef.afterClosed().subscribe(result =>{
        console.log(`Dialog result: ${result}`);
      });
    }
  
    onFetchOrders(): void {
      this.orderService.FetchOrders().subscribe(
        (data) => {
          console.log('Fetch all orders:', data);
          this.dataSource.data = data;
        },
        (error) => {
          console.error('Error fetching orders:', error);
        }
      )
    }
  
    onEditProduct(product : any): void{
      console.log('Edit Customer:', product);
    const dialogRef = this.dialog.open(OrderCreateDialogComponent, {
      data: product,
    });
  
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.onFetchOrders(); 
      }
    });
    }
  
    onDelete(productId : number) : void{
      
    }

    onView(order: any): void {
      // this.router.navigate(['/invoice', orderId]);

      //const selectedOrder = this.dataSource.data.find(order=>order.orderId == orderId);
      if(order){
        const dialogRef = this.dialog.open(OrderDetailsDialogComponent, {
          data : order,
          width : '500px'
        });

        dialogRef.afterClosed().subscribe(result =>{
          console.log('dialog closed');
        })
      }
      
    }
}
