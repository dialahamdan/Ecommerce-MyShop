import { useState } from "react";
import axios from "axios";
import { object, string } from "yup";
import { Bounce, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import './code.css'
function ForgetPassword() {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const [errors, setErrors] = useState([]);
  const [user, setUser] = useState({
    email: "",
    password: "",
    code: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const validateData = async () => {
    const logSchema = object({
      email: string().email().required(),
      password: string().required().min(5).max(20),
      code: string().required().min(4).max(4),
    });

    try {
      await logSchema.validate(user, { abortEarly: false });
      setErrors([errors.errors]);
      return true; // Validation succeeded
    } catch (err) {
      if (err.errors) {
        setErrors(err.errors);
        err.errors.map((err) => {
          return toast.error(err, {
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
        });
      } else {
        // Handle other validation errors, if any
        console.error("Validation error:", err);
      }
      setLoader(false);
      return false; // Validation failed
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);

    if (await validateData()) {
      try {
        const { data } = await axios.patch(
          `${import.meta.env.VITE_API}/auth/forgotPassword`,
          { ...user }
        );

        if (data.message == "success") {
          toast.success("Password Reset successfully ");
          navigate("/Login");
        }
      } catch (err) {
        setLoader(false);
        setErrors(err.errors);
        toast.error("Error sending reset password email. Please try again.");
      } finally {
        setLoader(false);
      }
    }
  };

  return (
    <>
      <div className="register">
        <h1 className="  label">
         
         Reset Your Password 
        </h1>
        <form onSubmit={handleSubmit} className="formForget">
          
           
            
           <label className="label form-item title">
                
                email
              </label>
              <input
                className="  w-auto"
                type="email"
                value={user.email}
                name="email"
                onChange={handleChange}
              />
           
          
            
              <label className="label form-item title">
                
                password
              </label>
              <input
                className=" w-auto"
                type="password"
                value={user.password}
                name="password"
                onChange={handleChange}
              />
           
           
              <label className="label form-item title">
                
                Code
              </label>
              <input
                className="  w-auto"
                type="text"
                value={user.code}
                name="code"
                onChange={handleChange}
              />
           
           
              <button
                type="submit"
                className="signBtn"
                disabled={loader}
              >
                {!loader ? "Submit" : "Please wait..."}
              </button>
           
         
        </form>
      </div>
    </>
  );
}

export default ForgetPassword;
