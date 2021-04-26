import { Button } from "@material-ui/core";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableFooter from "@material-ui/core/TableFooter";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import { ChannelsAvailabilityDropdown } from "@saleor/components/ChannelsAvailabilityDropdown";
import Checkbox from "@saleor/components/Checkbox";
import MoneyRange from "@saleor/components/MoneyRange";
import ResponsiveTable from "@saleor/components/ResponsiveTable";
import Skeleton from "@saleor/components/Skeleton";
import TableCellAvatar, {
  AVATAR_MARGIN
} from "@saleor/components/TableCellAvatar";
import TableCellHeader from "@saleor/components/TableCellHeader";
import TableHead from "@saleor/components/TableHead";
import { ProductListColumns } from "@saleor/config";
import { maybe, renderCollection } from "@saleor/misc";
import { makeStyles } from "@saleor/theme";
import TDisplayColumn, {
  DisplayColumnProps
} from "@saleor/utils/columns/DisplayColumn";
import classNames from "classnames";
import React from "react";
import { FormattedMessage } from "react-intl";

const DisplayColumn = TDisplayColumn as React.FunctionComponent<
  DisplayColumnProps<ProductListColumns>
>;

const useStyles = makeStyles(
  theme => ({
    [theme.breakpoints.up("lg")]: {
      colName: {
        width: "auto"
      },
      colPrice: {
        width: 300
      },
      colPublished: {
        width: 200
      },
      colType: {
        width: 200
      }
    },
    colAttribute: {
      width: 150
    },
    colFill: {
      padding: 0,
      width: "100%"
    },
    colName: {
      "&$colNameFixed": {
        width: 250
      }
    },
    colNameFixed: {},
    colNameHeader: {
      marginLeft: AVATAR_MARGIN
    },
    colNameWrapper: {
      display: "block"
    },
    colPrice: {
      textAlign: "right"
    },
    colPublished: {},
    colType: {},
    link: {
      cursor: "pointer"
    },
    table: {
      tableLayout: "fixed"
    },
    tableContainer: {
      overflowX: "scroll"
    },
    textLeft: {
      textAlign: "left"
    },
    textRight: {
      textAlign: "right"
    }
  }),
  { name: "ProductList" }
);
interface Props {
  listProducts: Array<{
    id: string;
    name: string;
    thumbnail: { url: string };
  }>;
  setIsEdit: (value: boolean) => void;
}

export const MainProductListView: React.FC<Props> = ({
  listProducts,
  setIsEdit,
  ...props
}) => {
  const classes = useStyles(props);
  return (
    <div className={classes.tableContainer}>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          onClick={() => setIsEdit(true)}
          color="primary"
          variant="contained"
        >
          <FormattedMessage defaultMessage="Edit" description="button" />
        </Button>
      </div>
      <ResponsiveTable className={classes.table}>
        <colgroup>
          <col />
          <col className={classes.colName} />
        </colgroup>
        <TableHead
          colSpan={2}
          items={listProducts}
          disabled={true}
          toolbar={toolbar}
        >
          <TableCellHeader
            arrowPosition="right"
            className={classNames(classes.colName, {
              [classes.colNameFixed]: false
            })}
          >
            <span className={classes.colNameHeader}>
              <FormattedMessage defaultMessage="Name" description="product" />
            </span>
          </TableCellHeader>
          <DisplayColumn column="productType" displayColumns={[]}>
            <TableCellHeader className={classes.colType}>
              <FormattedMessage
                defaultMessage="Type"
                description="product type"
              />
            </TableCellHeader>
          </DisplayColumn>
        </TableHead>

        <TableBody>
          {renderCollection(
            listProducts,
            product => {
              const isSelected = false;

              return (
                <TableRow
                  selected={isSelected}
                  hover={!!product}
                  key={product ? product.id : "skeleton"}
                  className={classes.link}
                  data-test="id"
                  data-test-id={product?.id}
                >
                  <TableCellAvatar
                    className={classes.colName}
                    thumbnail={maybe(() => product.thumbnail.url)}
                    data-test="name"
                  >
                    <div className={classes.colNameWrapper}>
                      <span>{product.name}</span>
                      <Typography variant="caption">
                        <FormattedMessage
                          defaultMessage="Simple"
                          description="product type"
                        />
                      </Typography>
                    </div>
                  </TableCellAvatar>
                </TableRow>
              );
            },
            () => (
              <TableRow>
                <TableCell colSpan={2}>
                  <FormattedMessage defaultMessage="No products found" />
                </TableCell>
              </TableRow>
            )
          )}
        </TableBody>
      </ResponsiveTable>
    </div>
  );
};
