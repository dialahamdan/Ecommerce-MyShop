import { useContext, useEffect, useState } from "react";
import { NavLink, useNavigate, Link } from "react-router-dom";
import { UserContext } from "../../../context/User";
import "./Navbar.css";

function Navbar() {
  const { userName, setUserToken, setUserName, cartCount } =
    useContext(UserContext);
  const navigate = useNavigate();

  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Get dark mode preference from local storage or default to false
    return localStorage.getItem("darkMode") === "true";
  });

  const toggleDarkMode = () => {
    // Toggle dark mode state
    setIsDarkMode((prevMode) => {
      const newMode = !prevMode;
      // Save dark mode preference to local storage
      localStorage.setItem("darkMode", newMode);
      return newMode;
    });
  };

  const logout = () => {
    localStorage.removeItem("userToken");
    setUserToken(null);
    setUserName(null);
    navigate("/login");
  };

  useEffect(() => {
    // Add/remove dark mode class to body based on isDarkMode state
    document.body.classList.toggle("dark-mode", isDarkMode);
  }, [isDarkMode]);

  return (
    <nav className={`navbar navbar-expand-lg position-sticky top-0 z-3`}>
      <div className="container-fluid  mb-3  p-3 backColor bg-opacity-10  ">
        <div className="d-flex">
          <i className="bi  logo ms-3 " />
          <Link className="navbar-brand nav-link " aria-current="page" href="#">
            {" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className=" bi bi-box2-heart-fill icon logo"
              viewBox="0 0 16 16"
            >
              <path d="M3.75 0a1 1 0 0 0-.8.4L.1 4.2a.5.5 0 0 0-.1.3V15a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V4.5a.5.5 0 0 0-.1-.3L13.05.4a1 1 0 0 0-.8-.4zM8.5 4h6l.5.667V5H1v-.333L1.5 4h6V1h1zM8 7.993c1.664-1.711 5.825 1.283 0 5.132-5.825-3.85-1.664-6.843 0-5.132" />
            </svg>{" "}
            MY SHOP
          </Link>
        </div>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse " id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0  ">
            <li className="nav-item me-2 ">
              <NavLink
                className="nav-link btn fw-bold "
                aria-current="page"
                to="/"
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item me-3">
              <NavLink
                className="nav-link btn  fw-bold "
                aria-current="page"
                to="/products"
              >
                Products
              </NavLink>
            </li>
            {userName ? (
              <>
                <li className="nav-item me-2">
                  <NavLink
                    className="nav-link btn  fw-bold position-relative"
                    aria-current="page"
                    to="/Cart"
                  >
                    Cart{" "}
                    {cartCount > 0 && (
                      <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                        {cartCount}
                      </span>
                    )}
                  </NavLink>
                </li>

                <li className="nav-item me-2">
                  <NavLink
                    className="nav-link btn  fw-bold"
                    aria-current="page"
                    to="/Profile"
                  >
                    Profile
                  </NavLink>
                </li>

                <li className="nav-item me-2" onClick={logout}>
                  <NavLink
                    className="nav-link btn  fw-bold"
                    aria-current="page"
                    to="/logout"
                  >
                    Logout
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item me-2">
                  <NavLink
                    className="nav-link btn  fw-bold"
                    aria-current="page"
                    to="/login"
                  >
                    Signin
                  </NavLink>
                </li>
                <li className="nav-item me-2">
                  <NavLink
                    className="nav-link btn  fw-bold"
                    aria-current="page"
                    to="/register"
                  >
                    Signup
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
        <div className="me-3">
          <NavLink
            className="me-3"
            to=""
            onClick={() =>
              window.open("https://github.com/dialahamdan", "_blank")
            }
          >
            <i className="bi bi-github logoGit" />
          </NavLink>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
