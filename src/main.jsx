import { createRoot } from 'react-dom/client';
import './index.css';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import HeroRegister from './components/HeroRegister/HeroRegister.jsx';
import Home from './components/Home/Home.jsx';
import Login from './components/Login/Login.jsx';
import MainLayout from './components/MainLayout/MainLayout.jsx';
import Register from './components/Register/Register.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <Home></Home>
      },
      {
        path: '/login',
        element: <Login></Login>
      },
      {
        path: '/register',
        element: <Register></Register>
      },
      {
        path: '/heroRegister',
        element: <HeroRegister></HeroRegister>
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)


// https://domineering-sea.surge.sh/