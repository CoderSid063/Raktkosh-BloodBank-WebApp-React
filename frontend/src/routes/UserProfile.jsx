import "../styles/user-profile.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store/authSlice";
import { userActions } from "../store/userSlice";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const UserProfile = () => {
  console.log("UserProfile component rendered");
  const [isAvatarExpanded, setIsAvatarExpanded] = useState(false);
  const navigate = useNavigate();

  const token = useSelector((store) => store.auth.accessToken);
  // console.log(token);

  const { userData } = useSelector((state) => state.user);
  // console.log(userData);
  // console.log(userData._id);

  const { organizedBloodCamps, submittedBloodForms } = useSelector(
    (state) => state.user
  );

  const handleAvatarClick = () => {
    setIsAvatarExpanded(!isAvatarExpanded);
  };

  // this endpont get the user deatils related Camps or BloodReuest or Blood donates :-
  const fetchUserProfile = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/v1/users/getuserprofile`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the JWT token in the Authorization header
          },
          params: {
            userId: userData._id, // Pass the user ID as a query parameter
          },
        }
      );

      // console.log(response);
      const responseData = response.data;
      // console.log(responseData);
      const { data } = responseData;
      // console.log(data);
      const { organizedBloodCamps } = data;
      const { submittedBloodForms } = data;
      // console.log(organizedBloodCamps);
      // console.log(submittedBloodForms);

      // Dispatch action to store user profile data in Redux store
      dispatch(userActions.setOrganizedBloodCamps(organizedBloodCamps));

      dispatch(userActions.setSubmittedBloodForms(submittedBloodForms));
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  useEffect(() => {
    if (userData) {
      fetchUserProfile();
    }
  }, [userData]);
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
