import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useCookies } from "react-cookie";



const Profile = () => {
  const [userBooks, setUserBooks] = useState([]);
  const [cookies] = useCookies(["UserId"]);

  const customToastStyle = {
    fontSize: "16px",
    fontFamily: "Poppins",
    borderRadius: "23px",
  };


  useEffect(() => {
    const fetchUserBooks = async () => {
      try {
        const res = await fetch(`http://localhost:3000/books/user/${cookies.UserId}`);
        if (res.status === 200) {
          const data = await res.json();
          setUserBooks(data.books); 
        } else {
          console.error('Failed to fetch user books');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchUserBooks();
  }, []); // !!Fetch books when userId changes

  const handleDeleteBook = async (bookId) => {
    try {
      const response = await fetch(`http://localhost:3000/books/user/${bookId}`, {
        method: 'DELETE',
      });
      if (response.status === 200) {
        toast.success("Book deleted successfully", {
          style: customToastStyle,
        });
        setTimeout(() => {
          window.location.reload();
        }, 700);
        } else {
        console.error('Failed to delete book');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <>
    <ToastContainer />
    <div className="container">
      <h1>Your Published Books</h1>
      <div className="row">
        {userBooks.length === 0 ? (
          <p>No books available</p>
        ) : (
          userBooks.map((book, index) => (
            book && (
              <div className="col-md-6 col-lg-4 mb-4" key={index}>
                <div className="card">
                  <div className="card-image-container" style={{ backgroundColor: '#f8f9fa', height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <img src={book.Image} className="card-img-top img-fluid" alt={book.Bookname} style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }} />
                  </div>
                  <div className="card-body">
                    <h2 style={{ fontSize: '1.4rem', fontWeight: 'bold' }} className="card-title">{book.Bookname}</h2>
                    <h6 style={{ color: 'green' }}>Price: ${book.Price}</h6>
                    <p>Writer: {book.Writer}</p>
                    <p style={{ color: '#2AD1BA', fontFamily: 'Tahoma' }}>Publisher: {book.Publisher}</p>
                    <div className="btn-group" role="group" aria-label="Book Actions">
                      <Link to={`/book/${book._id}`} className="btn btn-primary mr-2">
                        View
                      </Link>
                      <Link to={`/books/user/edit/${book._id}`} className="btn btn-secondary mr-2">
                        Edit
                      </Link>
                      <button onClick={() => handleDeleteBook(book._id)} className="btn btn-danger">
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )
          ))
        )}
      </div>
    </div>
    </>
  );
};

export default Profile;
