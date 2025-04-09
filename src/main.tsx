import { QueryClientProvider } from '@tanstack/react-query'
import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'
import { queryClient } from './utils/queryClient'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

createRoot(document.getElementById('root')!).render(
  <div className='flex flex-col'>
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} buttonPosition='bottom-left' />
      <App />
    </QueryClientProvider>
  </div>
)
