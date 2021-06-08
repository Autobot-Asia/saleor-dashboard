import AppHeader from "@saleor/components/AppHeader";
import { ConfirmButtonTransitionState } from "@saleor/components/ConfirmButton";
import Container from "@saleor/components/Container";
import SaveButtonBar from "@saleor/components/SaveButtonBar";
import StoreInput from "@saleor/components/StoreManageInput/StoreInput";
import { COUNTRY_LIST } from "@saleor/country";
import { sectionNames } from "@saleor/intl";
import { IStoreForUser } from "@saleor/storesManagement/queries";
import { Formik } from "formik";
import React from "react";
import { GoogleMap, withGoogleMap, withScriptjs } from "react-google-maps";
import Marker from "react-google-maps/lib/components/Marker";
import { useIntl } from "react-intl";
import * as yup from "yup";

interface IProps {
  disabled?: boolean;
  storeId?: string;
  initialValues?: IStoreForUser;
  userData?: any;
  onBack?: () => void;
  onSubmit?: (data: Partial<StoreDetailVariables>) => void;
  saveButtonBarState?: ConfirmButtonTransitionState;
  handleRefetch?: () => void;
}

export function areAddressInputFieldsModified(
  data: StoreDetailVariables
): boolean {
  return ([
    "name",
    "description",
    "storeType",
    "phone",
    "acreage",
    "latlong,"
  ] as Array<keyof StoreDetailVariables>)
    .map(key => data[key])
    .some(field => field !== "");
}

export interface StoreDetailVariables {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  name: string;
  description: string;
  storeType: string;
  phone: string;
  phoneCode: string;
  acreage: number;
  latlong: string;
  userName: string;
  country: string;
  city: string;
  postalCode: string;
  streetAddress1: string;
  streetAddress2: string;
}

export interface SiteSettingsPageFormData extends StoreDetailVariables {
  description: string;
  domain: string;
  name: string;
}

const StoreDetailPage: React.FC<IProps> = ({
  userData,
  initialValues,
  onBack,
  saveButtonBarState,
  storeId,
  onSubmit
}) => {
  const intl = useIntl();
  const [latlng, setlatlng] = React.useState(`0,0`);

  const tempDescription =
    initialValues?.store?.description &&
    initialValues?.store?.description.replace(/'/g, '"');
  const tempPhoneCode =
    COUNTRY_LIST.find(e => e.value === initialValues?.store.country)?.code ||
    "";
  const tempPhone = initialValues?.store.phone.replace(tempPhoneCode, "");
  const initialForm: Partial<any> =
    initialValues?.store && userData?.userStore
      ? {
          firstName: userData.userStore.firstName,
          lastName: userData.userStore.lastName,
          email: userData.userStore.email,
          password: userData.userStore.password || "123456a@",
          name: initialValues.store.name,
          description: tempDescription
            ? JSON.parse(tempDescription)?.description
            : "",
          storeType: initialValues.store.storeType?.id,
          phone: tempPhone,
          phoneCode: tempPhoneCode,
          acreage: initialValues.store.acreage,
          latlong: initialValues.store.latlong,

          country: initialValues.store.country,
          city: initialValues.store.city,
          postalCode: initialValues.store.postalCode,
          streetAddress1: initialValues.store.streetAddress1,
          streetAddress2: initialValues.store.streetAddress2
        }
      : {
          name: "",
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          country: "",
          phone: "",
          phoneCode: "",
          storeType: "",
          city: "",
          postalCode: "",
          description: "",
          streetAddress1: "",
          streetAddress2: "",
          acreage: 0,
          latlong: latlng
        };

  const validateSchema = yup.object().shape({
    name: yup.string().required("Required!"),
    firstName: yup.string().required("Required!"),
    lastName: yup.string().required("Required!"),
    email: yup
      .string()
      .required("Required!")
      .email("Invalid Email!"),
    password: yup
      .string()
      .required("Required!")
      .min(8, "Too Short!"),
    country: yup.string().required("Required!"),
    phone: yup.string().required("Required!"),
    storeType: yup.string().required("Required!")
  });

  const lat = initialForm?.latlong
    ? parseFloat(initialForm.latlong.split(",")[0])
    : 0;
  const lng = initialForm?.latlong
    ? parseFloat(initialForm?.latlong?.split(",")[1])
    : 0;

  const [position, setPosition] = React.useState({ lat, lng });

  const Map = props => (
    <GoogleMap
      defaultZoom={15}
      defaultCenter={position}
      onClick={e => {
        const lat = e.latLng.lat();
        const lng = e.latLng.lng();
        setlatlng(`${lat},${lng}`);
        setPosition({ lat, lng });
        props.setFieldValue(`${lat},${lng}`);
      }}
    >
      <Marker position={position} />
    </GoogleMap>
  );
  const WrappedMap = withScriptjs<any>(withGoogleMap(Map));

  return (
    <Container>
      <AppHeader onBack={onBack}>
        {storeId
          ? intl.formatMessage(sectionNames.stores)
          : intl.formatMessage(sectionNames.listStore)}
      </AppHeader>
      <Formik
        initialValues={initialForm}
        validationSchema={validateSchema}
        onSubmit={values => {
          onSubmit(values);
        }}
      >
        {({
          values,
          handleChange,
          setFieldValue,
          handleSubmit,
          ...formikProps
        }) => (
          <>
            <form autoComplete="off">
              <StoreInput
                {...formikProps}
                header={intl.formatMessage({
                  defaultMessage: "Store Information",
                  description: "section header"
                })}
                values={values}
                handleChange={handleChange}
                storeId={storeId}
              />

              <WrappedMap
                name="latlong"
                googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAe38lpcvEH7pLWIbgNUPNHsPnyIYwkc60&v=3.exp&libraries=geometry,drawing,places"
                loadingElement={<div style={{ width: `100%` }} />}
                containerElement={<div style={{ height: `400px` }} />}
                mapElement={<div style={{ height: `100%` }} />}
                setFieldValue={data => setFieldValue("latlong", data)}
              />
            </form>

            <SaveButtonBar
              state={saveButtonBarState}
              disabled={false}
              onCancel={onBack}
              onSave={handleSubmit}
            />
          </>
        )}
      </Formik>
    </Container>
  );
};

export default StoreDetailPage;
