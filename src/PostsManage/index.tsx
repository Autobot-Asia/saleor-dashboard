import { WindowTitle } from "@saleor/components/WindowTitle";
import { CustomerListUrlSortField } from "@saleor/customers/urls";
import { sectionNames } from "@saleor/intl";
import { asSortParams } from "@saleor/utils/sort";
import { parse as parseQs } from "qs";
import React from "react";
import { useIntl } from "react-intl";
import { Route, RouteComponentProps, Switch } from "react-router-dom";

import { postListPath } from "./urls";
import PostListViewComponent from "./views/PostList";

const PostListView: React.FC<RouteComponentProps<{}>> = ({ location }) => {
  const qs = parseQs(location.search.substr(1));
  const params: any = asSortParams(qs, CustomerListUrlSortField);

  return <PostListViewComponent params={params} />;
};

function PostSection() {
  const intl = useIntl();
  return (
    <>
      <WindowTitle title={intl.formatMessage(sectionNames.posts)} />
      <Switch>
        <Route exact path={postListPath} component={PostListView} />
        {/* <Route exact path={storeListPath} component={PostListView} />
        
          <Route exact path={storePath(":id")} component={DetailStoreView} /> */}
      </Switch>
    </>
  );
}

export default PostSection;
