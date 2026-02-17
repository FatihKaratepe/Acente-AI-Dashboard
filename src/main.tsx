import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App.tsx';
import { TooltipProvider } from './components/ui/tooltip.tsx';
import './index.css';
import { RootLayout } from './layout/RootLayout.tsx';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TooltipProvider>
      <QueryClientProvider client={queryClient}>
        <RootLayout>
          <App />
        </RootLayout>
      </QueryClientProvider>
    </TooltipProvider>
  </StrictMode>,
);
