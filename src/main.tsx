import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Provider } from 'react-redux'
import { store } from './app/store.ts'
import { RouterProvider } from 'react-router'
import router from './routes/router'
import UserStateProvider from './components/UserStateProvider.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <UserStateProvider>
        <RouterProvider router={router} />
      </UserStateProvider>
    </Provider>
  </StrictMode>,
)
