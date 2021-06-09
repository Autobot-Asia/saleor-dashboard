import { PostListUrlSortField } from "@saleor/PostsManage/urls";
import { PostSortField } from "@saleor/types/globalTypes";
import { createGetSortQueryVariables } from "@saleor/utils/sort";

export function getSortQueryField(sort: PostListUrlSortField): PostSortField {
  switch (sort) {
    // case PostListUrlSortField.name:
    //   return PostSortField.NAME;
    case PostListUrlSortField.date:
      return PostSortField.UPDATEDAT;

    default:
      return undefined;
  }
}

export const getSortQueryVariables = createGetSortQueryVariables(
  getSortQueryField
);
