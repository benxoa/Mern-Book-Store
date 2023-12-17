const express = require("express");
const router = express.Router();
const myBook = require("../schema/schema");
const cors = require("cors");
const myBookUser = require("../schema/user.schema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require('cookie-parser')
const validateToken = require('../Middleware/verify')
const path = require('path');


const _dirname = path.resolve();
const buildpath = path.join(_dirname, "../client/dist");
router.use(express.static(buildpath));
router.use(cors({ origin: "*", credentials: true }));
router.use(cookieParser());

// router.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '../client/dist/index.html'));
// });


router.post("/book-upload", async (req, res) => {
  const { Bookname, Publisher, Price, Quantity, Image, PublishedYear, Writer, postedBy } =
    req.body;
  try {
    if (
      !Bookname ||
      !Publisher ||
      !Price ||
      !Quantity ||
      !Image ||
      !PublishedYear ||
      !Writer
    ) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }
    const newBook = new myBook({
      Bookname,
      Publisher,
      Price,
      Quantity,
      Image,
      PublishedYear,
      Writer,
      postedBy
    });
    await newBook.save();
    return res.status(201).json({ message: "Book Added Successfully" });
  } catch (error) {
    console.log(error);
  }
});

router.get("/book", async (req, res) => {
  try {
    const book = await myBook.find();
    return res.status(200).json(book);
  } catch (error) {
    console.log(error);
  }
});

router.get("/book/:id", async (req, res) => {
  const id = req.params.id;
  const book = await myBook.findById(id);
  return res.status(200).json(book);
});

///** Authentication Section **///

router.post("/register", async (req, res) => {
  const { Username, Password, Userimage, Email } = req.body;
  const saltsRound = 12;

  try {
    if (!Username || !Password || !Email) {
      return res.status(403).json({ error: "Please Fill All Fields!" });
    }
    const emailcheck = await myBookUser.findOne({ Email: Email });
    const usernamechcek = await myBookUser.findOne({ Username: Username });
    if (usernamechcek) {
      return res.status(403).json({ error: "Username Already Exists!" });
    }
    if (emailcheck) {
      return res.status(403).json({ error: "Email Already Exists!" });
    }
    const hash = bcrypt.hashSync(Password, saltsRound);
    const bookuser = new myBookUser({
      Username,
      Password: hash,
      Userimage,
      Email,
    });


    await bookuser.save();
    res.status(201).json({ success: "user successfully registered" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something went wrong!" });
  }
});

router.post("/api/login", async (req, res) => {
  const { Email, Password } = req.body;

  try {
    const checkUser = await myBookUser.findOne({ Email: Email });

    if (!checkUser) {
      return res.status(404).json({ error: "User Not Found!" });
    }

    const isMatchPassword = await bcrypt.compare(Password, checkUser.Password);

    if (!isMatchPassword) {
      return res.status(403).json({ error: "Invalid Email or Password!" });
    }

    const token = checkUser.generateAuthToken()

    
    res.cookie("token", token, {
      expires: new Date(Date.now() + 2592000000),
      httpOnly: false,

    });

    return res.status(200).json({ success: "User Logged In!",  userId: checkUser._id  });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server Error" });
  }
});

router.get('/books/user/:userId', async (req, res) => {
  
  const userId = req.params.userId;

  try {
    const books = await myBook.find({postedBy: userId});
    res.status(200).json({ books });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.delete('/books/user/:bookid', async (req, res) => {
  const bookId = req.params.bookid;

  try {
    const deletedBook = await myBook.findByIdAndDelete(bookId);
    if (!deletedBook) {
      return res.status(404).json({ error: 'Book not found' });
    }
    res.status(200).json({ message: 'Book deleted successfully' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

router.put('/books/user/edit/:bookId', async (req, res) => {
  const bookId = req.params.bookId;
  try {
    const updatedBook = await myBook.findByIdAndUpdate(
      bookId,
      req.body,
      { new: true } // To return the updated book after modification
    );
    res.status(200).json({ book: updatedBook });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
