import { Send, CreditCard, Receipt, Phone, Zap, Wifi } from 'lucide-react';

export const userAccount = {
  name: "Dinithi R.",
  accountNumber: "8840 2311 0094 5440",
  balance: 14250.75,
  availableCredit: 5000.00
};

export const quickActions = [
  { id: 'transfer', title: 'Transfer', icon: Send, path: '/transfer' },
  { id: 'pay', title: 'Pay Bills', icon: Receipt, path: '/bills' },
  { id: 'cards', title: 'My Cards', icon: CreditCard, path: '/dashboard' },
  { id: 'topup', title: 'Mobile Top-up', icon: Phone, path: '/dashboard' }
];

export const recentTransactions = [
  { id: 'TXN-901', date: 'Mar 10, 2026', description: 'Keells Supermarket', category: 'Groceries', amount: -4500.00, status: 'Completed' },
  { id: 'TXN-902', date: 'Mar 09, 2026', description: 'Salary Deposit (Tech Corp)', category: 'Income', amount: 125000.00, status: 'Completed' },
  { id: 'TXN-903', date: 'Mar 08, 2026', description: 'Uber Rides', category: 'Transport', amount: -850.50, status: 'Completed' },
  { id: 'TXN-904', date: 'Mar 05, 2026', description: 'Dialog Broadband', category: 'Utilities', amount: -3500.00, status: 'Completed' },
  { id: 'TXN-905', date: 'Mar 01, 2026', description: 'Gym Membership', category: 'Health', amount: -6000.00, status: 'Completed' },
  { id: 'TXN-906', date: 'Feb 28, 2026', description: 'Coffee Shop', category: 'Dining', amount: -1200.00, status: 'Completed' },
  { id: 'TXN-907', date: 'Feb 25, 2026', description: 'Amazon Web Services', category: 'Software', amount: -420.00, status: 'Completed' },
];

export const savedPayees = [
  { id: 'payee-1', name: 'John Doe', account: '1102 3344 5566' },
  { id: 'payee-2', name: 'Jane Smith', account: '9988 7766 5544' },
  { id: 'payee-3', name: 'Tech Solutions Ltd', account: '5544 3322 1100' }
];

export const activeBills = [
  { id: 'bill-1', provider: 'Ceylon Electricity Board', type: 'Electricity', amount: 4500.25, dueDate: 'Mar 15, 2026', icon: Zap },
  { id: 'bill-2', provider: 'SLT Mobitel', type: 'Internet', amount: 3500.00, dueDate: 'Mar 18, 2026', icon: Wifi },
  { id: 'bill-3', provider: 'Dialog Axiata', type: 'Mobile', amount: 1200.00, dueDate: 'Mar 20, 2026', icon: Phone },
];
