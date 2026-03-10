import React, { useMemo, useState } from 'react';
import {
  AdaptiveText,
  AdaptiveTable,
  AdaptiveInput,
  AdaptiveCard,
  useAdaptive,
} from '@aura-adaptive/aura-ui-adaptor';
import { recentTransactions } from '../data/mockData';
import { Search } from 'lucide-react';

export default function TransactionHistory() {
  const { tokens } = useAdaptive();
  const { spacing, colors } = tokens;
  const [searchTerm, setSearchTerm] = useState('');

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-LK', {
      style: 'currency',
      currency: 'LKR',
    }).format(Math.abs(amount));
  };

  const filteredTransactions = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();

    if (!q) return recentTransactions;

    return recentTransactions.filter((txn) => {
      return (
        txn.description.toLowerCase().includes(q) ||
        txn.category.toLowerCase().includes(q) ||
        txn.status.toLowerCase().includes(q) ||
        txn.date.toLowerCase().includes(q)
      );
    });
  }, [searchTerm]);

  const columns = useMemo(() => {
    return [
      {
        id: 'date',
        header: 'Date',
        accessor: 'date',
        sortable: true,
        align: 'left',
      },
      {
        id: 'description',
        header: 'Description',
        accessor: 'description',
        sortable: true,
        align: 'left',
      },
      {
        id: 'category',
        header: 'Category',
        accessor: 'category',
        sortable: true,
        align: 'left',
      },
      {
        id: 'amount',
        header: 'Amount',
        accessor: 'amount',
        sortable: true,
        align: 'right',
        cell: (row) => {
          const isIncome = row.amount > 0;

          return (
            <AdaptiveText
              variant="body"
              weight="bold"
              className="font-mono"
              style={{ color: isIncome ? '#166534' : colors.text }}
            >
              {isIncome ? '+' : '-'}
              {formatCurrency(row.amount)}
            </AdaptiveText>
          );
        },
      },
      {
        id: 'status',
        header: 'Status',
        accessor: 'status',
        sortable: true,
        align: 'center',
      },
    ];
  }, [colors.text]);

  return (
    <div
      className="fade-in"
      style={{
        display: 'flex',
        flexDirection: 'column',
        rowGap: spacing.gapY * 3,
        minWidth: 0,
      }}
    >
      <div style={{ minWidth: 0 }}>
        <AdaptiveText variant="h2" weight="bold">
          Transaction History
        </AdaptiveText>
        <AdaptiveText variant="body" muted>
          View and search your recent account activity.
        </AdaptiveText>
      </div>

      <AdaptiveCard
        className="fintech-card"
        style={{
          backgroundColor: colors.surface,
          border: `1px solid ${colors.border}`,
          minWidth: 0,
        }}
      >
        <AdaptiveCard.Body
          style={{
            display: 'flex',
            flexDirection: 'column',
            rowGap: spacing.gapY * 2,
            minWidth: 0,
          }}
        >
          <div style={{ width: 'min(100%, 420px)', minWidth: 0 }}>
            <AdaptiveInput
              placeholder="Search by vendor, category, status, or date..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              icon={<Search size={18} color={colors.text} style={{ opacity: 0.5 }} />}
            />
          </div>

          <div className="fintech-table" style={{ overflowX: 'auto', width: '100%', minWidth: 0 }}>
            <AdaptiveTable
              variant="sortablePaginated"
              columns={columns}
              data={filteredTransactions}
              rowKey="id"
              pageSize={6}
              initialSortColumnId="date"
              initialSortDirection="desc"
              caption="Recent transactions"
              ariaLabel="Recent transactions table"
              emptyMessage={searchTerm ? `No transactions found for "${searchTerm}"` : 'No transactions available.'}
            />
          </div>
        </AdaptiveCard.Body>
      </AdaptiveCard>
    </div>
  );
}
