import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import useResource from "../../../hooks/useResource";

import Loader from "../../Loader/components/Loader";
import { Bounce, toast } from "react-toastify";
import './categoriesProducts.css'
function CategoriesProducts() {
  const { id } = useParams();
  const { products, loader } = useResource(
    `${import.meta.env.VITE_API}/products/category/${id}`
  );
  const [hasProducts, setHasProducts] = useState(true);

  const addToCart = async (productId) => {
    const token = localStorage.getItem("userToken");
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API}/cart`,
        {
          productId,
        },
        {
          headers: {
            Authorization: `Tariq__${token}`,
          },
        }
      );
      // console.log(data);
      if (data) {
        toast.success(" Item Added Successfully  ", {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      }
    } catch (error) {
      // console.error('Error adding to cart:', error);
      toast.error(error.response.data.message, {
        position: "bottom-center",
        autoClose: false,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
    }
  };

  useEffect(() => {
    // Check if products are available two
    setHasProducts(products && products.length > 0);
  }, [products]);

  if (loader) {
    return <Loader />;
  }

  return (
    <div className="container">
      <div className="row justify-content-center">
        {hasProducts ? (
          products.map((product) => (
            <div
              className="product bg-info-subtle= p-5 mb-2 CateroryPBorder rounded w-75 h-75 mb-5"
              key={product._id}
            >
              <h2 className="text-capitalize text-center fs-1  mb-3 fw-bold text-black ">
                {product.name}
              </h2>
              <img
                className=" text-center mx-auto d-block mb-3 col-12 col-md-6 col-sm-3 "
                src={product.mainImage.secure_url}
                alt={product.name}
              />
              <p className="text-center fw-bold text-black">
               {" "}
                Price : {product.price}
              </p>
              <p className="text-center fw-bold text-black">
               
                Final Price : {product.finalPrice}
              </p>
              <button
                className="btn text-center borderIcon mx-auto d-block"
                onClick={() => addToCart(product._id)}
              >
                 <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="50"
                        height="25"
                        fill="currentColor"
                        className="bi bi-cart4 iconC "
                        viewBox="0 0 16 16"
                      >
                        <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5M3.14 5l.5 2H5V5zM6 5v2h2V5zm3 0v2h2V5zm3 0v2h1.36l.5-2zm1.11 3H12v2h.61zM11 8H9v2h2zM8 8H6v2h2zM5 8H3.89l.5 2H5zm0 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0m9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0" />
                      </svg>
              </button>
            </div>
          ))
        ) : (
          // Placeholder component rendered conditionally three
          <div className="warning">
            <h2 className="text-capitalize text-center fs-1 mb-3 fw-bold pb-2 ">
              No products available
            </h2>
            
            <p className="text-center fw-bold  ">
              This section has no items yet 
            </p>
            <p className="text-center fw-bold ">
              {" "}
              Check again later , We wish you a greate shopping .
            </p>
            {/* Your placeholder content goes here */}
          </div>
        )}
      </div>
    </div>
  );
}

export default CategoriesProducts;
