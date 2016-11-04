  var express         = require('express');
  var app             = express();
  var bodyParser      = require('body-parser');
 var fs               = require('fs');
 var http             = require('http');
 var sox              = require('sox');
// var wav = require('wav');
// var Speaker = require('speaker');
// var wav = require('node-wav');

  //WATSON API 
  var watson = require('watson-developer-cloud');
  var personality_insights = watson.personality_insights({
    "url": "https://gateway.watsonplatform.net/personality-insights/api",
  username: '5b0aabb6-9d96-4e5f-921f-944f727568fb',
  password: 'yAAPhKgahsCo',
  version: 'v2'
  });

  //WATSON RECOGNITION 
   var visual_recognition = watson.visual_recognition({
       api_key: "28871ae9425713c49b2c8106dad1c9474b4c488e",
       version: 'v3',
       version_date: '2016-05-19'
   });
  //WATSON SPEECH
   var text_to_speech = watson.text_to_speech({
    username: '566444fa-4593-45bc-a391-5ae0332cab2c',
    password: 'UwNFwocEzMDo',
    version: 'v1'
  });

 

  

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


//Image recognition
app.post('/recognition', function (req, res) {
 //Header Initialize
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5000/');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Content-Type', 'application/json');

  var params = {
    images_file: fs.createReadStream('./www/img/'+req.body.information)
  };
  visual_recognition.classify(params, function(err, response) {
    if (err)
      console.log(err);
    else
       res.send(JSON.stringify(response, null, 2));
      // console.log(JSON.stringify(response, null, 2));
  });
});





app.post('/textspeech', function (req, res) {
 //Header Initialize
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5000/');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Content-Type', 'application/json');

  var params = {
    text: req.body.information ,
    voice: 'en-US_MichaelVoice', // Optional voice 
    accept: 'audio/wav;rate=16000'
  };
  // Pipe the synthesized text to a file 
  fs.unlink('./www/audio/output.wav',function(val){
    console.log(val);
  });
 var talk = text_to_speech.synthesize(params).pipe(fs.createWriteStream('./www/audio/output.wav'));

  res.send(talk);    
});




//personal insights
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
          // console.log(JSON.stringify(response, null, 2));
    });
  
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
    res.send(JSON.stringify(data));
    });

});
app.set('port', process.env.PORT || 5000);
app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});