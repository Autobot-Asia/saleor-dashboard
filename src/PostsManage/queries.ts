import makeMutation from "@saleor/hooks/makeMutation";
import makeQuery from "@saleor/hooks/makeQuery";
import { TypedQuery } from "@saleor/queries";
import gql from "graphql-tag";

import { ListPosts, ListPostsVariables } from "./types/ListPost";

export const listPost = gql`
  query ListPosts(
    $after: String
    $before: String
    $first: Int
    $last: Int
    $filter: PostFilterInput # $channel: String
    $sort: PostSortingInput
  ) {
    posts(
      after: $after
      before: $before
      first: $first
      last: $last
      filter: $filter #   channel: $channel
      sortBy: $sort
    ) {
      edges {
        node {
          id
          title
          updatedAt
          content
          media {
            id
            image
          }
        }
      }
    }
  }
`;

export const usePostListQuery = makeQuery<ListPosts, ListPostsVariables>(
  listPost
);

// list media post
const getListMedia = gql`
  query posts($id: ID) {
    post(id: $id) {
      id
      title
      content
      updatedAt
      media {
        id
        image
        alt
      }
    }
  }
`;
export const TypedListMedia = TypedQuery<any, {}>(getListMedia);

// createPost
export const postCreateMutation = gql`
  mutation CreatePost($title: String, $content: JSONString, $store: ID!) {
    postCreate(input: { title: $title, content: $content, store: $store }) {
      postErrors {
        field
        message
      }
      post {
        id
        media {
          image
        }
      }
    }
  }
`;
export const usePostCreateMutation = makeMutation<any, any>(postCreateMutation);

export const postDeleteBulkMutation = gql`
  mutation deleteMedia($ids: [ID]!) {
    postMediaBulkDelete(ids: $ids) {
      menuErrors {
        message
      }
      count
    }
  }
`;

export const usePostDeleteBulkMutation = makeMutation<any, any>(
  postDeleteBulkMutation
);

// createPost Media
export const postMediaCreateMutation = gql`
  mutation createMedia($post: ID!, $image: Upload, $alt: String) {
    postMediaCreate(input: { post: $post, alt: $alt, image: $image }) {
      post {
        id
      }
      postErrors {
        message
      }
    }
  }
`;
export const usePostMediaCreateMutation = makeMutation<any, any>(
  postMediaCreateMutation
);

export const deletePostMutation = gql`
  mutation DeletePost($id: ID!) {
    postDelete(id: $id) {
      PostErrors {
        message
      }
      post {
        id
      }
    }
  }
`;
export const usePostDeleteMutation = makeMutation<any, any>(deletePostMutation);

// createPost Media
export const postUpdateMutation = gql`
  mutation updatePost($id: ID!, $input: PostInput!) {
    postUpdate(id: $id, input: $input) {
      postErrors {
        message
      }
      post {
        id
        media {
          id
          image
        }
      }
    }
  }
`;
export const usePostUpdateMutation = makeMutation<any, any>(postUpdateMutation);

export const postById = gql`
  query getPostById($id: ID!) {
    post(id: $id) {
      id
      title
      content
      media {
        id
        image
        alt
      }
    }
  }
`;

export const usePostById = makeQuery<any, {}>(postById);
