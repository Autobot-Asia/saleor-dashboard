import AppHeader from "@saleor/components/AppHeader";
import { ConfirmButtonTransitionState } from "@saleor/components/ConfirmButton";
import Container from "@saleor/components/Container";
import Form from "@saleor/components/Form";
import SaveButtonBar from "@saleor/components/SaveButtonBar";
import StoreInput from "@saleor/components/StoreManageInput/StoreInput";
import { COUNTRY_LIST } from "@saleor/country";
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
  phoneCode: string;
  acreage: number;
  latlong: string;
  userName: string;
  country: string;
  city: string;
  postalCode: string;
  streetAddress1: string;
  streetAddress2: string;
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
  disabled,
  storeId
}) => {
  const intl = useIntl();

  const tempDescription =
    initialValues?.store?.description &&
    initialValues?.store?.description.replace(/'/g, '"');

  const tempPhoneCode =
    COUNTRY_LIST.find(e => e.value === initialValues?.store.country)?.code ||
    "";

  const tempPhone = initialValues?.store.phone.replace(tempPhoneCode, "");
  const initialForm: Partial<StoreDetailVariables> = initialValues?.store
    ? {
        name: initialValues.store.name,
        description: tempDescription
          ? JSON.parse(tempDescription)?.description
          : "",
        storeType: initialValues.store.storeType?.id,
        phone: tempPhone,
        phoneCode: tempPhoneCode,
        acreage: initialValues.store.acreage,
        latlong: initialValues.store.latlong,
        userName: initialValues.store.userName,
        country: initialValues.store.country,
        city: initialValues.store.city,
        postalCode: initialValues.store.postalCode,
        streetAddress1: initialValues.store.streetAddress1,
        streetAddress2: initialValues.store.streetAddress2
      }
    : {
        name: "",
        description: "",
        storeType: "",
        phone: "",
        phoneCode: "",
        acreage: 0,
        latlong: "",
        userName: "",
        country: "",
        city: "",
        postalCode: "",
        streetAddress1: "",
        streetAddress2: ""
      };

  return (
    <Form onSubmit={onSubmit} initial={initialForm}>
      {({ change, data, hasChanged, submit }) => {
        const disableSubmit =
          !hasChanged ||
          disabled ||
          data.name.length === 0 ||
          data.storeType.length === 0 ||
          data.phone.length === 0;
        return (
          <Container>
            <AppHeader onBack={onBack}>
              {storeId
                ? intl.formatMessage(sectionNames.stores)
                : intl.formatMessage(sectionNames.listStore)}
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
