import AppHeader from "@saleor/components/AppHeader";
import { ConfirmButtonTransitionState } from "@saleor/components/ConfirmButton";
import Container from "@saleor/components/Container";
import PageHeader from "@saleor/components/PageHeader";
import SaveButtonBar from "@saleor/components/SaveButtonBar";
import StoreInput from "@saleor/components/StoreManageInput/StoreInput";
import { commonMessages, sectionNames } from "@saleor/intl";
import React from "react";
import { useIntl } from "react-intl";

interface IProps {
  disabled?: boolean;
  storeId?: string;
  initialValues?: any;
  onBack?: () => void;
  onSubmit?: () => void;
  saveButtonBarState?: ConfirmButtonTransitionState;
}

export function areAddressInputFieldsModified(
  data: StoreDetailPageFormData
): boolean {
  return ([
    "name",
    "description",
    "storeType",
    "phone",
    "acreage",
    "latlong,"
  ] as Array<keyof StoreDetailPageFormData>)
    .map(key => data[key])
    .some(field => field !== "");
}

export interface StoreDetailPageFormData {
  name: string;
  description: string;
  storeType: string;
  phone: string;
  acreage: string;
  latlong: string;
}

export interface SiteSettingsPageFormData extends StoreDetailPageFormData {
  description: string;
  domain: string;
  name: string;
}

const StoreDetailPage: React.FC<IProps> = ({
  // storeId,
  // initialValues,
  onBack,
  saveButtonBarState,
  onSubmit,
  disabled
}) => {
  const intl = useIntl();

  return (
    <form
    // initial={initialValues}
    // onSubmit={data => {
    //   // const submitFunc = areAddressInputFieldsModified(data)
    //   // ? handleSubmitWithAddress
    //   // : onSubmit;
    // }}
    >
      <Container>
        <AppHeader onBack={onBack}>
          {intl.formatMessage(sectionNames.configuration)}
        </AppHeader>
        <PageHeader
          title={intl.formatMessage(commonMessages.storesManagement)}
        />
        <StoreInput
          header={intl.formatMessage({
            defaultMessage: "Store Information",
            description: "section header"
          })}
        />

        <SaveButtonBar
          state={saveButtonBarState}
          disabled={disabled} // || !hasChanged
          onCancel={onBack}
          onSave={onSubmit}
        />
      </Container>
    </form>
  );
};

export default StoreDetailPage;
