import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardTitle from "@saleor/components/CardTitle";
import { commonMessages } from "@saleor/intl";
import { makeStyles } from "@saleor/theme";
import React from "react";
import { FormattedMessage, useIntl } from "react-intl";

import { MainProductListView } from "./MainProductListView";

const useStyles = makeStyles(
  {
    root: {
      overflow: "visible"
    },
    justifyBetween: {
      display: "flex",
      justifyContent: "space-between"
    },
    itemCenter: {
      alignItems: "center",
      display: "flex"
    }
  },
  { name: "MainProductList" }
);

export const MainProductList: React.FC = props => {
  const classes = useStyles(props);
  const intl = useIntl();

  const mockList: Array<{
    id: string;
    name: string;
    thumbnail: { url: string };
  }> = [
    {
      id: "1",
      name: "Apple Juice",
      thumbnail: {
        url:
          "http://thachsanh.store:8080/media/__sized__/products/saleordemoproduct_fd_juice_06_iaQg152-thumbnail-255x255.png"
      }
    },
    {
      id: "2",
      name: "Banana Juice",
      thumbnail: {
        url:
          "http://thachsanh.store:8080/media/__sized__/produc…product_fd_juice_01_ekfEM4Y-thumbnail-255x255.png"
      }
    }
  ];

  const [isEdit, setIsEdit] = React.useState(false);

  return (
    <Card className={classes.root}>
      <CardTitle title={intl.formatMessage(commonMessages.mainProductList)} />
      <CardContent>
        {isEdit ? (
          <>edit here</>
        ) : (
          <>
            {mockList.length > 0 ? (
              <MainProductListView
                listProducts={mockList}
                setIsEdit={setIsEdit}
              />
            ) : (
              <div className={classes.justifyBetween}>
                <div className={classes.itemCenter}>
                  You don't have Main Product! Please Add
                </div>
                <div>
                  <Button
                    onClick={() => setIsEdit(true)}
                    color="primary"
                    variant="contained"
                    data-test="add-product"
                  >
                    <FormattedMessage
                      defaultMessage="Add Product"
                      description="button"
                    />
                  </Button>
                </div>
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
};
