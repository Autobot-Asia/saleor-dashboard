import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { IStoreForUser } from "@saleor/storesManagement/queries";
import React from "react";
import { GoogleMap, withGoogleMap, withScriptjs } from "react-google-maps";
import Marker from "react-google-maps/lib/components/Marker";

interface IProps {
  store?: IStoreForUser;
}

const useStyles = makeStyles(
  {
    root: {
      flexGrow: 1
    },
    paper: {
      padding: "20px",
      textAlign: "center"
      // color:
    },
    title: {
      fontSize: "1rem"
    }
  },
  { name: "C:Devsaleor-dashboardsrccomponentsStoreManageInputStoreDetail" }
);

function StoreDetail({ store }: IProps) {
  const classes = useStyles();
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

  const storeInfo = store?.store;

  const tempDescription =
    storeInfo?.description && storeInfo?.description.replace(/'/g, '"');

  const Mapping = storeInfo
    ? {
        name: { title: "Store Name:", value: storeInfo.name },
        userName: { title: "User Name:", value: storeInfo.userName },
        // email: { title: "Email:", value: storeInfo.email },
        country: { title: "Country:", value: storeInfo.country },
        city: { title: "City:", value: storeInfo.city },
        phone: { title: "Phone:", value: storeInfo.phone },
        postalCode: { title: "ZIP/ PostalCode:", value: storeInfo.postalCode },
        // area: { title: "Area:", value: storeInfo.area },
        address1: { title: "Address 1", value: storeInfo.streetAddress1 },
        address2: { title: "Address 1", value: storeInfo.streetAddress2 },
        description: {
          title: "Description:",
          value: JSON.parse(tempDescription)?.description || ""
        },
        storeType: { title: "Store Type:", value: storeInfo.storeType?.name },
        storeAcreage: { title: "Store Acreage", value: storeInfo.acreage }
      }
    : {};

  const WrappedMap = withScriptjs<any>(withGoogleMap(Map));
  return (
    <div>
      <Grid container>
        {Object.keys(Mapping).map((item, index) => (
          <Grid key={index} container item xs={12} sm={12}>
            <Grid item xs={3} sm={3}>
              <p className={classes.title}>{Mapping[item].title}</p>
            </Grid>
            <Grid item xs={9} sm={9}>
              {item === "location" ? (
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
              ) : (
                <p className={classes.title}>{Mapping[item].value}</p>
              )}
            </Grid>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default StoreDetail;
