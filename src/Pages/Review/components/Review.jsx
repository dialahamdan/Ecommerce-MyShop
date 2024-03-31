import { useState } from "react";
import axios from "axios";
import { Bounce, toast } from "react-toastify";
import { object, string } from "yup";
import { useNavigate, useParams } from "react-router-dom";
import'./Review.css'
function Review() {
  const { id } = useParams();
  const [errors, setError] = useState([]);
  const navgate = useNavigate();
  const [loader, setLoadr] = useState(false);
  const [user, setUser] = useState({
    comment: "",
    rating: "",
    image: "",
  });
  const handelChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };
  const handelImageChange = (e) => {
    const { name, files } = e.target;
    setUser({
      ...user,
      [name]: files[0],
    });
  };
  const validationData = async () => {
    const regiSchema = object({
      comment: string().required().min(5).max(20),
      rating: string().required().max(20),
      image: string(),
    });

    try {
      await regiSchema.validate(user, { abortEarly: false });
      setError([]); // Clear any previous errors
      return true; // Validation succeeded
    } catch (err) {
      setError(err.errors);
      setLoadr(false);
      toast.error(err.errors.join(", "), {
        position: "bottom-center",
        autoClose: 5018,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
      return false; // Validation failed
    }
  };

  const handelSubmit = async (e) => {
    e.preventDefault();
    setLoadr(true);
    if (await validationData()) {
      const token = localStorage.getItem("userToken"); // Retrieve token
      try {
        const { data } = await axios.post(
          `${import.meta.env.VITE_API}/products/${id}/review`,
          {
            comment: user.comment,
            rating: user.rating,
          },
          {
            headers: {
              Authorization: `Tariq__${token}`,
            },
          }
        );

        setUser({
          comment: "",
          rating: "",
        });
        if (data.message === "success") {
          toast.success("Review Added ", {
            position: "bottom-center",
            autoClose: 5018,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Bounce,
          });
        }
        navgate("/signin");
      } catch (err) {
        setLoadr(false);
        toast.error(err.response.data.message, {
          position: "bottom-center",
          autoClose: false,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
        });
      } finally {
        setLoadr(false);
      }
    }
  };

  return (
    <>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card">
              <div className="card-body review">
                <h1 className="label ">Add Review</h1>
                <form onSubmit={handelSubmit}>
                  <div className="mb-3">
                    <label htmlFor="comment" className="label form-item ">
                      Comment
                    </label>
                    <input
                      type="text"
                      id="comment"
                      name="comment"
                      value={user.comment}
                      onChange={handelChange}
                      className="form-control"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="rating" className=" label form-item ">
                      Rating
                    </label>
                    <input
                      type="number"
                      id="rating"
                      name="rating"
                      value={user.rating}
                      onChange={handelChange}
                      className="form-control"
                    />
                      <label className="label form-item ">Image</label>
        <input
          type="file"
          className="imag imgPossition"
          name="image"
          onChange={handelImageChange}
        />
                  </div>
                  <button
                    type="submit"
                    className="addCommentBtn"
                    disabled={loader}
                  >
                    {!loader ? "Add" : "Please wait..."}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="row justify-content-center mt-3">
          <div className="col-md-6">
            <ul className="list-group">
              {errors.map((error, index) => (
                <li
                  key={index}
                  className="list-group-item list-group-item-danger"
                >
                  {error}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default Review;
