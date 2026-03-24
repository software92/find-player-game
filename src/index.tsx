import { createRoot } from 'react-dom/client'
import { RecoilRoot } from 'recoil'
import { HelmetProvider } from 'react-helmet-async'
import { StrictMode } from 'react'
import { QueryClientProvider } from '@tanstack/react-query'
import BrowserRouter from './BrowserRouter'
import { ThemeProvider } from 'styled-components'
import { theme } from './styles/theme'
import { queryClient } from './queryClient'

createRoot(document.getElementById('root') as HTMLElement).render(
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <ThemeProvider theme={theme}>
        <RecoilRoot>
          <BrowserRouter />
        </RecoilRoot>
      </ThemeProvider>
    </HelmetProvider>
  </QueryClientProvider>,
)
