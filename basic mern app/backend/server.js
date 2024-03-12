require("dotenv").config();
const express = require("express");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const cors = require("cors");
const User = require("./Models/userModel");

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

// MongoDB connection
mongoose.connect("mongodb://localhost:27017/mern-website-db");

// Routes
app.post("/signup", async (req, res) => {
  const { name, email, password, phoneNo } = req.body;

  const saltRound = 12;

  try {
    bcrypt.hash(password, saltRound, async (err, hashedPassword) => {
      if (err) {
        console.log("Hashing Error!");
      } else {
        await User.create({
          name,
          email,
          password: hashedPassword,
          phoneNo,
        })
          .then((result) => res.json(result))
          .catch((err) => res.json(err));
      }
    });
  } catch (err) {
    res.json(err);
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    User.findOne({ email: email })
      .then((user) => {
        if (user) {
          bcrypt.compare(password, user.password, (err, result) => {
            if (err) {
              console.log("error in compairing passwords in /login: ", err);
              res.status(500).json({message: "Internal Server Error"})
            } else {
              if (result) {
                res.json("Success");
              } else {
                res.status(401).json( {message: "Incorrect Credencials."});
              }
            }
          });
        } else {
          res.status(404).json({ message: "User Not Exist!" });
        }
      })
      .catch((err) => res.status(500).json( {message: "Internal Server Error!"}));
  } catch (error) {
    res.status(500).json( {message: "Internal Server Error!"});
  }
});

// Server Setup
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
