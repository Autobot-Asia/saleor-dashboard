import { CustomerListUrlSortField } from "@saleor/customers/urls";
import { sectionNames } from "@saleor/intl";
import { asSortParams } from "@saleor/utils/sort";
import { parse as parseQs } from "qs";
import React from "react";
import { useIntl } from "react-intl";
import { Route, RouteComponentProps, Switch } from "react-router-dom";

import { WindowTitle } from "../components/WindowTitle";
import { storeAddPath, storeListPath } from "./urls";
import StoreCreateView from "./views/StoreCreate";
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

export const StoreSection: React.FC<{}> = () => {
  const intl = useIntl();

  return (
    <>
      <WindowTitle title={intl.formatMessage(sectionNames.storesManagement)} />
      <Switch>
        {/* <Route exact path={customerListPath} component={CustomerListView} />
        <Route exact path={customerAddPath} component={CustomerCreateView} />
        <Route
          path={customerAddressesPath(":id")}
          component={CustomerAddressesView}
        />
        <Route path={customerPath(":id")} component={CustomerDetailsView} /> */}
        <Route exact path={storeListPath} component={StoreListView} />
        <Route exact path={storeAddPath} component={StoreCreateView} />
      </Switch>
    </>
  );
};
