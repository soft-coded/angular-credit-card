export default interface Payment {
  creditCardNumber: string;
  email?: string;
  mobileNumber?: string;
  amount: string;
  paidUsingCardNumber: string;
  status?: 'completed' | 'pending' | 'failed';
}
