import React from 'react';
import { ApolloClient, ApolloLink, InMemoryCache, HttpLink } from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';




const httpLink = new HttpLink({
  uri: '/graphql',
});

const client = new ApolloClient({
  link: ApolloLink.from([httpLink]),
  cache: new InMemoryCache(),
});


const Provider = props => (
  <ApolloProvider client={client} {...props} />
);

export default Provider;
