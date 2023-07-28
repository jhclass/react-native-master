import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  makeVar,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const isLoggedInVar = makeVar(false);
export const tokenVar = makeVar("");
//ngrok
//email : googlemail.com
// const httpLink = createHttpLink({
//   uri: "https://c1cb-61-75-87-148.ngrok-free.app/graphql",
// });
// Initialize Apollo Client

const httpLink = createHttpLink({
  uri: "https://ef85-61-75-87-148.ngrok-free.app/graphql",
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      token: tokenVar(),
    },
  };
});

export const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        seedFeed: {
          keyArgs: false,
        },
      },
    },
  },
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: cache,
});
export const logUserIn = async (token) => {
  client.resetStore();
  await AsyncStorage.multiSet([
    ["token", token],
    ["loggedIn", "yes"],
  ]);
  tokenVar(token);
  isLoggedInVar(true);
};

export const logoutFunc = async () => {
  const keys = ["token", "loggedIn"];
  await AsyncStorage.multiRemove(keys);
  tokenVar(false);
  isLoggedInVar(null);
  //client.resetStore();
};

export default client;
