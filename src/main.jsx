import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  RouterProvider,
} from "react-router";
import { router } from './Router/Routes';
import './index.css'
import { ReTitleProvider } from 're-title';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ReTitleProvider defaultTitle='Digital Xpress'>
      <RouterProvider router={router} />
    </ReTitleProvider>
  </StrictMode>,
)
