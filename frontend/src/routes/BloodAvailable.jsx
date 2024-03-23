import "../styles/BloodAvl.css";
import { useState } from "react";
const BloodAvailable = () => {
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const districts = [
    "Angul",
    "Balangir",
    "Baleshwar",
    "Bargarh",
    "Baudh",
    "Bhadrak",
    "Cuttack",
    "Deogarh",
    "Dhenkanal",
    "Gajapati",
    "Ganjam",
    "Jagatsinghpur",
    "Jajpur",
    "Jharsuguda",
    "Kalahandi",
    "Kandhamal",
    "Kendrapara",
    "Kendujhar (Keonjhar)",
    "Khordha",
    "Koraput",
    "Malkangiri",
    "Mayurbhanj",
    "Nabarangpur",
    "Nayagarh",
    "Nuapada",
    "Puri",
    "Rayagada",
    "Sambalpur",
    "Sonepur",
    "Sundargarh",
  ];

  const handleDistrictChange = (event) => {
    setSelectedDistrict(event.target.value);
    // Call a function here to fetch data based on the selected district
    // You can use an API call or a predefined data set
  };

  return (
    <div className="container">
      <h1>Search for Blood Availability</h1>
      <select value={selectedDistrict} onChange={handleDistrictChange}>
        <option value="">Select District</option>
        {districts.map((district, index) => (
          <option key={index} value={district}>
            {district}
          </option>
        ))}
      </select>

      {/* Display random data based on the selected district */}
      {selectedDistrict && (
        <div className="card-body">
          <h5 className="card-title overflow-y-hidden">{selectedDistrict}</h5>
          <h6 className="card-subtitle mb-2 text-body-secondary overflow-y-hidden">
            {" "}
            D.H.H {selectedDistrict}
          </h6>
          <p className="card-text">
            Avl Blood = {Math.floor(Math.random() * 100)} unit
          </p>
          <div className="unit">
            <div className="unitr">
              A+ = {Math.floor(Math.random() * 20)} <br />
              B+ = {Math.floor(Math.random() * 20)} <br />
              O+ = {Math.floor(Math.random() * 20)} <br />
              AB+ = {Math.floor(Math.random() * 20)}
            </div>
            <div className="unitl">
              A- = {Math.floor(Math.random() * 10)} <br />
              B- = {Math.floor(Math.random() * 10)} <br />
              O- = {Math.floor(Math.random() * 10)} <br />
              AB- = {Math.floor(Math.random() * 10)}
            </div>
          </div>
          <div className="disthdiv">
            <button className="disthbtn">
              <a href="" className="card-link">
                Contact
              </a>
            </button>
            <button className="disthbtn">
              <a className="card-link" href="">
                Address
              </a>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BloodAvailable;
