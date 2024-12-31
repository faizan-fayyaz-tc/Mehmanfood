import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { IProduct } from '../../model/product';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  product: any[] = [];
  private apiUrl = environment.apiBaseUrl;
  constructor(private http: HttpClient) { }

  FetchProducts(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(`${this.apiUrl}/fetch-product`);
  }

  CreateProduct(productData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/CreateProduct`, productData)
  }

  UpdateProduct(productData: any) : Observable<any>{
    return this.http.put(`${this.apiUrl}/update-product`, productData)
  }
}
