import { Route, Routes } from "react-router-dom";

import ROUTES from "./ROUTES";
import HomePage from "../pages/home/HomePage";
import RegisterPage from "../pages/register/RegisterPage";
import Error404Page from "../pages/404/Error404Page";
import LoginPage from "../pages/login/LoginPage";
import EditCardPage from "../pages/EditCardPage/EditCardPage";
import CreateCardPage from "../pages/CreateCardPage/CreateCardPage";
import AuthGuard from "../Guard/AuthGuard";
import BizGuard from "../Guard/BizGuard";
import AdminGuard from "../Guard/BizGuard";
import AboutPageComponent from "../pages/aboutPage/AboutPageComponent";
import FavPageComponent from "../pages/FavPage/FavPageComponent";
import MyCardsPage from "../pages/myCards/MyCardsPage";
import MyProrifile from "../pages/MyProfile/MyProrifile";
import EditProfile from "../pages/MyProfile/EditProfile";
import SandboxPage from "../pages/Sandbox/SandboxPage";

const Router = () => {
  return (
    <Routes>
      <Route path={ROUTES.HOME} element={<HomePage />} />
      <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
      <Route path={ROUTES.LOGIN} element={<LoginPage />} />
      <Route path={ROUTES.ABOUT} element={<AboutPageComponent />} />
      <Route path={ROUTES.MYCARDS} element={<MyCardsPage />} />
      <Route path={ROUTES.PROFILE} element={<MyProrifile />} />
      <Route path={ROUTES.EDITPROFILE} element={<EditProfile />} />

      <Route
        path={ROUTES.CREATECARD}
        element={
          <AuthGuard>
            <BizGuard>
              <CreateCardPage />
            </BizGuard>
          </AuthGuard>
        }
      />
      <Route
        path={`${ROUTES.EDITCARD}/:id`}
        element={
          <AuthGuard>
            <BizGuard>
              <EditCardPage />
            </BizGuard>
          </AuthGuard>
        }
      />
      <Route
        path={ROUTES.SANDBOX}
        element={
          <AuthGuard>
            <AdminGuard>
              <SandboxPage />
            </AdminGuard>
          </AuthGuard>
        }
      />

      <Route
        path={ROUTES.FAV}
        element={
          <AuthGuard>
            <FavPageComponent />
          </AuthGuard>
        }
      />
      <Route path="*" element={<Error404Page />} />
    </Routes>
  );
};
export default Router;
