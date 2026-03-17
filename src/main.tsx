import { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './index.css'
import App from './App.tsx'
import { Toaster } from 'react-hot-toast'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={<div className="flex items-center justify-center min-h-screen bg-surface"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div></div>}>
        <App />
      </Suspense>
      <Toaster
        position="bottom-right" // Posizione predefinita
        reverseOrder={false}   // Le nuove notifiche appaiono sopra le vecchie
        toastOptions={{
          // Definisci uno stile di base elegante e minimale
          className: 'border border-gray-100 shadow-xl rounded-2xl p-4 text-sm font-medium text-gray-800 bg-white/90 backdrop-blur-sm',
          duration: 4000, // Durata di default (4 secondi)

          // Personalizza i tipi specifici
          success: {
            iconTheme: {
              primary: '#10B981', // Verde smeraldo (Tailwind emerald-500)
              secondary: '#fff',
            },
            className: 'border border-emerald-100 bg-emerald-50/90 text-emerald-900',
          },
          error: {
            iconTheme: {
              primary: '#EF4444', // Rosso (Tailwind red-500)
              secondary: '#fff',
            },
            className: 'border border-red-100 bg-red-50/90 text-red-900',
          },
          loading: {
            className: 'border border-gray-100 bg-white/90 text-gray-800',
          }
        }}
      />
    </QueryClientProvider>
  </StrictMode>,
)
