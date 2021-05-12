import {
  CardContent,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField
} from "@material-ui/core";
import Grid from "@saleor/components/Grid";
import { FormChange } from "@saleor/hooks/useForm";
import { StoreDetailVariables } from "@saleor/storesManagement/components/StoreDetailPage/StoreDetailPage";
import React from "react";
import { GoogleMap, withGoogleMap, withScriptjs } from "react-google-maps";
import Marker from "react-google-maps/lib/components/Marker";
import { useIntl } from "react-intl";

import FormSpacer from "../FormSpacer";
interface Props {
  data: Partial<StoreDetailVariables>;
  change: FormChange;
}

const StoreFom: React.FC<Props> = ({ data, change }) => {
  const intl = useIntl();
  const position = {
    lat: 0,
    lng: 0
  };
  const Map = () => (
    <GoogleMap
      defaultZoom={15}
      defaultCenter={position}
      // onClick={e => handleClick(e, props)}
    >
      <Marker position={position} />
    </GoogleMap>
  );

  const WrappedMap = withScriptjs<any>(withGoogleMap(Map));
  return (
    <>
      <TextField
        label={intl.formatMessage({
          defaultMessage: "Store Name"
        })}
        fullWidth
        name="name"
        value={data.name}
        onChange={change}
      />

      <FormSpacer />
      <Grid>
        <TextField
          label={intl.formatMessage({
            defaultMessage: "First Name"
          })}
          fullWidth
          name="firstName"
          // onChange={change}
        />
        <TextField
          label={intl.formatMessage({
            defaultMessage: "Last Name"
          })}
          fullWidth
          name="lastName"
          // onChange={change}
        />
      </Grid>
      <FormSpacer />
      <TextField
        label={intl.formatMessage({
          defaultMessage: "Email Address"
        })}
        fullWidth
        name="email"
        // onChange={change}
      />
      <FormSpacer />

      <TextField
        label={intl.formatMessage({
          defaultMessage: "Country"
        })}
        fullWidth
        name="country"
        // onChange={change}
      />
      <FormSpacer />
      <TextField
        label={intl.formatMessage({
          defaultMessage: "City"
        })}
        fullWidth
        name="city"
        // onChange={change}
      />
      <FormSpacer />
      <TextField
        label={intl.formatMessage({
          defaultMessage: "Zip/Postal Code"
        })}
        fullWidth
        name="zip"
        // onChange={change}
      />
      <FormSpacer />
      <TextField
        label={intl.formatMessage({
          defaultMessage: "Address 1"
        })}
        fullWidth
        name="address1"
        // onChange={change}
      />
      <FormSpacer />
      <TextField
        label={intl.formatMessage({
          defaultMessage: "Address 2"
        })}
        fullWidth
        name="address2"
        // onChange={change}
      />
      <FormSpacer />
      <TextField
        label={intl.formatMessage({
          defaultMessage: "Store Description"
        })}
        fullWidth
        name="description"
        // onChange={change}
      />
      <FormSpacer />

      <FormControl variant="outlined" style={{ width: "100%" }}>
        <InputLabel id="demo-simple-select-outlined-label">
          Store Type
        </InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          //   value={age}
          //   onChange={handleChange}
          name="storeType"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
      <FormSpacer />
      <TextField
        label={intl.formatMessage({
          defaultMessage: "Phone"
        })}
        fullWidth
        name="description"
        // onChange={change}
      />
      <FormSpacer />
      <TextField
        label={intl.formatMessage({
          defaultMessage: "Store Acreage"
        })}
        fullWidth
        name="description"
        // onChange={change}
      />
      <FormSpacer />
      <WrappedMap
        name="latlong"
        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAe38lpcvEH7pLWIbgNUPNHsPnyIYwkc60&v=3.exp&libraries=geometry,drawing,places"
        loadingElement={<div style={{ width: `100%` }} />}
        containerElement={<div style={{ height: `400px` }} />}
        mapElement={<div style={{ height: `100%` }} />}
        // onChange={(name: any, value: any) => {
        //   setFieldValue(name, value);
        // }}
      />
      <FormSpacer />
    </>
  );
};

export default StoreFom;
