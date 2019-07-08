var express = require('express');
var app = express();
var multer = require('multer')
var cors = require('cors');
var axios = require('axios');
app.use(cors());
{/* <script src="https://unpkg.com/axios/dist/axios.min.js"></script> */}


const storage = multer.diskStorage({
  destination: './files',
  filename(req, file, cb) {
    cb(null, `${new Date()}-${file.originalname}`);
  },
});

const upload = multer({ storage });
module.exports = upload;