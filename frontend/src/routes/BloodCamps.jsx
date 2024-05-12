import { useSelector } from "react-redux";
import CampCard from "../components/CampCard";
import "../styles/campCards.css";
const BloodCamps = () => {
  const camps = useSelector((store) => store.camps);
  return (
    <>
      <div className="main">
        {camps.map((camps) => (
          <CampCard key={camps._id} camps={camps} />
        ))}
      </div>
    </>
  );
};

export default BloodCamps;
