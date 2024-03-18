import { Link } from "react-router-dom";
import styles from "./navbar.module.css";

const Navbar = () => {
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
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/aboutus">About</Link>
          </li>
          <li>
            <Link to="/contact">Contact Us</Link>
          </li>
          <li>Help</li>
          <li>
            <button>Login</button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
