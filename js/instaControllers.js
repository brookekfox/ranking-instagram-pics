angular.module("instagram", [])
.controller("InstagramController", ["$scope", "RequestService", function ($scope, RequestService) {
  $scope.user = {
    handle: "",
    id: "",
    photos: []
  };

  $scope.sendInstaRequest = function(handle) {
    RequestService.fetch(handle).then(function(response) {
      $scope.user.handle = handle;
      $scope.user.photos = [];
      for (var i = 0; i < response.data.length; i++) {
        $scope.user.photos[i] = {
          caption: response.data[i].caption,
          likes: response.data[i].likes.count,
          image: response.data[i].images.low_resolution.url
        }
      }
      $scope.user.photos = $scope.user.photos.sort(function (a, b) {
        return b.likes - a.likes;
      });
    });
  }
}])
.factory("RequestService", ["$http", "$q", function($http, $q){
  return {
    fetch: function(handle) {
      var defer = $q.defer();
      var user = {
        handle: handle,
        id: ""
      };
      $.ajax({
        type: "GET",
        dataType: "jsonp",
        cache: false,
        url: "https://api.instagram.com/v1/users/search?access_token=184890229.1fb234f.8536822dba9e4fa198a10d45e434da91&q=" + user.handle,
        success: function (response) {
          user.id = response.data[0].id.toString();

          $.ajax({
            type: "GET",
            dataType: "jsonp",
            cache: false,
            url: "https://api.instagram.com/v1/users/" + user.id + "/media/recent?access_token=184890229.1fb234f.8536822dba9e4fa198a10d45e434da91",
            success: function (response) {
              defer.resolve(response);
            }
          });
        }
      });
      return defer.promise;
    }
  }
}]);