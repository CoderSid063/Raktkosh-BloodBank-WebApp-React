import PropTypes from "prop-types";
import { useRef } from "react";

const BloodForm = ({ formName }) => {
  const formRef = useRef(null);
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(formRef.current);
    const formValues = Object.fromEntries(formData.entries());
    console.log("Form Values:", formValues);
    // Add logic to handle form submission here
  };
  console.log(formName);
  return (
    <div>
      <form
        className="row g-3 m-3"
        action="/BloodRequest"
        method="POST"
        ref={formRef}
        onSubmit={handleSubmit}
      >
        <div className="col-md-12 text-center text-light mt-2">
          <h3 className="overflow-y-hidden" style={{ color: "red" }}>
            {`${formName} Form`}
          </h3>
        </div>
        <div className="col-md-12">
          <input
            type="text"
            className="form-control"
            placeholder="Patient Full name"
            aria-label="Name"
            name="Name"
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
            name="Email"
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
            name="MobileNo"
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
            name="Age"
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
          <select id="inputState" className="form-select" name="Quantity">
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
            name="Address"
          />
        </div>
        <div className="col-md-4">
          <label htmlFor="inputState" className="form-label">
            District
          </label>
          <select id="inputState" className="form-select" name="District">
            <option></option>
            <option>Angul</option>
            <option>Balangir</option>
            <option>Baleshwar</option>
            <option>Bargarh</option>
            <option>Baudh</option>
            <option>Bhadrak</option>
            <option>Cuttack</option>
            <option>Dhenkanal</option>
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
            name="Pincode"
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
