import styles from "./home.module.css";

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
                <a href="#" className={styles.cardtm}>
                  Donor Registered
                </a>
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
                <a href="#" className={styles.cardtm}>
                  Blood Units Collected
                </a>
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
                <i className="bi bi-droplet-half" id="mlogo"></i>
                <br />
                <br />
                <a href="/BloodAvail" className="card-m">
                  Blood Availability Search
                </a>
              </div>
            </div>
          </span>
          <span>
            <div
              className={`card mt-2 ${styles.infocord2}`}
              style={{ width: "8rem", height: "10rem" }}
            >
              <div className="card-body">
                <i className="bi bi-clock" id="mlogo"></i>
                <br />
                <br />
                <a href="/BloodCamp" className="card-m">
                  Blood Donation camps
                </a>
              </div>
            </div>
          </span>
          <span>
            <div
              className={`card mt-2 ${styles.infocord3}`}
              style={{ width: "8rem", height: "10rem" }}
            >
              <div className="card-body">
                <i className="bi bi-person-circle" id="mlogo"></i>
                <br />
                <br />
                <a href="/RegisterCamp" className="card-m">
                  Register Voluntary Blood Camp
                </a>
              </div>
            </div>
          </span>
          <span>
            <div
              className={`card mt-2 ${styles.infocord4}`}
              style={{ width: "8rem", height: "10rem" }}
            >
              <div className="card-body">
                <i className="bi bi-person-circle" id="mlogo"></i>
                <br />
                <br />
                <a href="/donerRegister" className="card-m">
                  Donor <br />
                  Registration
                </a>
              </div>
            </div>
          </span>
          <span>
            <div
              className={`card mt-2 ${styles.infocord5}`}
              style={{ width: "8rem", height: "10rem" }}
            >
              <div className="card-body">
                <i className="bi bi-person-circle" id="mlogo"></i>
                <br />
                <br />
                <a href="/BloodRequest" className="card-m">
                  Blood Request
                </a>
              </div>
            </div>
          </span>
        </div>
      </div>
      <div className={styles.donation}></div>
      <div className={styles.developer}></div>
    </div>
  );
};

export default Home;
