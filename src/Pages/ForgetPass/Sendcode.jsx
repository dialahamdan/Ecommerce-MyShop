import { useState } from "react";
import axios from "axios";
import { object, string } from "yup";
import { Bounce, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import './code.css'

function ForgetPass() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loader, setLoader] = useState(false);
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);

    try {
      const logSchema = object({
        email: string().email().required(),
      });

      await logSchema.validate({ email }, { abortEarly: false });

      const { data } = await axios.patch(
        `${import.meta.env.VITE_API}/auth/sendcode`,
        { email }
      );
      setMessage(data.message);
      toast.success("Check Your Email For The Reset Code");
      navigate("/ForgetPassword");
    } catch (err) {
      setErrors(err.errors);
      //setMessage('Error sending reset password email. Please try again.');
      toast.error("Please enter a valid email address.", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
    } finally {
      setLoader(false);
    }
  };

  return (
    
    <>
    {errors.length > 0 ? errors.map((error) => <p>{error}</p>) : ""}

<div className="register">
 <h2 className="label title"> </h2>

 <form className="form" onSubmit={handleSubmit}>
  

   <label className="label form-item title">Enter Your Email </label>
   <input
     type="email"
     value={email}
     name="email"
     onChange={handleChange}
   />



   <button
     className=" signBtn"
     disabled={loader?"disabled":null}
     type="submit"
   >
     {!loader ? "Verify" : "wait..."}
   </button>
 </form>
</div>
   </>
  );
}

export default ForgetPass;
