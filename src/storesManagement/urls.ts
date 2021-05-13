import {
  ActiveTab,
  BulkAction,
  Dialog,
  Filters,
  Pagination,
  Sort,
  TabActionDialog
} from "@saleor/types";
import { stringifyQs } from "@saleor/utils/urls";
import urlJoin from "url-join";

export const storeSection = "/storesManagement/";

export const storesManagementSection = "/storesManagement/";

export const storeListPath = storesManagementSection;

export type StoresListUrlDialog = "remove" | TabActionDialog;

export type StoreListUrlQueryParams = ActiveTab &
  BulkAction &
  StoreListUrlFilters &
  StoreListUrlSort &
  Dialog<StoreListUrlDialog> &
  Pagination;

export type StoreListUrlDialog = "remove" | TabActionDialog;

export enum StoreListUrlFiltersEnum {
  joinedFrom = "joinedFrom",
  joinedTo = "joinedTo",
  numberOfOrdersFrom = "numberOfOrdersFrom",
  numberOfOrdersTo = "numberOfOrdersTo",
  query = "query"
}

export enum StoreListUrlSortField {
  name = "name"
}

export type StoreListUrlSort = Sort<StoreListUrlSortField>;

export type StoreListUrlFilters = Filters<StoreListUrlFiltersEnum>;

export const storePath = (id: string) => urlJoin(storeSection, id);
export type StoreUrlDialog = "remove";
export type StoreUrlQueryParams = Dialog<StoreUrlDialog>;
export const storeUrl = (id: string, params?: StoreUrlQueryParams) =>
  storePath(encodeURIComponent(id)) + "?" + stringifyQs(params);

export const storesManagementListUrl = (params?: any) =>
  storeListPath + "?" + stringifyQs(params);

export const storeDetailPath = (id: string) => urlJoin(storePath(id), "detail");

export const storeAddPath = urlJoin(storeSection, "add");
export const storeAddUrl = storeAddPath;

export const storeEditPath = (id: string) => urlJoin(storePath(id), "edit");
