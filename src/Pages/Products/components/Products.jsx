import axios from "axios";
import { useState, useEffect } from "react";
import Loader from "../../Loader/components/Loader";
import { FaStar, FaRegStar } from "react-icons/fa6";
import { Link } from "react-router-dom";
import "./Products.css";
export default function Products() {
  const [products, setProducts] = useState();
  const [loader, setLoader] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 3;
  let [price, setPrice] = useState("");
  let [min, setMin] = useState("");
  let [max, setMax] = useState("");
  const getProducts = async (currentPage) => {
    try {
      const { data } = await axios.get(
        `${
          import.meta.env.VITE_API
        }/products?page=${currentPage}&limit=${productsPerPage}`,
        {}
      );
      // console.log(data);
      setProducts(data);
      setLoader(false);
    } catch (error) {
      //console.log(error);
      setLoader(false);
    }
  };
  const getProductsSorted = async (page, sort) => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API}/products?page=${page}&sort=${sort}`
      );
      //console.log(data);
      setProducts(data);
      setLoader(false);
    } catch (error) {
      //console.log(error);
      setLoader(false);
    }
  };
  const getProductsByPrice = async (page, price) => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API}/products?page=${page}&price=${price}`
      );
      //console.log(data);
      setProducts(data);
      setLoader(false);
    } catch (error) {
      //console.log(error);
      setLoader(false);
    }
  };
  const getProductsByMin = async (page, min, max) => {
    if (min == "" && max != "") {
      min = 0;
    } else if (max == "" && min != "") {
      max = 200;
    }
    try {
      const { data } = await axios.get(
        `${
          import.meta.env.VITE_API
        }/products?page=${page}&price[gte]=${min}&price[lte]=${max}`
      );
      //console.log(data);
      setProducts(data);
      setLoader(false);
    } catch (error) {
      // console.log(error);
      setLoader(false);
    }
  };
  const ResetInputs = () => {
    setPrice("");
    setMax("");
    setMin("");
    getProducts(1);
  };

  const nextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
    getProducts(currentPage + 1); // Fetch products for the next page
  };

  const prevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
    getProducts(currentPage - 1); // Fetch products for the previous page
  };

  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
    getProducts(pageNumber); // Fetch products for the selected page
  };

  const avgRate = (product) => {
    let sum = 0;
    product.reviews.map((review) => (sum += review.rating));
    return Math.round(sum / product.reviews.length);
  };

  const getStars = (avgRate) => {
    let stars = [];
    for (let i = 0; i < avgRate; i++) {
      stars.push(<FaStar key={`star-${i}`} color="yellow" />); // Unique key prop for each star
    }
    while (stars.length < 5) {
      stars.push(<FaRegStar key={`star-${stars.length}`} />); // Unique key prop for each star
    }
    return stars;
  };

  useEffect(() => {
    getProducts(currentPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loader) {
    return <Loader />;
  }
  return (
    <div className="container my-3  ">
      <div className="row mb-3">
        <div className="col-md-4">
          <select
            defaultValue="Sort Options"
            className=" Filter"
            onChange={(e) => getProductsSorted(currentPage, e.target.value, e)}
          >
            <option disabled>Sort Options</option>
            <option value="price">Price</option>
            <option value="-price">Price Descending </option>
            <option value="discount">Discount </option>
            <option value="-discount">Discount Descending</option>
            <option value="name">Name</option>
            <option value="-name">Name Descending</option>
          </select>
        </div>
        <div className="col-md-4 ">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              getProductsByPrice(currentPage, price);
            }}
            className="mb-3 d-flex"
          >
            <input
              type="text"
              value={price}
              onChange={(e) => {
                setPrice(e.target.value);
              }}
              className="form-control mb-2 me-2 focus-ring focus-ring-info border border-2"
            />
            <button type="submit" className="searchBtn ">
              Search
            </button>
          </form>
        </div>
        <div className="col-md-4">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              getProductsByMin(currentPage, min, max);
            }}
            className="mb-3 d-flex"
          >
            <input
              type="text"
              value={min}
              onChange={(e) => {
                setMin(e.target.value);
              }}
              className="form-control mb-2 me-2 focus-ring focus-ring-info border border-2  "
              placeholder="Min"
            />
            <input
              type="text"
              value={max}
              onChange={(e) => {
                setMax(e.target.value);
              }}
              className="form-control mb-2 me-2 focus-ring focus-ring-info border border-2"
              placeholder="Max"
            />
            <button type="submit" className="searchBtn ">
              Get
            </button>
            <button className=" bg-danger" onClick={ResetInputs}>
              Clear
            </button>
          </form>
        </div>
      </div>
      <div className="container">
        <div className="row">
          {products?.products &&
            products.products.map((product, index) => (
              <div className="col-md-4" key={product._id}>
                <div className="allProducts">
                  <div className="everyProduct text-center ">
                    <img
                      className="pic mx-auto"
                      src={product.mainImage.secure_url}
                      alt={product.name}
                    />
                    <h2 className="fs-6">{product.name}</h2>
                    <Link
                      className="detailsBtn placeButton"
                      to={`/ProductsDetails/${product._id}`}
                    >
                      Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
      <nav aria-label="Page navigation">
        <ul className="pagination justify-content-center">
          <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
            <button
              className="page-link"
              onClick={prevPage}
              disabled={currentPage === 1}
            >
              Previous
            </button>
          </li>
          {[1, 2, 3].map((pageNumber) => (
            <li
              key={pageNumber}
              className={`page-item ${
                currentPage === pageNumber ? "active" : ""
              }`}
            >
              <button
                className="page-link "
                onClick={() => goToPage(pageNumber)}
              >
                {pageNumber}
              </button>
            </li>
          ))}
          <li className={`page-item ${currentPage === 3 ? "disabled" : ""}`}>
            <button
              className="page-link"
              onClick={nextPage}
              disabled={products.length < productsPerPage}
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}
