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
import Simulation from './Simlulation/Views/Simulation.jsx';

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
    path: "/simulation",
    element: (
      <ComponentsWithNavBar>
        <Simulation />
      </ComponentsWithNavBar >
    ),
    errorElement: <ErrorPage />,
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
