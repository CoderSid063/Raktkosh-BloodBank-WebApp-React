import "../styles/user-profile.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store/authSlice";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";

const UserProfile = () => {
  console.log("UserProfile component rendered");
  const { userData, organizedBloodCamps, submittedBloodForms } = useSelector(
    (state) => state.user
  );

  const avatarRef = useRef(null);
  // method for expand the user avatar
  const toggleAvatar = () => {
    avatarRef.current.classList.toggle("expanded");
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();

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
    const cookies = document.cookie;
    const userId = userData._id;
    try {
      const response = await fetch(
        `http://localhost:5000/api/v1/users/getuserprofile?userId=${userId}`,
        {
          method: "GET",
          credentials: "include",
          headers: {
            Cookie: cookies, // Add cookies to request headers
          },
        }
      );
      console.log(response); // Handle response accordingly
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
        <div className={`avatar`} onClick={toggleAvatar} ref={avatarRef}>
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
        <div className="user-camps insidebox">
          <p>Blood Camps Organized : {organizedBloodCamps.length}</p>
        </div>
        <div className="user-donate insidebox">
          <p>
            Requested for Blood:{" "}
            {
              submittedBloodForms.filter(
                (form) => form.formType === "Bloodrequest"
              ).length
            }
          </p>
        </div>
        <div className="user-request insidebox">
          <p>
            Blood you Donated :{" "}
            {
              submittedBloodForms.filter(
                (form) => form.formType === "DonateBlood"
              ).length
            }
          </p>
        </div>
      </div>
      <div className="logout">
        <button onClick={handleLogout}>Logout</button>
        <button onClick={handleForgetPassword}>Forget Password</button>
      </div>
    </div>
  );
};

export default UserProfile;
