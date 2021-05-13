import { CustomerListUrlSortField } from "@saleor/customers/urls";
import { sectionNames } from "@saleor/intl";
import { asSortParams } from "@saleor/utils/sort";
import { parse as parseQs } from "qs";
import React from "react";
import { useIntl } from "react-intl";
import { Route, RouteComponentProps, Switch } from "react-router-dom";

import { WindowTitle } from "../components/WindowTitle";
import {
  storeAddPath,
  storeEditPath,
  storeListPath,
  storePath,
  StoreUrlQueryParams
} from "./urls";
import StoreCreateView from "./views/StoreCreate";
import StoreDetailInfomation from "./views/StoreDetailInfomation";
import StoreDetailsViewComponent from "./views/StoreDetailsViewComponent";
// import StoreDetailsViewComponent from "./views/StoreDetailsViewComponent";
import StoreListViewComponent from "./views/StoreList";

const StoreListView: React.FC<RouteComponentProps<{}>> = ({ location }) => {
  const qs = parseQs(location.search.substr(1));
  const params: any = asSortParams(qs, CustomerListUrlSortField);

  return <StoreListViewComponent params={params} />;
};

interface StoreDetailsRouteParams {
  id: string;
}
const DetailStoreView: React.FC<RouteComponentProps<
  StoreDetailsRouteParams
>> = ({ location, match }) => {
  const qs = parseQs(location.search.substr(1));
  const params: StoreUrlQueryParams = qs;

  return (
    <StoreDetailsViewComponent
      id={decodeURIComponent(match.params.id)}
      params={params}
    />
  );
};

const DetailStoreViewMode: React.FC<RouteComponentProps<
  StoreDetailsRouteParams
>> = ({ location, match }) => {
  const qs = parseQs(location.search.substr(1));
  const params: StoreUrlQueryParams = qs;
  return (
    <StoreDetailInfomation
      id={decodeURIComponent(match.params.id)}
      params={params}
    />
  );
};

export const StoreSection: React.FC<{}> = () => {
  const intl = useIntl();

  return (
    <>
      <WindowTitle title={intl.formatMessage(sectionNames.storesManagement)} />
      <Switch>
        <Route exact path={storeListPath} component={StoreListView} />
        <Route exact path={storeAddPath} component={DetailStoreView} />
        <Route exact path={storeEditPath(":id")} component={DetailStoreView} />
        <Route exact path={storePath(":id")} component={DetailStoreViewMode} />
      </Switch>
    </>
  );
};
