var cool = require('cool-ascii-faces');
var mongoose = require('mongoose');
var express = require('express');
var app = express();


// let DBHost = 'localhost';//localhost
// let DBName = 'admin';//admin
// let DBUserName = 'admin';//admin
// let DBPassword = 'sdf*(^Rbt89p8wns9psd';//sdf*(^Rbt89p8wns9psd
//
// let connectURL = `mongodb://${DBUserName}:${DBPassword}@${DBHost}:27017/${DBName}`;
let connectURL = process.env.MONGODB_URI;

mongoose.connect(connectURL, err => {
    if (err) {
        if (typeof onError == 'function') {
            onError(err);
        }
        mongoose.connection.close();
        return null;
    }
    if (typeof onSuccess == 'function') {
        // onSuccess.call();
        console.log('mongoDB connected');
    }
});

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('pages/index')
});

app.get('/db', function(request, response) {
  response.render('pages/db', {results: [{id: 1, name: 'sdkhg'}]})
});

app.get('/cool', function(request, response) {
  response.send(cool()+ 'kavabango!' );
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
