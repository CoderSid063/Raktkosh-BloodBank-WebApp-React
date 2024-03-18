import { Link } from "react-router-dom";
import styles from "./navbar.module.css";

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <img src="/logo.png" alt="Logo" />
        <p className={styles.name}>Raktkosh</p>
      </div>
      <div className={styles.navlinks}>
        <ul>
          <li>
            <Link to="/">
              <a href="#">Home</a>
            </Link>
          </li>
          <li>
            <Link to="/aboutus">
              <a href="#">About</a>
            </Link>
          </li>
          <li>
            <Link to="/contact">
              <a href="#">Contact Us</a>
            </Link>
          </li>
          <li>
            <a href="#">Help</a>
          </li>
          <li>
            <button>Login</button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
