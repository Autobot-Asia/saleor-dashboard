import { Card, CardContent, TextField } from "@material-ui/core";
import { FormChange } from "@saleor/hooks/useForm";
import { StoreDetailVariables } from "@saleor/storesManagement/components/StoreDetailPage/StoreDetailPage";
import React from "react";

import CardTitle from "../CardTitle";
import StoreForm from "./StoreForm";

interface IProps {
  header: string;
  change: FormChange;
  data: Partial<StoreDetailVariables>;
}

const StoreInput: React.FC<IProps> = ({ header, data, change }) => (
  <Card>
    <CardTitle title={header} />
    <CardContent>
      <StoreForm data={data} change={change} />
    </CardContent>
  </Card>
);

StoreInput.displayName = "StoreInput";

export default StoreInput;
