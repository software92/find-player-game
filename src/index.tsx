import { createRoot } from 'react-dom/client'
import App from './App'
import { QueryClient, QueryClientProvider } from 'react-query'
import { RecoilRoot } from 'recoil'
import { HelmetProvider } from 'react-helmet-async'
import { StrictMode } from 'react'
import { syncFirebase } from './services/syncFirebase'

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
