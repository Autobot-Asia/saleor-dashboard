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
}

const StoreInput: React.FC<IProps> = ({
  header,
  values,
  handleChange,
  ...formikProps
}) => (
  <Card>
    <CardTitle title={header} />
    <CardContent>
      <StoreForm {...formikProps} values={values} handleChange={handleChange} />
    </CardContent>
  </Card>
);

StoreInput.displayName = "StoreInput";

export default StoreInput;
