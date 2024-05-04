import ReactDOM from "react-dom/client";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ContactUs from "./routes/ContactUs.jsx";
import AboutUs from "./routes/AboutUs.jsx";
import App from "./routes/App.jsx";
import ErrorPage from "./routes/ErrorPage.jsx";
import Home from "./components/hero/Home.jsx";
import Login from "./routes/Login.jsx";
import BloodRequest from "./routes/BloodRequest.jsx";
import BloodAvailable from "./routes/BloodAvailable.jsx";
import DonorRgister from "./routes/DonorRgister.jsx";
import BloodCampReg from "./routes/BloodCampReg.jsx";
import BloodCamps from "./routes/BloodCamps.jsx";
import { Provider } from "react-redux";
import raktkoshStore from "./store/store.js";
import { ChangePassword } from "./routes/ChangePassword.jsx";
import RegisterForm from "./routes/RegisterForm.jsx";
import UserProfile from "./routes/UserProfile.jsx";
import ForgetPassword from "./routes/ForgetPassword.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/aboutus", element: <AboutUs /> },
      { path: "/contactus", element: <ContactUs /> },
      { path: "/user-profile", element: <UserProfile /> },
      { path: "/login", element: <Login /> },
      { path: "/user-profile/changePassword", element: <ChangePassword /> },
      { path: "/login/forget-password", element: <ForgetPassword /> },
      { path: "/login/register", element: <RegisterForm /> },
      { path: "/bloodavailable", element: <BloodAvailable /> },
      { path: "/searchCamp", element: <BloodCamps /> },
      { path: "/RegisterCamp", element: <BloodCampReg /> },
      { path: "/donerRegister", element: <DonorRgister /> },
      { path: "/bloodrequest", element: <BloodRequest /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={raktkoshStore}>
    <RouterProvider router={router} />
  </Provider>
);
