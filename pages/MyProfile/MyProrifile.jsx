import { Box, Button, Container, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const MyProrifile = () => {
  const [userFromServer, setUserFromServer] = useState({});
  const id = useSelector((bigPie) => bigPie.authSlice.id);

  useEffect(() => {
    axios
      .get(`https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users/${id}`)
      .then(({ data }) => {
        setUserFromServer(data);
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
      <Typography variant="h2" noWrap component="div">
        My Profile
      </Typography>
      <Box sx={{ mt: 2 }}>
        <Typography variant="h5">
          First name: {`${userFromServer?.name?.first}`}
        </Typography>
        <Typography variant="h5">
          Middle name: {userFromServer?.name?.midlle}
        </Typography>
        <Typography variant="h5">
          Last name: {userFromServer?.name?.last}
        </Typography>
        <Typography variant="h5">Pone: {userFromServer?.phone}</Typography>
        <Typography variant="h5">Email: {userFromServer?.email}</Typography>
        <Typography variant="h4">Address</Typography>
        <Typography variant="h5">
          Country: {userFromServer?.address?.country}
        </Typography>
        <Typography variant="h5">
          City: {userFromServer?.address?.city}
        </Typography>
        <Typography variant="h5">
          State: {userFromServer?.name?.state}
        </Typography>
        <Typography variant="h5">
          Street: {userFromServer?.address?.street}
        </Typography>
        <Typography variant="h5">
          House number: {userFromServer?.address?.houseNumber}
        </Typography>
        <Typography variant="h5">
          Zip: {userFromServer?.address?.zip}
        </Typography>
      </Box>
      <Button href="/editprofile">Edit Profile</Button>
    </Container>
  );
};

export default MyProrifile;
