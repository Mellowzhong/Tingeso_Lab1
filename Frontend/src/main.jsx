import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import ComponentsWithNavBar from './Components/ComponentsWithNavBar.jsx';
import './index.css'

import UserLogin from './User/Components/UserLogin.jsx';
import UserForm from './User/Components/UserForm.jsx';
import ErrorPage from './Components/ErrorPage.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ComponentsWithNavBar>
        <UserForm />
      </ComponentsWithNavBar>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    element: (
      <ComponentsWithNavBar>
        <UserLogin />
      </ComponentsWithNavBar>
    ),
    errorElement: <ErrorPage />,
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
