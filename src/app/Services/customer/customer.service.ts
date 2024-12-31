import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICustomer } from '../../model/customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  product: any[] = [];
  private apiUrl = environment.customerApiBaseUrl;
  constructor(private http: HttpClient) { }

  GetCustomers(): Observable<ICustomer[]> {
    return this.http.get<ICustomer[]>(`${this.apiUrl}/GetAllCustomers`);
  }

  CreateCustomer(customerData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/CreateCustomer`, customerData)
  }

  UpdateCustomer(customerData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/UpdateCustomer`, customerData)
  }

  DeleteCustomer(customerId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/DeleteCustomer/${customerId}`);
  }

}
