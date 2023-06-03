// Material Dashboard 2 React layouts
import Dashboard from "layouts/dashboard";
import Tables from "layouts/tables";
import Clinics from "layouts/clinicTable";
import PhyClinics from "layouts/phyClinicTable";
import Products from "layouts/products";

import Billing from "layouts/billing";
import RTL from "layouts/rtl";
import Notifications from "layouts/notifications";
import Profile from "layouts/profile";
import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";

import UserProfile from "layouts/user-profile";
import UserManagement from "layouts/user-management";

import Login from "auth/login";
import Register from "auth/register";
import ForgotPassword from "auth/forgot-password";
import ResetPassword from "auth/reset-password";

// @mui icons
import Icon from "@mui/material/Icon";

const routes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/dashboard",
    component: <Dashboard />,
  },
  {
    type: "collapse",
    name: "Gyms",
    key: "tables",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/gymsstables",
    component: <Tables />,
  },
  {
    type: "collapse",
    name: "Clinics",
    key: "clinics-table",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/clinictables",
    component: <Clinics />,
  },
  {
    type: "collapse",
    name: "physiotherapy clinic",
    key: "phyclinics-table",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/phyclinic-tables",
    component: <PhyClinics />,
  },
  {
    type: "collapse",
    name: "products",
    key: "products-table",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/products-tables",
    component: <Products />,
  },
  // {
  //   type: "collapse",
  //   name: "Billing",
  //   key: "billing",
  //   icon: <Icon fontSize="small">receipt_long</Icon>,
  //   route: "/billing",
  //   component: <Billing />,
  // },
  {
    type: "collapse",
    name: "Add Admin",
    key: "register",
    icon: <Icon fontSize="small">person_add</Icon>,
    route: "/auth/register",
    component: <Register />,
  },
  {
    type: "collapse",
    name: "Profile",
    key: "profile",
    icon: <Icon fontSize="small">home</Icon>,
    route: "/profile",
    component: <Profile />,
  },

  // {
  //   type: "collapse",
  //   name: "Sign In",
  //   key: "sign-in",
  //   icon: <Icon fontSize="small">login</Icon>,
  //   route: "/authentication/sign-in",
  //   component: <SignIn />,
  // },
  // {
  //   type: "examples",
  //   name: "User Profile",
  //   key: "user-profile",
  //   icon: <Icon fontSize="small">person</Icon>,
  //   route: "/user-profile",
  //   component: <UserProfile />,
  // },
  // {
  //   type: "examples",
  //   name: "User Management",
  //   key: "user-management",
  //   icon: <Icon fontSize="small">list</Icon>,
  //   route: "/user-management",
  //   component: <UserManagement />,
  // },
  // {
  //   type: "collapse",
  //   name: "Sign Up",
  //   key: "sign-up",
  //   icon: <Icon fontSize="small">assignment</Icon>,
  //   route: "/authentication/sign-up",
  //   component: <SignUp />,
  // },
  {
    type: "auth",
    name: "Login",
    key: "login",
    icon: <Icon fontSize="small">login</Icon>,
    route: "/auth/login",
    component: <Login />,
  },
  {
    type: "auth",
    name: "Register",
    key: "register",
    icon: <Icon fontSize="small">reigster</Icon>,
    route: "/auth/register",
    component: <Register />,
  },
  {
    type: "auth",
    name: "Forgot Password",
    key: "forgot-password",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/auth/forgot-password",
    component: <ForgotPassword />,
  },
  {
    type: "auth",
    name: "Reset Password",
    key: "reset-password",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/auth/reset-password",
    component: <ResetPassword />,
  },
];

export default routes;
