// $(document).ready(function() {
// Calendar app that has pop up box using modal asking for thier email.  Email is saved in Firebase.
// Once day is clicked they have to enter it pulls/calls the Eventful API and displays events 
// for that day and then both Yelp and Google Maps are there for them to use.


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

// USE PROMPT TO GET EMAIL AND SAVE TO FIREBASE-NEED TO CONNECT TO FIREBASE
// var email = prompt("Please enter your email to get Events", "");
// if (email == null || email == "") {
//     txt = alert("User cancelled the prompt");
// } else {
//     txt = alert("Thank you!  Here are your Events!");
// }


// OR USE SUBMIT FORM BELOW TO GET EMAIL AND SAVE TO FIREBASE-***********************************************************

// OR USE EMAIL SUBMIT FORM TO SAVE TO FIREBASE*********************************************************************


  var vanillacalendar = {
    month: document.querySelectorAll('[data-calendar-area="month"]')[0],
    next: document.querySelectorAll('[data-calendar-toggle="next"]')[0],
    previous: document.querySelectorAll('[data-calendar-toggle="previous"]')[0],
    label: document.querySelectorAll('[data-calendar-label="month"]')[0],
    activeDates: null,
    date: new Date(),
    todaysDate: new Date(),

    init: function () {
      this.date.setDate(1)
      this.createMonth()
      this.createListeners()
    },

    createListeners: function () {
      var _this = this
      this.next.addEventListener('click', function () {
        _this.clearCalendar()
        var nextMonth = _this.date.getMonth() + 1
        _this.date.setMonth(nextMonth)
        _this.createMonth()
      })
      // Clears the calendar and shows the previous month
      this.previous.addEventListener('click', function () {
        _this.clearCalendar()
        var prevMonth = _this.date.getMonth() - 1
        _this.date.setMonth(prevMonth)
        _this.createMonth()
      })
    },

    createDay: function (num, day, year) {
      var newDay = document.createElement('div')
      var dateEl = document.createElement('span')
      dateEl.innerHTML = num
      newDay.className = 'cal__date'
      newDay.setAttribute('data-calendar-date', this.date)

      if (num === 1) {
        var offset = ((day - 1) * 14.28)
        if (offset > 0) {
          newDay.style.marginLeft = offset + '%'
        }
      }

      if (this.date.getTime() <= this.todaysDate.getTime() - 1) {
        newDay.classList.add('cal__date--disabled')
      } else {
        newDay.classList.add('cal__date--active')
        newDay.setAttribute('data-calendar-status', 'active')
      }

      if (this.date.toString() === this.todaysDate.toString()) {
        newDay.classList.add('cal__date--today')
      }

      newDay.appendChild(dateEl)
      this.month.appendChild(newDay)
    },

    dateClicked: function () {
      var _this = this
      this.activeDates = document.querySelectorAll('[data-calendar-status="active"]')
      for (var i = 0; i < this.activeDates.length; i++) {
        this.activeDates[i].addEventListener('click', function (event) {
          var picked = document.querySelectorAll('[data-calendar-label="picked"]')[0]
          picked.innerHTML = this.dataset.calendarDate
          _this.removeActiveClass()
          this.classList.add('cal__date--selected')
          })
       }
    },

    createMonth: function () {
      var currentMonth = this.date.getMonth()
      while (this.date.getMonth() === currentMonth) {
        this.createDay(this.date.getDate(), this.date.getDay(), this.date.getFullYear())
        this.date.setDate(this.date.getDate() + 1)
      }
      // while loop trips over and day is at 30/31, bring it back
      this.date.setDate(1)
      this.date.setMonth(this.date.getMonth() - 1)

      this.label.innerHTML = this.monthsAsString(this.date.getMonth()) + ' ' + this.date.getFullYear()
      this.dateClicked()
    },

    monthsAsString: function (monthIndex) {
      return [
        'January',
        'Febuary',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
      ][monthIndex]
    },

    clearCalendar: function () {
      vanillacalendar.month.innerHTML = ''
    },

    removeActiveClass: function () {
      for (var i = 0; i < this.activeDates.length; i++) {
        this.activeDates[i].classList.remove('cal__date--selected')
      }
    }
  }


var email = "";

// Capture Button Click
$("#add-user").on("click", function(event) {
  event.preventDefault();
  email = $("#email-input").val().trim();

  database.ref().push({
    email: email,
    dateAdded: firebase.database.ServerValue.TIMESTAMP
  });

});

// Firebase watcher + initial loader + order/limit HINT: .on("child_added"
database.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function(snapshot) {
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

// Link to Eventful API:
function show_alert()
{
  var oArgs = {
            app_key:"YOUR APP KEY",
            id: "20218701",
            page_size: 1,
  };

  EVDB.API.call("/events/get", oArgs, function(oData) {
      // Note: this relies on the custom toString() methods below
    });
}

function show_alert2()
{
   var oArgs = {
      app_key: "R9BTG2GgMpZQC9jk",
      q: "music",
      where: "Phoenix", 
      "date": "2017121000-2018062000",
      page_size: 5,
      sort_order: "popularity",
   };

   EVDB.API.call("/events/search", oArgs, function(oData) {
      // Note: this relies on the custom toString() methods below
    });
}

// /Run Sample api search 
// <input type="demo-picked" onclick="show_alert()" value="Query #1 " /> <br>



