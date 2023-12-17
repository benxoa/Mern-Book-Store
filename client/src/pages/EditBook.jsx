import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const EditBook = () => {
    const userId = localStorage.getItem('userId')
  const { bookId } = useParams();
  const history = useNavigate() 
  const [book, setBook] = useState({
    Bookname: '',
    Writer: '',
    Price: '',
    Quantity: '',
    Publisher: '',
    PublishedYear: '',
    Image: '',
  });

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await fetch(`http://localhost:3000/book/${bookId}`);
        if (response.status === 200) {
          const data = await response.json();
          setBook(data); // Update book state with fetched book details
        } else {
          console.error('Failed to fetch book details');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchBookDetails();
  }, [bookId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBook({ ...book, [name]: value });
  };
  const customToastStyle = {
    fontSize: "16px",
    fontFamily: "Poppins",
    borderRadius: "23px",
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3000/books/user/edit/${bookId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(book),
      });

      if (response.status === 200) {
        toast.success("Book Updated successfully!", {
            style: customToastStyle,
          });
          setTimeout(() => {
            history(`/profile/${userId}`);
          }, 1000);
      } else {
        console.error('Failed to update book');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };


  return (
    
    <div>
          <ToastContainer />

      <h2>Edit Book</h2>
      <form onSubmit={handleSubmit}>
        <div className="container">
          <br />
          <div className="mb-3">
            <label className="form-label">Book Name</label>
            <input
          type="text"
          name="Bookname"
          value={book.Bookname}
          onChange={handleInputChange}
          // Add other input fields similarly
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
              value={book.Image}
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
  );
};

export default EditBook;
