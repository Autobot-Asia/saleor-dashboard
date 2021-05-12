import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React from "react";
import { GoogleMap, withGoogleMap, withScriptjs } from "react-google-maps";
import Marker from "react-google-maps/lib/components/Marker";

interface IProps {
  store?: any;
}

// eslint-disable-next-line local-rules/named-styles
const useStyles = makeStyles({
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
});

function StoreDetail({}: IProps) {
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

  const WrappedMap = withScriptjs<any>(withGoogleMap(Map));
  return (
    <div>
      <Grid container>
        <Grid container item xs={12} sm={12}>
          <Grid item xs={3} sm={3}>
            <p className={classes.title}>Store Name:</p>
          </Grid>
          <Grid item xs={9} sm={9}>
            <p className={classes.title}>Sinh to lua mach</p>
          </Grid>
        </Grid>

        <Grid container item xs={12} sm={12}>
          <Grid item xs={3} sm={3}>
            <p className={classes.title}>Full Name:</p>
          </Grid>
          <Grid item xs={9} sm={9}>
            <p className={classes.title}>Sinh to lua mach</p>
          </Grid>
        </Grid>

        <Grid container item xs={12} sm={12}>
          <Grid item xs={3} sm={3}>
            <p className={classes.title}>Email Address:</p>
          </Grid>
          <Grid item xs={9} sm={9}>
            <p className={classes.title}>admin@thachsanh.store</p>
          </Grid>
        </Grid>

        <Grid container item xs={12} sm={12}>
          <Grid item xs={3} sm={3}>
            <p className={classes.title}>Country:</p>
          </Grid>
          <Grid item xs={9} sm={9}>
            <p className={classes.title}>VietNam</p>
          </Grid>
        </Grid>

        <Grid container item xs={12} sm={12}>
          <Grid item xs={3} sm={3}>
            <p className={classes.title}>Phone:</p>
          </Grid>
          <Grid item xs={9} sm={9}>
            <p className={classes.title}>+84 0987321323</p>
          </Grid>
        </Grid>

        <Grid container item xs={12} sm={12}>
          <Grid item xs={3} sm={3}>
            <p className={classes.title}>City:</p>
          </Grid>
          <Grid item xs={9} sm={9}>
            <p className={classes.title}>Sinh to lua mach</p>
          </Grid>
        </Grid>

        <Grid container item xs={12} sm={12}>
          <Grid item xs={3} sm={3}>
            <p className={classes.title}>ZIP/ Postal Code:</p>
          </Grid>
          <Grid item xs={9} sm={9}>
            <p className={classes.title}>101010101</p>
          </Grid>
        </Grid>

        <Grid container item xs={12} sm={12}>
          <Grid item xs={3} sm={3}>
            <p className={classes.title}>Area:</p>
          </Grid>
          <Grid item xs={9} sm={9}>
            <p className={classes.title}>1000 km2</p>
          </Grid>
        </Grid>

        <Grid container item xs={12} sm={12}>
          <Grid item xs={3} sm={3}>
            <p className={classes.title}>Address1:</p>
          </Grid>
          <Grid item xs={9} sm={9}>
            <p className={classes.title}>31 le dinh ky</p>
          </Grid>
        </Grid>

        <Grid container item xs={12} sm={12}>
          <Grid item xs={3} sm={3}>
            <p className={classes.title}>Address2:</p>
          </Grid>
          <Grid item xs={9} sm={9}>
            <p className={classes.title}>31 le dinh ky</p>
          </Grid>
        </Grid>

        <Grid container item xs={12} sm={12}>
          <Grid item xs={3} sm={3}>
            <p className={classes.title}>Location:</p>
          </Grid>
          <Grid item xs={9} sm={9}>
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
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default StoreDetail;
