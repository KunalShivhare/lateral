import { ApolloClient, InMemoryCache } from "@apollo/client";

const VITE_HASURA_GRAPHQL_URL = "https://lateral-test.hasura.app/v1/graphql";
const VITE_HASURA_ADMIN_SECRET =
  "0xl8ecgBkYIC0LTbxHFsWKG5uqO3XJEQurXgNPwknNrn1tgoYZJBy26nLSEkGRFf";

export const client = new ApolloClient({
  uri: VITE_HASURA_GRAPHQL_URL,
  cache: new InMemoryCache(),
  headers: {
    "x-hasura-admin-secret": VITE_HASURA_ADMIN_SECRET,
  },
});
