import PropTypes from "prop-types";
import { useRef } from "react";
// import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { URL } from "../utils/Url.js";

const BloodForm = ({ formName }) => {
  // const token = useSelector((store) => store.auth.accessToken);
  const formRef = useRef(null);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(formRef.current);
    const formValues = Object.fromEntries(formData.entries());
    // console.log("Form Values:", formValues);

    try {
      const response = await fetch(`${URL}/reqblood-donation`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formValues),
      });

      if (response.status === 401) {
        alert("Please Login Before register for BloodCamp");
        navigate("/login");
      } else {
        const res = await response.json();
        console.log(res);
        alert(`${formValues.fullName} your ${formName} form created`);
        navigate("/");
      }

      console.log(response);
    } catch (error) {
      console.error(error.message);
    }
  };
  // Determine form type based on formName prop
  const formType = formName === "DonateBlood" ? "DonateBlood" : "Bloodrequest";
  return (
    <div>
      <form className="row g-3 m-3" ref={formRef} onSubmit={handleSubmit}>
        <div className="col-md-12 text-center text-light mt-2">
          <h3 className="overflow-y-hidden" style={{ color: "red" }}>
            {`${formName} Registraction Form`}
          </h3>
        </div>
        <input type="hidden" name="formType" value={formType} />{" "}
        {/* Add hidden input for formType */}
        <div className="col-md-12">
          <input
            type="text"
            className="form-control"
            placeholder="Patient Full name"
            aria-label="Name"
            name="fullName"
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="inputEmail4" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="inputEmail4"
            name="email"
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="inputphone4" className="form-label">
            Mobile No
          </label>
          <input
            type="contact_no"
            minLength="10"
            maxLength="10"
            className="form-control"
            id="inputphone4"
            name="mobileNo"
          />
        </div>
        <div className="col-md-3">
          <label htmlFor="gender" className="form-label">
            Gender
          </label>
          <select
            id="gender"
            className="form-select"
            name="gender"
            defaultValue=""
            required
          >
            <option value="" disabled>
              Select Gender
            </option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className="col-md-3">
          <label htmlFor="Age" className="form-label">
            Age
          </label>
          <input
            type="number"
            className="form-control"
            id="inputZip"
            name="age"
          />
        </div>
        <div className="col-md-3">
          <label htmlFor="bloodGroup" className="form-label">
            Blood Group
          </label>
          <select
            id="bloodGroup"
            className="form-select"
            name="bloodGroup"
            defaultValue=""
            required
          >
            <option value="" disabled>
              Select Blood Group
            </option>
            <option value="O+">O+</option>
            <option value="A+">A+</option>
            <option value="B+">B+</option>
            <option value="AB+">AB+</option>
            <option value="O-">O-</option>
            <option value="A-">A-</option>
            <option value="B-">B-</option>
            <option value="AB-">AB-</option>
          </select>
        </div>
        <div className="col-md-3">
          <label htmlFor="dob" className="form-label">
            Quantity
          </label>
          <select id="inputState" className="form-select" name="quantity">
            <option value={1}>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </select>
        </div>
        <div className="col-12">
          <label htmlFor="inputAddress" className="form-label">
            Address
          </label>
          <input
            type="text"
            className="form-control"
            id="inputAddress"
            placeholder="1234 Main St"
            name="address"
          />
        </div>
        <div className="col-md-4">
          <label htmlFor="inputState" className="form-label">
            District
          </label>
          <select id="inputState" className="form-select" name="district">
            <option></option>
            <option value="Angul">Angul</option>
            <option value="Balangir">Balangir</option>
            <option value="Balasore">Balasore</option>
            <option value="Bargarh">Bargarh</option>
            <option value="Bhadrak">Bhadrak</option>
            <option value="Boudh">Boudh</option>
            <option value="Cuttack">Cuttack</option>
            <option value="Deogarh">Deogarh</option>
            <option value="Dhenkanal">Dhenkanal</option>
            <option value="Gajapati">Gajapati</option>
            <option value="Ganjam">Ganjam</option>
            <option value="Jagatsinghpur">Jagatsinghpur</option>
            <option value="Jajpur">Jajpur</option>
            <option value="Jharsuguda">Jharsuguda</option>
            <option value="Kalahandi">Kalahandi</option>
            <option value="Kandhamal">Kandhamal</option>
            <option value="Kendrapara">Kendrapara</option>
            <option value="Kendujhar">Kendujhar</option>
            <option value="Khordha">Khordha</option>
            <option value="Koraput">Koraput</option>
            <option value="Malkangiri">Malkangiri</option>
            <option value="Mayurbhanj">Mayurbhanj</option>
            <option value="Nabarangpur">Nabarangpur</option>
            <option value="Nayagarh">Nayagarh</option>
            <option value="Nuapada">Nuapada</option>
            <option value="Puri">Puri</option>
            <option value="Rayagada">Rayagada</option>
            <option value="Sambalpur">Sambalpur</option>
            <option value="Sonepur">Sonepur</option>
            <option value="Sundargarh">Sundargarh</option>
          </select>
        </div>
        <div className="col-md-2">
          <label htmlFor="inputZip" className="form-label">
            pin Code
          </label>
          <input
            type="text"
            className="form-control"
            id="inputZip"
            name="pincode"
          />
        </div>
        <div className="col-12">
          <button type="reset" className="btn btn-primary">
            Reset
          </button>
          <button type="submit" className="btn btn-primary" value="Register">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

BloodForm.propTypes = {
  formName: PropTypes.string.isRequired,
};

export default BloodForm;
