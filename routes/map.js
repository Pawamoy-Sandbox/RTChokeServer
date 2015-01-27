module.exports = function(app){
    app.get('/map', function(req, res){
        res.render('map');
    });
};