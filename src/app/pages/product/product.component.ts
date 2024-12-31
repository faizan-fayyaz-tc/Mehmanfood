import { AfterViewInit, Component, OnInit, ViewChild, inject } from '@angular/core';
import { Material_Imports } from '../../../Imports/material-imports';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ProductService } from '../../Services/product/product.service';
import { ProductCreateDialogComponent } from '../../dialog/product-create-dialog/product-create-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-product',
  imports: [Material_Imports],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit,AfterViewInit {

  displayedColumns: string[] = ['ProductName', 'SaleRate', 'BuyRate', 'Symbol', 'Quantity', 'ProductionDate', 'ExpiryDate', 'Actions'];
  dataSource = new MatTableDataSource<any>()
  readonly dialog = inject(MatDialog);

  ngOnInit(): void {
    this.onFetchProducts();
  }

  constructor(private service : ProductService) {}

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  OpenAddNewProductDialog(){
    const dialogRef = this.dialog.open(ProductCreateDialogComponent);
    dialogRef.afterClosed().subscribe(result =>{
      console.log(`Dialog result: ${result}`);
    });
  }

  onFetchProducts(): void {
    this.service.FetchProducts().subscribe(
      (data) => {
        console.log('Fetched Journals:', data);
        this.dataSource.data = data;
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    )
  }

  onEditProduct(product : any): void{
    console.log('Edit Product:', product);
  const dialogRef = this.dialog.open(ProductCreateDialogComponent, {
    data: product,
  });

  dialogRef.afterClosed().subscribe((result) => {
    if (result) {
      this.onFetchProducts(); 
    }
  });
  }

  onDelete(productId : number) : void{
    
  }
}
