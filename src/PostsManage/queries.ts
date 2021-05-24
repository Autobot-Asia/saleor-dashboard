import makeQuery from "@saleor/hooks/makeQuery";
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

// type
