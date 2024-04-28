import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import HomePage from './pages/HomePage.jsx'
import ProfilePage from './pages/ProfilePage.jsx'
import LandingPage from './pages/LandingPage.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom/dist'
import CreateProfile from './pages/CreateProfile.jsx'


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <LandingPage />
      }, {
        path: '/homepage',
        element: <HomePage />
      }, {
        path: '/profilepage',
        element: <ProfilePage />
      },
      {
        path: '/createprofile',
        element: <CreateProfile />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)