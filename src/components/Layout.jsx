import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { 
  AdaptiveText, 
  useAdaptive 
} from '@aura-adaptive/aura-ui-adaptor';
import { LayoutDashboard, ArrowLeftRight, ScrollText, FileSpreadsheet, LogOut } from 'lucide-react';

export default function Layout() {
  const { pathname } = useLocation();
  const { tokens, profile } = useAdaptive();
  const { spacing, colors } = tokens;

  // With a sidebar layout, we can stack links vertically
  const layoutLinks = [
    { path: '/dashboard', label: 'Overview', icon: LayoutDashboard },
    { path: '/transfer', label: 'Transfer', icon: ArrowLeftRight },
    { path: '/transactions', label: 'Transactions', icon: ScrollText },
    { path: '/bills', label: 'Pay Bills', icon: FileSpreadsheet },
  ];

  // If mobile or simplified layout is requested heavily, we could stack vertically and remove the fixed sidebar, 
  // but for now we'll implement a robust flex row that adapts padding.

  return (
    <div style={{ display: 'flex', width: '100%', minHeight: '100vh', flexDirection: profile?.deviceType === 'mobile' ? 'column' : 'row' }}>
      
      {/* Sidebar Navigation */}
      <aside 
        className="fintech-sidebar" 
        style={{ 
          width: profile?.deviceType === 'mobile' ? '100%' : '260px',
          padding: `${spacing.gapY * 2}px ${spacing.pagePaddingX}px`, 
          backgroundColor: colors.surface,
          display: 'flex',
          flexDirection: 'column',
          gap: spacing.gapY * 2,
          borderRight: `1px solid ${colors.border}`
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: spacing.gapY }}>
          <div style={{ 
            width: 32, 
            height: 32, 
            borderRadius: 8, 
            backgroundColor: colors.primary,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontWeight: 'bold'
          }}>A</div>
          <AdaptiveText variant="h2" weight="bold" style={{ letterSpacing: '-0.02em' }}>
            AURA Pay
          </AdaptiveText>
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: 8, flex: 1 }}>
          {layoutLinks.map((item) => {
            const isActive = pathname.startsWith(item.path);
            return (
              <Link 
                key={item.path} 
                to={item.path} 
                className="sidebar-link"
                style={{
                  backgroundColor: isActive ? `${colors.primary}15` : 'transparent',
                  color: isActive ? colors.primary : colors.text,
                }}
              >
                <item.icon size={20} />
                <AdaptiveText variant="body" weight={isActive ? "bold" : "normal"}>
                  {item.label}
                </AdaptiveText>
              </Link>
            );
          })}
        </nav>

        <div style={{ marginTop: 'auto', paddingTop: spacing.gapY * 2, borderTop: `1px solid ${colors.border}` }}>
          <button style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 12, 
            padding: '12px 16px', 
            background: 'transparent',
            border: 'none',
            color: colors.text,
            opacity: 0.7,
            cursor: 'pointer',
            width: '100%',
            textAlign: 'left'
          }}>
            <LogOut size={20} />
            <AdaptiveText variant="body">Secure Logout</AdaptiveText>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main 
        style={{ 
          flex: 1, 
          padding: `${spacing.gapY * 3}px ${spacing.pagePaddingX * 2}px`,
          maxWidth: '1200px',
          margin: '0 auto',
          width: '100%',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <Outlet />
      </main>

    </div>
  );
}
