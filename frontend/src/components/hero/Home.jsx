import styles from "./home.module.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const Home = () => {
  return (
    <div className={styles.container}>
      <div className={styles.banner}>
        <img src="/banner.jpg" alt="" />
      </div>
      <div className={styles.service}>
        <div className={styles.TMcontaner}>
          <span>
            <div
              className={`${styles.card} ${styles.mt4} ${styles.infocordA}`}
              style={{ width: "13rem", height: "8rem" }}
            >
              <div className="card-body">
                <h3 className={styles.DRN}></h3>
                <Link to="donorRegster" className={styles.cardtm}>
                  Donor Registered
                </Link>
              </div>
            </div>
          </span>
          <span>
            <div
              className={`${styles.card} ${styles.mt4} ${styles.infocordB}`}
              style={{ width: "13rem", height: "8rem" }}
            >
              <div className="card-body">
                <h3 className={styles.DRN}></h3>
                <Link to="#" className={styles.cardtm}>
                  Blood Units Collected
                </Link>
              </div>
            </div>
          </span>
        </div>
        <div className={styles.Mcontaner}>
          <span>
            <div
              className={`card mt-2 ${styles.infocord1}`}
              style={{ width: "8rem", height: "10rem" }}
            >
              <div className="card-body">
                <FontAwesomeIcon icon={faUser} />
                <br />
                <br />
                <Link to="/bloodavailable" className={styles.cardm}>
                  Blood Availability Search
                </Link>
              </div>
            </div>
          </span>
          <span>
            <div
              className={`card mt-2 ${styles.infocord2}`}
              style={{ width: "8rem", height: "10rem" }}
            >
              <div className="card-body">
                <FontAwesomeIcon icon={faUser} />
                <br />
                <br />
                <Link to="/searchCamp" className={styles.cardm}>
                  Blood Donation camps
                </Link>
              </div>
            </div>
          </span>
          <span>
            <div
              className={`card mt-2 ${styles.infocord3}`}
              style={{ width: "8rem", height: "10rem" }}
            >
              <div className="card-body">
                <FontAwesomeIcon icon={faUser} />
                <br />
                <br />
                <Link to="/RegisterCamp" className={styles.cardm}>
                  Register For Blood Camp
                </Link>
              </div>
            </div>
          </span>
          <span>
            <div
              className={`card mt-2 ${styles.infocord4}`}
              style={{ width: "8rem", height: "10rem" }}
            >
              <div className="card-body">
                <FontAwesomeIcon icon={faUser} />
                <br />
                <br />
                <Link to="/donerRegister" className={styles.cardm}>
                  Donor <br />
                  Registration
                </Link>
              </div>
            </div>
          </span>
          <span>
            <div
              className={`card mt-2 ${styles.infocord5}`}
              style={{ width: "8rem", height: "10rem" }}
            >
              <div className="card-body">
                <FontAwesomeIcon icon={faUser} />
                <br />
                <br />
                <Link to="/bloodrequest" className={styles.cardm}>
                  Blood Request
                </Link>
              </div>
            </div>
          </span>
        </div>
      </div>
      <div className={styles.donation}>
        <div className={styles.text}>
          <h1 className={styles["overflow-y-hidden"]}>LEARN ABOUT DONATION</h1>
        </div>

        <div className={styles.TLcontaner}>
          <div className={styles.LTleft}>
            <div>
              <div className={styles.LTT}>
                <img src="/bloodDonate.png" alt="" />
              </div>

              <div className={styles.LTB}>
                <blockquote>
                  <p className={styles.blockquote}>
                    After donating blood, the body works to replenish the blood
                    loss.
                    <br />
                    This stimulates the production of new blood cells and in
                    turn, helps in maintaining good health.
                  </p>
                </blockquote>
              </div>
              <Link to="donerRegister">
                <button
                  className={`btn btn-danger ${styles.svcNearBy} ${styles["hvr-sweep-to-right"]}`}
                >
                  DonateNow
                </button>
              </Link>
              <br />
              <br />
            </div>
          </div>

          <div>
            <div
              className={`col-sm-6 ${styles.LTright}`}
              style={{ fontSize: "1.5rem" }}
            >
              <table className="table table-responsive">
                <tbody>
                  <tr>
                    <th
                      colSpan="3"
                      style={{ color: "white", backgroundColor: "red" }}
                    >
                      Compatible Blood Type Donors
                    </th>
                  </tr>
                  <tr>
                    <td>
                      <b>Blood Type</b>
                    </td>
                    <td>
                      <b>Donate Blood To</b>
                    </td>
                    <td>
                      <b>Receive Blood From</b>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span style={{ color: "#961e1b" }}>
                        <b>A+</b>
                      </span>
                    </td>
                    <td>A+ AB+</td>
                    <td>A+ A- O+ O-</td>
                  </tr>
                  <tr>
                    <td>
                      <span style={{ color: "#961e1b" }}>
                        <b>B+</b>
                      </span>
                    </td>
                    <td>B+ AB+</td>
                    <td>B+ B- O+ O-</td>
                  </tr>
                  <tr>
                    <td>
                      <span style={{ color: "#961e1b" }}>
                        <b>AB+</b>
                      </span>
                    </td>
                    <td>AB+</td>
                    <td>Everyone</td>
                  </tr>
                  <tr>
                    <td>
                      <span style={{ color: "#961e1b" }}>
                        <b>A-</b>
                      </span>
                    </td>
                    <td>A+ A- AB+ AB-</td>
                    <td>A- O-</td>
                  </tr>
                  <tr>
                    <td>
                      <span style={{ color: "#961e1b" }}>
                        <b>O-</b>
                      </span>
                    </td>
                    <td>Everyone</td>
                    <td>O-</td>
                  </tr>
                  <tr>
                    <td>
                      <span style={{ color: "#961e1b" }}>
                        <b>B-</b>
                      </span>
                    </td>
                    <td>B+ B- AB+ AB-</td>
                    <td>B- O-</td>
                  </tr>
                  <tr>
                    <td>
                      <span style={{ color: "#961e1b" }}>
                        <b>AB-</b>
                      </span>
                    </td>
                    <td>AB+ AB-</td>
                    <td>AB- A- B- O-</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <hr />
      </div>
      <div className={styles.developer}></div>
    </div>
  );
};

export default Home;
