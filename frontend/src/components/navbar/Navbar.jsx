import { Link, NavLink } from "react-router-dom";
import styles from "./navbar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { authActions } from "../../store/authSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const token = useSelector((store) => store.auth.accessToken);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const handleLogout = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/users/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
      if (response.status === 200) {
        // Clear tokens from Redux store and local storage
        dispatch(authActions.clearTokens());
        alert("Logout Successfully");
      } else {
        console.error("Failed to logout:", response.data.message);
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <Link to="/">
          <img src="/logo.png" alt="Logo" />
          <p className={styles.name}>Raktkosh</p>
        </Link>
      </div>
      <div className={styles.navlinks}>
        <ul>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="aboutus">About</NavLink>
          </li>
          <li>
            <NavLink to="contactus">Contact Us</NavLink>
          </li>
          {isAuthenticated ? (
            <>
              <li>
                <NavLink to="/profile">
                  <FontAwesomeIcon icon={faUser} />
                </NavLink>
              </li>
              <li>
                <button onClick={handleLogout}>Logout</button>
              </li>
            </>
          ) : (
            <li>
              <NavLink to="login">
                <button>Login</button>
              </NavLink>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
