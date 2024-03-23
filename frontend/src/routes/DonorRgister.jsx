import "../styles/donorRegister.css";

const DonorRgister = () => {
  return (
    <div>
      <form className="row g-3 m-3" action="/donerRegister" method="POST">
        <div className="col-md-12 text-light mt-2 text-center">
          <h3 className="overflow-y-hidden" style={{ color: "red" }}>
            Donor Registration
          </h3>
        </div>
        <div className="col-md-6">
          <input
            type="text"
            className="form-control"
            placeholder="First name"
            aria-label="First name"
            name="Firstname"
          />
        </div>
        <div className="col-md-6">
          <input
            type="text"
            className="form-control"
            placeholder="Last name"
            aria-label="Last name"
            name="Lastname"
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
          <label htmlFor="dob" className="form-label">
            D.O.B
          </label>
          <input
            type="date"
            className="form-control"
            id="inputDOB4"
            name="DOfBirth"
          />
        </div>
        <div className="col-md-3">
          <label htmlFor="inputState" className="form-label">
            Gender
          </label>
          <select id="inputState" className="form-select" name="Gender">
            <option selected>Male</option>
            <option>Female</option>
          </select>
        </div>
        <div className="col-md-3">
          <label htmlFor="dob" className="form-label">
            Weight
          </label>
          <input
            type="number"
            className="form-control"
            id="inputZip"
            name="Weight"
          />
        </div>
        <div className="col-md-3">
          <label htmlFor="dob" className="form-label">
            Blood Group
          </label>
          <select id="inputState" className="form-select" name="BloodGroup">
            <option selected>O+</option>
            <option>A+</option>
            <option>B+</option>
            <option>AB+</option>
            <option>A-</option>
            <option>B-</option>
            <option>AB-</option>
            <option>O-</option>
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
            <option selected disabled>
              Select District
            </option>
            <option>Angul</option>
            <option>Balangir</option>
            <option>Baleshwar (Balasore)</option>
            <option>Bargarh</option>
            <option>Bhadrak</option>
            <option>Boudh</option>
            <option>Cuttack</option>
            <option>Deogarh</option>
            <option>Dhenkanal</option>
            <option>Gajapati</option>
            <option>Ganjam</option>
            <option>Jagatsinghpur</option>
            <option>Jajpur</option>
            <option>Jharsuguda</option>
            <option>Kalahandi</option>
            <option>Kandhamal</option>
            <option>Kendrapara</option>
            <option>Keonjhar (Kendujhar)</option>
            <option>Khordha</option>
            <option>Koraput</option>
            <option>Malkangiri</option>
            <option>Mayurbhanj</option>
            <option>Nabarangpur</option>
            <option>Nayagarh</option>
            <option>Nuapada</option>
            <option>Puri</option>
            <option>Rayagada</option>
            <option>Sambalpur</option>
            <option>Sonepur</option>
            <option>Sundargarh</option>
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

export default DonorRgister;
