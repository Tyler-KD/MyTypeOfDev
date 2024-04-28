import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './components/Navbar'
import Header from './components/Header'

import './index.css'

function App() {
  return (

    // ApolloProvider wraps the application and places the client on the context, which allows access to it from anywhere in the component tree.

    <>
      <Header>
        <Navbar />
        {/* The Outlet component is a placeholder that renders the matched route's component */}
        <Outlet />
      </Header>
    </>

  );
}

export default App
