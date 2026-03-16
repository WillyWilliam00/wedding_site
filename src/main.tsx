import { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './index.css'
import App from './App.tsx'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={<div className="flex items-center justify-center min-h-screen bg-surface"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div></div>}>
        <App />
      </Suspense>
    </QueryClientProvider>
  </StrictMode>,
)
