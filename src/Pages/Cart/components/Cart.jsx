/* eslint-disable no-empty */
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Bounce, toast } from "react-toastify";
import './Cart.css'
import Loader from "../../Loader/components/Loader";
function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [loader, setLoader] = useState(true);
  // eslint-disable-next-line no-unused-vars
  const controller = new AbortController();
  const getDataCart = async () => {
    try {
      const token = localStorage.getItem("userToken");
      const { data } = await axios.get(`${import.meta.env.VITE_API}/cart`, {
        headers: {
          Authorization: `Tariq__${token}`,
        },
      });
      setCartItems(data.products);
      setLoader(false);
    } catch (error) {
      setLoader(true);
    }
  };

  useEffect(() => {
    getDataCart();
    return () => {};
  }, []);

  const handleIncrement = async (productId) => {
    try {
      const token = localStorage.getItem("userToken");
      const { data } = await axios.patch(
        `${import.meta.env.VITE_API}/cart/incraseQuantity`,
        { productId },
        {
          headers: {
            Authorization: `Tariq__${token}`,
          },
        }
      );
      const updatedCartItems = cartItems.map((item) =>
        item.details._id === productId
          ? {
              ...item,
              quantity: data.cart.products.find(
                (p) => p.productId === productId
              ).quantity,
            }
          : item
      );
      setCartItems(updatedCartItems);
    } catch (error) {
      setLoader(true);
    }
  };

  const handleDecrement = async (productId) => {
    try {
      const token = localStorage.getItem("userToken");
      const { data } = await axios.patch(
        `${import.meta.env.VITE_API}/cart/decraseQuantity`,
        { productId },
        {
          headers: {
            Authorization: `Tariq__${token}`,
          },
        }
      );

      const updatedCartItems = cartItems.map((item) => {
        if (item.details._id === productId) {
          const updatedQuantity = Math.max(
            1,
            data.cart.products.find((p) => p.productId === productId).quantity
          ); // Ensure quantity is at least 1
          return {
            ...item,
            quantity: updatedQuantity,
          };
        } else {
          return item;
        }
      });
      setCartItems(updatedCartItems);
    } catch (error) {
      setLoader(true);
    }
  };

  const handleRemoveItem = async (productId) => {
    try {
      const token = localStorage.getItem("userToken");
      await axios.patch(
        `${import.meta.env.VITE_API}/cart/removeItem`,
        {
          productId,
        },
        {
          headers: {
            Authorization: `Tariq__${token}`,
          },
        }
      );
      const updatedCartItems = cartItems.filter(
        (item) => item.details._id !== productId
      );
      setCartItems(updatedCartItems);
    } catch (error) {
      setLoader(true);
    }
  };

  const handleIClear = async () => {
    try {
      const token = localStorage.getItem("userToken");
      await axios.patch(`${import.meta.env.VITE_API}/cart/clear`, null, {
        headers: {
          Authorization: `Tariq__${token}`,
        },
      });
      setCartItems([]);
    } catch (error) {
      setLoader(true);
    }
  };
  const itemCount = cartItems.length;
  const totalPrice = cartItems.reduce((total, item) => {
    return total + item.details.price * item.quantity;
  }, 0);
  // eslint-disable-next-line no-unused-vars
  function handleCheckoutClick(cartItems) {
    toast.success(
      "All informations are correct , Complete Payment ",
      {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      }
    );
  }

  return (
    <section className="text-center">
      <div className="container py-5 h-100">
        <div className="row justify-content-center align-items-center h-100">
          <div className="">
            <div
              className="card cartBorder"
              style={{ borderRadius: "50px" }}
            >
              <div className="card-body">
                <div className="row ">
                  <div className="">
                    <div className="p-0">
                      <div className="d-flex flex-column flex-wrap">
                        <h1 className="fw-bold mb-5  text-center cartLable ">
                          Shopping Cart

                          <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="60"
                        height="55"
                        fill="currentColor"
                        className="bi bi-cart4 iconC "
                        viewBox="0 0 16 16"
                      >
                        <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5M3.14 5l.5 2H5V5zM6 5v2h2V5zm3 0v2h2V5zm3 0v2h1.36l.5-2zm1.11 3H12v2h.61zM11 8H9v2h2zM8 8H6v2h2zM5 8H3.89l.5 2H5zm0 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0m9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0" />
                      </svg>
                        </h1>
                        <div className="mb-0 text-muted wit">
                          {loader ? (
                            <Loader />
                          ) : (
                            <>
                              {cartItems.length === 0 ? (
                                <div className="text-center text-danger fs-5  text-capitalize fw-bold">
                                  <p>Cart Is Empty</p>
                                  <span>
                                    Add some Products 
                                  </span>
                                </div>
                              ) : (
                                <>
                                  <div className="table-responsive">
                                    <table className="table table-bordered table-hover  cartBorder">
                                      <thead>
                                        <tr className="text-center">
                                          <th className="cartBorder">
                                            Image
                                          </th>
                                          <th className="cartBorder">
                                            Name
                                          </th>
                                          <th className=" cartBorder">
                                            Price
                                          </th>
                                          <th className=" cartBorder">
                                            Quantity
                                          </th>
                                          <th className="cartBorder">
                                            Total
                                          </th>
                                          <th className=" cartBorder">
                                            Remove
                                          </th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        {cartItems.map((item) => (
                                          <tr
                                            key={item.details._id}
                                            className="text-center"
                                          >
                                            <td className=" cartBorder">
                                              <img
                                                src={
                                                  item.details.mainImage
                                                    .secure_url
                                                }
                                                alt={item.details.name}
                                                style={{ maxWidth: "100px" }}
                                              />
                                            </td>
                                            <td className=" cartBorder">
                                              ${item.details.name}
                                            </td>
                                            <td className=" cartBorder">
                                              ${item.details.price}
                                            </td>
                                            <td className="cartBorder">
                                              <button
                                                className="qB"
                                                onClick={() =>
                                                  handleDecrement(
                                                    item.details._id
                                                  )
                                                }
                                                disabled={item.quantity === 1} // Disable the button if quantity is 1
                                              >
                                                -
                                              </button>
                                              {item.quantity}
                                              <button
                                                className="qB "
                                                onClick={() =>
                                                  handleIncrement(
                                                    item.details._id
                                                  )
                                                }
                                              >
                                                +
                                              </button>
                                            </td>
                                            <td className=" cartBorder">
                                              $
                                              {item.details.price *
                                                item.quantity}
                                            </td>
                                            <td className=" cartBorder text-center">
                                              <button
                                                className="btn btn-sm btn-outline-danger"
                                                onClick={() =>
                                                  handleRemoveItem(
                                                    item.details._id
                                                  )
                                                }
                                              >
                                                <svg
                                                  xmlns="http://www.w3.org/2000/svg"
                                                  width={20}
                                                  height={20}
                                                  fill="currentColor"
                                                  className="bi bi-x"
                                                  viewBox="0 0 16 16"
                                                >
                                                  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
                                                </svg>
                                              </button>
                                            </td>
                                            
                                          </tr>
                                        ))}
                                      </tbody>
                                    </table>
                                  </div>
                                 
                                </>
                              )}
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>


                  
                  <div className=" summary ">
                    <div className="">
                      <h3 className="cartLable mb-5 mt-2 pt-1 text-center ">
                        Summary
                      </h3>
                      <hr className="my-4" />
                      <div className="d-flex justify-content-between mb-4 fw-bold">
                        <span className="text-uppercase">
                          items : {itemCount}
                        </span>
                      </div>
                      <div className="d-flex justify-content-between mb-5 fw-bold">
                        <span className="text-uppercase ">Total price</span>
                        <span className="me-5 text-danger">${totalPrice}</span>
                      </div>
                      <span className="text-uppercase subLable fw-bold"> Enter Code</span>
                      <div className="mt-3">
                        <input
                          type="text"
                          className="form-control form-control-lg border-secondary"
                          
                        />
                      </div>
                      <hr className="my-4" />
                      {itemCount > 0 ? (
                        <Link
                          to="/Order"
                          state={{ cartItems }}
                          className="btn btn-lg btn-danger w-100"
                          onClick={() => handleCheckoutClick(cartItems)}
                        >
                          CheckOut
                        </Link>
                      ) : (
                        <button
                          className="btn btn-lg btn-danger w-100 disabled"
                          disabled
                        >
                          CheckOut
                        </button>
                      )}
                    </div>
                    <div className="mt-5">
                      {cartItems.length > 0 && (
                        <div>
                          <div colSpan="6">
                            <button
                              onClick={handleIClear}
                              className="btn btn-sm btn-outline-danger  mt-5"
                              disabled={cartItems.length === 0} // Disable the button when cartItems is empty
                            >
                              Delete Of All
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                fill="currentColor"
                                className="bi bi-trash"
                                viewBox="0 0 16 16"
                              >
                                {/* Your SVG icon */}
                              </svg>
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Cart;
