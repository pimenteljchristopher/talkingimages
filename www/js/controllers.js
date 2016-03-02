angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope,thephService) {
$scope.Math = window.Math;
  $scope.pushInformation = function(result){
    var data = {'information':result};
    console.log(data);
    thephService.platform(data).then(function(result){
      console.log(result.data);
      $scope.data = result.data;
    });
  };
      

})

.controller('ChatsCtrl', function($scope, Chats,thephService,$state) {

  thephService.getPresidential().then(function(result){
 $scope.chats = result;
  console.log(result);
  });

  $scope.goVisit = function(json){
    thephService.rememberPresidential(json);
    $state.go('tab.chat-detail');
  }

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

 
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats,thephService) {
  // $scope.chat = Chats.get($stateParams.chatId);

  $scope.chat = thephService.choosenPresidential();
  console.log($scope.chat);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
