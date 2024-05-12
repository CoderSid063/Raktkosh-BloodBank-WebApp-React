import "../styles/user-profile.css";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import { userActions } from "../store/userSlice";
import { URL } from "../utils/Url";

const UserProfile = () => {
  console.log("UserProfile component rendered");
  const { userData, organizedBloodCamps, submittedBloodForms } = useSelector(
    (state) => state.user
  );
  const [isEditing, setIsEditing] = useState(false);
  const [editedUserData, setEditedUserData] = useState({
    fullName: userData.fullName,
    email: userData.email,
    phoneNumber: userData.phoneNumber,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUserData({
      ...editedUserData,
      [name]: value,
    });
  };

  const handleUpdateProfile = async () => {
    try {
      const response = await fetch(`${URL}/update-account`, {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editedUserData),
      });

      if (response.ok) {
        const res = await response.json();
        const { data } = res;

        //sending userdata to redux store:-
        dispatch(userActions.setUserData(data));
        setIsEditing(false); // Disable editing mode
        alert("Account details updated successfully");
      } else {
        // Handle error response
        alert("Failed to update account details");
      }
    } catch (error) {
      console.error("Error updating account details:", error);
      alert("An error occurred while updating account details");
    }
  };

  const avatarRef = useRef(null);
  // method for expand the user avatar
  const toggleAvatar = () => {
    avatarRef.current.classList.toggle("expanded");
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/v1/users/logout",
        {
          method: "POST",
          credentials: "include",
        }
      );
      console.log(response);

      if (response.status === 200) {
        // Clear tokens from Redux store and local storage
        dispatch(authActions.clearTokens());
        alert("Logout Successfully");
        navigate("/");
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
          {isEditing ? (
            <form>
              <input
                type="text"
                name="fullName"
                value={editedUserData.fullName}
                onChange={handleInputChange}
              />
              <input
                type="email"
                name="email"
                value={editedUserData.email}
                onChange={handleInputChange}
              />
              <input
                type="tel"
                name="phoneNumber"
                value={editedUserData.phoneNumber}
                onChange={handleInputChange}
              />
            </form>
          ) : (
            <>
              <p>Name: {userData.fullName}</p>
              <p>Email: {userData.email}</p>
              <p>Phone Number: {userData.phoneNumber}</p>
            </>
          )}
        </div>
        {isEditing ? (
          <button onClick={handleUpdateProfile}>Save</button>
        ) : (
          <button onClick={() => setIsEditing(true)}>Edit</button>
        )}
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
        <Link to="changePassword">
          <button>change Password</button>
        </Link>
      </div>
    </div>
  );
};

export default UserProfile;
