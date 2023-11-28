import ROUTES from "../routes/ROUTES";

const myLinks = [
  { to: ROUTES.HOME, children: "Home page", className: "homePage" },
  { to: ROUTES.REGISTER, children: "Register page", className: "registerPage" },
  { to: ROUTES.LOGIN, children: "Login page", className: "loginPage" },
];

const alwaysLinks = [
  { to: ROUTES.HOME, children: "Home page", className: "homePage" },
  { to: ROUTES.ABOUT, children: "About page", className: "aboutPage" },
];

const loggedInLinks = [
  { to: ROUTES.FAV, children: "Favorite page", className: "favoritePage" },
];

const businessInLinks = [
  { to: "/mycards", children: "My cards", className: "myCards" },
  { to: ROUTES.CREATECARD, children: "Create card", className: "createCard" },
];

const adminInLinks = [
  { to: ROUTES.SANDBOX, children: "Sand Box", className: "sandBox" },
];

const loggedOutLinks = [
  { to: ROUTES.REGISTER, children: "Register page", className: "registerPage" },
  { to: ROUTES.LOGIN, children: "Login page", className: "loginPage" },
];

export default myLinks;
export {
  alwaysLinks,
  loggedInLinks,
  businessInLinks,
  loggedOutLinks,
  adminInLinks,
};
