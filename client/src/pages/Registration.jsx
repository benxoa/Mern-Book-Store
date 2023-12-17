import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {useFormik} from 'formik'



const Registration = () => {
  const [user, setuser] = useState({
    Username: "",
    Email: "",
    password: "",
    // cpassword: ""
  });

  const customToastStyle = {
    fontSize: "16px",
    fontFamily: "Poppins",
    borderRadius: "23px",
  };

  const handleInputChange = (e) => {
    setuser({ ...user, [e.target.name]: e.target.value });
  };
  const history = useNavigate();

  const HandleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3000/register", {
        method: "POST",
        credentials: 'include',
        body: JSON.stringify({
          Username: user.Username,
          Email: user.Email,
          Password: user.password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.status === 201) {

          history("/login")
          
      } else if (res.status === 403) {
        toast.error("Username or Email Already Exits", {
          style: customToastStyle,
        });
      } else {
        toast.error("Something Went Wrong", {
          style: customToastStyle,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <>
      <form onSubmit={HandleSubmit} >
        <div className="container">
          <h1>Registration</h1>
          <p>Please fill in this form Register.</p>
          <hr />

          <label htmlFor="Username">
            <b>Username</b>
          </label>
          <input
            type="text"
            placeholder="Enter Username"
            name="Username"
            id="Username"
            value={user.Username}
            onChange={handleInputChange}
            required
          />

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

          {/* <label htmlFor="password"><b>Confirm Password</b></label>
    <input type="password" placeholder="Retype Password" name="cpassword" value={user.cpassword} onChange={handleInputChange} id="cpassword" required/> */}

          <br />
          <br />

          <button
            type="submit"
            className="btn btn-primary"
            style={{ width: "100%" }}
          >
            Register
          </button>
        </div>
      </form>
      <ToastContainer />
    </>
  );
};

export default Registration;
