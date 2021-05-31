import { TextField } from "@material-ui/core";
import { COUNTRY_LIST } from "@saleor/country";
import { FormChange } from "@saleor/hooks/useForm";
import { StoreDetailVariables } from "@saleor/storesManagement/components/StoreDetailPage/StoreDetailPage";
import { useListStoreTypeQuery } from "@saleor/storesManagement/queries";
import React from "react";
import { GoogleMap, withGoogleMap, withScriptjs } from "react-google-maps";
import Marker from "react-google-maps/lib/components/Marker";
import { useIntl } from "react-intl";
import { ChangeEvent } from "src/hooks/useForm";

import FormSpacer from "../FormSpacer";
import SingleSelectField, { Choices } from "../SingleSelectField";

interface Props {
  data: Partial<StoreDetailVariables>;
  change: FormChange;
}

const StoreForm: React.FC<Props> = ({ data, change }) => {
  const intl = useIntl();

  const lat = data?.latlong ? parseFloat(data.latlong.split(",")[0]) : 0;
  const lng = data?.latlong ? parseFloat(data?.latlong?.split(",")[1]) : 0;

  const position = {
    lat,
    lng
  };
  const Map = () => (
    <GoogleMap
      defaultZoom={15}
      defaultCenter={position}
      onClick={e => {
        const lat = e.latLng.lat();
        const lng = e.latLng.lng();
        change({ target: { name: "latlong", value: `${lat},${lng}` } });
      }}
    >
      <Marker position={position} />
    </GoogleMap>
  );

  const { data: dataType } = useListStoreTypeQuery({
    displayLoader: true,
    variables: {}
  });

  const countryOptions: Choices = COUNTRY_LIST.map(item => ({
    value: item.value,
    label: item.text
  }));

  const typeOptions: Choices =
    dataType?.storeTypes?.edges?.map(item => ({
      value: item.node.id,
      label: item.node.name
    })) || [];

  const WrappedMap = withScriptjs<any>(withGoogleMap(Map));

  const [code, setCode] = React.useState("");
  React.useEffect(() => {
    setCode(data.phoneCode);
  }, [data.phoneCode]);

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

      <TextField
        label={intl.formatMessage({
          defaultMessage: "User Name"
        })}
        fullWidth
        name="userName"
        onChange={change}
        value={data.userName}
        disabled
      />
      <FormSpacer />
      {/* <TextField
        label={intl.formatMessage({
          defaultMessage: "Email Address"
        })}
        fullWidth
        name="email"
        onChange={change}
      />
      <FormSpacer /> */}

      <SingleSelectField
        choices={countryOptions}
        name="country"
        value={data.country}
        onChange={e => {
          const tempPhoneCode =
            COUNTRY_LIST.find(i => i.value === e.target.value)?.code || "";
          setCode(tempPhoneCode);
          // console.log(tempPhoneCode, "-------temppp");
          const changE: ChangeEvent = {
            target: {
              name: "phoneCode",
              value: tempPhoneCode
            }
          };
          change(changE);
          change(e);
        }}
        label={intl.formatMessage({
          defaultMessage: "Country"
        })}
      />

      <FormSpacer />
      <TextField
        label={intl.formatMessage({
          defaultMessage: "City"
        })}
        fullWidth
        name="city"
        onChange={change}
        value={data.city}
      />
      <FormSpacer />
      <TextField
        label={intl.formatMessage({
          defaultMessage: "Zip/Postal Code"
        })}
        fullWidth
        name="postalCode"
        onChange={e => {
          const isNum = /^\d+$/.test(e.target.value);
          if (isNum || e.target.value.length === 0) {
            change(e);
          }
        }}
        value={data.postalCode}
      />
      <FormSpacer />
      <TextField
        label={intl.formatMessage({
          defaultMessage: "Address 1"
        })}
        fullWidth
        name="streetAddress1"
        onChange={change}
        value={data.streetAddress1}
      />
      <FormSpacer />
      <TextField
        label={intl.formatMessage({
          defaultMessage: "Address 2"
        })}
        fullWidth
        name="streetAddress2"
        onChange={change}
        value={data.streetAddress2}
      />
      <FormSpacer />
      <TextField
        label={intl.formatMessage({
          defaultMessage: "Store Description"
        })}
        fullWidth
        value={data.description}
        name="description"
        onChange={change}
      />
      <FormSpacer />

      <SingleSelectField
        choices={typeOptions}
        name="storeType"
        value={data.storeType}
        onChange={change}
        label={intl.formatMessage({
          defaultMessage: "Store Type"
        })}
      />

      <FormSpacer />
      <div style={{ display: "flex" }}>
        <TextField
          disabled
          label={intl.formatMessage({
            defaultMessage: "Phone Code"
          })}
          name="phoneCode"
          value={code}
          onChange={change}
        />

        <TextField
          style={{ marginLeft: "0.5rem" }}
          label={intl.formatMessage({
            defaultMessage: "Phone"
          })}
          fullWidth
          name="phone"
          onChange={e => {
            const isNum = /^\d+$/.test(e.target.value);
            if (isNum || e.target.value.length === 0) {
              change(e);
            }
          }}
          value={data.phone}
        />
      </div>
      <FormSpacer />
      <TextField
        label={intl.formatMessage({
          defaultMessage: "Store Acreage"
        })}
        fullWidth
        type="number"
        name="acreage"
        value={data.acreage}
        onChange={change}
      />
      <FormSpacer />
      <WrappedMap
        name="latlong"
        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAe38lpcvEH7pLWIbgNUPNHsPnyIYwkc60&v=3.exp&libraries=geometry,drawing,places"
        loadingElement={<div style={{ width: `100%` }} />}
        containerElement={<div style={{ height: `400px` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
      <FormSpacer />
    </>
  );
};

export default StoreForm;
