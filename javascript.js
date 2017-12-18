
var config = {
 apiKey: "AIzaSyBH0UC7olo9ACFcMrX9vOW-scqTXmjft7c",
 authDomain: "calendar-3648a.firebaseapp.com",
 databaseURL: "https://calendar-3648a.firebaseio.com",
 projectId: "calendar-3648a",
 storageBucket: "calendar-3648a.appspot.com",
 messagingSenderId: "980862729484"
};

firebase.initializeApp(config);


 // Create a variable to reference the database
var database = firebase.database();  

// Link to Google Maps API:
  var map;
  function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 33.448376, lng: -112.074036},
      zoom: 5
    });
  }
  
// Trying to get email validated:
var email = "";
// var re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

 // / Capture Button Click
$("#add-user").on("click", function(event) {
  event.preventDefault();
  email = $("#email-input").val().trim();


  database.ref().push({
    email: email,
    dateAdded: firebase.database.ServerValue.TIMESTAMP
  });


});


// Firebase watcher + initial loader + order/limit HINT: .on("child_added"
database.ref().orderByChild("dateAdded").limitToLast(10).on("child_added", function(snapshot) {
  // storing the snapshot.val() in a variable for convenience
  var sv = snapshot.val();

  // Console.loging the last user's data
  console.log(sv.email);

  // Change the HTML to reflect
  $("#email-display").text(sv.email);

  // Handle the errors
}, function(errorObject) {
  console.log("Errors handled: " + errorObject.code);
});

// <!--Map variable with starting coordinates lat/lon-->
var mymap = L.map('mapid').setView([42.50, 12.50], 2);

      L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
          attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
          maxZoom: 18,
          id: 'mapbox.streets',
          accessToken: 'pk.eyJ1IjoibWFkbWF4LTEyMyIsImEiOiJjamI4d2RlaDMwYXY0MzRwZTNwYXljeDd2In0.GU1kf4Tq2gwooH2qrz1ZvQ'
      }).addTo(mymap);

      var popup = L.popup();

      function onMapClick(e) {
          popup
              .setLatLng(e.latlng)
              .setContent("You clicked the map at " + e.latlng.toString())
              .openOn(mymap);
      }            


    



