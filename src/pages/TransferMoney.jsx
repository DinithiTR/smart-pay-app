import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AdaptiveText, 
  AdaptiveCard, 
  AdaptiveGrid, 
  AdaptiveInput, 
  AdaptiveSelect, 
  AdaptiveButton,
  AdaptiveDialog,
  AdaptiveAlert,
  useAdaptive
} from '@aura-adaptive/aura-ui-adaptor';
import { savedPayees, userAccount } from '../data/mockData';
import useViewportWidth from '../hooks/useViewportWidth';

export default function TransferMoney() {
  const { tokens } = useAdaptive();
  const { spacing, colors } = tokens;
  const navigate = useNavigate();
  const viewportWidth = useViewportWidth();
  const stackDialogActions = viewportWidth < 640;

  const [formData, setFormData] = useState({
    fromAccount: 'primary',
    payee: '',
    amount: '',
    reference: '',
  });

  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [success, setSuccess] = useState(false);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-LK', { style: 'currency', currency: 'LKR' }).format(amount);
  };

  const selectedPayee = savedPayees.find(p => p.id === formData.payee);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.payee && formData.amount) {
      setIsConfirmOpen(true);
    }
  };

  const handleConfirm = () => {
    setIsConfirmOpen(false);
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      navigate('/transactions');
    }, 4000);
  };

  if (success) {
    return (
      <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: spacing.gapY * 2 }}>
        <AdaptiveText variant="h2" weight="bold">Success</AdaptiveText>
        <AdaptiveAlert 
          variant="success" 
          title="Transfer Initiated" 
          message={`LKR ${formData.amount} has been successfully transferred to ${selectedPayee?.name}.`}
          filled={true}
          emphasis="icon"
        />
      </div>
    );
  }

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
          <AdaptiveText variant="caption" weight="bold">Send Money</AdaptiveText>
        </div>
        <AdaptiveText variant="h2" weight="bold">Transfer Money</AdaptiveText>
        <AdaptiveText variant="body" muted>Send funds securely to saved beneficiaries.</AdaptiveText>
      </div>

      <AdaptiveGrid
        columns={2}
        minColumns={1}
        maxColumns={2}
        minColumnWidth={350}
        collapseBelow={1080}
        withContainerPadding={false}
        style={{ minWidth: 0 }}
      >
        
        {/* Transfer Form Segment */}
        <AdaptiveCard className="fintech-card" style={{ backgroundColor: colors.surface, border: `1px solid ${colors.border}`, minWidth: 0 }}>
          <AdaptiveCard.Body style={{ minWidth: 0 }}>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: spacing.gapY * 1.5 }}>
              
              <AdaptiveSelect
                label="From Account"
                value={formData.fromAccount}
                onChange={(val) => setFormData({ ...formData, fromAccount: val })}
                options={[
                  { value: 'primary', label: `Everyday AC: ${userAccount.accountNumber} (Available: ${formatCurrency(userAccount.balance)})` },
                  { value: 'savings', label: 'Savings AC: 1104 2200 9940' }
                ]}
              />

              <AdaptiveSelect
                label="To Beneficiary"
                placeholder="Select saved payee..."
                value={formData.payee}
                onChange={(val) => setFormData({ ...formData, payee: val })}
                options={savedPayees.map(p => ({ value: p.id, label: `${p.name} - ${p.account}` }))}
                required
              />

              <div style={{ marginTop: spacing.gapY }}>
                <AdaptiveInput
                  label="Amount (LKR)"
                  type="number"
                  placeholder="0.00"
                  value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                  style={{ fontFamily: 'monospace', fontSize: '1.25rem' }}
                  required
                />
                <AdaptiveText variant="caption" muted style={{ marginTop: 4 }}>
                  Maximum daily limit: LKR 500,000.00
                </AdaptiveText>
              </div>

              <AdaptiveInput
                label="Reference Note (Optional)"
                placeholder="e.g., Rent, Dinner split..."
                value={formData.reference}
                onChange={(e) => setFormData({ ...formData, reference: e.target.value })}
              />

              <div style={{ marginTop: spacing.gapY, display: 'flex' }}>
                <AdaptiveButton
                  variant="primary"
                  type="submit"
                  paddingX={22}
                  paddingY={13}
                  minHitAreaPx={46}
                  textSize="0.95rem"
                  style={{ width: viewportWidth < 640 ? '100%' : 'auto' }}
                >
                  Review Transfer
                </AdaptiveButton>
              </div>

            </form>
          </AdaptiveCard.Body>
        </AdaptiveCard>

        {/* Info/Context Panel */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.gapY * 2, minWidth: 0 }}>
          <AdaptiveCard className="fintech-card" style={{ backgroundColor: `${colors.primary}10`, border: `1px dashed ${colors.primary}`, color: colors.text, minWidth: 0 }}>
            <AdaptiveCard.Body style={{ minWidth: 0 }}>
              <AdaptiveText variant="h4" weight="bold" style={{ marginBottom: 8 }}>Security Notice</AdaptiveText>
              <AdaptiveText variant="body">
                Transfers above LKR 50,000.00 will require mandatory OTP verification sent to your registered mobile number. Please ensure your contact details are up to date.
              </AdaptiveText>
            </AdaptiveCard.Body>
          </AdaptiveCard>

          <AdaptiveCard className="fintech-card" style={{ backgroundColor: colors.surface, border: `1px solid ${colors.border}`, minWidth: 0 }}>
            <AdaptiveCard.Body style={{ minWidth: 0 }}>
              <AdaptiveText variant="h4" weight="bold" style={{ marginBottom: 8 }}>Need to add a new Payee?</AdaptiveText>
              <AdaptiveText variant="body" muted style={{ marginBottom: 16 }}>
                You must add and verify a new beneficiary account before you can initiate a transfer to them. Verification takes 15 minutes.
              </AdaptiveText>
              <AdaptiveButton
                variant="secondary"
                paddingX={18}
                paddingY={12}
                minHitAreaPx={44}
                style={{ width: viewportWidth < 640 ? '100%' : 'auto' }}
              >
                Add New Payee
              </AdaptiveButton>
            </AdaptiveCard.Body>
          </AdaptiveCard>
        </div>

      </AdaptiveGrid>

      {/* Confirmation Dialog Component from AURA */}
      <AdaptiveDialog
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        title="Confirm Transfer"
        description="Please review the details below before authorizing this transaction."
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.gapY * 1.5, marginTop: spacing.gapY, minWidth: 0 }}>
          
          <div
            style={{
              padding: spacing.gapY,
              backgroundColor: colors.background,
              borderRadius: 8,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: spacing.gapX,
              flexWrap: 'wrap',
            }}
          >
            <AdaptiveText variant="body" muted>Transfer Amount</AdaptiveText>
            <AdaptiveText variant="h2" weight="bold" className="font-mono">
              LKR {Number(formData.amount).toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </AdaptiveText>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: viewportWidth < 640 ? '1fr' : '120px minmax(0, 1fr)',
              gap: 8,
              minWidth: 0,
            }}
          >
            <AdaptiveText variant="body" muted>To Account:</AdaptiveText>
            <AdaptiveText variant="body" weight="bold" style={{ textAlign: viewportWidth < 640 ? 'left' : 'right', minWidth: 0 }}>{selectedPayee?.name} <br/><span className="font-mono">{selectedPayee?.account}</span></AdaptiveText>

            <AdaptiveText variant="body" muted>From:</AdaptiveText>
            <AdaptiveText variant="body" weight="bold" style={{ textAlign: viewportWidth < 640 ? 'left' : 'right' }}>Everyday Checking</AdaptiveText>
          </div>

          <div style={{ display: 'flex', gap: spacing.gapX, marginTop: spacing.gapY, flexWrap: 'wrap' }}>
            <AdaptiveButton
              variant="secondary"
              onClick={() => setIsConfirmOpen(false)}
              paddingX={18}
              paddingY={12}
              minHitAreaPx={44}
              style={{ flex: stackDialogActions ? '1 1 100%' : '0 0 auto', width: stackDialogActions ? '100%' : 'auto' }}
            >
              Cancel
            </AdaptiveButton>
            <AdaptiveButton
              variant="primary"
              onClick={handleConfirm}
              paddingX={18}
              paddingY={12}
              minHitAreaPx={44}
              style={{ flex: stackDialogActions ? '1 1 100%' : '0 0 auto', width: stackDialogActions ? '100%' : 'auto' }}
            >
              Authorize Confirm
            </AdaptiveButton>
          </div>

        </div>
      </AdaptiveDialog>

    </div>
  );
}
