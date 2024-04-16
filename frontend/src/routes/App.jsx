import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";
import "../styles/App.css";
import { Outlet } from "react-router-dom";
import FetchCamps from "../components/FetchCamps";
import { useSelector } from "react-redux";
import LoadingSpinner from "../components/LoadingSpinner";

function App() {
  const fetchStatus = useSelector((store) => store.fetchStatus);

  return (
    <>
      <Navbar />
      <FetchCamps />
      {fetchStatus.currentlyFetching ? <LoadingSpinner /> : <Outlet />}
      <Footer />
    </>
  );
}

export default App;
