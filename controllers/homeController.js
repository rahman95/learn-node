module.exports = homeController = {
  index: (req, res) => {
    res.render('index', {
      title: 'Home'
    });
  }
}