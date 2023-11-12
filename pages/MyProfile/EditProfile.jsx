import { Box, Button, Container, TextField, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ROUTES from "../../routes/ROUTES";
import { normalizeData } from "../register/normalizeData";
import { validateRegister } from "../../validation/registerValidation";

const EditProfile = () => {
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
  const [userFromServer, setUserFromServer] = useState({});
  const id = useSelector((bigPie) => bigPie.authSlice.id);
  const navigate = useNavigate();

  const handleInputsChange = (e) => {
    setInputsValue((currentState) => ({
      ...currentState,
      [e.target.id]: e.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const errors = validateRegister(inputsValue);
      if (errors) return;
      let request = normalizeData(inputsValue);
      axios.put(
        `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users/${id}`,
        request
      );
      toast.success("The user has been updated successfully!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      navigate(ROUTES.PROFILE);
    } catch (err) {
      toast.error(err.response.data, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };
  return (
    <Container sx={{ mt: 12 }}>
      <Typography variant="h3">Edit your profile</Typography>
      <Box sx={{ mt: 1, display: "flex", flexDirection: "column" }}>
        <TextField
          sx={{ mt: 2 }}
          id="firstName"
          variant="outlined"
          label="First name*"
          autoFocus
          value={inputsValue.first}
          onChange={handleInputsChange}
        />
        <TextField
          sx={{ mt: 2 }}
          id="middleName"
          variant="outlined"
          label="Middle name"
          value={inputsValue.middle}
          onChange={handleInputsChange}
        />
        <TextField
          sx={{ mt: 2 }}
          id="lastName"
          variant="outlined"
          label="Last name*"
          value={inputsValue.last}
          onChange={handleInputsChange}
        />
        <TextField
          sx={{ mt: 2 }}
          id="phone"
          variant="outlined"
          label="Phone*"
          value={inputsValue.phone}
          onChange={handleInputsChange}
        />
        <TextField
          sx={{ mt: 2 }}
          id="email"
          variant="outlined"
          label="Email*"
          value={inputsValue.email}
          onChange={handleInputsChange}
        />
        <TextField
          sx={{ mt: 2 }}
          id="country"
          variant="outlined"
          label="Country*"
          value={inputsValue.country}
          onChange={handleInputsChange}
        />
        <TextField
          sx={{ mt: 2 }}
          id="city"
          variant="outlined"
          label="City*"
          value={inputsValue.city}
          onChange={handleInputsChange}
        />
        <TextField
          sx={{ mt: 2 }}
          id="state"
          variant="outlined"
          label="State"
          value={inputsValue.state}
          onChange={handleInputsChange}
        />
        <TextField
          sx={{ mt: 2 }}
          id="street"
          variant="outlined"
          label="Street*"
          value={inputsValue.street}
          onChange={handleInputsChange}
        />
        <TextField
          sx={{ mt: 2 }}
          id="houseName"
          variant="outlined"
          label="House number"
          value={inputsValue.houseNumber}
          onChange={handleInputsChange}
        />
        <TextField
          sx={{ mt: 2 }}
          id="zip"
          variant="outlined"
          label="Zip*"
          value={inputsValue.zip}
          onChange={handleInputsChange}
        />
      </Box>
      <Button
        variant="contained"
        sx={{ mt: 2, mb: 2 }}
        onClick={handleSubmit}
        fullWidth
      >
        APDATE
      </Button>
    </Container>
  );
};

export default EditProfile;
