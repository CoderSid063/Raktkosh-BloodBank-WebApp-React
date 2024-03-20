import { Link } from "react-router-dom";
import styles from "./footer.module.css";

const Footer = () => {
  return (
    <div className={styles.container}>
      <footer className="py-3">
        <div className="row">
          <div className="col-6 col-md-2 ">
            <h5>Section</h5>
            <ul className="nav flex-column">
              <li className="nav-item mb-2">
                <Link to="/" className="nav-link p-0 text-body-secondary">
                  Home
                </Link>
              </li>
              <li className="nav-item mb-2">
                <Link
                  to="/features"
                  className="nav-link p-0 text-body-secondary"
                >
                  Features
                </Link>
              </li>
              <li className="nav-item mb-2">
                <Link
                  to="/contact"
                  className="nav-link p-0 text-body-secondary"
                >
                  FAQs
                </Link>
              </li>
              <li className="nav-item mb-2">
                <Link
                  to="/aboutus"
                  className="nav-link p-0 text-body-secondary"
                >
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-md-5 offset-md-1 mb-2">
            <form>
              <h5>Join with Raktkosh</h5>
              <p>Monthly digest of whats new and exciting from us.</p>
              <div className="d-flex flex-column flex-sm-row w-80 gap-2">
                <label htmlFor="newsletter1" className="visually-hidden">
                  Email address
                </label>
                <input
                  id="newsletter1"
                  type="text"
                  className="form-control"
                  placeholder="Email address"
                />
                <button className="btn btn-primary" type="button">
                  Subscribe
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="d-flex flex-column flex-sm-row justify-content-between my-3 border-top">
          <p>© 2024 Company, Inc. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
