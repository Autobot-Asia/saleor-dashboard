import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableFooter from "@material-ui/core/TableFooter";
import TableRow from "@material-ui/core/TableRow";
import Checkbox from "@saleor/components/Checkbox";
import ResponsiveTable from "@saleor/components/ResponsiveTable";
import TableCellHeader from "@saleor/components/TableCellHeader";
import TableHead from "@saleor/components/TableHead";
import TablePagination from "@saleor/components/TablePagination";
import { CustomerListUrlSortField } from "@saleor/customers/urls";
import { renderCollection } from "@saleor/misc";
import { makeStyles } from "@saleor/theme";
import { ListActions, ListProps, SortPage } from "@saleor/types";
import { getArrowDirection } from "@saleor/utils/sort";
import React from "react";
import { FormattedMessage } from "react-intl";

import { ListStores_stores_edges_node } from "../../types/ListStores";

const useStyles = makeStyles(
  theme => ({
    [theme.breakpoints.up("lg")]: {
      colEmail: {},
      colName: {},
      colOrders: {
        width: 200
      }
    },
    colEmail: {},
    colName: {
      paddingLeft: 0
    },
    colOrders: {
      textAlign: "center"
    },
    tableRow: {
      cursor: "pointer"
    }
  }),
  { name: "CustomerList" }
);

export interface StoreListProps
  extends ListProps,
    ListActions,
    SortPage<CustomerListUrlSortField> {
  stores: ListStores_stores_edges_node[];
}

const numberOfColumns = 5;

const StoreList: React.FC<StoreListProps> = props => {
  const {
    settings,
    disabled,
    stores,
    pageInfo,
    onNextPage,
    onPreviousPage,
    onUpdateListSettings,
    onRowClick,
    onSort,
    toolbar,
    toggle,
    toggleAll,
    selected,
    sort,
    isChecked
  } = props;
  const classes = useStyles(props);

  const formatDate = (date: Date) => {
    if (!date) {
      return;
    }
    const newDate = new Date(date);
    return newDate.toLocaleDateString();
  };

  return (
    <ResponsiveTable>
      <TableHead
        colSpan={numberOfColumns}
        selected={selected}
        disabled={disabled}
        items={stores}
        toggleAll={toggleAll}
        toolbar={toolbar}
      >
        <TableCellHeader
          direction={
            sort.sort === CustomerListUrlSortField.name
              ? getArrowDirection(sort.asc)
              : undefined
          }
          arrowPosition="right"
          onClick={() => onSort(CustomerListUrlSortField.name)}
          className={classes.colName}
        >
          <FormattedMessage defaultMessage="Store Name" />
        </TableCellHeader>
        <TableCellHeader
          direction={
            sort.sort === CustomerListUrlSortField.name
              ? getArrowDirection(sort.asc)
              : undefined
          }
          arrowPosition="right"
          onClick={() => onSort(CustomerListUrlSortField.name)}
          className={classes.colName}
        >
          <FormattedMessage defaultMessage="Owner" />
        </TableCellHeader>
        <TableCellHeader
          direction={
            sort.sort === CustomerListUrlSortField.email
              ? getArrowDirection(sort.asc)
              : undefined
          }
          onClick={() => onSort(CustomerListUrlSortField.email)}
          className={classes.colEmail}
        >
          <FormattedMessage defaultMessage="Address" />
        </TableCellHeader>
        <TableCellHeader
          direction={
            sort.sort === CustomerListUrlSortField.orders
              ? getArrowDirection(sort.asc)
              : undefined
          }
          textAlign="center"
          onClick={() => onSort(CustomerListUrlSortField.orders)}
          className={classes.colOrders}
        >
          <FormattedMessage defaultMessage="Joined date" />
        </TableCellHeader>
      </TableHead>
      <TableFooter>
        <TableRow>
          <TablePagination
            colSpan={numberOfColumns}
            settings={settings}
            hasNextPage={pageInfo && !disabled ? pageInfo.hasNextPage : false}
            onNextPage={onNextPage}
            onUpdateListSettings={onUpdateListSettings}
            hasPreviousPage={
              pageInfo && !disabled ? pageInfo.hasPreviousPage : false
            }
            onPreviousPage={onPreviousPage}
          />
        </TableRow>
      </TableFooter>
      <TableBody>
        {renderCollection(
          stores,
          store => {
            const isSelected = store ? isChecked(store.id) : false;

            return (
              <TableRow
                className={!!store ? classes.tableRow : undefined}
                hover={!!store}
                key={store ? store.id : "skeleton"}
                selected={isSelected}
                onClick={store ? onRowClick(store.id) : undefined}
              >
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={isSelected}
                    disabled={disabled}
                    disableClickPropagation
                    onChange={() => toggle(store.id)}
                  />
                </TableCell>
                <TableCell className={classes.colName}>
                  {/* {getUserName(store)} */}
                  {store && store.name}
                </TableCell>
                <TableCell className={classes.colEmail}>
                  {store && store.userName}
                  {/* {maybe<React.ReactNode>(() => store.email, <Skeleton />)} */}
                </TableCell>
                <TableCell className={classes.colOrders}>
                  {/* {maybe<React.ReactNode>(
                    () => store.orders.totalCount,
                    <Skeleton />
                  )} */}
                </TableCell>
                <TableCell className={classes.colOrders}>
                  {store && formatDate(store.dateJoined)}
                </TableCell>
              </TableRow>
            );
          },
          () => (
            <TableRow>
              <TableCell colSpan={numberOfColumns}>
                <FormattedMessage defaultMessage="No stores found" />
              </TableCell>
            </TableRow>
          )
        )}
      </TableBody>
    </ResponsiveTable>
  );
};
StoreList.displayName = "StoreList";
export default StoreList;
