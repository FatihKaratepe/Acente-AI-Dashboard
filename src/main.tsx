import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App.tsx';
import { TooltipProvider } from './components/ui/tooltip.tsx';
import './index.css';
import { RootLayout } from './layout/RootLayout.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TooltipProvider>
      <RootLayout>
        <App />
      </RootLayout>
    </TooltipProvider>
  </StrictMode>,
);
