import "react-toastify/dist/ReactToastify.css";
import LayoutComponent from "./layout/LayoutComponent";
import { ToastContainer } from "react-toastify";
import Router from "./routes/Router";
import useAutoLogin from "./hooks/useAutoLogin";
import { Fragment, useEffect, useState } from "react";
import { LinearProgress, ThemeProvider, createTheme, css } from "@mui/material";
import { BarLoader } from "react-spinners";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const App = () => {
  const [loading, setLoading] = useState(true);
  const [doneAuth, setDoneAuth] = useState(false);
  const autoLogin = useAutoLogin();
  useEffect(() => {
    const fetchData = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve));

        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };

    fetchData();
  }, [autoLogin]);
  useEffect(() => {
    (async () => {
      try {
        await autoLogin(); //false is default
      } catch (err) {
        console.log(err);
      } finally {
        //this block of code will executed when the promise done
        //no matter if its done or got error
        setDoneAuth(true);
      }
    })();
  }, []);
  return (
    <Fragment>
      {loading ? (
        <BarLoader
          css={override}
          size={150}
          color={"#123abc"}
          loading={loading}
        />
      ) : (
        <LayoutComponent>
          <ToastContainer />
          {doneAuth ? <Router /> : <LinearProgress />}
        </LayoutComponent>
      )}
    </Fragment>
  );
};

export default App;
