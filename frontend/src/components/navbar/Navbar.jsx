import { Link, NavLink } from "react-router-dom";
import styles from "./navbar.module.css";

const Navbar = () => (
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
        <li>
          <NavLink to="login">
            <button>Login</button>
          </NavLink>
        </li>
      </ul>
    </div>
  </nav>
);

export default Navbar;
