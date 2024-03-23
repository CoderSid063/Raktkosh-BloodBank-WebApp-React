import styles from "../styles/AboutUs.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faTwitter,
  faFacebook,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";

const AboutUs = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h2 className={styles.heading}>ABOUT US</h2>
        <p className={styles.concern}>
          Raktakosh does not refer to anything specific related to Odisha or any
          other place. Raktakosh translates to blood bank in Hindi, and it might
          be used to refer to a blood storage facility or organization involved
          in blood donation and storage.
        </p>
      </div>
      <div className={styles.icons}>
        <FontAwesomeIcon icon={faInstagram} />
        <FontAwesomeIcon icon={faTwitter} />
        <FontAwesomeIcon icon={faFacebook} />
        <FontAwesomeIcon icon={faGithub} />
      </div>
    </div>
  );
};

export default AboutUs;
