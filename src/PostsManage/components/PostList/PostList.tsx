import {
  makeStyles,
  TableBody,
  TableCell,
  TableFooter,
  TableRow
} from "@material-ui/core";
import Checkbox from "@saleor/components/Checkbox";
import ResponsiveTable from "@saleor/components/ResponsiveTable";
import TableCellHeader from "@saleor/components/TableCellHeader";
import TableHead from "@saleor/components/TableHead";
import TablePagination from "@saleor/components/TablePagination";
import { renderCollection } from "@saleor/misc";
import React from "react";
import { FormattedMessage } from "react-intl";
import { Route, Switch } from "react-router-dom";

import PostDetail from "../PostDetail/PostDetail";
const numberOfColumns = 5;

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

function PostList(props: any) {
  const {
    settings,
    disabled,
    posts,
    pageInfo,
    onNextPage,
    onPreviousPage,
    onUpdateListSettings,
    onRowClick,
    toolbar,
    toggle,
    toggleAll,
    selected,
    isChecked
  } = props;
  const classes = useStyles(props);

  return (
    <ResponsiveTable>
      <TableHead
        colSpan={numberOfColumns}
        selected={selected}
        disabled={disabled}
        items={posts}
        toggleAll={toggleAll}
        toolbar={toolbar}
      >
        <TableCellHeader arrowPosition="right" className={classes.colName}>
          <FormattedMessage defaultMessage="Title" />
        </TableCellHeader>
        <TableCellHeader arrowPosition="right" className={classes.colName}>
          <FormattedMessage defaultMessage="Content" />
        </TableCellHeader>
        <TableCellHeader className={classes.colEmail}>
          <FormattedMessage defaultMessage="Content" />
        </TableCellHeader>
        <TableCellHeader textAlign="center" className={classes.colOrders}>
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
          posts,
          (post: any) => {
            const isSelected = post ? isChecked(post.id) : false;
            return (
              <TableRow
                className={!!post ? classes.tableRow : undefined}
                hover={!!post}
                key={post ? post.id : "skeleton"}
                selected={isSelected}
                onClick={post ? onRowClick(post.id) : undefined}
              >
                <Switch>
                  <Route exact path="./postDetail" component={PostDetail} />
                </Switch>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={isSelected}
                    disabled={disabled}
                    disableClickPropagation
                    onChange={() => toggle(post.id)}
                  />
                </TableCell>
                <TableCell className={classes.colName}>
                  {/* {getUserName(post)} */}
                  {post && post.title}
                </TableCell>
                <TableCell className={classes.colEmail}>
                  {/* {post.content && JSON.parse(post.content).content} */}
                  {/* {maybe<React.ReactNode>(() => post.email, <Skeleton />)} */}
                </TableCell>
                <TableCell className={classes.colOrders}>
                  {/* {maybe<React.ReactNode>(
                    () => post.orders.totalCount,
                    <Skeleton />
                  )} */}
                </TableCell>
                <TableCell className={classes.colOrders}>
                  {/* {post && formatDate(post.dateJoined)} */}
                </TableCell>
              </TableRow>
            );
          },
          () => (
            <TableRow>
              <TableCell colSpan={numberOfColumns}>
                <FormattedMessage defaultMessage="No posts found" />
              </TableCell>
            </TableRow>
          )
        )}
      </TableBody>
    </ResponsiveTable>
  );
}

export default PostList;
