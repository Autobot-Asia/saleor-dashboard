import { WindowTitle } from "@saleor/components/WindowTitle";
import useNavigator from "@saleor/hooks/useNavigator";
// import { maybe } from "@saleor/misc";
import React from "react";

import StoreDetailPage from "../components/StoreDetailPage/StoreDetailPage";
import { useStoreById } from "../queries";
import { storesManagementSection, StoreUrlQueryParams } from "../urls";
interface IProps {
  id: string;
  params: StoreUrlQueryParams;
}

const StoreDetailsViewComponent: React.FC<IProps> = ({ id }) => {
  const navigate = useNavigator();

  const { data, loading } = useStoreById({
    displayLoader: true,
    variables: { id }
  });

  return (
    <>
      {/* maybe(() => customerDetails.data.user.email) */}
      <WindowTitle title="Store detail" />
      <StoreDetailPage
        disabled={loading}
        storeId={id}
        initialValues={data}
        onBack={() => navigate(storesManagementSection)}
        // onSubmit={()=>{}}
        // saveButtonBarState={updateShopSettingsOpts.status}
      />
    </>
  );
};

export default StoreDetailsViewComponent;
