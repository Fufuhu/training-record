import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import {AuthProvider} from "react-oidc-context";
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import {Records} from "./pages/Records.tsx";

const cognitoAuthConfig = {
  authority: import.meta.env.VITE_COGNITO_AUTHORITY,
  client_id: import.meta.env.VITE_COGNITO_CLIENT_ID,
  redirect_uri: import.meta.env.VITE_COGNITO_REDIRECT_URI,
  response_type: "code",
  scope: "phone openid email",
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/records/:year/:month/:day',
    element: <Records />
  }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider {...cognitoAuthConfig}>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)
