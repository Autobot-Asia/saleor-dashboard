import AppHeader from "@saleor/components/AppHeader";
import { ConfirmButtonTransitionState } from "@saleor/components/ConfirmButton";
import Container from "@saleor/components/Container";
import PageHeader from "@saleor/components/PageHeader";
import StoreInfomation from "@saleor/components/StoreManageInput/StoreInfomation";
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

const StoreDetailInfomationPage: React.FC<IProps> = ({
  // storeId,
  // initialValues,
  onBack
}) => {
  const intl = useIntl();

  return (
    <Container>
      <AppHeader onBack={onBack}>
        {intl.formatMessage(sectionNames.configuration)}
      </AppHeader>
      <PageHeader title={intl.formatMessage(commonMessages.storesManagement)} />
      <StoreInfomation />
    </Container>
  );
};

export default StoreDetailInfomationPage;
