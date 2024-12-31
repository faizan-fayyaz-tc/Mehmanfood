import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { IProduct } from '../../model/product';
import { Observable } from 'rxjs';
import { IOrder } from '../../model/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  product: any[] = [];
  private apiUrl = environment.orderApiBaseUrl;
  constructor(private http: HttpClient) { }

  FetchOrders(): Observable<IOrder[]> {
    return this.http.get<IOrder[]>(`${this.apiUrl}/Fetch-Orders`);
  }

  CreateOrders(productData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/CreateProduct`, productData)
  }

  UpdateOrder(productData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/update-product`, productData)
  }

  FetchOrderById(orderId: string): Observable<IOrder> {
    return this.http.get<IOrder>(`${this.apiUrl}/GetOrderById/${orderId}`);
  }
}
