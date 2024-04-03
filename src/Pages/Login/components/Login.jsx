import axios from "axios";
import { useContext, useState } from "react";
import { object, string } from "yup";
import { Bounce, Slide, toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../../context/User";
import "./Signup.css";
function Login() {
  const { setUserToken } = useContext(UserContext);
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState([]);
  const [loader, setLoader] = useState(false);

  const handelChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };
  const validateData = async () => {
    const LoginSchema = object({
      email: string().email().required(),
      password: string().min(8).max(20).required(),
    });
    try {
      await LoginSchema.validate(user, { abortEarly: false });
      return true;
    } catch (error) {
      // console.log("validation error", error.errors);
      setErrors(error.errors);
      setLoader(false);
      return false;
    }
  };
  const handelSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);
    if (await validateData()) {
      try {
        const { data } = await axios.post(
          `${import.meta.env.VITE_API}/auth/signin`,
          {
            email: user.email,
            password: user.password,
          }
        );

        //console.log(data);
        if (data.message == "success") {
          toast.success("Signin successfully", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Slide,
          });
          localStorage.setItem("userToken", data.token);
          setUserToken(data.token);
          navigate("/");
        }
      } catch (error) {
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
      } finally {
        setLoader(false);
      }
    }
  };

  return (
    <>
      {errors.length > 0 ? errors.map((error) => <p>{error}</p>) : ""}
      <div className="register">
        <h2 className="label title">Sign In </h2>
        <form className="form" onSubmit={handelSubmit}>
          <label className="label form-item">Email</label>
          <input
            type="email"
            value={user.email}
            name="email"
            onChange={handelChange}
          />
          <label className="label form-item">Password</label>
          <input
            type="password"
            value={user.password}
            name="password"
            onChange={handelChange}
          />
          <Link to="/sendcode">Forgot your password ?</Link>
          <button
            className=" signBtn"
            disabled={loader ? "disabled" : null}
            type="submit"
          >
            {!loader ? "sign in" : "wait..."}
          </button>
        </form>
      </div>
    </>
  );
}

export default Login;
