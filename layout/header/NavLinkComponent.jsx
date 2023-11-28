import { Typography } from "@mui/material";
import { NavLink } from "react-router-dom";

const NavLinkComponent = ({ to, children, className }) => {
  return (
    <NavLink to={to} style={{ textDecoration: "none" }}>
      {({ isActive }) => (
        <Typography
          color={isActive ? "text.headerActive" : "text.headerColor"}
          sx={{ p: 2, underline: "none" }}
          variant="h6"
          className={className}
        >
          {children}
        </Typography>
      )}
    </NavLink>
  );
};

export default NavLinkComponent;
