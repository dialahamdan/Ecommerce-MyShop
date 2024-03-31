import { useContext } from "react";
import Categories from "../../Categories/components/Categories";
import { UserContext } from "../../../context/User";
import styles from "./Home.module.css";

function Home() {
  const { userName } = useContext(UserContext);
  return (
    <>
      <div className={styles.container}>
        <img src="cover.png" alt="cover11.png" className={styles.cover} />
        {userName && (
          <h3 className={`${styles["home-heading"]} `}>
            Welcome {userName}
          </h3>
        )}
        <div className="row mt-5 ">
         
        </div>
        <Categories />
       
       <div className="card">
  <h5 className="card-header">Featured</h5>
  <div className="card-body">
    <h5 className="card-title">Special title treatment</h5>
    <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
    <a href="#" className={`btn ${styles["cardBtn"]}`}>Go somewhere</a>
  </div>
</div>

       
      </div>
    </>
  );
}

export default Home;
