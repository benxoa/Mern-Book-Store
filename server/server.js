const express = require('express');
const app = express();
const cors = require('cors');
require("dotenv").config({path: '.env'})
const port = process.env.PORT;
require("./db/conn")
const router = require('./router/router')
const cookieParser = require('cookie-parser')



app.use(express.json());
app.use(cors({origin:"http://localhost:5173", credentials: true}));
app.use(cookieParser());
app.use(router)

app.listen(port, ()=> console.log("Connected to http://localhost:3000"))