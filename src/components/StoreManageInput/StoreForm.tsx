import { TextField } from "@material-ui/core";
import { COUNTRY_LIST } from "@saleor/country";
import { FormChange } from "@saleor/hooks/useForm";
import { useListStoreTypeQuery } from "@saleor/storesManagement/queries";
import React from "react";
import { useIntl } from "react-intl";
import { ChangeEvent } from "src/hooks/useForm";

import FormSpacer from "../FormSpacer";
import SingleSelectField, { Choices } from "../SingleSelectField";

interface Props {
  values: Partial<any>;
  handleChange: FormChange;
  formikProps?: any;
}

const StoreForm: React.FC<Props> = ({
  values,
  handleChange,
  ...formikProps
}) => {
  const { errors, touched, handleBlur }: any = formikProps;

  const intl = useIntl();

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

  const [code, setCode] = React.useState("");
  React.useEffect(() => {
    setCode(values.phoneCode);
  }, [values.phoneCode]);
  return (
    <>
      <TextField
        label={intl.formatMessage({
          defaultMessage: "Store Name*"
        })}
        fullWidth
        name="name"
        value={values.name}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.name && touched.name}
        helperText={errors.name && touched.name && errors.name}
      />

      <FormSpacer />
      <div style={{ display: "flex" }}>
        <TextField
          style={{ flex: 1 }}
          label={intl.formatMessage({
            defaultMessage: "First Name*"
          })}
          name="firstName"
          value={values.firstName}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.firstName && touched.firstName}
          helperText={errors.firstName && touched.firstName && errors.firstName}
        />

        <TextField
          style={{ marginLeft: "0.5rem", flex: 1 }}
          label={intl.formatMessage({
            defaultMessage: "Last Name*"
          })}
          fullWidth
          name="lastName"
          onChange={handleChange}
          value={values.lastName}
          onBlur={handleBlur}
          error={errors.lastName && touched.lastName}
          helperText={errors.lastName && touched.lastName && errors.lastName}
        />
      </div>

      <FormSpacer />

      <TextField
        label={intl.formatMessage({
          defaultMessage: "Email Address*"
        })}
        fullWidth
        name="email"
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.email && touched.email}
        helperText={errors.email && touched.email && errors.email}
      />
      <FormSpacer />

      <TextField
        label={intl.formatMessage({
          defaultMessage: "Password*"
        })}
        fullWidth
        name="password"
        type="password"
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.password && touched.password}
        helperText={errors.password && touched.password && errors.password}
      />
      <FormSpacer />

      <SingleSelectField
        choices={countryOptions}
        name="country"
        value={values.country}
        onChange={e => {
          const tempPhoneCode =
            COUNTRY_LIST.find(i => i.value === e.target.value)?.code || "";
          // setCode(tempPhoneCode);
          const changE: ChangeEvent = {
            target: {
              name: "phoneCode",
              value: tempPhoneCode
            }
          };
          // change(changE);
          // change(e);
          handleChange(e);
          handleChange(changE);
        }}
        label={intl.formatMessage({
          defaultMessage: "Country*"
        })}
        onBlur={handleBlur}
        error={errors.country && touched.country}
        hint={errors.country && touched.country && errors.country}
      />

      <FormSpacer />
      <TextField
        label={intl.formatMessage({
          defaultMessage: "City"
        })}
        fullWidth
        name="city"
        onChange={handleChange}
        value={values.city}
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
            handleChange(e);
          }
        }}
        value={values.postalCode}
      />
      <FormSpacer />
      <TextField
        label={intl.formatMessage({
          defaultMessage: "Address 1"
        })}
        fullWidth
        name="streetAddress1"
        onChange={handleChange}
        value={values.streetAddress1}
      />
      <FormSpacer />
      <TextField
        label={intl.formatMessage({
          defaultMessage: "Address 2"
        })}
        fullWidth
        name="streetAddress2"
        onChange={handleChange}
        value={values.streetAddress2}
      />
      <FormSpacer />
      <TextField
        label={intl.formatMessage({
          defaultMessage: "Store Description"
        })}
        fullWidth
        value={values.description}
        name="description"
        onChange={handleChange}
      />
      <FormSpacer />

      <SingleSelectField
        choices={typeOptions}
        name="storeType"
        value={values.storeType}
        onChange={handleChange}
        label={intl.formatMessage({
          defaultMessage: "Store Type"
        })}
        onBlur={handleBlur}
        error={errors.storeType && touched.storeType}
        hint={errors.storeType && touched.storeType && errors.storeType}
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
          onChange={handleChange}
        />

        <TextField
          style={{ marginLeft: "0.5rem" }}
          label={intl.formatMessage({
            defaultMessage: "Phone*"
          })}
          fullWidth
          name="phone"
          onChange={e => {
            const isNum = /^\d+$/.test(e.target.value);
            if (isNum || e.target.value.length === 0) {
              handleChange(e);
            }
          }}
          value={values.phone}
          onBlur={handleBlur}
          error={errors.phone && touched.phone}
          helperText={errors.phone && touched.phone && errors.phone}
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
        value={values.acreage}
        onChange={handleChange}
      />
      <FormSpacer />
      <FormSpacer />
    </>
  );
};

export default StoreForm;
