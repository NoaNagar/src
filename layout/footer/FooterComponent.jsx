import { Fragment, useState } from "react";

import {
  BottomNavigation,
  BottomNavigationAction,
  Box,
  Divider,
  IconButton,
} from "@mui/material";

import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import LogoutIcon from "@mui/icons-material/Logout";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useSelector } from "react-redux";
import { Route, useLocation, useNavigate } from "react-router-dom";
import ROUTES from "../../routes/ROUTES";
import CopyrightComponent from "./ui/CopyrightComponent";

const FooterComponent = () => {
  const [value, setValue] = useState(0);
  const loggedIn = useSelector((bigPie) => bigPie.authSlice.loggedIn);
  const navigate = useNavigate();

  const handleHomeIcon = () => {
    navigate(ROUTES.HOME);
  };
  const handleInfoIcon = () => {
    navigate(ROUTES.ABOUT);
  };
  const handleFavIcon = () => {
    navigate(ROUTES.FAV);
  };
  const handleLogOutIcon = () => {
    localStorage.removeItem("token");
    document.location = "/";
  };

  let homePage = false;
  let aboutPage = false;
  let favPage = false;
  const currentPage = window.location.pathname;
  const locationIcon = () => {
    if (currentPage === "/") {
      homePage = true;
    } else if (currentPage === "/about") {
      aboutPage = true;
    } else if (currentPage === "/favorite") {
      favPage = true;
    }
  };

  return (
    <Fragment>
      <Divider></Divider>
      <Box
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        sx={{
          display: "flex",
          width: "40vw",
          justifyContent: "space-between",
          mr: "auto",
          ml: "auto",
        }}
      >
        <IconButton onChange={locationIcon} onClick={handleHomeIcon}>
          <HomeIcon />
        </IconButton>

        <IconButton onChange={locationIcon} onClick={handleInfoIcon}>
          <InfoIcon />
        </IconButton>

        {loggedIn && (
          <IconButton onChange={locationIcon} onClick={handleFavIcon}>
            <FavoriteIcon />
          </IconButton>
        )}
        {loggedIn && (
          <IconButton onChange={locationIcon} onClick={handleLogOutIcon}>
            <LogoutIcon />
          </IconButton>
        )}
      </Box>
      <CopyrightComponent sx={{ mt: 5 }} />
    </Fragment>
  );
};

export default FooterComponent;
