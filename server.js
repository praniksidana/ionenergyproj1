const upload = require('./routes/api/upload');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
var multer = require('multer');
var cors = require('cors');
const items = require('./routes/api/items');
const axios = require('axios');

const app=express();
app.use(cors());

app.use(bodyParser.json());

const db = require('./config/keys').mongoURI;
mongoose
    .connect(db)
    .then(() => console.log('MongoDB Connnected...'))
    .catch(err => console.log(err));

app.use('/api/items',items);

app.post('/', upload.single('file'), (req, res) => {
    const file = req.file; // file passed from client
    const meta = req.body; // all other values passed from the client, like name, etc..
    
    // send the data to our REST API
    axios.post({
       url: `http://localhost:5000/`,
       method: 'post',
       data: {
         file,
         name: meta.name,      
       },
     })
      .then(response => res.status(200).json(response.data.data))
      .catch((error) => res.status(500).json(error.response));
});

const port = process.env.PORT || 5000;

    app.listen(port,() => console.log(`server started on port ${port}`));