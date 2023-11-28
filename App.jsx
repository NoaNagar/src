import "react-toastify/dist/ReactToastify.css";
import LayoutComponent from "./layout/LayoutComponent";
import { ToastContainer } from "react-toastify";
import Router from "./routes/Router";
import useAutoLogin from "./hooks/useAutoLogin";
import { Fragment, useEffect, useState } from "react";
import { LinearProgress, ThemeProvider, createTheme, css } from "@mui/material";
import { BarLoader } from "react-spinners";
import CircularProgress from "@mui/material/CircularProgress";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
  margin-top: 20vh;
`;

const App = () => {
  const [loading, setLoading] = useState(true);
  const [doneAuth, setDoneAuth] = useState(false);
  const autoLogin = useAutoLogin();

  useEffect(() => {
    (async () => {
      try {
        await autoLogin();
      } catch (err) {
        console.log(err);
      } finally {
        setDoneAuth(true);
      }
    })();
  }, [autoLogin]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       await new Promise((resolve) => setTimeout(resolve));
  //       setLoading(false);
  //     } catch (err) {
  //       setLoading(false);
  //     }
  //   };
  //   fetchData();
  // }, [autoLogin]);

  // useEffect(() => {
  //   (async () => {
  //     try {
  //       await autoLogin();
  //     } catch (err) {
  //     } finally {
  //       setDoneAuth(true);
  //     }
  //   })();
  // }, []);

  return (
    <Fragment>
      {/* {loading ? (
        // <CircularProgress sx={{ mt: 12, ml: "auto", mr: "auto" }} />
        <BarLoader
          css={override}
          size={150}
          color={"#123abc"}
          loading={loading}
        />
      ) : ( */}
      <LayoutComponent>
        <ToastContainer />
        {doneAuth ? <Router /> : <LinearProgress sx={{ mt: 15 }} />}
      </LayoutComponent>
      {/* )} */}
    </Fragment>
  );
};

export default App;
