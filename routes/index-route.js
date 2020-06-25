const router = require("express").Router();

router.get("/", (req, res, next) => {
  res.render("index", {
    title: "SA:MP RolePlay Server"
  });
});

module.exports = router;