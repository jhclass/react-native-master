import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  makeVar,
} from "@apollo/client";

export const isLoggedInVar = makeVar(false);
//ngrok
//email : googlemail.com
// const httpLink = createHttpLink({
//   uri: "https://c1cb-61-75-87-148.ngrok-free.app/graphql",
// });
// Initialize Apollo Client
const client = new ApolloClient({
  uri: "https://c1cb-61-75-87-148.ngrok-free.app/graphql",
  cache: new InMemoryCache(),
});

export default client;
