import { StrictMode } from 'react'
import { AuthProvider } from "./ContextAPI/AuthContext"
import { SalesAgentGroupProvider } from "./ContextAPI/SalesAgentGroupContext"
import { createRoot } from 'react-dom/client'
import { UserProvider } from "./ContextAPI/UserContext";
import { PromotionProvider } from "./ContextAPI/PromotionContext";
import './index.css'

import {
  RouterProvider,
} from "react-router-dom";
import { router } from './Routes/router';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <SalesAgentGroupProvider>
        <PromotionProvider>
          <UserProvider>
            <RouterProvider router={router} />
          </UserProvider>
        </PromotionProvider>
      </SalesAgentGroupProvider>
    </AuthProvider>
  </StrictMode>,
)
