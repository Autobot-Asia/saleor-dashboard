import AppHeader from "@saleor/components/AppHeader";
import Container from "@saleor/components/Container";
import PageHeader from "@saleor/components/PageHeader";
import StoreInfomation from "@saleor/components/StoreManageInput/StoreInfomation";
import { commonMessages, sectionNames } from "@saleor/intl";
import React from "react";
import { useIntl } from "react-intl";

interface IProps {
  disabled?: boolean;
  storeId?: string;
  onBack?: () => void;
  initialValues: any;
}

const StoreDetailInfomationPage: React.FC<IProps> = ({
  onBack,
  storeId,
  initialValues
}) => {
  const intl = useIntl();
  return (
    <Container>
      <AppHeader onBack={onBack}>
        {intl.formatMessage(sectionNames.configuration)}
      </AppHeader>
      <PageHeader title={intl.formatMessage(commonMessages.storesManagement)} />
      <StoreInfomation storeId={storeId} store={initialValues} />
    </Container>
  );
};

export default StoreDetailInfomationPage;