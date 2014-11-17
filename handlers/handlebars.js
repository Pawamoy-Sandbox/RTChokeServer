module.exports = function(app){

    var handlebars = require('express3-handlebars')
            .create({ defaultLayout: 'main'});

    app.engine('handlebars', handlebars.engine);
    app.set('view engine', 'handlebars');

};
