var express = require('express');
var bodyParser = require('body-parser');

var path = require('path')

var app = express();

app.use(express.static(path.join(__dirname,'./client/dist')));

app.use(bodyParser.urlencoded({extends: true}));

app.use(bodyParser.json());

require('./server/config/mongoose.js');

require('./server/config/routes.js')(app);



app.listen(8000,function(){
  console.log("App is running on port 8000!");
})
