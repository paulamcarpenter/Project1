  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBOm4gAAOfNNTvUydkkyw4Eu-mw-vBnDfY",
    authDomain: "project1-55512.firebaseapp.com",
    databaseURL: "https://project1-55512.firebaseio.com",
    projectId: "project1-55512",
    storageBucket: "project1-55512.appspot.com",
    messagingSenderId: "708182834951"
  };
  firebase.initializeApp(config);


 // Create a variable to reference the database
    var database = firebase.database();

    // Initial Values for Calendar functionality
    var name = "";
    var email = "";
    var phone = 0;
    var date = 0;
    var time = 0;

    // Moment.js variables to be used for timing of appointments
    // var randomDate = "02/23/1999";
    // var randomFormat = "MM/DD/YYYY";
    // var convertedDate = moment(randomDate, randomFormat);

    // Capture Button Click
    $("#addUser").on("click", function() {
      // Don't refresh the page!
      // event.preventDefault();
      // Code in the logic for storing and retrieving the most recent user.
      name = $("#nameInput").val().trim();
      email = $("#emailInput").val().trim();
      phone = $("#phoneInput").val().trim();
      date = $("#dateInput").val().trim();
      time = $("#timeInput").val().trim();

      database.ref().push({
        name: name,
        email: email,
        phone: phone,
        date: date,
        time: time
      });

    });

    // Firebase watcher + initial loader HINT: .on("value")
    database.ref().on("child_added",function(snapshot) {

      // Change the HTML to reflect.  Not sure if html or append or prepend here.
      $("#nameDisplay").html(snapshot.val().name);
      $("#destDisplay").html(snapshot.val().dest);
      $("#nextDisplay").html(snapshot.val().next);
      $("#freqDisplay").html(snapshot.val().freq);

      // Log everything that's coming out of snapshot
      console.log(snapshot.val());
      console.log(snapshot.val().name);
      console.log(snapshot.val().dest);
      console.log(snapshot.val().next);
      console.log(snapshot.val().freq);

      // Add customer to both database list and send email confirmation () Not sure if html or append or prepend here.
      $("#full-member-list").append("<tr><td ='name'> " + snapshot.val().name 
        + " </tr><td ='dest'> " + snapshot.val().dest
        + " </tr><td ='next'> " + snapshot.val().next 
        + " </tr><td ='freq'> " + snapshot.val().freq + " </tr>");


      // Handle the errors
    }, function(errorObject) {
         console.log("Errors handled: " + errorObject.code);
       });
  


