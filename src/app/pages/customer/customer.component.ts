import { AfterViewInit, Component, OnInit, ViewChild, inject } from '@angular/core';
import { Material_Imports } from '../../../Imports/material-imports';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CustomerCreateDialogComponent } from '../../dialog/customer-create-dialog/customer-create-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { CustomerService } from '../../Services/customer/customer.service';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-customer',
  imports: [Material_Imports],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.css'
})
export class CustomerComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['CustomerId', 'Name', 'PhoneNo', 'Email', 'Address', 'IsActive', 'PreferredContactNo', 'Notes', 'Actions'];
  dataSource = new MatTableDataSource<any>()
  readonly dialog = inject(MatDialog);

  ngOnInit(): void {
    this.onFetchCustomers();
  }

  constructor(private customerService: CustomerService) { }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  OpenAddNewCustomerDialog() {
    const dialogRef = this.dialog.open(CustomerCreateDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  onFetchCustomers(): void {
    this.customerService.GetCustomers().subscribe(
      (data) => {
        console.log('Fetched Customers:', data);
        this.dataSource.data = data;
      },
      (error) => {
        console.error('Error fetching customers:', error);
      }
    )
  }

  onEditCustomer(customer: any): void {
    console.log('Edit Customer:', customer);
    const dialogRef = this.dialog.open(CustomerCreateDialogComponent, {
      data: customer,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.onFetchCustomers();
      }
    });
  }

  onViewCustomer(customer: any) {

  }

  onDeleteCustomer(customerId: number): void {
    if (confirm('Are you sure you want to delete this customer?')) {
      this.customerService.DeleteCustomer(customerId).subscribe(
        (response) => {
          console.log(response.message);
          this.onFetchCustomers();
        },
        (error) => {
          console.error('Error deleting customer:', error);
        }
      );
    }
  }


}
