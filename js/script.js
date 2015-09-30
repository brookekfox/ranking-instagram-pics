////create children of the photos div to display the data from Instagram
//for (var n = 0; n < 20; n++) {
//  var box = document.createElement('div');
//  box.className = 'photo-container';
//  box.id = 'photo-container' + n;
//  var img = document.createElement('img');
//  img.src = '';
//  img.id = 'image' + n;
//  var cap = document.createElement('p');
//  cap.className = 'caption';
//  cap.id = 'caption' + n;
//  var likes = document.createElement('p');
//  likes.className = 'likes';
//  likes.id = 'likes' + n;
//  //each of the new elements should be a child of the 'box' div
//  box.appendChild(img);
//  box.appendChild(cap);
//  box.appendChild(likes);
//  //make each 'box' div a child of the photos div already established in the html
//  document.getElementById('photos').appendChild(box);
//}
//
//function sendInstaReq(handle) {
//  //initiate variables to store the user's photos and information
//  var photos = [];
//  var user = {
//    //grab the handle that was fed into the function sendInstaReq and store it in the user object
//    handle: handle
//  };
//
//  $.ajax({
//    //the first API call uses the handle/username to find the user's Instagram id
//    type: "GET",
//    dataType: "jsonp",
//    cache: false,
//    url: 'https://api.instagram.com/v1/users/search?access_token=184890229.1fb234f.8536822dba9e4fa198a10d45e434da91&q=' + user.handle,
//    success: function(response) {
//      //store the user's information in the user object
//      user.id = response.data[0].id.toString();
//      user.full_name = response.data[0].full_name;
//
//      $.ajax({
//        //second API call uses the Instagram id of the user to find all of the photos
//        type: "GET",
//        dataType: "jsonp",
//        cache: false,
//        url: 'https://api.instagram.com/v1/users/' + user.id +
//        '/media/recent?access_token=184890229.1fb234f.8536822dba9e4fa198a10d45e434da91',
//        success: function (response) {
//          //display the name of the user at the top, or, if no name, the user's handle
//          if (user.full_name != '') {
//            document.getElementById('username').innerHTML = user.full_name;
//          } else {
//            document.getElementById('username').innerHTML = user.handle;
//          }
//          //loop through the user's photos and push the info for each one (as an object) into the photos array
//          for (var i = 0; i < response.data.length; i++) {
//            photos.push(
//                {
//                  caption: response.data[i].caption,
//                  likes: response.data[i].likes.count,
//                  image: response.data[i].images.low_resolution.url
//                }
//            );
//          }
//
//          //sort the photos by number of likes, descending
//          photos = photos.sort(function (a, b) { return b.likes - a.likes });
//
//          //display the photos in the view
//          document.getElementById('photos').style.opacity = 1;
//          for (var j = 0; j < photos.length; j++) {
//            //var box = document.getElementById('photo-container' + j);
//            document.getElementById('image' + j).src = photos[j].image;
//            document.getElementById('caption' + j).innerHTML = photos[j].caption.text;
//            document.getElementById('likes' + j).innerHTML = photos[j].likes + '<br>likes';
//          }
//        }
//      });
//    }
//  });
//}
