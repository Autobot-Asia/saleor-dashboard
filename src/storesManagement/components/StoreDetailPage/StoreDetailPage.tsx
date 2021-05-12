import AppHeader from "@saleor/components/AppHeader";
import { ConfirmButtonTransitionState } from "@saleor/components/ConfirmButton";
import Container from "@saleor/components/Container";
import Form from "@saleor/components/Form";
import SaveButtonBar from "@saleor/components/SaveButtonBar";
import StoreInput from "@saleor/components/StoreManageInput/StoreInput";
import { sectionNames } from "@saleor/intl";
import { IStoreForUser } from "@saleor/storesManagement/queries";
import React from "react";
import { useIntl } from "react-intl";

interface IProps {
  disabled?: boolean;
  storeId?: string;
  initialValues?: IStoreForUser;
  onBack?: () => void;
  onSubmit?: (data: Partial<StoreDetailVariables>) => void;
  saveButtonBarState?: ConfirmButtonTransitionState;
  handleRefetch?: () => void;
}

export function areAddressInputFieldsModified(
  data: StoreDetailVariables
): boolean {
  return ([
    "name",
    "description",
    "storeType",
    "phone",
    "acreage",
    "latlong,"
  ] as Array<keyof StoreDetailVariables>)
    .map(key => data[key])
    .some(field => field !== "");
}

export interface StoreDetailVariables {
  name: string;
  description: string;
  storeType: string;
  phone: string;
  acreage: number;
  latlong: string;
}

export interface SiteSettingsPageFormData extends StoreDetailVariables {
  description: string;
  domain: string;
  name: string;
}

const StoreDetailPage: React.FC<IProps> = ({
  initialValues,
  onBack,
  saveButtonBarState,
  onSubmit,
  disabled
}) => {
  const intl = useIntl();

  const tempDescription =
    initialValues?.store.description &&
    initialValues?.store.description.replace(/'/g, '"');

  const initialForm: Partial<StoreDetailVariables> = initialValues?.store
    ? {
        name: initialValues.store.name,
        description: tempDescription
          ? JSON.parse(tempDescription)?.description
          : "",
        storeType: initialValues.store.storeType?.id,
        phone: initialValues.store.phone,
        acreage: initialValues.store.acreage,
        latlong: initialValues.store.latlong
      }
    : {
        name: "",
        description: "",
        storeType: "",
        phone: "",
        acreage: 0,
        latlong: ""
      };

  return (
    <Form onSubmit={onSubmit} initial={initialForm}>
      {({ change, data, hasChanged, submit }) => {
        const disableSubmit =
          !hasChanged ||
          disabled ||
          data.name.length === 0 ||
          data.storeType.length === 0;
        return (
          <Container>
            <AppHeader onBack={onBack}>
              {intl.formatMessage(sectionNames.listStore)}
            </AppHeader>

            <StoreInput
              header={intl.formatMessage({
                defaultMessage: "Store Information",
                description: "section header"
              })}
              data={data}
              change={change}
            />

            <SaveButtonBar
              state={saveButtonBarState}
              disabled={disableSubmit}
              onCancel={onBack}
              onSave={submit}
            />
          </Container>
        );
      }}
    </Form>
  );
};

export default StoreDetailPage;
