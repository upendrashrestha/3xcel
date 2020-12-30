const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');


require('dotenv').config();

const bodyParser = require("body-parser");

const app = express();
// Bodyparser middleware
app.use(
    bodyParser.urlencoded({
      extended: false
    })
  );
  app.use(bodyParser.json());
  // DB Config
const db_uri = require("./config/keys").mongoURI;
app.use(cors());
// Routes
const usersRoute = require("./routes/api/users");
const adminRoute = require('./routes/api/admin');
const productRoute = require('./routes/api/product');
const questionRoute = require('./routes/api/question');
const mailRoute = require('./routes/api/email');

app.use("/api/users", usersRoute);
app.use('/api/admin',adminRoute);
app.use('/api/product', productRoute);
app.use('/api/question', questionRoute);
app.use('/api/email', mailRoute);

app.use(express.urlencoded({ extended: false }));
app.use('/static', express.static(path.join(`${__dirname}/public`)));
const passport = require("passport");
require("./config/passport")(passport);
app.use(passport.initialize());


const port = process.env.PORT || 8078;

app.listen(port,()=>{
    console.log(`Server is running on port: ${port}`);
});

mongoose.connect(db_uri, { useNewUrlParser: true, useUnifiedTopology :true }).then(()=>{console.log("MongoDB connected...")}).catch(err=>{console.log("Error: ",err)});
