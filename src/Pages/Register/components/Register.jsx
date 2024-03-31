import axios from "axios";
import { useState } from "react";
import { object, string } from "yup";
import { Bounce, Slide, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    userName: "",
    email: "",
    password: "",
    image: "",
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
  const handelImageChange = (e) => {
    const { name, files } = e.target;
    setUser({
      ...user,
      [name]: files[0],
    });
  };
  const validateData = async () => {
    const RegisterSchema = object({
      userName: string().min(5).max(20).required(),
      email: string().email().required(),
      password: string().min(8).max(20).required(),
      image: string().required(),
    });
    try {
      await RegisterSchema.validate(user, { abortEarly: false });
      return true;
    } catch (error) {
      //console.log("validation error", error.errors);
      setErrors(error.errors);
      setLoader(false);
      return false;
    }
  };
  const handelSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);
    if (await validateData()) {
      const formData = new FormData();
      formData.append("userName", user.userName);
      formData.append("email", user.email);
      formData.append("password", user.password);
      formData.append("image", user.image);
      try {
        const { data } = await axios.post(
          `${import.meta.env.VITE_API}/auth/signup`,
          formData
        );
        if (data.message == "success") {
          toast.success("Account Created Successfully", {
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
          navigate("/login");
        }
      } catch (error) {
        if (error.response.status === 409) {
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
      } finally {
        setLoader(false);
      }
    }
  };

  return (
    
    <>
    {errors.length > 0 ? errors.map((error) => <p>{error}</p>) : ""}

    
    <div className="register ">
      <h2 className="label title">Sign Up </h2>

      <form className="form" onSubmit={handelSubmit}>
        <label className="label form-item">User Name</label>
        <input
          type="text"
          value={user.userName}
          name="userName"
          onChange={handelChange}
        />

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

        <label className="label form-item ">Image</label>
        <input
          type="file"
          className="imag"
          name="image"
          onChange={handelImageChange}
        />

        <button
          className=" signBtn"
          disabled={loader?"disabled":null }
          type="submit"
        >
          {!loader ? "sign up" : "wait..."}
        </button>
      </form>
    </div>
    
  </>
    
  );
}

export default Register;
