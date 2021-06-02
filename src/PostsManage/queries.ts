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
  ) {
    posts(
      after: $after
      before: $before
      first: $first
      last: $last
      filter: $filter #   channel: $channel
    ) {
      edges {
        node {
          id
          title
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

//

// const createPost = gql`
//   mutation CreatePost($title: String, $content: JSONString, $store: ID!) {
//     postCreate(input: { title: $title, content: $content, store: $store }) {
//       postErrors {
//         field
//         message
//       }
//       post {
//         title
//         content
//         media {
//           image
//         }
//       }
//     }
//   }
// `;

// export const TypedPostCreate = TypedMutation<any, any>(createPost);

// list media post
const getListMedia = gql`
  query posts {
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
