import { Grid, TextField } from "@mui/material";
import React, { useState } from "react";

const FormComponent = () => {
  const [inputsValue, setInputsValue] = useState({
    first: "",
    middle: "",
    last: "",
    email: "",
    password: "",
    phone: "",
    url: "",
    alt: "",
    state: "",
    country: "",
    city: "",
    street: "",
    houseNumber: "",
    zip: "",
  });
  const handleInputsChange = (e) => {
    setInputsValue((currentState) => ({
      ...currentState,
      [e.target.id]: e.target.value,
    }));
  };
  return (
    <Grid item xs={12} sm={6}>
      2453
      <TextField
        autoComplete="given-name"
        name="first"
        required
        fullWidth
        id="first"
        label="First Name"
        autoFocus
        value={inputsValue.first}
        onChange={handleInputsChange}
      />
      <TextField
        autoComplete="given-name"
        name="middle"
        fullWidth
        id="middle"
        label="Middle Name"
        autoFocus
        value={inputsValue.middle}
        onChange={handleInputsChange}
      />
      <TextField
        required
        fullWidth
        id="last"
        label="Last Name"
        name="last"
        autoComplete="family-name"
        value={inputsValue.last}
        onChange={handleInputsChange}
      />
      <TextField
        required
        fullWidth
        id="email"
        label="Email Address"
        name="email"
        autoComplete="email"
        value={inputsValue.email}
        onChange={handleInputsChange}
      />
      <TextField
        required
        fullWidth
        name="password"
        label="Password"
        type="password"
        id="password"
        autoComplete="new-password"
        value={inputsValue.password}
        onChange={handleInputsChange}
      />
      <TextField
        required
        fullWidth
        name="phone"
        label="Phone"
        id="phone"
        autoComplete="new-phone"
        value={inputsValue.phone}
        onChange={handleInputsChange}
      />
      <TextField
        fullWidth
        name="url"
        label="Url"
        id="url"
        autoComplete="new-url"
        value={inputsValue.url}
        onChange={handleInputsChange}
      />
      <TextField
        fullWidth
        name="alt"
        label="Alt"
        id="alt"
        autoComplete="new-alt"
        value={inputsValue.alt}
        onChange={handleInputsChange}
      />
      <TextField
        fullWidth
        name="state"
        label="State"
        id="state"
        autoComplete="new-state"
        value={inputsValue.state}
        onChange={handleInputsChange}
      />
      <TextField
        required
        fullWidth
        name="country"
        label="Country"
        id="country"
        autoComplete="new-country"
        value={inputsValue.country}
        onChange={handleInputsChange}
      />
      <TextField
        required
        fullWidth
        name="city"
        label="City"
        id="city"
        autoComplete="new-city"
        value={inputsValue.city}
        onChange={handleInputsChange}
      />
      <TextField
        required
        fullWidth
        name="street"
        label="Street"
        id="street"
        autoComplete="new-street"
        value={inputsValue.street}
        onChange={handleInputsChange}
      />
      <TextField
        required
        fullWidth
        name="houseNumber"
        label="House Number"
        id="houseNumber"
        autoComplete="new-houseNumber"
        value={inputsValue.houseNumber}
        onChange={handleInputsChange}
      />
      <TextField
        fullWidth
        name="zip"
        label="Zip"
        id="zip"
        autoComplete="new-zip"
        value={inputsValue.zip}
        onChange={handleInputsChange}
      />
    </Grid>
  );
};

export default FormComponent;
