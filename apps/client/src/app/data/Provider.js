import React from 'react';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { ApolloProvider } from '@apollo/react-hooks';



const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache(),
});


const Provider = props => (
  <ApolloProvider client={client} {...props} />
);

export default Provider;
