import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar.jsx';
import PublishBook from './pages/PublishBook.jsx';
import ViewBook from './pages/ViewBook.jsx';
import Registration from './pages/Registration.jsx';
import Login from './pages/Login.jsx';
import Profile from './pages/Profile.jsx';
import EditBook from './pages/EditBook.jsx';


ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <Navbar />
  <Routes>
      <Route path='/' element={<App />} />
      <Route path="publish-book" element={<PublishBook />} />
      <Route path='/book/:_id' element={<ViewBook />}/>
      <Route path='/registration' element={<Registration />}/>
      <Route path='/login'  element={<Login />}/>
      <Route path='/profile/:id' element={<Profile />}/>
      <Route path='/books/user/edit/:bookId' element={<EditBook />}/>

  </Routes>
</BrowserRouter>
)
