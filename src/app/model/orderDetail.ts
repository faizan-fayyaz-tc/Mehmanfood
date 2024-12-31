import { IProduct } from "./product";

export interface IOrderDetail {
    orderDetailId: number;
    product: IProduct;
    quantity: number;
    price: number;
    totalPrice: number;
  }