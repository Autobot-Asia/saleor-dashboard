import { WindowTitle } from "@saleor/components/WindowTitle";
import useNavigator from "@saleor/hooks/useNavigator";
import useNotifier from "@saleor/hooks/useNotifier";
import { commonMessages } from "@saleor/intl";
// import { maybe } from "@saleor/misc";
import React from "react";
import { useIntl } from "react-intl";

import StoreDetailPage, {
  StoreDetailVariables
} from "../components/StoreDetailPage/StoreDetailPage";
import {
  RegisterStoreVariables,
  UpdateStoreVariables,
  useCreateStoreMutation,
  useStoreById,
  useUpdateStoreMutation
} from "../queries";
import {
  storePath,
  storesManagementSection,
  StoreUrlQueryParams
} from "../urls";

interface IProps {
  id: string;
  params: StoreUrlQueryParams;
}

const StoreDetailsViewComponent: React.FC<IProps> = ({ id }) => {
  const navigate = useNavigator();
  const notify = useNotifier();
  const intl = useIntl();

  if (id !== "undefined") {
    const { data, loading, refetch } = useStoreById({
      displayLoader: true,
      variables: { id }
    });

    const [updateStore] = useUpdateStoreMutation({
      onCompleted: data => {
        if (data.storeUpdate.storeErrors.length === 0) {
          notify({
            status: "success",
            text: intl.formatMessage(commonMessages.savedChanges)
          });
          navigate(storePath(id));
        } else {
          notify({
            status: "error",
            text: intl.formatMessage({
              defaultMessage: "Update Fail! Please Try Again!"
            })
          });
        }
      }
    });

    const handleSubmit = (data: Partial<StoreDetailVariables>) => {
      const variables: UpdateStoreVariables = {
        name: data.name,
        id,
        country: data.country,
        city: data.city,
        postalCode: data.postalCode,
        streetAddress1: data.streetAddress1,
        streetAddress2: data.streetAddress2,
        storeTypeId: data.storeType,
        acreage: data.acreage,
        description: JSON.stringify({
          description: data.description
        }),
        phone: data.phoneCode + data.phone,
        latlong: data.latlong
      };

      updateStore({
        variables
      });
    };

    return (
      <>
        <WindowTitle title="Store detail" />
        <StoreDetailPage
          disabled={loading}
          storeId={id}
          initialValues={data}
          onBack={() => navigate(storePath(id))}
          handleRefetch={refetch}
          onSubmit={handleSubmit}
        />
      </>
    );
  } else {
    const [createStore] = useCreateStoreMutation({
      onCompleted: data => {
        if (data.storeCreate.storeErrors.length === 0) {
          notify({
            status: "success",
            text: intl.formatMessage(commonMessages.savedChanges)
          });
          navigate(storesManagementSection);
        } else {
          notify({
            status: "error",
            text: intl.formatMessage({
              defaultMessage: "Create Fail! Please Try Again!"
            })
          });
        }
      }
    });

    const handleSubmit = (data: Partial<StoreDetailVariables>) => {
      const variables: RegisterStoreVariables = {
        name: data.name,
        storeTypeId: data.storeType,
        acreage: data.acreage,
        description: JSON.stringify({
          description: data.description
        }),
        phone: data.phoneCode + data.phone,
        country: data.country,
        city: data.city,
        postalCode: data.postalCode,
        streetAddress1: data.streetAddress1,
        streetAddress2: data.streetAddress2,
        latlong: data.latlong
      };
      createStore({
        variables
      });
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
