import DebitCard from './card.model';
import Payment from './payment.model';

export default interface User {
  id?: string | number;
  email: string;
  name: string;
  address?: string;
  accountNumber?: string;
  mobileNumber: string;
  password: string;
  debitCards?: DebitCard[];
  payments?: Payment[];
}
