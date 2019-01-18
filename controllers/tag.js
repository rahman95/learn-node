const mongoose = require("mongoose");
const Store = mongoose.model("Store");

module.exports = tag = {
  get: async (req, res) => {
    const currentTag = req.params.tag;
    const tags = await Store.getTagList();

    res.render("tags/index", { title: "Tags", tags, currentTag });
  }
}