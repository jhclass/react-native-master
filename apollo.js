import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  makeVar,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistCache, AsyncStorageWrapper } from "apollo3-cache-persist";
export const isLoggedInVar = makeVar(false);
export const tokenVar = makeVar("");
//ngrok
//email : googlemail.com
// const httpLink = createHttpLink({
//   uri: "https://c1cb-61-75-87-148.ngrok-free.app/graphql",
// });
// Initialize Apollo Client

export const logUserIn = async (token) => {
  await AsyncStorage.multiSet([
    ["token", token],
    ["loggedIn", "yes"],
  ]);
  isLoggedInVar(true);
};

export const logoutFunc = async () => {
  const keys = ["token", "loggedIn"];
  await AsyncStorage.multiRemove(keys);
  tokenVar("");
  isLoggedInVar(false);
};

const httpLink = createHttpLink({
  uri: "https://4646-61-75-87-148.ngrok-free.app/graphql",
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

export default client;
