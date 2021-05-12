/* eslint-disable local-rules/named-styles */
import {
  Button,
  Card,
  CardActions,
  CardContent,
  makeStyles
} from "@material-ui/core";
import React from "react";

import StoreDetail from "./StoreDetail";

interface IProps {
  header?: string;
}

const useStyles = makeStyles({
  cardTitle: {
    position: "relative"
  },
  Button: {
    margin: "0 0.5rem"
  }
});

const StoreInfomation: React.FC<IProps> = () => {
  const classes = useStyles();
  return (
    <Card>
      <CardActions disableSpacing>
        <div>
          <Button
            variant="contained"
            color="primary"
            className={classes.Button}
          >
            Edit
          </Button>
          <Button
            variant="contained"
            color="secondary"
            className={classes.Button}
          >
            Deactivate
          </Button>
        </div>
      </CardActions>
      <CardContent>
        <StoreDetail />
      </CardContent>
    </Card>
  );
};

StoreInfomation.displayName = "StoreInfomation";

export default StoreInfomation;
