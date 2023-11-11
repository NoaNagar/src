import { Box, Button, Container, TextField, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const EditProfile = () => {
  const [userFromServer, setUserFromServer] = useState({});
  const id = useSelector((bigPie) => bigPie.authSlice.id);

  const handleInputsChange = (e) => {
    setUserFromServer((currentState) => ({
      ...currentState,
      [e.target.id]: e.target.value,
    }));
  };

  useEffect(() => {
    axios
      .get(`https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users/${id}`)
      .then(({ data }) => {
        const newData = data;
        setUserFromServer(newData);
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
  return (
    <Container sx={{ mt: 12 }}>
      <Typography variant="h3">Edit your profile</Typography>
      {/* <Box sx={{ mt: 1 }}>
        <Typography sx={{ mt: 2 }}>First name:</Typography>
        <TextField
          id="firstName"
          variant="outlined"
          value={`${userFromServer.name.first}`}
          onChange={handleInputsChange}
        />
        <Typography sx={{ mt: 2 }}>Middle name:</Typography>
        <TextField
          id="middleName"
          variant="outlined"
          value={`${userFromServer.name.middle}`}
          onChange={handleInputsChange}
        />
        <Typography sx={{ mt: 2 }}>Last name:</Typography>
        <TextField
          id="lastName"
          variant="outlined"
          value={`${userFromServer.name.last}`}
          onChange={handleInputsChange}
        />
        <Typography sx={{ mt: 2 }}>Phone:</Typography>
        <TextField
          id="phone"
          variant="outlined"
          value={`${userFromServer.phone}`}
          onChange={handleInputsChange}
        />
        <Typography sx={{ mt: 2 }}>Email:</Typography>
        <TextField
          id="email"
          variant="outlined"
          value={`${userFromServer.email}`}
          onChange={handleInputsChange}
        />
        <Typography sx={{ mt: 2 }}>Country:</Typography>
        <TextField
          id="country"
          variant="outlined"
          value={`${userFromServer.address.country}`}
          onChange={handleInputsChange}
        />
        <Typography sx={{ mt: 2 }}>City:</Typography>
        <TextField
          id="city"
          variant="outlined"
          value={`${userFromServer.address.city}`}
          onChange={handleInputsChange}
        />
        <Typography sx={{ mt: 2 }}>State:</Typography>
        <TextField
          id="state"
          variant="outlined"
          value={`${userFromServer.address.state}`}
          onChange={handleInputsChange}
        />
        <Typography sx={{ mt: 2 }}>Street:</Typography>
        <TextField
          id="street"
          variant="outlined"
          value={`${userFromServer.address.street}`}
          onChange={handleInputsChange}
        />
        <Typography sx={{ mt: 2 }}>House number:</Typography>
        <TextField
          id="houseName"
          variant="outlined"
          value={`${userFromServer.address.hoseNumber}`}
          onChange={handleInputsChange}
        />
        <Typography sx={{ mt: 2 }}>Zip:</Typography>
        <TextField
          id="zip"
          variant="outlined"
          value={`${userFromServer.address.zip}`}
          onChange={handleInputsChange}
        />
      </Box> */}
      <Button variant="contained" sx={{ mt: 2 }}>
        APDATE
      </Button>
    </Container>
  );
};

export default EditProfile;
