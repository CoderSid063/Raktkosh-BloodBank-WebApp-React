import "../styles/user-profile.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store/authSlice";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const UserProfile = () => {
  const token = useSelector((store) => store.auth.accessToken);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isAvatarExpanded, setIsAvatarExpanded] = useState(false);

  const handleAvatarClick = () => {
    setIsAvatarExpanded(!isAvatarExpanded);
  };

  const { userData } = useSelector((state) => state.user);
  // console.log(userData);

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

  const handleLogout = async () => {
    try {
      // Make API request to logout
      const response = await axios.post(
        "http://localhost:5000/api/v1/users/logout",
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
        { withCredentials: true } // Send cookies along with the request
      );
      // console.log(response); // Handle response accordingly
      if (response.status === 200) {
        // Clear tokens from Redux store and redirect to login page
        dispatch(authActions.clearTokens());
        alert("Logout Successfully");
        navigate("/login");
      } else {
        console.error("Failed to logout:", response.data.message);
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <div className="container">
      <h2>User Profile</h2>
      <div className="profile-details">
        <div
          className={`avatar ${isAvatarExpanded ? "expanded" : ""}`}
          onClick={handleAvatarClick}
        >
          <img src={userData.avatar} alt="Avatar" />
        </div>
        <div className="user-details">
          <p>Name:- {userData.fullName} </p>
          <p>Email:- {userData.email} </p>
          <p>Phone Number:- {userData.phoneNumber} </p>
        </div>
        <button>Edit</button>
      </div>
      <div className="service">
        <div className="user-camps insidebox"></div>
        <div className="user-donate insidebox"></div>
        <div className="user-request insidebox"></div>
      </div>
      <div className="logout">
        <button onClick={handleLogout}>Logout</button>
        <button onClick={handleForgetPassword}>Forget Password</button>
      </div>
    </div>
  );
};

export default UserProfile;
