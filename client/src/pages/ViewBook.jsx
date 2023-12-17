import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

const ViewBook = () => {
  const [book, setBook] = useState({});
  const { _id } = useParams();

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/book/${_id}`); 
        setBook(response.data);
      } catch (error) {
        console.error('Error fetching book: ', error);
      }
    };

    fetchBook();
  }, [_id]);

  return (
    <>
       <div className="container mt-4">
      <h1>Book Details</h1>
      <hr />
      <div className="row">
        <div className="col-md-4">
          <img
            src={book.Image} 
            className="img-fluid rounded"
            alt={book.Bookname}
          />
        </div>
        <div className="col-md-8">
          <h2>{book.Bookname}</h2>
          <p className="lead">
            Some quick example text to build on the card title and make up the bulk of the card's content.
          </p>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">Price: {book.Price}</li>
            <li className="list-group-item">Published Year: {book.PublishedYear}</li>
            <li className="list-group-item">Publisher: {book.Publisher}</li>
            <li className="list-group-item">Quantity: {book.Quantity}</li>
            <li className="list-group-item">Writer: {book.Writer}</li>
            <li className="list-group-item">PostedBy: {book.postedBy}</li>

            <hr />
            <Link to={'/'}><button className="btn btn-primary">Go Back</button></Link>


          </ul>
        </div>
      </div>
    </div>

    </>
  );
};

export default ViewBook;
