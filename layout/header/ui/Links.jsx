import { Box } from "@mui/material";
import nextKey from "generate-my-key";
import {
  alwaysLinks,
  loggedInLinks,
  businessInLinks,
  loggedOutLinks,
  adminInLinks,
} from "../../myLinks";
import NavLinkComponent from "../NavLinkComponent";
import { useSelector } from "react-redux";

const Links = () => {
  const loggedIn = useSelector((bigPie) => bigPie.authSlice.loggedIn);
  const isBuisness = useSelector((bigPie) => bigPie.authSlice.isBuisness);
  const isAdmin = useSelector((bigPie) => bigPie.authSlice.isAdmin);
  return (
    <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
      {alwaysLinks.map((myItem) => (
        <NavLinkComponent
          className={myItem.className}
          to={myItem.to}
          key={nextKey()}
        >
          {myItem.children}
        </NavLinkComponent>
      ))}
      {loggedIn &&
        loggedInLinks.map((myItem) => (
          <NavLinkComponent
            className={myItem.className}
            to={myItem.to}
            key={nextKey()}
          >
            {myItem.children}
          </NavLinkComponent>
        ))}
      {!loggedIn &&
        loggedOutLinks.map((myItem) => (
          <NavLinkComponent
            className={myItem.className}
            to={myItem.to}
            key={nextKey()}
          >
            {myItem.children}
          </NavLinkComponent>
        ))}
      {isBuisness &&
        businessInLinks.map((myItem) => (
          <NavLinkComponent
            className={myItem.className}
            to={myItem.to}
            key={nextKey()}
          >
            {myItem.children}
          </NavLinkComponent>
        ))}
      {isAdmin &&
        adminInLinks.map((myItem) => (
          <NavLinkComponent
            className={myItem.className}
            to={myItem.to}
            key={nextKey()}
          >
            {myItem.children}
          </NavLinkComponent>
        ))}
    </Box>
  );
};

export default Links;
