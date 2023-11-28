import "react-toastify/dist/ReactToastify.css";
import LayoutComponent from "./layout/LayoutComponent";
import { ToastContainer } from "react-toastify";
import Router from "./routes/Router";
import useAutoLogin from "./hooks/useAutoLogin";
import { Fragment, useEffect, useState } from "react";
import { LinearProgress } from "@mui/material";

const App = () => {
  const [doneAuth, setDoneAuth] = useState(false);
  const autoLogin = useAutoLogin();
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
      <LayoutComponent>
        <ToastContainer />
        {doneAuth ? <Router /> : <LinearProgress sx={{ mt: 15 }} />}
      </LayoutComponent>
    </Fragment>
  );
};

export default App;
