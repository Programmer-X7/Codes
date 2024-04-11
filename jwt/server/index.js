require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

const PORT = process.env.PORT || 5000;

const app = express();

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173", // Update with the actual client origin
    credentials: true, // Allow cookies to be sent with requests
  })
);

// MongoDB configuration
mongoose
  .connect("mongodb://localhost:27017/jwttutsdb")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

// Middleware function for verify JWT token
const verifyToken = (req, res, next) => {
  const token = req.cookies.jwtoken;
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = decoded; // Attach decoded user information to the request object
    next(); // Call next middleware
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }
};

// Endpoint configuration
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  const saltRounds = 12;

  try {
    bcrypt.hash(password, saltRounds, async (err, hashedPassword) => {
      if (err) {
        console.log("Hashing error: " + err);
      } else {
        await User.create({
          name,
          email,
          password: hashedPassword,
        })
          .then((result) => {
            res
              .status(201)
              .json({ success: true, message: "User registered successfully" });
          })
          .catch((err) => res.json(err));
      }
    });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while registering user",
    });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    await User.findOne({ email }).then((user) => {
      if (user) {
        bcrypt.compare(password, user.password, (err, result) => {
          if (err) {
            res.status(500).json({ message: "Internal Server Error!" });
          }

          if (result) {
            // Generate JWT token
            let payload = {
              userId: user._id,
              userName: user.name,
              userEmail: user.email,
            };
            let jwtsecretkey = process.env.JWT_SECRET_KEY;

            const token = jwt.sign(payload, jwtsecretkey);

            // Set the token in a cookie
            res.cookie("jwtoken", token, { maxAge: 900000 }); // don't use httponly: true because it will block the access of cookie by browser js

            res.status(200).send("Cookie set successfully.");
          } else {
            res.status(404).json({
              success: false,
              message: "Incorrect credentials",
            });
          }
        });
      } else {
        res.status(404).json({
          success: false,
          message: "User not found",
        });
      }
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error!" });
  }
});

app.get("/home", verifyToken, (req, res) => {
  res.status(200).json({
    success: true,
    message: "Access granted",
    user: req.user,
  });
});

// Server setup
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});
