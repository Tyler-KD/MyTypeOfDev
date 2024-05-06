import { Outlet } from 'react-router-dom'
import Navbar from './components/Navbar'
import Header from './components/Header'
import Footer from './components/Footer'
import LandingPage from './pages/LandingPage'
import { io } from "socket.io-client";
import { Routes } from "react-router-dom";

import './index.css'

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { useState } from 'react'
import { useEffect } from 'react'


// Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: "/graphql",
});

// Construct request middleware that will attach the JWT token to every request as an 'authorization' header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from the local storage if it exists
  const token = localStorage.getItem("id_token");
  // return the header to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  // Set up our client to execute the 'authLink' middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState("");
  const [socket, setSocket] = useState(null);
  
  useEffect(()=>{
    setSocket(io("http://localhost:4000"));
  },[])

  useEffect(()=>{
    socket?.emit("newUser", user)
  }, [socket, user])


  
  return (

    // ApolloProvider wraps the application and places the client on the context, which allows access to it from anywhere in the component tree.
    <ApolloProvider client={client}>
      <>
        <Header />

        {/* The Outlet component is a placeholder that renders the matched route's component */}
        <Outlet />

        <Footer />
      </>
    </ApolloProvider>
  );
}

export default App
