import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import HomePage from './pages/HomePage.jsx'
import ProfilePage from './pages/ProfilePage.jsx'
import LandingPage from './pages/LandingPage.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom/dist'
import CreateProfile from './pages/CreateProfile.jsx'
import SinglePost from './pages/SinglePost.jsx'
import SingleProfile from './pages/SingleProfile.jsx';
import Donations from './pages/Donations.jsx'


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <LandingPage />
      }, {
        path: '/home',
        element: <HomePage />
      }, {
        path: '/profile',
        element: <ProfilePage />
      },
      {
        path: '/createprofile',
        element: <CreateProfile />
      },
      {
        path: '/post/:postId',
        element: <SinglePost />
      },
      {
        path: '/profile/:postId',
        element: <SingleProfile />
      },
      {
        path: '/donate',
        element: <Donations />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)