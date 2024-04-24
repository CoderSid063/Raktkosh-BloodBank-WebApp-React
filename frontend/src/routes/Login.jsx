import { useState } from "react";
import axios from "axios";
import "../styles/login.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../store/authSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const [loginFormData, setLoginFormData] = useState({
    email: "",
    phoneNumber: "",
    password: "",
  });

  const handleLoginInputChange = (e) => {
    const { name, value } = e.target;
    setLoginFormData({
      ...loginFormData,
      [name]: value,
    });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/users/login",
        loginFormData
      );
      console.log(response);

      if (response.status === 200) {
        const responseData = response.data;
        const { data } = responseData;
        const { accessToken, refreshToken } = data;
        // console.log(data);
        // console.log(data.accessToken);
        // console.log(data.refreshToken);

        //sending tokens to redux store :-
        dispatch(authActions.setTokens({ accessToken, refreshToken }));

        // set token in localStorage:-

        // localStorage.setItem("accessToken", accessToken);
        // localStorage.setItem("refreshToken", refreshToken);
        // Reset form after submission
        setLoginFormData({
          email: "",
          phoneNumber: "",
          password: "",
        });

        navigate("/");
      } else {
        console.error("Error logging in:", response.message);
      }
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  return (
    <div className="home">
      <div className="form_container">
        <form onSubmit={handleLoginSubmit}>
          <h2>Login</h2>
          <div className="input_box">
            <input
              type="text"
              name="email"
              value={loginFormData.email}
              onChange={handleLoginInputChange}
              placeholder="Enter Email-ID"
            />
            <div className="line"></div>
          </div>
          <div className="input_box">
            <input
              type="text"
              name="phoneNumber"
              value={loginFormData.phoneNumber}
              onChange={handleLoginInputChange}
              placeholder="Enter Phone No"
            />
            <div className="line"></div>
          </div>
          <div className="input_box">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={loginFormData.password}
              onChange={handleLoginInputChange}
              placeholder="Enter Password"
              required
            />
            <div
              className="password-toggle"
              onClick={handleTogglePasswordVisibility}
            >
              <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
            </div>
            <div className="line"></div>
          </div>

          <div className="option_field">
            <Link to="/login/changePassword" className="forgot_pw">
              Forgot password
            </Link>
          </div>
          <button className="button" type="submit">
            Login Now
          </button>

          <div className="login_signup">
            Dont have an account?
            <Link to="/login/register" className="forgot_pw">
              Register
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
