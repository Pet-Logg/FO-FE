import { QueryClientProvider } from '@tanstack/react-query'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { queryClient } from './utils/queryClient.ts'

createRoot(document.getElementById('root')!).render(
  <div className='flex flex-col'>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </div>
)
