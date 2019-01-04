module.exports = home = {
  index: (req, res) => {
    res.render('index', {
      title: 'Home'
    });
  }
}