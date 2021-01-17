import React from 'react'
import './App.scss';

import {Container} from 'react-bootstrap'

import RegisterPage from './pages/RegisterPage'

import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:4000',
  cache: new InMemoryCache()
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <Container>
        <RegisterPage />
      </Container>
    </ApolloProvider>
  )
}

export default App
