import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  RouterProvider,
} from "react-router";
import { router } from './Router/Routes';
import './index.css'
import { ReTitleProvider } from 're-title';
import AuthProvider from './Components/Contexts/AuthProvider';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <ReTitleProvider defaultTitle='Digital Xpress'>
        <RouterProvider router={router} />
      </ReTitleProvider>
    </AuthProvider>
  </StrictMode>,
)
