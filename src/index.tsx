import { createRoot } from 'react-dom/client'
import App from './App'
import { RecoilRoot } from 'recoil'
import { HelmetProvider } from 'react-helmet-async'
import { syncFirebase } from './services/syncService'
import { StrictMode } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

syncFirebase()

createRoot(document.getElementById('root') as HTMLElement).render(
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <RecoilRoot>
        <App />
      </RecoilRoot>
    </HelmetProvider>
  </QueryClientProvider>,
)
