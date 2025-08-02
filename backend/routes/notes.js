const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  const obj = {  // Added 'const' declaration
    a: "arif",
    number: 323,
  };
  res.json(obj);
});
module.exports = router;