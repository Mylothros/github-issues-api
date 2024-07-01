import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

const client = new ApolloClient({
  ssrMode: true,
  link: new HttpLink({
    uri: "https://api.github.com/graphql",
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_GRAPHQL_BEARER_TOKEN}`,
    },
  }),
  cache: new InMemoryCache(),
});
export default client;