module.exports = store = {
  add: (req, res) => {
    res.render('editStore', {
      title: 'Add Store'
    });
  }
}