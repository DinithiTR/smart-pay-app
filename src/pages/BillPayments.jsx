import React, { useState } from 'react';
import {
  AdaptiveText, 
  AdaptiveGrid, 
  AdaptiveCard, 
  AdaptiveButton,
  AdaptiveDialog,
  AdaptiveAlert,
  useAdaptive
} from '@aura-adaptive/aura-ui-adaptor';
import { activeBills } from '../data/mockData';
import useViewportWidth from '../hooks/useViewportWidth';

export default function BillPayments() {
  const { tokens } = useAdaptive();
  const { spacing, colors } = tokens;
  const viewportWidth = useViewportWidth();
  const stackActions = viewportWidth < 640;

  const [selectedBill, setSelectedBill] = useState(null);
  const [success, setSuccess] = useState(false);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-LK', { style: 'currency', currency: 'LKR' }).format(amount);
  };

  const handlePay = () => {
    setSelectedBill(null);
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
    }, 4500);
  };

  return (
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: spacing.gapY * 3, minWidth: 0 }}>
      
      <div style={{ minWidth: 0 }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            padding: '8px 12px',
            borderRadius: 9999,
            backgroundColor: `${colors.primary}12`,
            color: colors.primary,
            marginBottom: 10,
          }}
        >
          <AdaptiveText variant="caption" weight="bold">Utility Hub</AdaptiveText>
        </div>
        <AdaptiveText variant="h2" weight="bold">Bill Payments</AdaptiveText>
        <AdaptiveText variant="body" muted>Manage and pay your registered utility providers.</AdaptiveText>
      </div>

      {success && (
        <AdaptiveAlert 
          variant="success" 
          title="Payment Successful" 
          message="Your bill payment has been processed and your account was directly debited."
          filled={true}
          emphasis="icon"
        />
      )}

      <div>
        <AdaptiveText variant="h3" weight="bold" style={{ marginBottom: spacing.gapY }}>Outstanding Bills</AdaptiveText>
        
        <AdaptiveGrid
          columns={3}
          minColumns={1}
          maxColumns={3}
          minColumnWidth={280}
          collapseBelow={920}
          withContainerPadding={false}
          style={{ minWidth: 0 }}
        >
          {activeBills.map((bill) => (
            <AdaptiveCard 
              key={bill.id} 
              variant="action" 
              className="fintech-card"
              style={{ border: `1px solid ${colors.border}`, backgroundColor: colors.surface, minWidth: 0 }}
            >
              <AdaptiveCard.Body style={{ display: 'flex', flexDirection: 'column', gap: spacing.gapY, minWidth: 0 }}>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ padding: 10, borderRadius: 8, backgroundColor: `${colors.primary}15`, color: colors.primary }}>
                    <bill.icon size={24} />
                  </div>
                  <AdaptiveText variant="overline" muted>Due: {bill.dueDate}</AdaptiveText>
                </div>

                <div>
                  <AdaptiveText variant="caption" muted>{bill.type}</AdaptiveText>
                  <AdaptiveText variant="h4" weight="bold">{bill.provider}</AdaptiveText>
                </div>

                <div style={{ marginTop: spacing.gapY }}>
                  <AdaptiveText variant="h2" weight="bold" className="font-mono">
                    LKR {formatCurrency(bill.amount).replace('LKR', '').trim()}
                  </AdaptiveText>
                </div>

                <AdaptiveButton 
                  variant="primary" 
                  paddingX={18}
                  paddingY={12}
                  minHitAreaPx={44}
                  style={{ marginTop: spacing.gapY, width: viewportWidth < 640 ? '100%' : 'auto' }}
                  onClick={() => setSelectedBill(bill)}
                >
                  Pay Now
                </AdaptiveButton>

              </AdaptiveCard.Body>
            </AdaptiveCard>
          ))}
        </AdaptiveGrid>
      </div>

      <div style={{ marginTop: spacing.gapY, minWidth: 0 }}>
        <AdaptiveCard className="fintech-card" style={{ backgroundColor: `${colors.primary}10`, border: `1px solid ${colors.border}`, minWidth: 0 }}>
          <AdaptiveCard.Body
            style={{
              display: 'flex',
              flexDirection: viewportWidth < 720 ? 'column' : 'row',
              alignItems: viewportWidth < 720 ? 'stretch' : 'center',
              justifyContent: 'space-between',
              gap: spacing.gapY,
              minWidth: 0,
            }}
          >
            <AdaptiveText variant="body" weight="bold">Register a New Biller</AdaptiveText>
            <AdaptiveButton
              variant="secondary"
              paddingX={18}
              paddingY={12}
              minHitAreaPx={44}
              textSize="0.95rem"
              style={{ width: viewportWidth < 720 ? '100%' : 'auto' }}
            >
              Setup Auto-Pay
            </AdaptiveButton>
          </AdaptiveCard.Body>
        </AdaptiveCard>
      </div>

      {/* Payment Confirmation Dialog */}
      <AdaptiveDialog
        isOpen={!!selectedBill}
        onClose={() => setSelectedBill(null)}
        title="Confirm Bill Payment"
        description="Review the payment mandate before proceeding."
      >
        {selectedBill && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.gapY * 1.5, marginTop: spacing.gapY, minWidth: 0 }}>
            
            <div style={{ padding: spacing.gapY, backgroundColor: colors.background, borderRadius: 8 }}>
              <AdaptiveText variant="body" muted>Biller:</AdaptiveText>
              <AdaptiveText variant="h3" weight="bold">{selectedBill.provider}</AdaptiveText>
            </div>

            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderBottom: `1px solid ${colors.border}`,
                paddingBottom: spacing.gapY,
                gap: spacing.gapX,
                flexWrap: 'wrap',
              }}
            >
              <AdaptiveText variant="body" muted>Amount to Debit:</AdaptiveText>
              <AdaptiveText variant="h2" weight="bold" className="font-mono">
                LKR {formatCurrency(selectedBill.amount).replace('LKR', '').trim()}
              </AdaptiveText>
            </div>

            <div style={{ display: 'flex', gap: spacing.gapX, marginTop: spacing.gapY, flexWrap: 'wrap' }}>
              <AdaptiveButton
                variant="secondary"
                onClick={() => setSelectedBill(null)}
                paddingX={18}
                paddingY={12}
                minHitAreaPx={44}
                style={{ flex: stackActions ? '1 1 100%' : '0 0 auto', width: stackActions ? '100%' : 'auto' }}
              >
                Cancel
              </AdaptiveButton>
              <AdaptiveButton
                variant="primary"
                onClick={handlePay}
                paddingX={18}
                paddingY={12}
                minHitAreaPx={44}
                style={{ flex: stackActions ? '1 1 100%' : '0 0 auto', width: stackActions ? '100%' : 'auto' }}
              >
                Confirm Debit
              </AdaptiveButton>
            </div>

          </div>
        )}
      </AdaptiveDialog>

    </div>
  );
}
