import { useState } from "react";
// import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { URL } from "../utils/Url";

const BloodCampReg = () => {
  const navigate = useNavigate();
  // const token = useSelector((store) => store.auth.accessToken);
  const [formData, setFormData] = useState({
    organizerName: "",
    location: "",
    date: "",
    donorsCapacity: "",
    contactPerson: "",
    contactNumber: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${URL}/register-camps`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.status === 401) {
        alert("Please Login Before register for BloodCamp");
        navigate("/login");
      } else {
        const data = await response.json();
        console.log(data);
        alert("Camp Register Successfully");
        navigate("/");
      }
    } catch (error) {
      console.error(error.message); // Handle error
    }
  };

  return (
    <div>
      <form className="row g-3 m-3" onSubmit={handleSubmit}>
        <div className="col-md-12 text-center text-light mt-2">
          <h3 className="overflow-y-hidden" style={{ color: "red" }}>
            Camp Registration
          </h3>
        </div>
        <div className="col-md-6">
          <label htmlFor="organizerName" className="form-label">
            Organizer Name
          </label>
          <input
            type="text"
            className="form-control"
            id="organizerName"
            name="organizerName"
            value={formData.organizerName}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="location" className="form-label">
            Location
          </label>
          <select
            className="form-select"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
          >
            <option value="">Select District</option>

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
        <div className="col-md-6">
          <label htmlFor="date" className="form-label">
            Date
          </label>
          <input
            type="date"
            className="form-control"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="donorsCapacity" className="form-label">
            Donors Capacity
          </label>
          <input
            type="number"
            className="form-control"
            id="donorsCapacity"
            name="donorsCapacity"
            value={formData.donorsCapacity}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="contactPerson" className="form-label">
            Contact Person
          </label>
          <input
            type="text"
            className="form-control"
            id="contactPerson"
            name="contactPerson"
            value={formData.contactPerson}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="contactNumber" className="form-label">
            Contact Number
          </label>
          <input
            type="tel"
            className="form-control"
            id="contactNumber"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleChange}
          />
        </div>
        <div className="col-12">
          <button type="reset" className="btn btn-primary">
            Reset
          </button>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default BloodCampReg;
