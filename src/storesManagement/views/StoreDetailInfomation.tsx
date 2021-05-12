import { WindowTitle } from "@saleor/components/WindowTitle";
import { configurationMenuUrl } from "@saleor/configuration";
import useNavigator from "@saleor/hooks/useNavigator";
// import { maybe } from "@saleor/misc";
import React from "react";

import StoreDetailInfomationPage from "../components/StoreDetailInfomationPage/StoreDetailInfomationPage";
import { useStoreById } from "../queries";
import { StoreUrlQueryParams } from "../urls";
interface IProps {
  id: string;
  params: StoreUrlQueryParams;
}

const StoreDetailInfomation: React.FC<IProps> = ({ id }) => {
  const navigate = useNavigator();

  const { data, loading } = useStoreById({
    displayLoader: true,
    variables: { id }
  });

  return (
    <>
      {/* maybe(() => customerDetails.data.user.email) */}
      <WindowTitle title="Store detail" />
      <StoreDetailInfomationPage
        disabled={loading}
        storeId={id}
        initialValues={data}
        onBack={() => navigate(configurationMenuUrl)}
        // onSubmit={()=>{}}
        // saveButtonBarState={updateShopSettingsOpts.status}
      />
    </>
  );
};

export default StoreDetailInfomation;
