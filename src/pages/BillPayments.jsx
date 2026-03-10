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
import { FileDown } from 'lucide-react';

export default function BillPayments() {
  const { tokens } = useAdaptive();
  const { spacing, colors } = tokens;

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
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: spacing.gapY * 3 }}>
      
      <div>
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
        
        <AdaptiveGrid columns={3} minColumnWidth={280} withContainerPadding={false}>
          {activeBills.map((bill) => (
            <AdaptiveCard 
              key={bill.id} 
              variant="action" 
              className="fintech-card"
              style={{ border: `1px solid ${colors.border}`, backgroundColor: colors.surface }}
            >
              <AdaptiveCard.Body style={{ display: 'flex', flexDirection: 'column', gap: spacing.gapY }}>
                
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
                  style={{ marginTop: spacing.gapY, width: '100%' }}
                  onClick={() => setSelectedBill(bill)}
                >
                  Pay Now
                </AdaptiveButton>

              </AdaptiveCard.Body>
            </AdaptiveCard>
          ))}
        </AdaptiveGrid>
      </div>

      <div style={{ marginTop: spacing.gapY }}>
        <AdaptiveCard className="fintech-card" style={{ backgroundColor: `${colors.primary}10`, border: `1px solid ${colors.border}` }}>
          <AdaptiveCard.Body style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <AdaptiveText variant="body" weight="bold">Register a New Biller</AdaptiveText>
            <AdaptiveButton variant="secondary" size="small">Setup Auto-Pay</AdaptiveButton>
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
          <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.gapY * 1.5, marginTop: spacing.gapY }}>
            
            <div style={{ padding: spacing.gapY, backgroundColor: colors.background, borderRadius: 8 }}>
              <AdaptiveText variant="body" muted>Biller:</AdaptiveText>
              <AdaptiveText variant="h3" weight="bold">{selectedBill.provider}</AdaptiveText>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: `1px solid ${colors.border}`, paddingBottom: spacing.gapY }}>
              <AdaptiveText variant="body" muted>Amount to Debit:</AdaptiveText>
              <AdaptiveText variant="h2" weight="bold" className="font-mono">
                LKR {formatCurrency(selectedBill.amount).replace('LKR', '').trim()}
              </AdaptiveText>
            </div>

            <div style={{ display: 'flex', gap: spacing.gapX, marginTop: spacing.gapY }}>
              <AdaptiveButton variant="secondary" onClick={() => setSelectedBill(null)} style={{ flex: 1 }}>
                Cancel
              </AdaptiveButton>
              <AdaptiveButton variant="primary" onClick={handlePay} style={{ flex: 1 }}>
                Confirm Debit
              </AdaptiveButton>
            </div>

          </div>
        )}
      </AdaptiveDialog>

    </div>
  );
}
