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
import { PostListUrlSortField } from "@saleor/PostsManage/urls";
import { getArrowDirection } from "@saleor/utils/sort";
import React from "react";
import { FormattedMessage } from "react-intl";
import { Route, Switch } from "react-router-dom";

import PostDetail from "../PostDetail/PostDetail";

const numberOfColumns = 4;

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
    colContent: {
      width: 700,
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis"
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
    isChecked,
    sort,
    onSort
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
        items={posts}
        toggleAll={toggleAll}
        toolbar={toolbar}
      >
        <TableCellHeader arrowPosition="right" className={classes.colName}>
          <FormattedMessage defaultMessage="Title" />
        </TableCellHeader>

        <TableCellHeader arrowPosition="right" className={classes.colContent}>
          <FormattedMessage defaultMessage="Content" />
        </TableCellHeader>

        <TableCellHeader
          arrowPosition="right"
          direction={sort.sort ? getArrowDirection(sort.asc) : undefined}
          className={classes.colOrders}
          onClick={() => onSort(PostListUrlSortField.date)}
        >
          <FormattedMessage defaultMessage="Created date" />
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
            let tempContent;
            if (post) {
              tempContent = post?.content && post?.content.replace(/'/g, '"');
            }

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
                  {post && post?.title}
                </TableCell>
                <TableCell className={classes.colContent}>
                  {/* {getUserName(post)} */}
                  {post && JSON.parse(tempContent)?.content}
                </TableCell>

                <TableCell className={classes.colOrders}>
                  {post && formatDate(post.updatedAt)}
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
