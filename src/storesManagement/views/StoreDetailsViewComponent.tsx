import { WindowTitle } from "@saleor/components/WindowTitle";
import useNavigator from "@saleor/hooks/useNavigator";
// import { maybe } from "@saleor/misc";
import React from "react";

import StoreDetailPage, {
  StoreDetailVariables
} from "../components/StoreDetailPage/StoreDetailPage";
import { useStoreById } from "../queries";
import { storesManagementSection, StoreUrlQueryParams } from "../urls";
interface IProps {
  id: string;
  params: StoreUrlQueryParams;
}

const StoreDetailsViewComponent: React.FC<IProps> = ({ id }) => {
  const navigate = useNavigator();

  if (id !== "undefined") {
    const { data, loading, refetch } = useStoreById({
      displayLoader: true,
      variables: { id }
    });

    const handleSubmit = (data: Partial<StoreDetailVariables>) => {
      console.log({ data });
    };

    return (
      <>
        <WindowTitle title="Store detail" />
        <StoreDetailPage
          disabled={loading}
          storeId={id}
          initialValues={data}
          onBack={() => navigate(storesManagementSection)}
          handleRefetch={refetch}
          onSubmit={handleSubmit}
        />
      </>
    );
  } else {
    const handleSubmit = (data: Partial<StoreDetailVariables>) => {
      console.log({ data });
    };
    return (
      <>
        <WindowTitle title="Store detail" />
        <StoreDetailPage
          onBack={() => navigate(storesManagementSection)}
          onSubmit={handleSubmit}
        />
      </>
    );
  }
};

export default StoreDetailsViewComponent;
