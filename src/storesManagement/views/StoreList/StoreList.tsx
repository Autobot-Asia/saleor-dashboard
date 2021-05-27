import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import { DEFAULT_INITIAL_PAGINATION_DATA } from "@saleor/config";
import useBulkActions from "@saleor/hooks/useBulkActions";
import useListSettings from "@saleor/hooks/useListSettings";
import useNavigator from "@saleor/hooks/useNavigator";
import usePaginator, {
  createPaginationState
} from "@saleor/hooks/usePaginator";
import { maybe } from "@saleor/misc";
import { useStoreListQuery } from "@saleor/storesManagement/queries";
import {
  storeAddUrl,
  StoreListUrlQueryParams,
  StoresListUrlDialog,
  storesManagementListUrl,
  storeUrl
} from "@saleor/storesManagement/urls";
import { ListViews } from "@saleor/types";
import createDialogActionHandlers from "@saleor/utils/handlers/dialogActionHandlers";
import createFilterHandlers from "@saleor/utils/handlers/filterHandlers";
import createSortHandler from "@saleor/utils/handlers/sortHandler";
import { getSortParams } from "@saleor/utils/sort";
import React from "react";

import StoreListPage from "../../components/StoreListPage";
import {
  areFiltersApplied,
  getFilterOpts,
  getFilterQueryParam,
  getFilterTabs
} from "./filters";

interface CustomerListProps {
  params: any;
}

export const CustomerList: React.FC<CustomerListProps> = ({ params }) => {
  const navigate = useNavigator();
  const paginate = usePaginator();
  const { isSelected, listElements, reset, toggle, toggleAll } = useBulkActions(
    params.ids
  );
  const tabs = getFilterTabs();
  const currentTab =
    params.activeTab === undefined
      ? areFiltersApplied(params)
        ? tabs.length + 1
        : 0
      : parseInt(params.activeTab, 0);

  const [
    changeFilters,
    resetFilters,
    handleSearchChange
  ] = createFilterHandlers({
    cleanupFn: reset,
    createUrl: storesManagementListUrl,
    getFilterQueryParam,
    navigate,
    params
  });
  const { updateListSettings, settings } = useListSettings(
    ListViews.STORE_LIST
  );
  const paginationState = createPaginationState(settings.rowNumber, params);

  const queryVariables = React.useMemo(
    () => ({
      ...paginationState
    }),
    [params]
  );

  const { data, loading } = useStoreListQuery({
    displayLoader: true,
    variables: queryVariables
  });

  const handleTabChange = (tab: number) => {
    reset();
    navigate(
      storesManagementListUrl({
        activeTab: tab.toString()
        // ...getFilterTabs()[tab - 1].data
      })
    );
  };

  const [openModal] = createDialogActionHandlers<
    StoresListUrlDialog,
    StoreListUrlQueryParams
  >(navigate, storesManagementListUrl, params);

  const { loadNextPage, loadPreviousPage, pageInfo } = paginate(
    maybe(() => data.stores.pageInfo),
    paginationState,
    params
  );
  const handleSort = createSortHandler(
    navigate,
    storesManagementListUrl,
    params
  );

  React.useEffect(
    () =>
      navigate(
        storesManagementListUrl({
          ...params,
          ...DEFAULT_INITIAL_PAGINATION_DATA
        }),
        true
      ),
    [settings.rowNumber]
  );

  return (
    <>
      <StoreListPage
        currentTab={currentTab}
        filterOpts={getFilterOpts(params)}
        initialSearch={params.query || ""}
        onSearchChange={handleSearchChange}
        onFilterChange={changeFilters}
        onAll={resetFilters}
        onTabChange={handleTabChange}
        onTabDelete={() => openModal("delete-search")}
        onTabSave={() => openModal("save-search")}
        tabs={tabs.map(tab => tab.name)}
        stores={maybe(() => (data.stores.edges || []).map(edge => edge.node))}
        settings={settings}
        disabled={loading}
        pageInfo={pageInfo}
        onAdd={() => navigate(storeAddUrl)}
        onNextPage={loadNextPage}
        onPreviousPage={loadPreviousPage}
        onUpdateListSettings={updateListSettings}
        onRowClick={id => () => navigate(storeUrl(id))}
        onSort={handleSort}
        toolbar={
          <IconButton
            color="primary"
            onClick={() =>
              openModal("remove", {
                ids: listElements
              })
            }
          >
            <DeleteIcon />
          </IconButton>
        }
        isChecked={isSelected}
        selected={listElements.length}
        sort={getSortParams(params)}
        toggle={toggle}
        toggleAll={toggleAll}
      />
    </>
  );
};
export default CustomerList;
