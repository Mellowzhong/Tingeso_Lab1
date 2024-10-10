import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import ComponentsWithNavBar from './Components/ComponentsWithNavBar.jsx';
import './index.css'

import UserForm from './User/Components/UserForm.jsx';
import ErrorPage from './Components/ErrorPage.jsx';
import CreditRequest from './CreditRequest/Views/CreditRequest.jsx';
import Simulation from './Simulation/Views/Simulation.jsx';

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
    path: "/creditRequest",
    element: (
      <ComponentsWithNavBar>
        <CreditRequest />
      </ComponentsWithNavBar >
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/simulation",
    element: (
      <ComponentsWithNavBar>
        <Simulation />
      </ComponentsWithNavBar >
    ),
    errorElement: <ErrorPage />,
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
