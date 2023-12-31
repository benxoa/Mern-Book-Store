const express = require('express');
const app = express();
const cors = require('cors');
require("dotenv").config({ path: '.env' });
const port = process.env.PORT || 3000;
require("./db/conn");
const router = require('./router/router');
const cookieParser = require('cookie-parser');
const path = require('path');

app.use(express.json());


app.use(cors({credentials: true }));
app.use(cookieParser());
app.use(router);
const _dirname = path.resolve();
const buildpath = path.join(_dirname, "../client/dist");
app.use(express.static(buildpath));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

app.listen(port, () => console.log(`Connected to http://localhost:${port}`));
