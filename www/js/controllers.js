angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope,thephService) {
$scope.Math = window.Math;
  $scope.pushInformation = function(result){
    var data = {'information':result};
    thephService.platform(data).then(function(result){
      $scope.data = result.data;
      var textModifier = result.data.tree.children[0].children[0].children;
      var words = "Image analyzation completed classified in  "+textModifier.length+" categories.";
         for (var i = textModifier.length - 1; i >= 0; i--) {
            if(textModifier.length != 0){
                words += " Its has ";
            }
            words += ""+textModifier[i].name +" "+Math.round(100 * textModifier[i].percentage) + " percent";
            if(i != 0){
              words += ", ";
            } 
     };
     words+= ".";
      $scope.message = words;

       var data = {'information':words};
        thephService.talk(data).then(function(result){
        var vid = document.getElementById("playerAudio");
        vid.src = "";
        vid.load();

        setTimeout(function(){
          vid.src = "../audio/output.wav";
          vid.load();
          vid.play();
        }, 5000);
       
        // $scope.audio = ngAudio.load("../audio/output.wav"); 
        // $scope.audio.play();
      });
    });
  };
      

})


.controller('AnalyzeCtrl', function($scope,$cordovaCamera,thephService,ngAudio) {
   $scope.analyze = "Please select and analyze a photo."
   $scope.takephoto = function(){
      document.addEventListener("deviceready", function () {
      var options = {
        destinationType: Camera.DestinationType.FILE_URI,
        sourceType: Camera.PictureSourceType.CAMERA,
      };

      $cordovaCamera.getPicture(options).then(function(imageURI) {
        var image = document.getElementById('myImage');
        image.src = imageURI;
      }, function(err) {
        // error
      });
      $cordovaCamera.cleanup().then(function(result){
      },function(err){

      }); // only for FILE_URI
    }, false);

   }


   $scope.analyzephoto = function(result){
    var data = {'information':result};
    thephService.analyze(data).then(function(result){
      var textModifier = result.data.images[0].classifiers[0].classes;
      var words = "Image analyzation completed classified in  "+textModifier.length+" categories.";
    
      for (var i = textModifier.length - 1; i >= 0; i--) {
            if(textModifier.length != 0){
                words += " Its has ";
            }
            var text = textModifier[i].class;
            words += ""+text +"";
            if(i != 0){
              words += ", ";
            } 
     };
     words+= ".";
      $scope.message = words;

       var data = {'information':words};
       //Read the Audio Made
      thephService.talk(data).then(function(result){
        var vid = document.getElementById("playerAudio");
        vid.src = "";
        vid.load();

        setTimeout(function(){
          vid.src = "../audio/output.wav";
          vid.load();
          vid.play();
        }, 5000);
       
        // $scope.audio = ngAudio.load("../audio/output.wav"); 
        // $scope.audio.play();
      });
    });
  };
});
