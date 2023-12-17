import axios from "axios";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import {  useCookies } from 'react-cookie';




const PublishBook = () => {
  const history = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(['token']);
  const [id] = useCookies(["UserId"]);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  


  useEffect(() => {
    const token = cookies.token;
    setIsLoggedIn(!!token);
  }, [cookies.token]);

  const handleLogout = () => {
    removeCookie('token');
    setIsLoggedIn(false);
    history('/login');
  };


  useEffect(() => {
    const interval = setInterval(() => {
      const token = cookies.token;
      if (!token) {
        setIsLoggedIn(false);
        history('/login');
      }
    }, 1);

    return () => clearInterval(interval);
  }, [cookies.token, history]);

    const [book, setbook] = useState({
        BookName: "",
        Writer: "",
        Price: "",
        Quantity: "",
        Publisher: "",
        imageurl: "",
        PublishedYear: "",
        postedBy: "",

    })

    const handleInputChange = (e) => {
        setbook({...book, [e.target.name]: e.target.value })
    }

    const customToastStyle = {
    fontSize: "16px",
    fontFamily: "Poppins",
    borderRadius: "23px",
  };


    

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const res = await axios.post("http://localhost:3000/book-upload", {
            Bookname: book.BookName,
            Writer: book.Writer,
            Price: book.Price,
            Quantity: book.Quantity,
            Publisher: book.Publisher,
            PublishedYear: book.PublishedYear,
            Image: book.imageurl,
            postedBy: id.UserId
          });
    
          if (res.status === 201) {
            toast.success("Book Uploaded successfully!", {
              style: customToastStyle,
            })
            history("/")
            
          } else  if(res.status === 400) {
            toast.success("Failed to upload Book!!", {
              style: customToastStyle,
            });

          }
        } catch (error) {
          console.log(error);
        }
      };

  return (
    <>
    <div className="container mt-4">
      <h1 className="text-center mb-4">Publish Book</h1>
      <form onSubmit={handleSubmit}>
        <div className="container">
          <br />
          <div className="mb-3">
            <label className="form-label">Book Name</label>
            <input
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              name="BookName"
              value={book.BookName}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Publisher</label>
            <input
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              name="Publisher"
              value={book.Publisher}
              onChange={handleInputChange}
              required

            />
          </div>
          <div className="mb-3">
            <label className="form-label">Writer</label>
            <input
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              name="Writer"
              value={book.Writer}
              onChange={handleInputChange}
              required

            />
          </div>
          <div className="mb-3">
            <label className="form-label">Price</label>
            <input
              type="number"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              name="Price"
              value={book.Price}
              onChange={handleInputChange}
              required

            />
          </div>
          <div className="mb-3">
            <label className="form-label">Quantity</label>
            <input
              type="number"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              name="Quantity"
              value={book.Quantity}
              onChange={handleInputChange}
              required

            />
          </div>
          <div className="mb-3">
            <label className="form-label">Published Year</label>
            <input
              type="number"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              name="PublishedYear"
              value={book.PublishedYear}
              onChange={handleInputChange}
              required

            />
          </div>
          <div className="mb-3">
            <label className="form-label">Image Url</label>
            <input
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              name="imageurl"
              value={book.imageurl}
              onChange={handleInputChange}
              required

            />
          </div>
          

          <button  type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
      </div>
      <ToastContainer />

    </>
  );
};

export default PublishBook;
