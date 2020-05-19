const express = require("express"),
    router = express.Router();

router.get("*", (req, res) => {
    res.send(`
  <b>Smartzy API for smart home automation. </b>
  `);
});

module.exports = router;