import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { URL } from "../utils/Url";

const RegisterForm = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    password: "",
    gender: "male",
    dateOfBirth: "",
    address: "",
    avatar: null,
    addharImage: null,
  });

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    const newValue = files ? files[0] : value;
    setFormData((prevData) => ({
      ...prevData,
      [name]: newValue,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        formDataToSend.append(key, value);
      });
      console.log(formDataToSend);
      const response = await fetch(`${URL}/register`, {
        method: "POST",
        body: formDataToSend,
      });
      // console.log(response);

      // Reset form after submission
      if (response.ok) {
        alert("registration successful");
        setFormData({
          fullName: "",
          email: "",
          phoneNumber: "",
          password: "",
          gender: "",
          dateOfBirth: "",
          address: "",
          avatar: null,
          addharImage: null,
        });
        navigate("/login");
      } else {
        console.log("error inside response ", "error");
      }
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Full Name:
        <input
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleInputChange}
          required
        />
      </label>
      <label>
        Email:
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          required
        />
      </label>
      <label>
        Phone Number:
        <input
          type="text"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleInputChange}
          required
        />
      </label>
      <div>
        <label>
          Password:
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
          <div
            className="password-toggle"
            onClick={handleTogglePasswordVisibility}
          >
            <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
          </div>
        </label>
      </div>

      <label>
        Gender:
        <select
          name="gender"
          value={formData.gender}
          onChange={handleInputChange}
          required
        >
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
      </label>
      <label>
        Date of Birth:
        <input
          type="date"
          name="dateOfBirth"
          value={formData.dateOfBirth}
          onChange={handleInputChange}
          required
        />
      </label>
      <label>
        Address:
        <textarea
          name="address"
          value={formData.address}
          onChange={handleInputChange}
          required
        ></textarea>
      </label>
      <label>
        Avatar:
        <input type="file" name="avatar" onChange={handleInputChange} />
      </label>
      <label>
        Aadhar Image:
        <input type="file" name="addharImage" onChange={handleInputChange} />
      </label>
      <button type="submit">Register</button>
    </form>
  );
};

export default RegisterForm;
