import { StrictMode } from 'react'
import { AuthProvider } from "./ContextAPI/AuthContext"
import { SalesAgentGroupProvider } from "./ContextAPI/SalesAgentGroupContext"
import { SalesProvider } from "./ContextAPI/SalesContext"
import { createRoot } from 'react-dom/client'
import { UserProvider } from "./ContextAPI/UserContext";
import { PromotionProvider } from "./ContextAPI/PromotionContext";
import { ProductProvider } from "./ContextAPI/ProductContext";
import './index.css'

import {
  RouterProvider,
} from "react-router-dom";
import { router } from './Routes/router';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <SalesAgentGroupProvider>
        <SalesProvider>
          <PromotionProvider>
            <ProductProvider>
              <UserProvider>
                <RouterProvider router={router} />
              </UserProvider>
            </ProductProvider>
          </PromotionProvider>
        </SalesProvider>
      </SalesAgentGroupProvider>
    </AuthProvider>
  </StrictMode>,
)
