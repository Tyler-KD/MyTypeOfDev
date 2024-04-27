import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import App from './App.jsx'
import './index.css'

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
// )

// const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <App />,
//     errorElement: <h1 className='display-2'>Wrong page!</h1>,

//   }
// ])

const root = document.getElementById('root');
ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path='/' element={<App />} />
      </Routes>
    </Router>
  </React.StrictMode>
)