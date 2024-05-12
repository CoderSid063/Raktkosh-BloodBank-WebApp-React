import { useState } from "react";
import "../styles/login.css";
import axios from "axios";
import { URL } from "../utils/Url";

export const ChangePassword = () => {
  const [changePasswordFormData, setChangePasswordFormData] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const handlePasswordInputChange = (e) => {
    const { name, value } = e.target;
    setChangePasswordFormData({
      ...changePasswordFormData,
      [name]: value,
    });
  };

  const handleChangePasswordSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${URL}/change-password`,
        changePasswordFormData
      );
      console.log(response.data);
      // Reset form after submission
      setChangePasswordFormData({
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      console.error("Error changing password:", error);
    }
  };
  return (
    <div className="home">
      <div className="form_container">
        <form onSubmit={handleChangePasswordSubmit}>
          <h2>Change Password</h2>
          <div className="input_box">
            <input
              type="password"
              name="newPassword"
              value={changePasswordFormData.newPassword}
              onChange={handlePasswordInputChange}
              placeholder="Enter New Password"
              required
            />
            <div className="line"></div>
          </div>
          <div className="input_box">
            <input
              type="password"
              name="confirmPassword"
              value={changePasswordFormData.confirmPassword}
              onChange={handlePasswordInputChange}
              placeholder="Confirm New Password"
              required
            />
            <div className="line"></div>
          </div>
          <button className="button" type="submit">
            Change Password
          </button>
        </form>
      </div>
    </div>
  );
};
