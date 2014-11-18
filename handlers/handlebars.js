module.exports = function(app){

    var handlebars = require('express3-handlebars').create({
        defaultLayout: 'main',
        helpers: {
            // allow us to use some kind of inheritance
            section: function(name, options){
                if(!this._sections) this._sections = {};
                this._sections[name] = options.fn(this);
                return null;
            }
        }
    });

    app.engine('handlebars', handlebars.engine);
    app.set('view engine', 'handlebars');

};
