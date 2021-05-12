import makeQuery from "@saleor/hooks/makeQuery";
import gql from "graphql-tag";

import { ListStores, ListStoresVariables } from "./types/ListStores";

export const storesList = gql`
  query ListStores(
    $after: String
    $before: String
    $first: Int
    $last: Int
    $filter: StoreFilterInput # $channel: String
  ) {
    stores(
      after: $after
      before: $before
      first: $first
      last: $last
      filter: $filter #   channel: $channel
    ) {
      edges {
        node {
          id
          name
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

// export const UpdateStore = gql``;

export const useStoreListQuery = makeQuery<ListStores, ListStoresVariables>(
  storesList
);

export const storeForUser = gql`
  query stores($id: ID!) {
    store(id: $id) {
      name
      description
      phone
      acreage
      latlong
      storeType {
        id
        name
      }
    }
  }
`;

export interface IStoreForUser {
  store: {
    name: string;
    description?: string;
    storeType: {
      id: string;
      name: string;
    };
    phone?: string;
    acreage?: number;
    latlong?: string;
    backgroundImage?: string;
    backgroundImageAlt?: string;
  };
}

export const useStoreById = makeQuery<IStoreForUser, {}>(storeForUser);


export const storeTypeQuery = gql`
  query stores {
    storeTypes(first: 10) {
      edges {
        node {
          id
          name
        }
      }
    }
  }
`;

export const useListStoreTypeQuery = makeQuery<IStoreType, {}>(
  storeTypeQuery
);

export interface IStoreType {
  storeTypes: StoreType | null;
}

export interface StoreType {
  __typename: "StoreTypeCountableConnection";
  edges: StoreTypeList_edges[];
}

export interface StoreTypeList_edges {
  __typename: "CategoryCountableEdge";
  node: StoreType_edges_node;
}

export interface StoreType_edges_node {
  __typename: "StoreType";
  id: string;
  name: string;
}