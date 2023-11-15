import ROUTES from "../routes/ROUTES";

const myLinks = [
  { to: ROUTES.HOME, children: "Home page" },
  { to: ROUTES.REGISTER, children: "Register page" },
  { to: ROUTES.LOGIN, children: "Login page" },
];

const alwaysLinks = [
  { to: ROUTES.HOME, children: "Home page" },
  { to: ROUTES.ABOUT, children: "about page" },
];

const loggedInLinks = [
  { to: ROUTES.FAV, children: "favorite page", className: "favLink" },
];

const businessInLinks = [
  { to: "/mycards", children: "My cards" },
  { to: ROUTES.CREATECARD, children: "Create card" },
];

const loggedOutLinks = [
  { to: ROUTES.REGISTER, children: "Register page" },
  { to: ROUTES.LOGIN, children: "Login page" },
];

export default myLinks;
export { alwaysLinks, loggedInLinks, businessInLinks, loggedOutLinks };
