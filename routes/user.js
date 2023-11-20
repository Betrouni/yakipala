const express = require("express");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const router = express.Router();

// Enregistrement d'un nouvel utilisateur
router.post("/register", async (req, res) => {
  console.log("Attempting to register a new user with email:", req.body.email);

  try {
    // Vérifier si l'utilisateur existe déjà
    console.log("Checking if the user already exists...");
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      console.log("User already exists with email:", req.body.email);
      return res.status(400).send({ message: "Email already exists" });
    }

    // Création d'un nouvel utilisateur
    console.log("Creating a new user...");
    const user = new User(req.body);
    await user.save();
    console.log("User created successfully:", user);
    res.status(201).send({ message: "User created successfully", user });
  } catch (error) {
    console.error("Error in /register route:", error);
    res.status(500).send(error);
  }
});

module.exports = router;

// Authentification d'un utilisateur (exemple)
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!is.match) {
      return res.status(400).send({ message: "Invalid credentials" });
    }

    res.send({ message: "Logged in successfully", user });
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
