import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styles from "./Categories.module.css";
import Loader from "../../Loader/components/Loader";

function Categories() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_API}/categories/active?limit=8`
        );
        setCategories(data.categories);
      } catch (error) {
        <Loader/>;
      }
    };

    getCategories();
  }, []);

  return (
    <div className={` p-5 mb-5 mt-5 rounded ${styles["catergriesBorder"]} `}>
      <h2 className={`mb-5 d-flex justify-content-center fs-1 ${styles["catergriesTitle"]}  `}>Categories</h2>
      <div className="row">
        {categories.map((category) => (
          <div className={`col-12 col-md-3 p-3 `} key={category._id}>
            <div className="d-flex justify-content-center">
              <Link to={`/categories/${category._id}`}>
                <img
                  src={category.image.secure_url}
                  alt={category.name}
                  className={`img-fluid ${styles["category-image"]}`}
                />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Categories;
