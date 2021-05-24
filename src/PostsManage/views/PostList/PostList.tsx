import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import useBulkActions from "@saleor/hooks/useBulkActions";
import useListSettings from "@saleor/hooks/useListSettings";
import useNavigator from "@saleor/hooks/useNavigator";
import usePaginator, {
  createPaginationState
} from "@saleor/hooks/usePaginator";
import { maybe } from "@saleor/misc";
import PostListPage from "@saleor/PostsManage/components/PostListPage";
import { usePostListQuery } from "@saleor/PostsManage/queries";
import {
  postAddPath,
  PostListUrlQueryParams,
  PostsListUrlDialog,
  postsManagementListUrl,
  postUrl
} from "@saleor/PostsManage/urls";
import { ListViews } from "@saleor/types";
import createDialogActionHandlers from "@saleor/utils/handlers/dialogActionHandlers";
import createSortHandler from "@saleor/utils/handlers/sortHandler";
import { getSortParams } from "@saleor/utils/sort";
import React from "react";

interface IProps {
  params: any;
}

function PostList({ params }: IProps) {
  const navigate = useNavigator();
  const paginate = usePaginator();
  const { updateListSettings, settings } = useListSettings(
    ListViews.STORE_LIST
  );

  const { isSelected, listElements, toggle, toggleAll } = useBulkActions(
    params.ids
  );

  const paginationState = createPaginationState(settings.rowNumber, params);

  const queryVariables = React.useMemo(
    () => ({
      ...paginationState
    }),
    [params]
  );

  const { loadNextPage, loadPreviousPage, pageInfo } = paginate(
    maybe(() => data.posts.pageInfo),
    paginationState,
    params
  );

  const { data, loading } = usePostListQuery({
    displayLoader: true,
    variables: queryVariables
  });

  const [openModal] = createDialogActionHandlers<
    PostsListUrlDialog,
    PostListUrlQueryParams
  >(navigate, postsManagementListUrl, params);

  const handleSort = createSortHandler(
    navigate,
    postsManagementListUrl,
    params
  );

  return (
    <>
      <PostListPage
        isChecked={isSelected}
        disabled={loading}
        posts={maybe(() => (data.posts.edges || []).map(edge => edge.node))}
        onRowClick={id => () => navigate(postUrl(id))}
        onAdd={() => navigate(postAddPath)}
        onNextPage={loadNextPage}
        onPreviousPage={loadPreviousPage}
        pageInfo={pageInfo}
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
        selected={listElements.length}
        toggle={toggle}
        sort={getSortParams(params)}
        onSort={handleSort}
        toggleAll={toggleAll}
        onUpdateListSettings={updateListSettings}
      />
    </>
  );
}

export default PostList;
