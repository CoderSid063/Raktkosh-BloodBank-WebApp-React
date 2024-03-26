import BloodForm from "../components/BloodForm";
import "../styles/donorRegister.css";

const DonorRgister = () => {
  const formName = "Donor Registration";
  return (
    <div>
      <BloodForm formName={formName} />
    </div>
  );
};

export default DonorRgister;
