  var express = require('express');
  var app = express();
  var mongoose = require('mongoose');
    var bodyParser = require('body-parser');

  var uri = "mongodb://admin:admin@ds019078.mlab.com:19078/theph";
  //Watson personality insight api
  var watson = require('watson-developer-cloud');
  var personality_insights = watson.personality_insights({
  username: '5b0aabb6-9d96-4e5f-921f-944f727568fb',
  password: 'yAAPhKgahsCo',
  version: 'v2'
});
  
  var db  = mongoose.connect(uri);
  db = mongoose.createConnection(uri);
  Schema = mongoose.Schema;

  var adminLogin  = new Schema({
    username: String,
    password: String}, 
	{collection: 'presidential'});
  var adminLoginModel = mongoose.model('adminLogin', adminLogin);
  var adminLogin = mongoose.model("adminLogin");

app.use(express.static('www'));
  app.use(bodyParser.json());
  app.use( bodyParser.urlencoded({ extended: true }));

// CORS (Cross-Origin Resource Sharing) headers to support Cross-site HTTP requests
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
        res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});


app.post('/platform', function (req, res) {
 //Header Initialize
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5000/');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
         res.setHeader('Content-Type', 'application/json');
	//GET Format wavecell
	personality_insights.profile({
		  text: req.body.information,
		  language: 'en' },
		  function (err, response) {
		    if (err)
		      console.log('error:', err);
		    else
		    	 res.send(response);
		      console.log(JSON.stringify(response, null, 2));
		});

console.log(req.body);


});
app.get('/data', function (req, res) {
 //Header Initialize

    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5000/');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
         res.setHeader('Content-Type', 'application/json');
	//GET Format wavecell
	 adminLogin .find({}, function(err, data){
        // console.log(">>>> " + data );

         // res.status(200).send( data);

    res.send(JSON.stringify(data));
    });

});
app.set('port', process.env.PORT || 5000);
app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});