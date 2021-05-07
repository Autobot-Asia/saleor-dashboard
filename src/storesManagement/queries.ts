import makeQuery from "@saleor/hooks/makeQuery";
import gql from "graphql-tag";

import { ListStores, ListStoresVariables } from "./types/ListStores";

export const storesList = gql`
  query ListStores(
    $after: String
    $before: String
    $first: Int
    $last: Int
    $filter: StoreFilterInput
  ) # $channel: String
  {
    stores(
      after: $after
      before: $before
      first: $first
      last: $last
      filter: $filter
    ) #   channel: $channel
    {
      edges {
        node {
          id
          name
          description
          latlong
          acreage
          userName
          dateJoined
        }
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
    }
  }
`;

export const useStoreListQuery = makeQuery<ListStores, ListStoresVariables>(
  storesList
);
