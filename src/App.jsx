import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AdaptiveProvider, useAdaptive } from '@aura-adaptive/aura-ui-adaptor';

import Layout from './components/Layout';
const Dashboard = lazy(() => import('./pages/Dashboard'));
const TransferMoney = lazy(() => import('./pages/TransferMoney'));
const TransactionHistory = lazy(() => import('./pages/TransactionHistory'));
const BillPayments = lazy(() => import('./pages/BillPayments'));

function RouteFallback() {
  return <div style={{ minHeight: 320 }} aria-hidden="true" />;
}

function AuraShell({ children }) {
  const { tokens } = useAdaptive();
  const { colors } = tokens;

  return (
    <div
      style={{
        backgroundColor: colors.background,
        color: colors.text,
        minHeight: "100vh",
        width: "100%",
        minWidth: 0,
        display: "flex",
      }}
    >
      {children}
    </div>
  );
}

function AppInner() {
  return (
    <AuraShell>
      <Suspense fallback={<RouteFallback />}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="transfer" element={<TransferMoney />} />
            <Route path="transactions" element={<TransactionHistory />} />
            <Route path="bills" element={<BillPayments />} />
          </Route>
        </Routes>
      </Suspense>
    </AuraShell>
  );
}

function App() {
  return (
    <Router>
      <AdaptiveProvider simulateExtensionInstalled={false}>
        <AppInner />
      </AdaptiveProvider>
    </Router>
  );
}

export default App;
