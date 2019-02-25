const mongoose = require("mongoose");
const Store = mongoose.model("Store");

module.exports = map = {
  index: (req, res) => {
    res.render("map/index", { title: "Map" });
  }
}