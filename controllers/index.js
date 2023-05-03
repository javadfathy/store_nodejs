
module.exports.getHome = (req, res) => {
    res.render('front/index', {
        pageTitle: 'Home',
    })
}