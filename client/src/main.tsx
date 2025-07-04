import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router'
import { routers } from './routes/route.tsx'
import { store } from './app/store.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
   <Provider  store={store}>
     <RouterProvider  router={routers}>
    </RouterProvider>
   </Provider>
  </StrictMode>,
)
