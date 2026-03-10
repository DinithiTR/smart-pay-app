import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AdaptiveText, 
  AdaptiveGrid, 
  AdaptiveCard, 
  AdaptiveButton,
  useAdaptive,
} from '@aura-adaptive/aura-ui-adaptor';
import { userAccount, quickActions, recentTransactions } from '../data/mockData';
import { ArrowUpRight, ArrowDownRight, ArrowRight } from 'lucide-react';
import useViewportWidth from '../hooks/useViewportWidth';

export default function Dashboard() {
  const { tokens } = useAdaptive();
  const { spacing, colors } = tokens;
  const navigate = useNavigate();
  const viewportWidth = useViewportWidth();
  const stackActionButtons = viewportWidth < 640;

  // Helper to format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-LK', { 
      style: 'currency', 
      currency: 'LKR' 
    }).format(Math.abs(amount));
  };

  const monthlyInflow = useMemo(
    () => recentTransactions.reduce((total, txn) => (txn.amount > 0 ? total + txn.amount : total), 0),
    [],
  );
  const monthlyOutflow = useMemo(
    () => recentTransactions.reduce((total, txn) => (txn.amount < 0 ? total + Math.abs(txn.amount) : total), 0),
    [],
  );

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
      <div style={{ minWidth: 0, display: 'flex', flexDirection: 'column', rowGap: 10 }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            alignSelf: 'flex-start',
            padding: '8px 12px',
            borderRadius: 9999,
            backgroundColor: `${colors.primary}12`,
            color: colors.primary,
          }}
        >
          <AdaptiveText variant="caption" weight="bold">
            Smart Pay Control Center
          </AdaptiveText>
        </div>
        <AdaptiveText variant="h2" weight="bold">
          Hello, {userAccount.name}
        </AdaptiveText>
        <AdaptiveText variant="body" muted>
          Here's a summary of your account and recent activity. Explore your dashboard to manage your finances, view transactions, and access quick actions.
        </AdaptiveText>
      </div>

      <AdaptiveGrid
        columns={2}
        minColumns={1}
        maxColumns={2}
        minColumnWidth={320}
        collapseBelow={980}
        alignItems="stretch"
        justifyItems="stretch"
        withContainerPadding={false}
        style={{ minWidth: 0 }}
      >
        <AdaptiveCard
          className="fintech-card fintech-hero-card"
          variant="data"
          style={{
            background: `linear-gradient(145deg, ${colors.primary} 0%, ${colors.secondary || colors.primary} 100%)`,
            color: 'white',
            minWidth: 0,
            width: '100%',
          }}
        >
          <AdaptiveCard.Body
            style={{
              display: 'flex',
              flexDirection: 'column',
              rowGap: spacing.gapY * 2,
              minWidth: 0,
              height: '100%',
            }}
          >
            <div style={{ minWidth: 0 }}>
              <AdaptiveText
                variant="overline"
                style={{ opacity: 0.8, color: 'white' }}
              >
                Available Balance
              </AdaptiveText>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'baseline',
                  columnGap: 8,
                  minWidth: 0,
                }}
              >
                <AdaptiveText
                  variant="display"
                  weight="bold"
                  className="font-mono"
                  style={{
                    color: 'white',
                    minWidth: 0,
                    wordBreak: 'break-word',
                  }}
                >
                  {formatCurrency(userAccount.balance)}
                </AdaptiveText>
              </div>

              <AdaptiveText
                variant="caption"
                className="font-mono"
                style={{
                  opacity: 0.65,
                  color: 'white',
                }}
              >
                Account: {userAccount.accountNumber}
              </AdaptiveText>
            </div>

            <AdaptiveGrid
              minColumns={1}
              maxColumns={2}
              minColumnWidth={160}
              collapseBelow={760}
              dense
              withContainerPadding={false}
              style={{ minWidth: 0 }}
            >
              <AdaptiveCard
                className="fintech-card fintech-stat-card"
                variant="data"
                style={{
                  backgroundColor: 'rgba(255,255,255,0.14)',
                  border: '1px solid rgba(255,255,255,0.16)',
                  color: 'white',
                  minWidth: 0,
                }}
              >
                <AdaptiveCard.Body style={{ rowGap: 4, minWidth: 0 }}>
                  <AdaptiveText variant="caption" style={{ color: 'rgba(255,255,255,0.78)' }}>
                    Monthly Inflow
                  </AdaptiveText>
                  <AdaptiveText variant="h4" weight="bold" className="font-mono" style={{ color: 'white' }}>
                    {formatCurrency(monthlyInflow)}
                  </AdaptiveText>
                </AdaptiveCard.Body>
              </AdaptiveCard>

              <AdaptiveCard
                className="fintech-card fintech-stat-card"
                variant="data"
                style={{
                  backgroundColor: 'rgba(255,255,255,0.10)',
                  border: '1px solid rgba(255,255,255,0.16)',
                  color: 'white',
                  minWidth: 0,
                }}
              >
                <AdaptiveCard.Body style={{ rowGap: 4, minWidth: 0 }}>
                  <AdaptiveText variant="caption" style={{ color: 'rgba(255,255,255,0.78)' }}>
                    Monthly Spend
                  </AdaptiveText>
                  <AdaptiveText variant="h4" weight="bold" className="font-mono" style={{ color: 'white' }}>
                    {formatCurrency(monthlyOutflow)}
                  </AdaptiveText>
                </AdaptiveCard.Body>
              </AdaptiveCard>
            </AdaptiveGrid>

            <AdaptiveCard.Actions
              layout="auto"
              showDivider={false}
              style={{
                marginTop: 0,
              }}
            >
              <AdaptiveButton
                variant="secondary"
                onClick={() => navigate('/transfer')}
                icon={<ArrowUpRight size={16} />}
                paddingX={18}
                paddingY={12}
                minHitAreaPx={46}
                textSize="0.95rem"
                style={{
                  flex: stackActionButtons ? '1 1 100%' : '0 0 auto',
                  minWidth: 0,
                  width: stackActionButtons ? '100%' : 'auto',
                  maxWidth: stackActionButtons ? '100%' : 180,
                  backgroundColor: 'rgba(255,255,255,0.15)',
                  color: 'white',
                }}
              >
                Send Money
              </AdaptiveButton>

              <AdaptiveButton
                variant="secondary"
                onClick={() => navigate('/transfer')}
                icon={<ArrowDownRight size={16} />}
                paddingX={18}
                paddingY={12}
                minHitAreaPx={46}
                textSize="0.95rem"
                style={{
                  flex: stackActionButtons ? '1 1 100%' : '0 0 auto',
                  minWidth: 0,
                  width: stackActionButtons ? '100%' : 'auto',
                  maxWidth: stackActionButtons ? '100%' : 160,
                  backgroundColor: 'rgba(255,255,255,0.15)',
                  color: 'white',
                }}
              >
                Request
              </AdaptiveButton>
            </AdaptiveCard.Actions>
          </AdaptiveCard.Body>
        </AdaptiveCard>

        <AdaptiveCard
          className="fintech-card"
          variant="action"
          style={{
            backgroundColor: colors.surface,
            border: `1px solid ${colors.border}`,
            minWidth: 0,
            width: '100%',
          }}
        >
          <AdaptiveCard.Body
            style={{
              minWidth: 0,
              height: '100%',
            }}
          >
            <div style={{ minWidth: 0 }}>
              <AdaptiveText variant="h3" weight="bold">
                Quick Actions
              </AdaptiveText>
              <AdaptiveText variant="caption" muted>
                Shortcuts sized to stay compact instead of stretching edge to edge.
              </AdaptiveText>
            </div>

            <AdaptiveGrid
              minColumns={1}
              maxColumns={2}
              minColumnWidth={190}
              maxColumnWidth={240}
              collapseBelow={1220}
              dense
              alignItems="stretch"
              justifyItems="stretch"
              withContainerPadding={false}
              style={{
                width: '100%',
                minWidth: 0,
              }}
            >
              {quickActions.map((action) => (
                <AdaptiveCard
                  key={action.id}
                  variant="action"
                  detailed
                  onClick={() => navigate(action.path)}
                  className="fintech-card fintech-quick-card"
                  style={{
                    width: '100%',
                    minWidth: 0,
                    height: '100%',
                    border: `1px solid ${colors.border}`,
                    backgroundColor: `${colors.primary}06`,
                    boxShadow: 'none',
                    cursor: 'pointer',
                  }}
                >
                  <AdaptiveCard.Body
                    style={{
                      alignItems: 'flex-start',
                      justifyContent: 'space-between',
                      textAlign: 'left',
                      minWidth: 0,
                      height: '100%',
                      padding: 18,
                      rowGap: 14,
                    }}
                  >
                    <div
                      style={{
                        width: 48,
                        height: 48,
                        borderRadius: 14,
                        backgroundColor: `${colors.primary}15`,
                        color: colors.primary,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      <action.icon size={20} />
                    </div>

                    <AdaptiveText
                      variant="body"
                      weight="semibold"
                      align="left"
                      maxLines={2}
                      style={{
                        width: '100%',
                        minWidth: 0,
                        overflowWrap: 'break-word',
                      }}
                    >
                      {action.title}
                    </AdaptiveText>
                  </AdaptiveCard.Body>
                </AdaptiveCard>
              ))}
            </AdaptiveGrid>
          </AdaptiveCard.Body>
        </AdaptiveCard>
      </AdaptiveGrid>

      <div style={{ marginTop: spacing.gapY, minWidth: 0 }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            columnGap: spacing.gapX,
            marginBottom: spacing.gapY,
            minWidth: 0,
            flexWrap: 'wrap',
            rowGap: 8,
          }}
        >
          <AdaptiveText variant="h3" weight="bold">
            Recent Transactions
          </AdaptiveText>

          <AdaptiveButton
            variant="ghost"
            onClick={() => navigate('/transactions')}
            icon={<ArrowRight size={16} />}
            iconPosition="right"
            paddingX={14}
            paddingY={10}
            minHitAreaPx={42}
          >
            View All
          </AdaptiveButton>
        </div>

        <AdaptiveCard
          className="fintech-card"
          variant="data"
          style={{
            backgroundColor: colors.surface,
            border: `1px solid ${colors.border}`,
            minWidth: 0,
            width: '100%',
          }}
        >
          <AdaptiveCard.Body style={{ padding: 0, minWidth: 0 }}>
            {recentTransactions.slice(0, 4).map((txn, idx) => {
              const isIncome = txn.amount > 0;

              return (
                <div
                  key={txn.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    columnGap: spacing.gapX,
                    padding: `${spacing.gapY}px ${spacing.pagePaddingX}px`,
                    borderBottom:
                      idx !== 3 ? `1px solid ${colors.border}` : 'none',
                    minWidth: 0,
                    flexWrap: 'wrap',
                    rowGap: 8,
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      columnGap: 16,
                      minWidth: 0,
                      flex: 1,
                    }}
                  >
                    <div
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 8,
                        backgroundColor: isIncome ? '#ecfccb' : '#fee2e2',
                        color: isIncome ? '#4d7c0f' : '#b91c1c',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      {isIncome ? (
                        <ArrowDownRight size={20} />
                      ) : (
                        <ArrowUpRight size={20} />
                      )}
                    </div>

                    <div style={{ minWidth: 0, flex: 1 }}>
                      <AdaptiveText variant="body" weight="bold" maxLines={1}>
                        {txn.description}
                      </AdaptiveText>
                      <AdaptiveText variant="caption" muted maxLines={1}>
                        {txn.date} • {txn.category}
                      </AdaptiveText>
                    </div>
                  </div>

                  <AdaptiveText
                    variant="body"
                    weight="bold"
                    className="font-mono"
                    style={{
                      color: isIncome ? '#166534' : colors.text,
                      whiteSpace: 'nowrap',
                      flexShrink: 0,
                      width: viewportWidth < 640 ? '100%' : 'auto',
                      textAlign: viewportWidth < 640 ? 'right' : 'left',
                    }}
                  >
                    {isIncome ? '+' : '-'}
                    {formatCurrency(txn.amount)}
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
