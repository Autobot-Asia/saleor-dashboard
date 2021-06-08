import { Card, CardContent } from "@material-ui/core";
import { FormChange } from "@saleor/hooks/useForm";
import { StoreDetailVariables } from "@saleor/storesManagement/components/StoreDetailPage/StoreDetailPage";
import React from "react";

import CardTitle from "../CardTitle";
import StoreForm from "./StoreForm";

interface IProps {
  header: string;
  handleChange: FormChange;
  values: Partial<StoreDetailVariables>;
  storeId?: any;
}

const StoreInput: React.FC<IProps> = ({
  header,
  values,
  handleChange,
  storeId,
  ...formikProps
}) => (
  <Card>
    <CardTitle title={header} />
    <CardContent>
      <StoreForm
        {...formikProps}
        storeId={storeId}
        values={values}
        handleChange={handleChange}
      />
    </CardContent>
  </Card>
);

StoreInput.displayName = "StoreInput";

export default StoreInput;
