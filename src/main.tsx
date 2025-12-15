import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from "react-router/dom";

import router from './router';
import './index.scss'
import { AppStateProvider } from './context/AppStateContext';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppStateProvider>
      <RouterProvider router={router} />
    </AppStateProvider>
  </StrictMode>,
)
