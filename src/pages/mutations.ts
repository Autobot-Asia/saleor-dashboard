import {
  pageErrorFragment,
  pageErrorWithAttributesFragment
} from "@saleor/fragments/errors";
import { pageDetailsFragment } from "@saleor/fragments/pages";
import makeMutation from "@saleor/hooks/makeMutation";
import { TypedQuery } from "@saleor/queries";
import gql from "graphql-tag";

import { TypedMutation } from "../mutations";
import {
  PageBulkPublish,
  PageBulkPublishVariables
} from "./types/PageBulkPublish";
import {
  PageBulkRemove,
  PageBulkRemoveVariables
} from "./types/PageBulkRemove";
import {
  ListCarouselRes,
  PageCarouselCreate,
  PageCarouselDelete,
  PageCarouselDeleteVariables,
  PageCarouselVariables
} from "./types/PageCarousel";
import { PageCreate, PageCreateVariables } from "./types/PageCreate";
import { PageRemove, PageRemoveVariables } from "./types/PageRemove";
import { PageUpdate, PageUpdateVariables } from "./types/PageUpdate";

export const pageCarouselCreateMutation = gql`
  mutation createPageMedia($page: ID!, $image: Upload, $alt: String) {
    pageMediaCreate(input: { page: $page, alt: $alt, image: $image }) {
      page {
        id
      }

      pageErrors {
        code
        field
      }
    }
  }
`;
export const usePageCarouselCreateMutation = makeMutation<
  PageCarouselCreate,
  PageCarouselVariables
>(pageCarouselCreateMutation);

export const pageCarouselDeleteMutation = gql`
  mutation updatePageMedia($mediaId: ID!, $isActive: Boolean, $alt: String) {
    pageMediaUpdate(id: $mediaId, input: { isActive: $isActive, alt: $alt }) {
      media {
        isActive
        alt
      }
    }
  }
`;

export const usePageCarouselDeleteMutation = makeMutation<
  PageCarouselDelete,
  PageCarouselDeleteVariables
>(pageCarouselDeleteMutation);

const pageCreate = gql`
  ${pageDetailsFragment}
  ${pageErrorWithAttributesFragment}
  mutation PageCreate($input: PageCreateInput!) {
    pageCreate(input: $input) {
      errors: pageErrors {
        ...PageErrorWithAttributesFragment
        message
      }
      page {
        ...PageDetailsFragment
      }
    }
  }
`;
export const TypedPageCreate = TypedMutation<PageCreate, PageCreateVariables>(
  pageCreate
);

const pageUpdate = gql`
  ${pageDetailsFragment}
  ${pageErrorWithAttributesFragment}
  mutation PageUpdate($id: ID!, $input: PageInput!) {
    pageUpdate(id: $id, input: $input) {
      errors: pageErrors {
        ...PageErrorWithAttributesFragment
      }
      page {
        ...PageDetailsFragment
      }
    }
  }
`;
export const usePageUpdateMutation = makeMutation<
  PageUpdate,
  PageUpdateVariables
>(pageUpdate);

const pageRemove = gql`
  ${pageErrorFragment}
  mutation PageRemove($id: ID!) {
    pageDelete(id: $id) {
      errors: pageErrors {
        ...PageErrorFragment
      }
    }
  }
`;
export const usePageRemoveMutation = makeMutation<
  PageRemove,
  PageRemoveVariables
>(pageRemove);

const pageBulkPublish = gql`
  mutation PageBulkPublish($ids: [ID]!, $isPublished: Boolean!) {
    pageBulkPublish(ids: $ids, isPublished: $isPublished) {
      errors {
        field
        message
      }
    }
  }
`;
export const TypedPageBulkPublish = TypedMutation<
  PageBulkPublish,
  PageBulkPublishVariables
>(pageBulkPublish);

const pageBulkRemove = gql`
  mutation PageBulkRemove($ids: [ID]!) {
    pageBulkDelete(ids: $ids) {
      errors {
        field
        message
      }
    }
  }
`;
export const TypedPageBulkRemove = TypedMutation<
  PageBulkRemove,
  PageBulkRemoveVariables
>(pageBulkRemove);

const getListCarousel = gql`
  query pages {
    pages(first: 10) {
      edges {
        node {
          id
          media {
            isActive
            id
            image
          }
        }
      }
    }
  }
`;
export const TypedListCarousel = TypedQuery<ListCarouselRes, {}>(
  getListCarousel
);
