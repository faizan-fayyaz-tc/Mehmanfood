import {IOrderDetail} from "./orderDetail"
import {ICustomer} from "./customer"

export interface IOrder {
    orderId: number;
    invoiceNo: string;
    invoiceTo: string;
    phoneNumber: string;
    location: string;
    createdAt: string; // ISO format date
    subTotalCost: number;
    paidAmount: number;
    balance: number;
    paymentStatus: string;
    customerId: number;
    customer: ICustomer;
    orderDetails: IOrderDetail[];
}