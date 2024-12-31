export interface ICustomer {
    customerId: number;
    fullName: string;
    phoneNumber: string;
    email: string;
    address: string;
    registeredAt: string; 
    isActive: boolean;
    preferredContactMethod: string;
    lastOrderDate: string | null; 
    notes: string;
  }
  