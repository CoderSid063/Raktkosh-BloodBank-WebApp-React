import "../styles/user-profile.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store/authSlice";
import { userActions } from "../store/userSlice";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";

const UserProfile = () => {
  console.log("UserProfile component rendered");

  const avatarRef = useRef(null);
  // method for expand the user avatar
  const toggleAvatar = () => {
    avatarRef.current.classList.toggle("expanded");
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const token = useSelector((store) => store.auth.accessToken);
  // console.log(token);

  const { userData, organizedBloodCamps, submittedBloodForms } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    if (userData) {
      fetchUserProfile();
    }
  }, [userData]);

  // this endpont get the user deatils related Camps or BloodReuest or Blood donates :-
  const fetchUserProfile = async () => {
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
        dispatch(
          userActions.setOrganizedBloodCamps(organizedBloodCamps),
          userActions.setSubmittedBloodForms(submittedBloodForms)
        );
      } else {
        // Handle error
        console.error("Error:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

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
