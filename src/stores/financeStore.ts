import { defineStore } from 'pinia';
import { Transaction } from '@/types/Transaction';

export interface FinanceState {
  transactions: Transaction[];
}

export const useFinanceStore = defineStore('finance', {
  state: (): FinanceState => ({
    transactions: [],
  }),
  
  getters: {
    totalIncome: (state): number =>
      state.transactions
        .filter((t) => t.type === 'income')
        .reduce((sum, t) => sum + t.amount, 0),

    totalExpenses: (state): number =>
      state.transactions
        .filter((t) => t.type === 'expense')
        .reduce((sum, t) => sum + t.amount, 0),

    balance: (state): number =>
      state.transactions.reduce(
        (sum, t) => (t.type === 'income' ? sum + t.amount : sum - t.amount),
        0
      ),
  },

  actions: {
    addTransaction(transaction: Transaction): void {
      this.transactions.push(transaction);
      this.saveToLocalStorage();
    },

    deleteTransaction(index: number): void {
      if (index < 0 || index >= this.transactions.length) return;
      this.transactions.splice(index, 1);
      this.saveToLocalStorage();
    },

    loadFromLocalStorage(): void {
      const data = localStorage.getItem('transactions');
      if (data) {
        try {
          const parsedData: Transaction[] = JSON.parse(data);
          this.transactions = parsedData.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        } catch (error) {
          console.error('Error parsing transactions from localStorage', error);
          this.transactions = [];
        }
      }
    },

    saveToLocalStorage(): void {
      localStorage.setItem('transactions', JSON.stringify(this.transactions));
    },

    filterTransactionsByDate(startDate: string, endDate: string): Transaction[] {
      const start = new Date(startDate);
      start.setUTCHours(0, 0, 0, 0); // Set time to midnight UTC
      const end = new Date(endDate);
      end.setUTCHours(23, 59, 59, 999); // Set end time to last millisecond of the day UTC
    
      return this.transactions.filter(({ date }) => {
        const transactionDate = new Date(date).getTime();
        return transactionDate >= start.getTime() && transactionDate <= end.getTime();
      });
    },
    
    calculateTotalsForPeriod(startDate: string, endDate: string): { totalIncome: number; totalExpenses: number; netSavings: number } {
      const filteredTransactions = this.filterTransactionsByDate(startDate, endDate);
      
      const totalIncome = filteredTransactions
        .filter((t) => t.type === 'income')
        .reduce((sum, t) => sum + Number(t.amount), 0);
      
      const totalExpenses = filteredTransactions
        .filter((t) => t.type === 'expense')
        .reduce((sum, t) => sum + Number(t.amount), 0);

      return { 
        totalIncome, 
        totalExpenses, 
        netSavings: totalIncome - totalExpenses 
      };
    }
  },
});
