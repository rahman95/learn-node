const mongoose = require("mongoose");
const Store = mongoose.model("Store");

module.exports = tag = {
  get: async (req, res) => {
    const currentTag = req.params.tag;
    const getTags = Store.getTagList();
    //return current tag or all stores with tags if not specified
    const getStores = Store.find({ tags: currentTag || {$exists: true} });
    const [tags, stores] = await Promise.all([getTags, getStores]);

    res.render("tags/index", { title: "Tags", tags, currentTag, stores });
  }
}