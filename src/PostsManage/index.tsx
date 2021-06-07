import { WindowTitle } from "@saleor/components/WindowTitle";
import { CustomerListUrlSortField } from "@saleor/customers/urls";
import { sectionNames } from "@saleor/intl";
import { asSortParams } from "@saleor/utils/sort";
import { parse as parseQs } from "qs";
import React from "react";
import { useIntl } from "react-intl";
import { Route, RouteComponentProps, Switch } from "react-router-dom";

import { postAddPath, postEditPath, postListPath, postPath } from "./urls";
import PostDetailViewComponents from "./views/PostDetailViewComponents";
import PostDetailViewInfoComponent from "./views/PostDetailViewInfo";
import PostListViewComponent from "./views/PostList";

const StoreListView: React.FC<RouteComponentProps<{}>> = ({ location }) => {
  const qs = parseQs(location.search.substr(1));
  const params: any = asSortParams(qs, CustomerListUrlSortField);

  return <PostListViewComponent params={params} />;
};

const PostDetailView: React.FC<RouteComponentProps<any>> = ({ match }) => {
  const qs = parseQs(location.search.substr(1));
  const params: any = asSortParams(qs, CustomerListUrlSortField);

  return (
    <PostDetailViewComponents
      id={decodeURIComponent(match.params.id)}
      params={params}
    />
  );
};

const PostDetailViewInfo: React.FC<RouteComponentProps<any>> = ({ match }) => {
  const qs = parseQs(location.search.substr(1));
  const params: any = asSortParams(qs, CustomerListUrlSortField);

  return (
    <PostDetailViewInfoComponent
      id={decodeURIComponent(match.params.id)}
      params={params}
    />
  );
};

function PostSection() {
  const intl = useIntl();
  return (
    <>
      <WindowTitle title={intl.formatMessage(sectionNames.posts)} />
      <Switch>
        <Route exact path={postListPath} component={StoreListView} />
        <Route exact path={postAddPath} component={PostDetailView} />
        <Route exact path={postPath(":id")} component={PostDetailViewInfo} />
        <Route exact path={postEditPath(":id")} component={PostDetailView} />

        {/* <Route exact path={storeListPath} component={StoreListView} />
          <Route exact path={storeAddPath} component={StoreCreateView} />
          <Route exact path={storePath(":id")} component={DetailStoreView} /> */}
      </Switch>
    </>
  );
}

export default PostSection;
