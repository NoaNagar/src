import { Box, Button, Container, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { Avatar } from "@mui/material";
import { alt } from "joi";
import { SafetyDivider } from "@mui/icons-material";
import { Divider } from "@mui/material";

const MyProrifile = () => {
  const [userFromServer, setUserFromServer] = useState({});
  const id = useSelector((bigPie) => bigPie.authSlice.id);

  useEffect(() => {
    axios
      .get(`https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users/${id}`)
      .then(({ data }) => {
        setUserFromServer(data);
      })
      .catch((err) => {});
  }, []);
  return (
    <Container sx={{ mt: 12 }}>
      <Avatar
        alt={userFromServer?.image?.alt}
        src={userFromServer?.image?.url}
        sx={{ width: 70, height: 70 }}
      />{" "}
      <Box sx={{ mt: 2, ml: 1 }}>
        <Divider textAlign="left">Personal Information</Divider>{" "}
        <Typography variant="h5" sx={{ mt: 2 }}>
          {userFromServer?.name?.first}
        </Typography>
        <Typography variant="h5" sx={{ mt: 2 }}>
          {userFromServer?.name?.midlle}
        </Typography>
        <Typography variant="h5" sx={{ mt: 2 }}>
          {userFromServer?.name?.last}
        </Typography>
        <Typography variant="h5" sx={{ mt: 2 }}>
          {userFromServer?.phone}
        </Typography>
        <Typography variant="h5" sx={{ mt: 2, mb: 2 }}>
          {userFromServer?.email}
        </Typography>
        <Divider textAlign="left">Address</Divider>{" "}
        <Typography variant="h5" sx={{ mt: 2 }}>
          {userFromServer?.name?.state}
        </Typography>
        <Typography variant="h5" sx={{ mt: 2 }}>
          {userFromServer?.address?.country}
        </Typography>
        <Typography variant="h5" sx={{ mt: 2 }}>
          {`${userFromServer?.address?.city}, ${userFromServer?.address?.street} ${userFromServer?.address?.houseNumber}`}
        </Typography>
        <Typography variant="h5" sx={{ mt: 2 }}>
          {userFromServer?.address?.zip}
        </Typography>
      </Box>
      <Button href="/editprofile" sx={{ p: 1.5, mt: 4, mb: 2 }}>
        Edit Profile
      </Button>
    </Container>
  );
};

export default MyProrifile;
