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

export default function TransferMoney() {
  const { tokens } = useAdaptive();
  const { spacing, colors } = tokens;
  const navigate = useNavigate();

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
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: spacing.gapY * 3 }}>
      
      <div>
        <AdaptiveText variant="h2" weight="bold">Transfer Money</AdaptiveText>
        <AdaptiveText variant="body" muted>Send funds securely to saved beneficiaries.</AdaptiveText>
      </div>

      <AdaptiveGrid columns={2} minColumnWidth={350} withContainerPadding={false}>
        
        {/* Transfer Form Segment */}
        <AdaptiveCard className="fintech-card" style={{ backgroundColor: colors.surface, border: `1px solid ${colors.border}` }}>
          <AdaptiveCard.Body>
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

              <div style={{ marginTop: spacing.gapY }}>
                <AdaptiveButton variant="primary" type="submit" style={{ width: '100%' }}>
                  Review Transfer
                </AdaptiveButton>
              </div>

            </form>
          </AdaptiveCard.Body>
        </AdaptiveCard>

        {/* Info/Context Panel */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.gapY * 2 }}>
          <AdaptiveCard className="fintech-card" style={{ backgroundColor: `${colors.primary}10`, border: `1px dashed ${colors.primary}`, color: colors.text }}>
            <AdaptiveCard.Body>
              <AdaptiveText variant="h4" weight="bold" style={{ marginBottom: 8 }}>Security Notice</AdaptiveText>
              <AdaptiveText variant="body">
                Transfers above LKR 50,000.00 will require mandatory OTP verification sent to your registered mobile number. Please ensure your contact details are up to date.
              </AdaptiveText>
            </AdaptiveCard.Body>
          </AdaptiveCard>

          <AdaptiveCard className="fintech-card" style={{ backgroundColor: colors.surface, border: `1px solid ${colors.border}` }}>
            <AdaptiveCard.Body>
              <AdaptiveText variant="h4" weight="bold" style={{ marginBottom: 8 }}>Need to add a new Payee?</AdaptiveText>
              <AdaptiveText variant="body" muted style={{ marginBottom: 16 }}>
                You must add and verify a new beneficiary account before you can initiate a transfer to them. Verification takes 15 minutes.
              </AdaptiveText>
              <AdaptiveButton variant="secondary">Add New Payee</AdaptiveButton>
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
        <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.gapY * 1.5, marginTop: spacing.gapY }}>
          
          <div style={{ padding: spacing.gapY, backgroundColor: colors.background, borderRadius: 8, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <AdaptiveText variant="body" muted>Transfer Amount</AdaptiveText>
            <AdaptiveText variant="h2" weight="bold" className="font-mono">
              LKR {Number(formData.amount).toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </AdaptiveText>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: 8 }}>
            <AdaptiveText variant="body" muted>To Account:</AdaptiveText>
            <AdaptiveText variant="body" weight="bold" style={{ textAlign: 'right' }}>{selectedPayee?.name} <br/><span className="font-mono">{selectedPayee?.account}</span></AdaptiveText>

            <AdaptiveText variant="body" muted>From:</AdaptiveText>
            <AdaptiveText variant="body" weight="bold" style={{ textAlign: 'right' }}>Everyday Checking</AdaptiveText>
          </div>

          <div style={{ display: 'flex', gap: spacing.gapX, marginTop: spacing.gapY }}>
            <AdaptiveButton variant="secondary" onClick={() => setIsConfirmOpen(false)} style={{ flex: 1 }}>
              Cancel
            </AdaptiveButton>
            <AdaptiveButton variant="primary" onClick={handleConfirm} style={{ flex: 1 }}>
              Authorize Confirm
            </AdaptiveButton>
          </div>

        </div>
      </AdaptiveDialog>

    </div>
  );
}
