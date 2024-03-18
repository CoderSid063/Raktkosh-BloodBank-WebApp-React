import styles from "./home.module.css";

const Home = () => {
  return (
    <div className={styles.container}>
      <div className={styles.banner}>
        <img src="/banner.jpg" alt="" />
      </div>
      <div className={styles.service}></div>
      <div className={styles.donation}></div>
      <div className={styles.developer}></div>
    </div>
  );
};

export default Home;
