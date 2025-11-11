import { Navigate, Route, Routes, HashRouter } from 'react-router-dom';
import { useLaunchParams, useSignal, miniApp, viewport } from '@tma.js/sdk-react';
import { AppRoot } from '@telegram-apps/telegram-ui';
import { useEffect } from 'react';

import { routes } from '@/navigation/routes.tsx';

export function App() {
  const lp = useLaunchParams();
  const isDark = useSignal(miniApp.isDark);

  useEffect(() => {
    async function setupFullscreen() {
      if (viewport.mount.isAvailable()) {
        await viewport.mount();
        viewport.expand();
        if (viewport.requestFullscreen.isAvailable()) {
          await viewport.requestFullscreen();
        }
      }
    }
    setupFullscreen();
  }, []);

  return (
    <AppRoot
      appearance={isDark ? 'dark' : 'light'}
      platform={['macos', 'ios'].includes(lp.tgWebAppPlatform) ? 'ios' : 'base'}
    >
      <HashRouter>
        <Routes>
          {routes.map((route) => <Route key={route.path} {...route} />)}
          <Route path="*" element={<Navigate to="/"/>}/>
        </Routes>
      </HashRouter>
    </AppRoot>
  );
}
