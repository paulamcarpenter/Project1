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
 // Capture Button Click
$("#add-user").on("click", function(event) {

  event.preventDefault();
  var email = $("#email-input").val().trim();
    console.log(validateEmail(email));

    if(validateEmail(email)) {
      database.ref().push({
        email: email,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
      });   
    } else {         
      $("#error_message").show().html("INVALID EMAIL ADDRESS! PLEASE RESUBMIT!");
      setTimeout(function() {
        $('#error_message').fadeOut("slow");
      }, 2000 );
    }
});

function validateEmail(email) {
  var re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  return re.test(email);
}

// Firebase watcher + initial loader + order/limit HINT: .on("child_added"
database.ref().orderByChild("dateAdded").limitToLast(10).on("child_added", function(snapshot) {
  // storing the snapshot.val() in a variable for convenience
  var sv = snapshot.val();
  $('#success_message').fadeIn().html("THANK YOU! CHECK YOUR EMAIL JANUARY 1ST TO SEE IF YOU'VE WON!");
  setTimeout(function() {
    $('#success_message').fadeOut("slow");
  }, 2000 );


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
          id: 'mapbox.satellite',
          accessToken: 'pk.eyJ1IjoibWFkbWF4LTEyMyIsImEiOiJjamI4d2RlaDMwYXY0MzRwZTNwYXljeDd2In0.GU1kf4Tq2gwooH2qrz1ZvQ'
      }).addTo(mymap);

      function onMapClick(e) {
        alert("You clicked the map at " + e.latlng);
      }

      mymap.on('click', onMapClick);  

var queryURL = 'http://api.open-notify.org/astros.json';

// Performing an AJAX request with the queryURL
$.ajax({
    url: queryURL,
    method: "GET"
})
.done(function(response) {
    //console.log(response.people[0].name);
    
    for (var person of response.people) {
        $('#peeps').append('<li>Name: '+ (person.name) + '</li>');
    }
});

    



