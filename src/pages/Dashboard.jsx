import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  AdaptiveText, 
  AdaptiveGrid, 
  AdaptiveCard, 
  AdaptiveButton,
  useAdaptive 
} from '@aura-adaptive/aura-ui-adaptor';
import { userAccount, quickActions, recentTransactions } from '../data/mockData';
import { ArrowUpRight, ArrowDownRight, ArrowRight } from 'lucide-react';

export default function Dashboard() {
  const { tokens } = useAdaptive();
  const { spacing, colors } = tokens;
  const navigate = useNavigate();

  // Helper to format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-LK', { 
      style: 'currency', 
      currency: 'LKR' 
    }).format(Math.abs(amount));
  };

  return (
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', rowGap: spacing.gapY * 3 }}>
      
      {/* Header Profile Section */}
      <div>
        <AdaptiveText variant="h2" weight="bold">Hello, {userAccount.name}</AdaptiveText>
        <AdaptiveText variant="body" muted>Here's a summary of your finances today.</AdaptiveText>
      </div>

      {/* Main Stats Grid */}
      <AdaptiveGrid columns={2} minColumnWidth={300} withContainerPadding={false}>
        
        {/* Main Balance Card */}
        <AdaptiveCard className="fintech-card" style={{ background: colors.primary, color: 'white' }}>
          <AdaptiveCard.Body style={{ display: 'flex', flexDirection: 'column', rowGap: spacing.gapY * 2 }}>
            <div>
              <AdaptiveText variant="overline" style={{ opacity: 0.8, color: 'white' }}>Available Balance</AdaptiveText>
              <div style={{ display: 'flex', alignItems: 'baseline', columnGap: 8 }}>
                <AdaptiveText variant="display" weight="bold" className="font-mono" style={{ color: 'white' }}>
                  {formatCurrency(userAccount.balance)}
                </AdaptiveText>
              </div>
              <AdaptiveText variant="caption" className="font-mono" style={{ opacity: 0.6, color: 'white' }}>
                Account: {userAccount.accountNumber}
              </AdaptiveText>
            </div>
            
            <div style={{ display: 'flex', gap: spacing.gapX }}>
              <AdaptiveButton 
                variant="secondary" 
                onClick={() => navigate('/transfer')}
                style={{ flex: 1, backgroundColor: 'rgba(255,255,255,0.15)', color: 'white', border: 'none' }}
              >
                Send Money
              </AdaptiveButton>
              <AdaptiveButton 
                variant="secondary" 
                onClick={() => navigate('/transfer')}
                style={{ flex: 1, backgroundColor: 'rgba(255,255,255,0.15)', color: 'white', border: 'none' }}
              >
                Request
              </AdaptiveButton>
            </div>
          </AdaptiveCard.Body>
        </AdaptiveCard>

        {/* Quick Actions Grid */}
        <AdaptiveCard className="fintech-card" style={{ backgroundColor: colors.surface }}>
          <AdaptiveCard.Body style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%' }}>
            <AdaptiveText variant="h3" weight="bold" style={{ marginBottom: spacing.gapY }}>Quick Actions</AdaptiveText>
            <AdaptiveGrid columns={2} minColumnWidth={120} dense={true} withContainerPadding={false}>
              {quickActions.map((action) => (
                <AdaptiveCard 
                  key={action.id} 
                  variant="action" 
                  onClick={() => navigate(action.path)}
                  style={{ 
                    border: `1px solid ${colors.border}`, 
                    backgroundColor: 'transparent',
                    boxShadow: 'none'
                  }}
                >
                  <AdaptiveCard.Body style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', columnGap: 8, padding: 12 }}>
                    <div style={{ padding: 10, borderRadius: 50, backgroundColor: `${colors.primary}15`, color: colors.primary }}>
                      <action.icon size={20} />
                    </div>
                    <AdaptiveText variant="caption" weight="semibold">{action.title}</AdaptiveText>
                  </AdaptiveCard.Body>
                </AdaptiveCard>
              ))}
            </AdaptiveGrid>
          </AdaptiveCard.Body>
        </AdaptiveCard>

      </AdaptiveGrid>

      {/* Recent Transactions Preview */}
      <div style={{ marginTop: spacing.gapY }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.gapY }}>
          <AdaptiveText variant="h3" weight="bold">Recent Transactions</AdaptiveText>
          <AdaptiveButton variant="text" onClick={() => navigate('/transactions')}>
            <span style={{ display: 'flex', alignItems: 'center', columnGap: 4 }}>
              View All <ArrowRight size={16} />
            </span>
          </AdaptiveButton>
        </div>

        <AdaptiveCard className="fintech-card" style={{ backgroundColor: colors.surface, border: `1px solid ${colors.border}` }}>
          <AdaptiveCard.Body style={{ padding: 0 }}>
            {recentTransactions.slice(0, 4).map((txn, idx) => {
              const isIncome = txn.amount > 0;
              return (
                <div 
                  key={txn.id} 
                  style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'space-between',
                    padding: `${spacing.gapY}px ${spacing.pagePaddingX}px`,
                    borderBottom: idx !== 3 ? `1px solid ${colors.border}` : 'none'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                    <div style={{ 
                      width: 40, height: 40, borderRadius: 8, 
                      backgroundColor: isIncome ? '#ecfccb' : '#fee2e2',
                      color: isIncome ? '#4d7c0f' : '#b91c1c',
                      display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}>
                      {isIncome ? <ArrowDownRight size={20} /> : <ArrowUpRight size={20} />}
                    </div>
                    <div>
                      <AdaptiveText variant="body" weight="bold">{txn.description}</AdaptiveText>
                      <AdaptiveText variant="caption" muted>{txn.date} • {txn.category}</AdaptiveText>
                    </div>
                  </div>
                  
                  <AdaptiveText 
                    variant="body" 
                    weight="bold" 
                    className="font-mono"
                    style={{ color: isIncome ? '#166534' : colors.text }}
                  >
                    {isIncome ? '+' : '-'}{formatCurrency(txn.amount)}
                  </AdaptiveText>
                </div>
              );
            })}
          </AdaptiveCard.Body>
        </AdaptiveCard>
      </div>

    </div>
  );
}
