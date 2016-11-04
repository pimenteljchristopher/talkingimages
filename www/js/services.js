angular.module('starter.services', [])
.service('thephService', function($http) {

   var presidential = [];
    this.getPresidential = function(result){
       return $http({
        method: 'GET',
        url: '/data'
      }).then(function successCallback(response) {
         console.log(response);
         return response.data;
        }, function errorCallback(response) {
          console.log(response);
        });      
    };

    this.platform = function(result){
   console.log(result);
       return $http.post('http://localhost:5000/platform',result).success(function(data) {
              return data.data;
           
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
      
    };

    this.analyze = function(result){
   console.log(result);
       return $http.post('http://localhost:5000/recognition',result).success(function(data) {
              return data.data;
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };
    this.talk = function(result){
   console.log(result);
       return $http.post('http://localhost:5000/textspeech',result).success(function(data){
        return data;
       });
    };
    this.rememberPresidential = function(json){
      console.log(json);
      presidential =json;
    }
    this.choosenPresidential = function(){
      return presidential;
    }

   

})
.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'img/ben.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'img/max.png'
  }, {
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'img/adam.jpg'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'img/perry.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'img/mike.png'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
});
