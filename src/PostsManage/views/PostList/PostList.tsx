import { DialogContentText } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import ActionDialog from "@saleor/components/ActionDialog";
import { DEFAULT_INITIAL_PAGINATION_DATA } from "@saleor/config";
import useBulkActions from "@saleor/hooks/useBulkActions";
import useListSettings from "@saleor/hooks/useListSettings";
import useNavigator from "@saleor/hooks/useNavigator";
import useNotifier from "@saleor/hooks/useNotifier";
import usePaginator, {
  createPaginationState
} from "@saleor/hooks/usePaginator";
import { commonMessages } from "@saleor/intl";
import { maybe } from "@saleor/misc";
import PostListPage from "@saleor/PostsManage/components/PostListPage";
import {
  usePostDeleteMutation,
  usePostListQuery
} from "@saleor/PostsManage/queries";
import {
  postAddPath,
  PostListUrlQueryParams,
  PostsListUrlDialog,
  postsManagementListUrl,
  postsManagementSection,
  postUrl
} from "@saleor/PostsManage/urls";
import { getFilterVariables } from "@saleor/storesManagement/views/StoreList/filters";
import { getSortQueryVariables } from "@saleor/storesManagement/views/StoreList/sort";
import { ListViews } from "@saleor/types";
import createDialogActionHandlers from "@saleor/utils/handlers/dialogActionHandlers";
import createSortHandler from "@saleor/utils/handlers/sortHandler";
import { getSortParams } from "@saleor/utils/sort";
import React from "react";
import { FormattedMessage, useIntl } from "react-intl";

interface IProps {
  params: any;
}

function PostList({ params }: IProps) {
  const navigate = useNavigator();
  const notify = useNotifier();
  const intl = useIntl();
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
      ...paginationState,
      filter: getFilterVariables(params),
      sort: getSortQueryVariables(params)
    }),
    [params]
  );

  const { loadNextPage, loadPreviousPage, pageInfo } = paginate(
    maybe(() => data.posts.pageInfo),
    paginationState,
    params
  );

  const { data, loading, refetch } = usePostListQuery({
    displayLoader: true,
    variables: queryVariables
  });

  const [openModal, closeModal] = createDialogActionHandlers<
    PostsListUrlDialog,
    PostListUrlQueryParams
  >(navigate, postsManagementListUrl, params);

  const handleSort = createSortHandler(
    navigate,
    postsManagementListUrl,
    params
  );

  React.useEffect(
    () =>
      navigate(
        postsManagementListUrl({
          ...params,
          ...DEFAULT_INITIAL_PAGINATION_DATA
        }),
        true
      ),
    [settings.rowNumber]
  );

  const [deletePost] = usePostDeleteMutation({
    onCompleted: data => {
      if (data.postDelete.PostErrors.length === 0) {
        notify({
          status: "success",
          text: intl.formatMessage(commonMessages.savedChanges)
        });
        navigate(postsManagementSection);
        refetch();
        //
      }
    }
  });

  const handleDelete = () => {
    Promise.all(
      listElements.map(item => {
        deletePost({
          variables: {
            id: item
          }
        });
      })
    );
  };

  return (
    <>
      <PostListPage
        disabled={loading}
        posts={maybe(() => (data.posts.edges || []).map(edge => edge.node))}
        onRowClick={id => () => navigate(postUrl(id))}
        onAdd={() => navigate(postAddPath)}
        onNextPage={loadNextPage}
        onPreviousPage={loadPreviousPage}
        pageInfo={pageInfo}
        toolbar={
          <IconButton color="primary" onClick={() => openModal("delete")}>
            <DeleteIcon />
          </IconButton>
        }
        isChecked={isSelected}
        selected={listElements.length}
        toggle={toggle}
        sort={getSortParams(params)}
        onSort={handleSort}
        toggleAll={toggleAll}
        onUpdateListSettings={updateListSettings}
        settings={settings}
      />

      <ActionDialog
        open={params.action === "delete"}
        confirmButtonState={"default"}
        onClose={closeModal}
        onConfirm={handleDelete}
        title={intl.formatMessage({
          defaultMessage: "Delete Post",
          description: "dialog header"
        })}
        variant="delete"
      >
        <DialogContentText>
          <FormattedMessage
            defaultMessage="{counter,plural,one{Are you sure you want to delete ?} other{Are you sure you want to delete {displayQuantity} posts?}}"
            description="dialog content"
            values={{
              counter: params?.ids?.length,
              displayQuantity: <strong>{params?.ids?.length}</strong>
            }}
          />
        </DialogContentText>
      </ActionDialog>
    </>
  );
}

export default PostList;
