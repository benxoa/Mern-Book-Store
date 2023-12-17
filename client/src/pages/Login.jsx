import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TopLoadingBar from "react-top-loading-bar";
import { useCookies } from "react-cookie";

const Login = () => {
  const [cookies, setCookie] = useCookies(["token", "UserId"]);
  const [user, setuser] = useState({
    Email: "",
    password: "",
  });

  const customToastStyle = {
    fontSize: "16px",
    fontFamily: "Poppins",
    borderRadius: "23px",
  };
  const history = useNavigate();
  const loadingBar = useRef(null);

  const handleInputChange = (e) => {
    setuser({ ...user, [e.target.name]: e.target.value });
  };
  const setTokenCookie = (tokenValue) => {
    setCookie("token", tokenValue, {
      path: "/",
      httpOnly: true,
      sameSite: "strict", 
      maxAge: 2592000, 
    });
  };

  const HandleSubmit = async (e) => {
    e.preventDefault();
    loadingBar.current && loadingBar.current.continuousStart();
    try {
      const res = await fetch("http://localhost:3000/login", {
        method: "POST",
        credentials: "include",
        body: JSON.stringify({
          Email: user.Email,
          Password: user.password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.status === 200) {
        const userData = await res.json();

        setCookie("UserId", userData.userId, {
          maxAge: 2592000,
        });

        toast.success("Logged in SuccessFully!", {
          style: customToastStyle,
        });
        setTimeout(() => {
          history(`/`);
        }, 1000);
      } else if (res.status === 403 || res.status === 404) {
        toast.error("Invalid email or password!", {
          style: customToastStyle,
        });
      } else {
        toast.error("Something Went Wrong", {
          style: customToastStyle,
        });
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      loadingBar.current && loadingBar.current.complete();
    }
  };
  return (
    <>
      <TopLoadingBar color="#48b3fa" ref={loadingBar} />
      <form onSubmit={HandleSubmit}>
        <div className="container">
          <h1>Login</h1>
          <p>Please fill in this form Login.</p>
          <hr />

          <label htmlFor="email">
            <b>Email</b>
          </label>
          <input
            type="email"
            placeholder="Enter Email"
            name="Email"
            id="email"
            value={user.Email}
            onChange={handleInputChange}
            required
          />

          <label htmlFor="password">
            <b>Password</b>
          </label>
          <input
            type="password"
            placeholder="Enter Password"
            name="password"
            value={user.password}
            onChange={handleInputChange}
            id="password"
            required
          />

          <br />
          <br />

          <button
            type="submit"
            className="btn btn-primary"
            style={{ width: "100%" }}
          >
            Login
          </button>
        </div>
      </form>
      <ToastContainer />
    </>
  );
};

export default Login;
