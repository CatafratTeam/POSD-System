import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import { BASE_URL } from "../constants";

const client = new ApolloClient({
  link: new HttpLink({
    uri: `${BASE_URL}/graphql`,
  }),
  cache: new InMemoryCache(),
});

export default client;
