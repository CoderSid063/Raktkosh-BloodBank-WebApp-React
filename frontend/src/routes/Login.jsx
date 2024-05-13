import { useEffect, useState } from "react";
import "../styles/login.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { userActions } from "../store/userSlice";
import { authActions } from "../store/authSlice";
import { URL } from "../utils/Url.js";

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
    // console.log(loginFormData);
    try {
      const response = await fetch(`${URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginFormData),
        credentials: "include", // without this we can't store token in cookie storage only in "localhost"
      });
      // console.log(response);

      if (response.status === 200) {
        const responseData = await response.json();
        const { data } = responseData;
        const { user } = data;

        //sending tokens to redux store :-
        dispatch(authActions.setTokens());

        // //sending userdata to redux store:-
        dispatch(userActions.setUserData(user));

        // Reset form after submission
        setLoginFormData({
          email: "",
          phoneNumber: "",
          password: "",
        });

        navigate("/");
      } else {
        console.log("Error logging in:", response.statusText);
      }
    } catch (error) {
      console.log("Error logging in:", error);
    }
  };
  /*
  const handleForgetPassword = async () => {
    try {
      // Make API request to forget password
      const response = await axios.post(
        "http://localhost:5000/api/v1/users/change-password",
        { email: userData.email }
      );
      console.log(response.data); // Handle response accordingly
    } catch (error) {
      console.error("Error forgetting password:", error);
    }
  };
*/
  const { userData } = useSelector((state) => state.user);

  useEffect(() => {
    if (userData) {
      // console.log(userData);
      fetchUserProfile();
    }
  }, [userData]);

  // this endpont get the user deatils related Camps or BloodReuest or Blood donates :-
  const fetchUserProfile = async () => {
    const userId = userData._id;
    try {
      const response = await fetch(`${URL}/getuserprofile?userId=${userId}`, {
        method: "GET",
        credentials: "include",
      });
      // console.log(response);

      if (response.ok) {
        // Convert the response to JSON format //
        const res = await response.json();
        const { data } = res; // Now 'data' contains the JSON response from the server
        // console.log(data);
        const { organizedBloodCamps } = data;
        const { submittedBloodForms } = data;
        // console.log(organizedBloodCamps);
        // console.log(submittedBloodForms);

        // Dispatch action to store user profile data in Redux store //
        dispatch(userActions.setOrganizedBloodCamps(organizedBloodCamps));
        dispatch(userActions.setSubmittedBloodForms(submittedBloodForms));
      } else {
        // Handle error
        console.error("Error:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
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

          <div className="or">
            <div className="orline"></div>
            <h4>OR</h4>
            <div className="orline"></div>
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
            <Link to="/forget-password" className="forgot_pw">
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
