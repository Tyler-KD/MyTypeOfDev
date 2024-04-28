import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import HomePage from './pages/HomePage.jsx'
import ProfilePage from './pages/ProfilePage.jsx'
import LandingPage from './pages/LandingPage.jsx'


const root = document.getElementById('root');
ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path='*' element={<App />} />
        <Route path='/' element={<LandingPage />} />
        <Route path='/homepage/*' element={<HomePage />} />
        <Route path='/profilepage/*' element={<ProfilePage />} />
      </Routes>
    </Router>
  </React.StrictMode>
)