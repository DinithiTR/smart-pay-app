import React, { useState } from 'react';
import { 
  AdaptiveText, 
  AdaptiveTable,
  AdaptiveInput,
  AdaptiveCard,
  useAdaptive
} from '@aura-adaptive/aura-ui-adaptor';
import { recentTransactions } from '../data/mockData';
import { Search } from 'lucide-react';

export default function TransactionHistory() {
  const { tokens } = useAdaptive();
  const { spacing, colors } = tokens;
  const [searchTerm, setSearchTerm] = useState('');

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-LK', { style: 'currency', currency: 'LKR' }).format(Math.abs(amount));
  };

  const filteredTransactions = recentTransactions.filter(txn => 
    txn.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    txn.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const tableHeaders = ['Date', 'Description', 'Category', 'Amount', 'Status'];

  const tableData = filteredTransactions.map(txn => {
    const isIncome = txn.amount > 0;
    return [
      txn.date,
      txn.description,
      txn.category,
      <AdaptiveText 
        variant="body" 
        weight="bold" 
        className="font-mono"
        style={{ color: isIncome ? '#166534' : colors.text }}
      >
        {isIncome ? '+' : '-'}{formatCurrency(txn.amount)}
      </AdaptiveText>,
      txn.status
    ];
  });

  return (
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: spacing.gapY * 3 }}>
      
      <div>
        <AdaptiveText variant="h2" weight="bold">Transaction History</AdaptiveText>
        <AdaptiveText variant="body" muted>View and search your recent account activity.</AdaptiveText>
      </div>

      <AdaptiveCard className="fintech-card" style={{ backgroundColor: colors.surface, border: `1px solid ${colors.border}` }}>
        <AdaptiveCard.Body style={{ display: 'flex', flexDirection: 'column', gap: spacing.gapY * 2 }}>
          
          <div style={{ maxWidth: 400 }}>
            <AdaptiveInput
              placeholder="Search by vendor or category..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              icon={<Search size={18} color={colors.text} style={{ opacity: 0.5 }} />}
            />
          </div>

          <div className="fintech-table" style={{ overflowX: 'auto' }}>
            <AdaptiveTable 
              headers={tableHeaders}
              data={tableData}
              variant="default"
            />
          </div>

          {filteredTransactions.length === 0 && (
            <div style={{ padding: spacing.gapY * 3, textAlign: 'center', opacity: 0.5 }}>
              <AdaptiveText variant="body">No transactions found for "{searchTerm}"</AdaptiveText>
            </div>
          )}

        </AdaptiveCard.Body>
      </AdaptiveCard>

    </div>
  );
}
