exports.home = (req, res, next) => {
    res.render('index', { title: 'Express' });
}
exports.test = (req, res) => {
    console.log('this is a test');

}



