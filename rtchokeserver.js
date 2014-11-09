var express = require('express')

var app = express();


// we start to listen to port 3000
app.set('port', process.env.PORT || 3000);


// we redirect the HTTP requests
app.use(function(req, res){
    res.status(404)
    res.type('text/plain')
    res.send('404')
});


app.use(function(req, res){
    console.error(err.stack)
    res.status(500)
    res.type('text/plain')
    res.send('500')
});


app.listen(app.get('port'), function(){
    console.log('RTChokeServer started on port' + app.get('port'));
});
