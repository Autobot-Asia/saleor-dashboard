import {
  ActiveTab,
  BulkAction,
  Dialog,
  Pagination,
  TabActionDialog
} from "@saleor/types";
import { stringifyQs } from "@saleor/utils/urls";
import urljoin from "url-join";

export const postsManagementSection = "/postsManagement/";
export const postListPath = postsManagementSection;

export const postsManagementListUrl = (params?: any) =>
  postListPath + "?" + stringifyQs(params);

export const postPath = (id: string) => urljoin(postsManagementSection, id);

export type PostUrlDialog = "remove";

export type PostListUrlQueryParams = ActiveTab &
  BulkAction &
  //   StoreListUrlFilters &
  //   StoreListUrlSort &
  Dialog<PostsListUrlDialog> &
  Pagination;

export type PostsListUrlDialog = "remove" | TabActionDialog;

export type PostUrlQueryParams = Dialog<PostUrlDialog>;
export const postUrl = (id: string, params?: PostUrlQueryParams) =>
  postPath(encodeURIComponent(id)) + "?" + stringifyQs(params);

export const postListUrl = (params?: PostListUrlQueryParams) =>
  postListPath + "?" + stringifyQs(params);

export const postAddPath = urljoin(postsManagementSection, "add");
