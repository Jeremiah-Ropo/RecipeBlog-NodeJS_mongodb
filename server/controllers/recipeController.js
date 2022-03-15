
//Get homepage
//Controller is more of where all router can be controlled.
exports.homepage = async(req, res) => {
    res.render('home', { title: 'Homepage'});
}