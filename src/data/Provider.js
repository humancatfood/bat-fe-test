import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';



const client = new ApolloClient({
  uri: '/graphql',
});


const Provider = props => (
  <ApolloProvider client={client} {...props} />
);

export default Provider;
