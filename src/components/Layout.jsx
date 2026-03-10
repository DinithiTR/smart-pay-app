import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { 
  AdaptiveButton,
  AdaptiveText, 
  useAdaptive 
} from '@aura-adaptive/aura-ui-adaptor';
import { LayoutDashboard, ArrowLeftRight, ScrollText, FileSpreadsheet, LogOut } from 'lucide-react';
import useViewportWidth from '../hooks/useViewportWidth';

export default function Layout() {
  const { pathname } = useLocation();
  const { tokens, profile } = useAdaptive();
  const { spacing, colors, flags } = tokens;
  const viewportWidth = useViewportWidth();
  const isCompactLayout = profile?.deviceType === 'mobile' || viewportWidth < 1120;
  const isNarrowViewport = viewportWidth < 640;
  const isDarkTheme = flags?.theme === 'dark' || profile?.theme === 'dark';

  // With a sidebar layout, we can stack links vertically
  const layoutLinks = [
    { path: '/dashboard', label: 'Overview', icon: LayoutDashboard },
    { path: '/transfer', label: 'Transfer', icon: ArrowLeftRight },
    { path: '/transactions', label: 'Transactions', icon: ScrollText },
    { path: '/bills', label: 'Pay Bills', icon: FileSpreadsheet },
  ];

  return (
    <div
      style={{
        display: 'flex',
        width: '100%',
        minHeight: '100vh',
        minWidth: 0,
        flexDirection: isCompactLayout ? 'column' : 'row',
      }}
    >
      
      {/* Sidebar Navigation */}
      <aside 
        className="fintech-sidebar" 
        style={{ 
          '--fintech-sidebar-bg': `linear-gradient(180deg, ${colors.surface} 0%, ${colors.background} 100%)`,
          '--fintech-sidebar-hover': isDarkTheme ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.7)',
          '--fintech-sidebar-border': isDarkTheme ? 'rgba(255,255,255,0.08)' : 'rgba(15,23,42,0.06)',
          width: isCompactLayout ? '100%' : '260px',
          minWidth: 0,
          flexShrink: 0,
          padding: `${spacing.gapY * 2}px ${spacing.pagePaddingX}px`, 
          background: `linear-gradient(180deg, ${colors.surface} 0%, ${colors.background} 100%)`,
          display: 'flex',
          flexDirection: 'column',
          gap: spacing.gapY * 2,
          borderRight: isCompactLayout ? 'none' : `1px solid ${colors.border}`,
          borderBottom: isCompactLayout ? `1px solid ${colors.border}` : 'none',
          position: isCompactLayout ? 'relative' : 'sticky',
          top: 0,
          alignSelf: isCompactLayout ? 'stretch' : 'flex-start',
          height: isCompactLayout ? 'auto' : '100vh',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: spacing.gapY }}>
          <div
            className="fintech-brand-mark"
            style={{ 
              width: 38, 
              height: 38, 
              borderRadius: 12, 
              backgroundColor: colors.primary,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontWeight: 'bold'
            }}
          >
            S
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', rowGap: 2, minWidth: 0 }}>
            <AdaptiveText variant="h2" weight="bold" style={{ letterSpacing: '-0.02em' }}>
              Smart Pay
            </AdaptiveText>
            <AdaptiveText variant="caption" muted>
              Adaptive banking workspace
            </AdaptiveText>
          </div>
        </div>

        <nav
          style={{
            display: 'flex',
            flexDirection: isCompactLayout ? 'row' : 'column',
            flexWrap: isCompactLayout ? 'wrap' : 'nowrap',
            gap: 8,
            flex: 1,
            minWidth: 0,
          }}
        >
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
                  border: `1px solid ${isActive ? `${colors.primary}25` : 'transparent'}`,
                  boxShadow: isActive ? `0 10px 24px ${colors.primary}12` : 'none',
                  flex: isCompactLayout
                    ? (isNarrowViewport ? '1 1 100%' : '1 1 calc(50% - 4px)')
                    : '1 1 auto',
                  justifyContent: isCompactLayout ? 'center' : 'flex-start',
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
          <AdaptiveButton
            variant="ghost"
            icon={<LogOut size={18} />}
            paddingX={16}
            paddingY={12}
            minHitAreaPx={44}
            textSize="0.95rem"
            style={{
              width: '100%',
              justifyContent: isCompactLayout ? 'center' : 'flex-start',
            }}
          >
            Secure Logout
          </AdaptiveButton>
        </div>
      </aside>

      {/* Main Content Area */}
      <main 
        className="fintech-main-shell"
        style={{ 
          flex: 1, 
          minWidth: 0,
          width: '100%',
          padding: `${spacing.gapY * (isCompactLayout ? 2 : 3)}px ${spacing.pagePaddingX * (isNarrowViewport ? 1 : 2)}px`,
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <div
          className="fintech-main-inner"
          style={{
            width: '100%',
            maxWidth: '1200px',
            margin: '0 auto',
            minWidth: 0,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Outlet />
        </div>
      </main>

    </div>
  );
}
