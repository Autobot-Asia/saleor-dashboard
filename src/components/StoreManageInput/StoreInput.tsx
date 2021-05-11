import { Card, CardContent } from "@material-ui/core";
import React from "react";

import CardTitle from "../CardTitle";
import StoreForm from "./StoreForm";

interface IProps {
  header: string;
}

const StoreInput: React.FC<IProps> = ({ header }) => (
  <Card>
    <CardTitle title={header} />
    <CardContent>
      <StoreForm />
    </CardContent>
  </Card>
);

StoreInput.displayName = "StoreInput";

export default StoreInput;
