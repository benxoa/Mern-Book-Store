import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from 'react-cookie';


const Navbar = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['token']);
  const [cookiess] = useCookies(["UserId"]);

  const isLoggedIn = cookies.token !== undefined;

  const handleLogout = () => {
    removeCookie('token');
  };
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const handleSearch = (searchTerm) => {
    const filteredResults = data.filter((item) =>
      item.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(filteredResults);
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link
            style={{ fontSize: "1.4rem", fontWeight: "bold" }}
            className="navbar-brand"
            to="/"
          >
            myBook
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">
                  All Books
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/publish-book"
                >
                  Publish Book
                </Link>
              </li>
              

              {isLoggedIn ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link active" to={`/profile/${cookiess.UserId}`}>
                    Profile
                  </Link>
                </li>
                <div>

    </div>
                <hr />
                <li className="nav-item">
                  <button className="btn -btn-primary" style={{ width: "100%" }} onClick={handleLogout}>
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link active" to="/login">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link active" to="/registration">
                    Registration
                  </Link>
                </li>
              </>
            )}

            
          

            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
