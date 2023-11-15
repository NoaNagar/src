import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Grid,
  Typography,
} from "@mui/material";
import axios from "axios";
import { Fragment, useEffect, useState } from "react";
import { toast } from "react-toastify";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const SandboxPage = () => {
  const [userFromServer, setUserFromServer] = useState([]);
  useEffect(() => {
    axios
      .get(`https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users`)
      .then(({ data }) => {
        setUserFromServer(data);
      })
      .catch((err) => {
        toast.error(err.response.data, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      });
  }, []);

  return (
    <Fragment>
      <Typography variant="h4" sx={{ mt: 12, mb: 2 }}>
        All Users:
      </Typography>
      <Grid container spacing={2} sx={{ mb: 2 }}>
        {userFromServer.map((item, index) => (
          <Grid key={index} sx={{ mt: 2 }}>
            <Accordion
            // expanded={expanded === "panel1"}
            // onChange={handleChange("panel1")}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
              >
                <Typography sx={{ width: "33%", flexShrink: 0 }}>
                  {item.name.first}{" "}
                </Typography>
                <Typography sx={{ color: "text.secondary" }}>
                  I am an accordion
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Nulla facilisi. Phasellus sollicitudin nulla et quam mattis
                  feugiat. Aliquam eget maximus est, id dignissim quam.
                </Typography>
              </AccordionDetails>
            </Accordion>{" "}
          </Grid>
        ))}
      </Grid>
    </Fragment>
  );
};
export default SandboxPage;
