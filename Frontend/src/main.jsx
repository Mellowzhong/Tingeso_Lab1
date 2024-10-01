import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { store, persistor } from './Storage/Store.js';
import { PersistGate } from 'redux-persist/integration/react';
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
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <StrictMode>
        {/* <App /> */}
        <RouterProvider router={router} />
      </StrictMode>
    </PersistGate>
  </Provider>
)
