import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Card = () => {
  const [books, setBooks] = useState([]);

  const getBooks = async () => {
    try {
      const res = await axios.get("http://localhost:3000/book");
      const data = res.data;
      setBooks(data); 
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBooks();
  }, []);

  return (
<div className="container mt-4">
      <h1 className="text-center mb-4">Books</h1>
      <div className="row justify-content-center">
        {books.map((book, index) => (
          <div className="col-md-6 col-lg-4 mb-4" key={index}>
            <div className="card">
              <div
                className="card-image-container"
                style={{
                  backgroundColor: '#f8f9fa', // Set the desired background color
                  height: '300px', // Adjust the height as needed
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
              
                <img
                  src={book.Image}
                  className="card-img-top img-fluid"
                  alt={book.Bookname}
                  style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }}
                />
              </div>
              <div className="card-body">
              
                <h2 style={{  fontSize: "1.4rem", fontWeight: "bold" }} className="card-title">{book.Bookname}</h2>

                <h6 style={{ color: 'green' }}>Price: ${book.Price} </h6>
                <p>Writer: {book.Writer}</p>

                <p style={{ color: '#2AD1BA', fontFamily: "Tahoma" }}>Publisher: {book.Publisher}</p>
                <Link to={`/book/${book._id}`} href="#" className="btn btn-secondary">
                  View Book
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Card;
