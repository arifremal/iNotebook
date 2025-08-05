const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");

// create a user using POST "/api/auth"

router.post(
  "/",
  [
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Ennnnnter a valid email").isEmail(),

    body("password", "Password atleast 5 character").isLength({ min: 5 }),
  ],
  async (req, res) => {
    // if there are errors , return bad request

    console.log(req.body);
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).json({ errors: result.array() });
    }
    // check wherer the email with user alewadr exist
    try {

      let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).json({ error: "sorry user email already exist" });
    }
    user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });

    res.json({ user });
      
    } catch (error) {
      console.error(error.message)
      res.status(500).send("some error occured")
      
    }

    
  }
);

module.exports = router;
