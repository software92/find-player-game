import { createRoot } from 'react-dom/client'
import App from './App'
import { QueryClient, QueryClientProvider } from 'react-query'
import { RecoilRoot } from 'recoil'
import { HelmetProvider } from 'react-helmet-async'

const root = createRoot(document.getElementById('root') as HTMLElement)

const queryClient = new QueryClient()

root.render(
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <RecoilRoot>
        <App />
      </RecoilRoot>
    </HelmetProvider>
  </QueryClientProvider>,
)
