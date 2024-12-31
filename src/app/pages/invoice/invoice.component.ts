import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../../Services/order/order.service';

@Component({
  selector: 'app-invoice',
  imports: [],
  templateUrl: './invoice.component.html',
  styleUrl: './invoice.component.css'
})
export class InvoiceComponent implements OnInit {
  orderId: string | null = null;
  order: any;
  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService
  ) { }

  ngOnInit(): void {
    this.orderId = this.route.snapshot.paramMap.get('orderId');
    console.log('Order ID:', this.orderId);

    if (this.orderId) {
      this.fetchOrderDetailsById(this.orderId);
    }
  }

  fetchOrderDetailsById(orderId: string): void {
    this.orderService.FetchOrderById(orderId).subscribe({
      next: (data) => {
        this.order = data;
      },
      error: (error) => {
        console.error('Error fetching order details:', error);
      }
    });
  }
}
