import makeMutation from "@saleor/hooks/makeMutation";
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
const storeUpdateMutation = gql`
  mutation storeUpdate(
    $id: ID!
    $storeTypeId: ID!
    $name: String
    $description: JSONString
    $phone: String
    $acreage: Float
    $latlong: String
    $backgroundImage: Upload
    $backgroundImageAlt: String
  ) {
    storeUpdate(
      id: $id
      input: {
        name: $name
        description: $description
        storeType: $storeTypeId
        phone: $phone
        acreage: $acreage
        latlong: $latlong
        backgroundImage: $backgroundImage
        backgroundImageAlt: $backgroundImageAlt
      }
    ) {
      store {
        id
        name
        description
        phone
        latlong
        backgroundImage {
          alt
        }
      }
      storeErrors {
        message
        field
      }
    }
  }
`;

// update store
export const useUpdateStoreMutation = makeMutation<
  UpdateStore,
  UpdateStoreVariables
>(storeUpdateMutation);
//

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

export const useListStoreTypeQuery = makeQuery<IStoreType, {}>(storeTypeQuery);

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

export interface UpdateStore_storeUpdate {
  __typename: "StoreUpdate";
  /**
   * List of errors that occurred executing the mutation.
   */
  StoreErrors: UpdateStore_storeUpdate_errors[];
  /**
   * Informs whether users need to confirm their email address.
   */
  requiresConfirmation: boolean | null;
  store: StoreResponse;
}

export interface StoreResponse {
  backgroundImage: { alt: string; __typename: "Image" };
  description: string;
  id: string;
  latlong: string;
  name: string;
  phone: string;
  __typename: "Store";
}

export interface UpdateStore {
  /**
   * Register a new user.
   */
  storeUpdate: UpdateStore_storeUpdate | null;
}

export interface UpdateStore_storeUpdate_errors {
  __typename: "StoreError";
  /**
   * Name of a field that caused the error. A value of `null` indicates that the
   * error isn't associated with a particular field.
   */
  field: string | null;
  /**
   * The error message.
   */
  message: string | null;
}

export interface UpdateStoreVariables {
  name: string;
  id: string;
  description?: string;
  storeTypeId: string;
  phone?: string;
  acreage?: number;
  latlong?: string;
  backgroundImage?: string;
  backgroundImageAlt?: string;
}
