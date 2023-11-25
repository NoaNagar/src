import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Drawer,
  Divider,
} from "@mui/material";
import { useSelector } from "react-redux";
import myLinks, {
  alwaysLinks,
  loggedInLinks,
  businessInLinks,
  loggedOutLinks,
  adminInLinks,
} from "../../myLinks";
import { Link } from "react-router-dom";
import NavLinkComponent from "../NavLinkComponent";

const LeftDrawerComponent = ({ isOpen, onCloseDrawer }) => {
  const loggedIn = useSelector((bigPie) => bigPie.authSlice.loggedIn);
  const isBuisness = useSelector((bigPie) => bigPie.authSlice.isBuisness);
  const isAdmin = useSelector((bigPie) => bigPie.authSlice.isAdmin);
  const list = () => (
    <Box
      sx={{
        width: { auto: 250 },
        height: "100vw",
      }}
      role="presentation"
      onClick={onCloseDrawer}
      onKeyDown={onCloseDrawer}
    >
      <List>
        {alwaysLinks.map((myItem, index) => (
          <Box key={index}>
            <NavLinkComponent className={"linkLeft"} to={myItem.to}>
              {myItem.children}
            </NavLinkComponent>
            <Divider />
          </Box>
        ))}
        {loggedIn &&
          loggedInLinks.map((myItem, index) => (
            <Box key={index}>
              <NavLinkComponent className={"linkLeft"} to={myItem.to}>
                {myItem.children}
              </NavLinkComponent>
              <Divider />
            </Box>
          ))}
        {!loggedIn &&
          loggedOutLinks.map((myItem, index) => (
            <Box key={index}>
              <NavLinkComponent className={"linkLeft"} to={myItem.to}>
                {myItem.children}
              </NavLinkComponent>
              <Divider />
            </Box>
          ))}
        {isBuisness &&
          businessInLinks.map((myItem, index) => (
            <Box key={index}>
              <NavLinkComponent className={"linkLeft"} to={myItem.to}>
                {myItem.children}
              </NavLinkComponent>
              <Divider />
            </Box>
          ))}
        {isAdmin &&
          adminInLinks.map((myItem, index) => (
            <Box key={index}>
              <NavLinkComponent className={"linkLeft"} to={myItem.to}>
                {myItem.children}
              </NavLinkComponent>
              <Divider />
            </Box>
          ))}
      </List>
    </Box>
  );
  return (
    <Drawer anchor="left" open={isOpen} onClose={onCloseDrawer}>
      {list()}
    </Drawer>
  );
};

export default LeftDrawerComponent;
