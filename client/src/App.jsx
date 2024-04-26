import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Outlet } from 'react-router-dom'
import  Navbar  from './components/Navbar'
import './App.css'

function App() {
  return (

    // ApolloProvider wraps the application and places the client on the context, which allows access to it from anywhere in the component tree.
    
      <>
        <Navbar />
        {/* The Outlet component is a placeholder that renders the matched route's component */}
        <Outlet /> 
      </>
    
  );
}

export default App
