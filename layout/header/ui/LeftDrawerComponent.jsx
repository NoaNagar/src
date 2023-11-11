import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Drawer,
} from "@mui/material";
import { useSelector } from "react-redux";
import myLinks, {
  alwaysLinks,
  loggedInLinks,
  businessInLinks,
  loggedOutLinks,
} from "../../myLinks";
import { Link } from "react-router-dom";

const LeftDrawerComponent = ({ isOpen, onCloseDrawer }) => {
  const loggedIn = useSelector((bigPie) => bigPie.authSlice.loggedIn);
  const isBuisness = useSelector((bigPie) => bigPie.authSlice.isBuisness);
  const list = () => (
    <Box
      sx={{ width: { auto: 250 } }}
      role="presentation"
      onClick={onCloseDrawer}
      onKeyDown={onCloseDrawer}
    >
      <List>
        {alwaysLinks.map((myItem, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton>
              <Link to={myItem.to}>
                <ListItemText primary={myItem.children} sx={{ pl: 2, pr: 2 }} />
              </Link>
            </ListItemButton>
          </ListItem>
        ))}
        {loggedIn &&
          loggedInLinks.map((myItem, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton>
                <Link to={myItem.to}>
                  <ListItemText
                    primary={myItem.children}
                    sx={{ pl: 2, pr: 2 }}
                  />
                </Link>
              </ListItemButton>
            </ListItem>
          ))}
        {!loggedIn &&
          loggedOutLinks.map((myItem, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton>
                <Link to={myItem.to}>
                  <ListItemText
                    primary={myItem.children}
                    sx={{ pl: 2, pr: 2 }}
                  />
                </Link>
              </ListItemButton>
            </ListItem>
          ))}
        {isBuisness &&
          businessInLinks.map((myItem, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton>
                <Link to={myItem.to}>
                  <ListItemText
                    primary={myItem.children}
                    sx={{ pl: 2, pr: 2 }}
                  />
                </Link>
              </ListItemButton>
            </ListItem>
          ))}
        {/* <ListItemIcon>
              </ListItemIcon> */}
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
