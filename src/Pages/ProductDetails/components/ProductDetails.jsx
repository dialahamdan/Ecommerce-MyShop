import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { Bounce, toast } from "react-toastify";
import Loader from "../../Loader/components/Loader";
import { UserContext } from "../../../context/User";
import './Products.css'
function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loader, setLoader] = useState(true);
  const { updateCartCount } = useContext(UserContext);

  const setAddCart = async (productId) => {
    try {
      const token = localStorage.getItem("userToken");
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
      if (data) {
        toast.success("Item Added Successfully", {
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
        updateCartCount(1); // Update cart count in context
      }
    } catch (error) {
     // console.error("Error adding to cart:", error);
      if (error.response) {
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
      } else if (error.request) {
        // The request was made but no response was received
        toast.error("server response failed ", {
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
      } else {
        // Something happened in setting up the request that triggered an error
        toast.error(" Request error", {
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
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_API}/products/${id}`
        );
        setProduct(data.product);
        setLoader(false);
      } catch (error) {
        console.error("Error fetching product details:", error);
        toast.error(
          error.response?.data.message || "Failed to fetch product details",
          {
            position: "bottom-center",
            autoClose: false,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
          }
        );
      }
    };

    fetchData();
  }, [id]);

  return (
   
    <>
    {loader ? (
      <Loader />
    ) : (
      <>
        <div className="container mt-5">
          <div className="row">
            
            <div className="col-md-6">
              {product.mainImage && (
                <img
                  src={product.mainImage.secure_url}
                  className="img-fluid rounded w-100"
                  alt={product.name}
                />
              )}
            </div>
            <div className="col-md-6 imagesBorder">
              <div className="card border border-0">
                <div className="card-body">
                  <h4 className="card-title fw-bold ">{product.name}</h4>
                 
                  <p className="card-text text-capitalize  fw-semibold ">
                    <span className="text-uppercase fw-bolder  titlesColor">Slug:</span>{" "}
                    {product.slug}
                  </p>
                  <p className="card-text  fw-semibold text-success">
                    <span className="text-uppercase fw-bolder titlesColor">Price:</span> $
                    {product.price}
                  </p>
                  <p className="card-text mb-4  fw-semibold text-danger titlesColor">
                    <span className="text-uppercase fw-bolder titlesColor">Status: </span>
                    {product.status}
                  </p>
                  <p className="card-text text-capitalize  fw-semibold">
                    <span className="text-uppercase fw-bolder titlesColor">Description:</span>{" "}
                    {product.description}
                  </p>
                  <div className="row row-cols-2 row-cols-md-4 row-cols-lg-6 g-2 g-md-3 g-lg-4">
                    {product.subImages.map((image, index) => (
                      <div key={index} className="col ms-5 mb-5">
                        <img
                          src={image.secure_url}
                          alt={`Product Image ${index + 1}`}
                          className="img-thumbnail border "
                          style={{ maxWidth: "100px", height: "auto" }}
                        />
                      </div>
                    ))}
                  </div>
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <button
                      onClick={() => setAddCart(product._id)}
                      className="detailsBtn "
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-cart4 icon "
                        viewBox="0 0 16 16"
                      >
                        <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5M3.14 5l.5 2H5V5zM6 5v2h2V5zm3 0v2h2V5zm3 0v2h1.36l.5-2zm1.11 3H12v2h.61zM11 8H9v2h2zM8 8H6v2h2zM5 8H3.89l.5 2H5zm0 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0m9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0" />
                      </svg> 
                      Add to Cart
                    </button>
                    <Link to={`/categories/${product._id}/productDetails/${product._id}/review`} className="reviewBtn">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={40}
                        height={20}
                        fill="currentColor"
                        className="bi bi-chat"
                        viewBox="0 0 16 16"
                      >
                        <path d="M2.678 11.894a1 1 0 0 1 .287.801 11 11 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8 8 0 0 0 8 14c3.996 0 7-2.807 7-6s-3.004-6-7-6-7 2.808-7 6c0 1.468.617 2.83 1.678 3.894m-.493 3.905a22 22 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a10 10 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9 9 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105" />
                      </svg>
                      Add Review
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    )}
  </>
  );
}
export default ProductDetails;
