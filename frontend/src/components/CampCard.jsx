import "../styles/campCards.css";
const CampCard = ({ camps }) => {
  // Convert ISO date string to Date object
  const dateObj = new Date(camps.date);

  // Extract date, month, and year
  const day = dateObj.getDate().toString().padStart(2, "0");
  const month = (dateObj.getMonth() + 1).toString().padStart(2, "0");
  const year = dateObj.getFullYear();

  // Formatted date string (dd/mm/yyyy)
  const formattedDate = `${day}/${month}/${year}`;
  return (
    <div className="box">
      <h1>{camps.organizerName}</h1>
      <div className="innerBox">
        <p>Location: {camps.location}</p>
        <p>ContactPerson : {camps.contactPerson}</p>
        <p>Contact Number : {camps.contactNumber}</p>
        <p>Date: {formattedDate}</p>
      </div>
    </div>
  );
};

export default CampCard;
