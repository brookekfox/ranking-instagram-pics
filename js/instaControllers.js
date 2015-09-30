//http://stackoverflow.com/questions/28687931/cannot-use-ng-repeat-with-a-json-from-ajax-call

angular.module("instagram", [])
.controller("InstagramController", ["$scope", function ($scope) {
  $scope.user = {
    handle: "",
    id: "",
    fullName: "",
    photos: []
  };

  $scope.sendInstaRequest = function(handle) {
    $scope.user.handle = handle;

    $.ajax({
      type: "GET",
      dataType: "jsonp",
      cache: false,
      url: "https://api.instagram.com/v1/users/search?access_token=184890229.1fb234f.8536822dba9e4fa198a10d45e434da91&q=" + $scope.user.handle,
      success: function (response) {
        $scope.user.id = response.data[0].id.toString();
        $scope.user.fullName = response.data[0].full_name;
        console.log($scope.user);

        $.ajax({
          type: "GET",
          dataType: "jsonp",
          cache: false,
          url: "https://api.instagram.com/v1/users/" + $scope.user.id +
          "/media/recent?access_token=184890229.1fb234f.8536822dba9e4fa198a10d45e434da91",
          success: function (response) {
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
          }
        });
      }
    });
  }

}]);