import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";
import "../styles/App.css";
import { Outlet } from "react-router-dom";
import FetchCamps from "../components/FetchCamps";

function App() {
  return (
    <>
      <Navbar />
      <FetchCamps />
      <Outlet />
      <Footer />
    </>
  );
}

export default App;
