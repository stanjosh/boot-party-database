import React from 'react';
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.jsx'
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { LandingPage, Booking, ShareParty, AdminParty, EventList, UserProfile } from './components/'
import { BootSelect } from './components/pageElements/index.js';

const host = '/api';

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const httpLink = createHttpLink({
  uri: host,
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: "/",
        element: <LandingPage />
      },
      {
        path: "/user",
        element: <UserProfile />
      },
      {
        path: "/book",
        element: <Booking />
      },
      {
        path: "/party",
        element: <Booking />
      },
      {
        path: "/party/:eventId",
        element: <ShareParty />
      },
      {
        path: "/admin/:eventId",
        element: <AdminParty />
      },
      {
        path: "/admin",
        element: <EventList />
      },
      {
        path: "/test",
        element: <BootSelect />
      },
      {
        path: "*",
        element: <h1>404</h1>
      }
    ]
  }
]);




createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ApolloProvider client={ client }>
      <RouterProvider router={router} /> 
    </ApolloProvider>
  </React.StrictMode>,
)
