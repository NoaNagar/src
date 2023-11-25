import { Box, Button, Container, TextField, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useRef, useState, memo } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ROUTES from "../../routes/ROUTES";
import { normalizeData } from "../register/normalizeData";
import { validateRegister } from "../../validation/registerValidation";
import { Alert, Grid } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import BorderColorIcon from "@mui/icons-material/BorderColor";
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
  const userData = useSelector((bigPie) => bigPie.authSlice.userData);
  const navigate = useNavigate();
  const [errorsState, setErrorsState] = useState(null);

  let input = useRef(null);
  useEffect(() => {
    axios
      .get(`https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users/${id}`)
      .then(({ data }) => {
        setUserFromServer(data);
        setUserFromServer((old) => {
          return {
            ...old,
            first: input.current.value,
          };
        });
      })
      .catch((err) => {
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
      });
  }, []);
  const handleInputsChange = (e) => {
    setInputsValue((currentState) => ({
      ...currentState,
      [e.target.id]: e.target.value,
    }));
  };
  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const joiResponse = validateRegister({
        first: inputsValue.first,
        last: inputsValue.last,
        phone: inputsValue.phone,
        email: inputsValue.email,
        password: inputsValue.password,
        url: inputsValue.url,
        alt: inputsValue.password,
        state: inputsValue.password,
        country: inputsValue.country,
        city: inputsValue.city,
        street: inputsValue.street,
        houseNumber: inputsValue.houseNumber,
        zip: inputsValue.zip,
      });
      setErrorsState(joiResponse);
      if (joiResponse) return;

      const errors = validateRegister(inputsValue);
      if (errors) return;
      let request = normalizeData(inputsValue);
      await axios.put(
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
    <Container>
      <Box
        sx={{
          marginTop: 12,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main", width: 60, height: 60 }}>
          <BorderColorIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Edit profile{" "}
        </Typography>
        <Grid sx={{ width: "50vw" }}>
          <Box sx={{ mt: 1, display: "flex", flexDirection: "column" }}>
            <TextField
              sx={{ mt: 2 }}
              id="firstName"
              variant="outlined"
              label="First name"
              defaultValue={inputsValue.first}
              onChange={handleInputsChange}
              ref={input}
            />
            {errorsState && errorsState.first && (
              <Alert severity="warning">{errorsState.first}</Alert>
            )}
            <TextField
              sx={{ mt: 2 }}
              id="middleName"
              variant="outlined"
              label="Middle name"
              defaultValue={inputsValue.middle}
              onChange={handleInputsChange}
            />
            {errorsState && errorsState.middle && (
              <Alert severity="warning">{errorsState.middle}</Alert>
            )}
            <TextField
              sx={{ mt: 2 }}
              id="lastName"
              variant="outlined"
              label="Last name"
              defaultValue={inputsValue.last}
              onChange={handleInputsChange}
            />
            {errorsState && errorsState.last && (
              <Alert severity="warning">{errorsState.last}</Alert>
            )}
            <TextField
              sx={{ mt: 2 }}
              id="phone"
              variant="outlined"
              label="Phone"
              defaultValue={inputsValue.phone}
              onChange={handleInputsChange}
            />
            {errorsState && errorsState.phone && (
              <Alert severity="warning">{errorsState.phone}</Alert>
            )}
            <TextField
              sx={{ mt: 2 }}
              id="country"
              variant="outlined"
              label="Country"
              defaultValue={inputsValue.country}
              onChange={handleInputsChange}
            />
            {errorsState && errorsState.countery && (
              <Alert severity="warning">{errorsState.countery}</Alert>
            )}
            <TextField
              sx={{ mt: 2 }}
              id="city"
              variant="outlined"
              label="City"
              defaultValue={inputsValue.city}
              onChange={handleInputsChange}
            />
            {errorsState && errorsState.city && (
              <Alert severity="warning">{errorsState.city}</Alert>
            )}
            <TextField
              sx={{ mt: 2 }}
              id="state"
              variant="outlined"
              label="State"
              defaultValue={inputsValue.state}
              onChange={handleInputsChange}
            />
            {errorsState && errorsState.state && (
              <Alert severity="warning">{errorsState.state}</Alert>
            )}
            <TextField
              sx={{ mt: 2 }}
              id="street"
              variant="outlined"
              label="Street"
              defaultValue={inputsValue.street}
              onChange={handleInputsChange}
            />
            {errorsState && errorsState.street && (
              <Alert severity="warning">{errorsState.street}</Alert>
            )}
            <TextField
              sx={{ mt: 2 }}
              id="houseName"
              variant="outlined"
              label="House number"
              defaultValue={inputsValue.houseNumber}
              onChange={handleInputsChange}
            />
            {errorsState && errorsState.houseNumber && (
              <Alert severity="warning">{errorsState.houseNumber}</Alert>
            )}
            <TextField
              sx={{ mt: 2 }}
              id="zip"
              variant="outlined"
              label="Zip"
              defaultValue={inputsValue.zip}
              onChange={handleInputsChange}
            />
            {errorsState && errorsState.zip && (
              <Alert severity="warning">{errorsState.zip}</Alert>
            )}
          </Box>
          <Button
            variant="contained"
            sx={{ mt: 2, mb: 2 }}
            onClick={handleSubmit}
            fullWidth
          >
            APDATE
          </Button>
        </Grid>
      </Box>
    </Container>
  );
};

export default EditProfile;
