import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { Avatar, Switch, Typography } from "@mui/material";
import Links from "./ui/Links";
import LeftDrawerComponent from "./ui/LeftDrawerComponent";
import { useState } from "react";
import FilterComponent from "./ui/FilterComponent";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../routes/ROUTES";
import { useDispatch, useSelector } from "react-redux";
import { darkThemeActions } from "../../store/darkThemeSlice";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import axios from "axios";
import { toast } from "react-toastify";
import "./ui/linksCss.css";

const HeaderComponent = ({ isDarkTheme, onThemeChange }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const loggedIn = useSelector((bigPie) => bigPie.authSlice.loggedIn);
  const dispatch = useDispatch();
  const [userFromServer, setUserFromServer] = useState({});
  const id = useSelector((bigPie) => bigPie.authSlice.id);
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };
  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };
  const handleThemeToggle = () => {
    dispatch(darkThemeActions.setThemePreference(!isDarkTheme));
  };
  const handleOpenDrawerClick = () => {
    setIsOpen(true);
  };
  const handleCloseDrawerClick = () => {
    setIsOpen(false);
  };
  const navigate = useNavigate();
  const handleProfile = () => {
    navigate(ROUTES.PROFILE);
    setAnchorEl(null);
    handleMobileMenuClose();
  };
  const handleLogOutIcon = () => {
    localStorage.removeItem("token");
    document.location = "/";
  };
  React.useEffect(() => {
    axios
      .get(`https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users/${id}`)
      .then(({ data }) => {
        setUserFromServer(data);
      })
      .catch((err) => {});
  }, []);
  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {loggedIn && <MenuItem onClick={handleProfile}>Profile</MenuItem>}
      {loggedIn && <MenuItem onClick={handleLogOutIcon}>Log out</MenuItem>}
    </Menu>
  );
  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          sx={{ p: 0 }}
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );
  return (
    <Box sx={{ flexGrow: 1, mb: 2 }}>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
            onClick={handleOpenDrawerClick}
          >
            <MenuIcon />
          </IconButton>
          <Links />
          <FilterComponent />
          <Box sx={{ my: 2, p: 1, display: "flex", flexDirection: "row" }}>
            {isDarkTheme ? <DarkModeIcon /> : <LightModeIcon />}
            <Switch
              checked={isDarkTheme}
              onChange={handleThemeToggle}
              sx={{ mt: -1 }}
            />
          </Box>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            {loggedIn && (
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <Avatar alt="profile" src={userFromServer?.image?.url} />
              </IconButton>
            )}
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            {loggedIn && (
              <IconButton
                size="large"
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <Avatar alt="profile" src={userFromServer?.image?.url} />
              </IconButton>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
      <LeftDrawerComponent
        isOpen={isOpen}
        onCloseDrawer={handleCloseDrawerClick}
      />
    </Box>
  );
};
export default HeaderComponent;
