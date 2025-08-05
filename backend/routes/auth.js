const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
var fetchUser = require("../middleware/fetchUser");

const JWT_SECRET = "arifisabadboy$$";

// Route 1: create a user using POST "/api/auth"

router.post(
  "/createuser",
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
        return res
          .status(400)
          .json({ error: "sorry user email already exist" });
      }
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);
      // create a new user
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });
      const data = {
        user: {
          id: user.id,
        },
      };
      const auuthToken = jwt.sign(data, JWT_SECRET);

      res.json({ auuthToken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("some error occured");
    }
  }
);

// Route :2 authenticate use using POST : "/api/login :login not required"

router.post(
  "/login",
  [
    body("email", "Ennnnnter a valid email").isEmail(),
    body("password", "pas can't be blank").exists(),
  ],
  async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).json({ errors: result.array() });
    }

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ error: "please login with corrrect credentials" });
      }
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res
          .status(400)
          .json({ error: "please login with corrrect credentials" });
      }

      const data = {
        user: {
          id: user.id,
        },
      };
      const auuthToken = jwt.sign(data, JWT_SECRET);

      res.json({ auuthToken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internel server error");
    }
  }
);

// Route 3 : get login user details using POST : "/api/getuser login required

router.post("/getuser",fetchUser, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user)
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internel server error");
  }
});

module.exports = router;
