const mongoose = require("mongoose");
const Review = mongoose.model("Review");

module.exports = review = {
  submit: async (req, res) => {
    req.body.author = req.user._id;
    req.body.store = req.params.id;
    await new Review(req.body).save();
    req.flash("success", "Succuessfully added your review");
    res.redirect("back");
  }
}