import { Container, Typography, Divider } from "@mui/material";
import React from "react";

function AboutPageComponent() {
  return (
    <Container>
      <Typography sx={{ mt: 12, mb: 2 }} variant="h3">
        About us
      </Typography>
      <Typography variant="h6">
        Welcome to the "Advanced Business Cards" site! This website is intended
        for businesses and customers looking for advanced solutions for managing
        and communicating with customers. The site provides an integrated and
        friendly platform that enables efficient management of business cards,
        quality communication with customers, and improving the customer
        experience.
      </Typography>
      <Divider textAlign="left" sx={{ fontSize: "2rem", mt: 1, mb: 1 }}>
        main features:
      </Divider>
      {/* <Typography variant="h4" sx={{ mb: 2 }}>
        main features:
      </Typography> */}
      <Typography variant="h5" sx={{ mt: 2 }}>
        Registration and login:
      </Typography>
      <Typography variant="body1">
        The site offers the possibility to register and connect with a personal
        account. Entry in levels: customer, business customer and business
        manager.
      </Typography>
      <Typography variant="h5" sx={{ mt: 2 }}>
        Management of business cards:
      </Typography>
      <Typography variant="body1">
        Creating and updating a dynamic and personalized business card. Regular
        updates of information and promotions.
      </Typography>
      <Typography variant="h5" sx={{ mt: 2 }}>
        Client Levels:
      </Typography>
      <Typography variant="body1">
        A rating system that allows customers to respond and rate the business.
        You can clearly see customer ratings and communicate with users.
      </Typography>
      <Typography variant="h5" sx={{ mt: 2 }}>
        Privacy management:
      </Typography>
      <Typography variant="body1" sx={{ mb: 1 }}>
        Advanced security that ensures customer information is kept completely
        private. Ability to set restrictions and permissions for different
        users.
      </Typography>
      <Divider />
      <Typography variant="h6" sx={{ mt: 2, mb: 2 }}>
        The "Advanced Business Cards" website will help businesses create and
        maintain effective contact with their customers, upgrade customer
        services and manage information in an efficient and targeted manner.
        This site provides an advanced and modular tool that meets the needs of
        the business at every level, starting from a private customer to the
        business manager
      </Typography>
    </Container>
  );
}

export default AboutPageComponent;
