import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { Box } from "@mui/material";

const CircularIndeterminate = () => {
  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <CircularProgress />
    </Box>
  );
};

export default CircularIndeterminate;
