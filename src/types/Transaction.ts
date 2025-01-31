export interface Transaction {
  type: 'income' | 'expense';
  amount: number;
  date: string; // Format: YYYY-MM-DD
  description: string;
}
