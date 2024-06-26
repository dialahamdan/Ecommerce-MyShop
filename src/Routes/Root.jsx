import Navbar from "../assets/Navbar/components/Navbar";
import Footer from "../assets/Footer/components/Footer";
import { Outlet } from "react-router-dom";


function Root() {
  return (
    <div className="container">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}

export default Root;
