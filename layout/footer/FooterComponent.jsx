import { Fragment, useState } from "react";

import {
  BottomNavigation,
  BottomNavigationAction,
  Box,
  Divider,
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
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction
          onChange={locationIcon}
          onClick={handleHomeIcon}
          label="Home"
          icon={<HomeIcon />}
        />

        <BottomNavigationAction
          onChange={locationIcon}
          onClick={handleInfoIcon}
          label="Info"
          icon={<InfoIcon />}
        />
        {loggedIn && (
          <BottomNavigationAction
            onChange={locationIcon}
            onClick={handleFavIcon}
            label="Favorite"
            icon={<FavoriteIcon />}
          />
        )}
        {loggedIn && (
          <BottomNavigationAction
            onChange={locationIcon}
            onClick={handleLogOutIcon}
            label="Log out"
            icon={<LogoutIcon />}
          />
        )}
      </BottomNavigation>
      <CopyrightComponent sx={{ mt: 5 }} />
    </Fragment>
  );
};

export default FooterComponent;
