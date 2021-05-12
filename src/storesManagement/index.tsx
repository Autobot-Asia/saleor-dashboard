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
  storeListPath,
  storePath,
  StoreUrlQueryParams
} from "./urls";
import StoreCreateView from "./views/StoreCreate";
import StoreDetailInfomation from "./views/StoreDetailInfomation";
// import StoreDetailsViewComponent from "./views/StoreDetailsViewComponent";
import StoreListViewComponent from "./views/StoreList";

const StoreListView: React.FC<RouteComponentProps<{}>> = ({ location }) => {
  const qs = parseQs(location.search.substr(1));
  const params: any = asSortParams(qs, CustomerListUrlSortField);

  return <StoreListViewComponent params={params} />;
};

// const StoreCreateView: React.FC<RouteComponentProps<{}>> = ({ location }) => {
//   const qs = parseQs(location.search.substr(1));
//   const params: any = asSortParams(qs, CustomerListUrlSortField);

//   return <StoreListViewComponent params={params} />;
// };

// import HomePage from "./views";
interface StoreDetailsRouteParams {
  id: string;
}
const DetailStoreView: React.FC<RouteComponentProps<
  StoreDetailsRouteParams
>> = ({ location, match }) => {
  const qs = parseQs(location.search.substr(1));
  const params: StoreUrlQueryParams = qs;
  return (
    // <StoreDetailsViewComponent
    //   id={decodeURIComponent(match.params.id)}
    //   params={params}
    // />
    // store detail info
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
        <Route exact path={storeAddPath} component={StoreCreateView} />
        <Route exact path={storePath(":id")} component={DetailStoreView} />
      </Switch>
    </>
  );
};
