import { Box, Button, Container, TextField, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useRef, useState, memo } from "react";
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
  const userData = useSelector((bigPie) => bigPie.authSlice.userData);
  console.log(userData);
  const navigate = useNavigate();

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
        toast.error(err, {
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
  console.log(userFromServer?.name?.first);

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
      await axios.put(
        `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users/${id}`,
        request
      );
      console.log(event);

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

  console.log(userFromServer?.name?.first);
  return (
    <Container sx={{ mt: 12 }}>
      <Typography variant="h3">Edit your profile</Typography>
      <Box sx={{ mt: 1, display: "flex", flexDirection: "column" }}>
        <TextField
          sx={{ mt: 2 }}
          id="firstName"
          variant="outlined"
          label="First name*"
          value={`${userFromServer?.name?.first}`}
          onChange={handleInputsChange}
          ref={input}
        />
        <TextField
          sx={{ mt: 2 }}
          id="middleName"
          variant="outlined"
          label="Middle name"
          defaultValue={`${userFromServer?.name?.middle}`}
          onChange={handleInputsChange}
        />
        <TextField
          sx={{ mt: 2 }}
          id="lastName"
          variant="outlined"
          label="Last name*"
          defaultValue={`${userFromServer?.name?.last}`}
          onChange={handleInputsChange}
        />
        <TextField
          sx={{ mt: 2 }}
          id="phone"
          variant="outlined"
          label="Phone*"
          defaultValue={`${userFromServer?.phone}`}
          onChange={handleInputsChange}
        />
        <TextField
          sx={{ mt: 2 }}
          id="country"
          variant="outlined"
          label="Country*"
          defaultValue={`${userFromServer?.address?.country}`}
          onChange={handleInputsChange}
        />
        <TextField
          sx={{ mt: 2 }}
          id="city"
          variant="outlined"
          label="City*"
          defaultValue={`${userFromServer?.address?.city}`}
          onChange={handleInputsChange}
        />
        <TextField
          sx={{ mt: 2 }}
          id="state"
          variant="outlined"
          label="State"
          defaultValue={`${userFromServer?.address?.state}`}
          onChange={handleInputsChange}
        />
        <TextField
          sx={{ mt: 2 }}
          id="street"
          variant="outlined"
          label="Street*"
          defaultValue={`${userFromServer?.address?.street}`}
          onChange={handleInputsChange}
        />
        <TextField
          sx={{ mt: 2 }}
          id="houseName"
          variant="outlined"
          label="House number"
          defaultValue={`${userFromServer?.address?.houseNumber}`}
          onChange={handleInputsChange}
        />
        <TextField
          sx={{ mt: 2 }}
          id="zip"
          variant="outlined"
          label="Zip*"
          defaultValue={`${userFromServer?.address?.zip}`}
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
