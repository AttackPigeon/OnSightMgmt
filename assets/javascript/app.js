// Jenn Stuart, Chi Njoku, Arthur Spence, Ron Becker
// Project 1
// UTexas PTF Coding 2019

console.log("connected");

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyDBx5u4rSdOw4OV1mom78WhUzNtnkLBiRA",
    authDomain: "onsight-app-2ace8.firebaseapp.com",
    databaseURL: "https://onsight-app-2ace8.firebaseio.com",
    projectId: "onsight-app-2ace8",
    storageBucket: "",
    messagingSenderId: "693732910068",
    appId: "1:693732910068:web:37dbf37636631e78"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  var fbProject;

  // console.log(firebase);
  // if (!firebase.length) {
  //   var fbProject = firebase.initializeApp(firebaseConfig);
  // }
  //var fbProject = firebase.initializeApp(firebaseConfig);
  console.log("Post init");
  // console.log("project name : "+ fbProject.name());

  var database = firebase.database();
 
  var location;
  var map;

  function createMap() {
    map = new google.maps.Map(document.getElementById('map'), {
      zoom: 2,
      center: new google.maps.LatLng(2.8,-187.3),
      mapTypeId: 'terrain'

      
    });

  }

  function initMap() {
    if (!document.getElementById('map')) return;
    var mapOptions = {
      center: {lat: location.lat, lng: location.lng},
      zoom: 8,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    //map = new google.maps.Map(document.getElementById('map'));
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
  }
  // function intiMap(){
  //   alert("ok");


//   catch{("err")}

   window.eqfeed_callback = function(results) {
        for (var i = 0; i < results.features.length; i++) {
          var coords = results.features[i].geometry.coordinates;
          var latLng = new google.maps.LatLng(coords[1],coords[0]);
          var marker = new google.maps.Marker({
            position: latLng,
            map: map
          });
        }
      }

// please add the reference to the function below to the strt button in the index.html file"

function onClockIn(){

      var queryURL = "https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyDqL2RAG8axVVbnqeTNo_w0Lijcbzy_bb4";
  
      $.ajax({
          url: queryURL,
          method: "POST"
      }).done(function (response) {
          console.log(response);
          var location = response.location;
         
          database.ref('/location').push(location);
          // console.log(database.ref('/location').on());
      });
};

// Code for timer begin-Jenn
// code will run as soon as the page loads
window.onload = function() {
  
  $("#stop").on("click", stop);
  $("#reset").on("click", reset);
  $("#start").on("click", start);
};

//  Variable that will hold our setInterval that runs the timer
var intervalId;
// prevents the clock from being sped up unnecessarily
var clockRunning = false;
var time = 0;

// Functions:

// Reset
function reset() {
  time = 0;
  $("#display").text("00:00");
}
// Start
function start() {
  if (!clockRunning) {
    intervalId = setInterval(count, 1000);
    clockRunning = true;
  }
}
// Stop
function stop() {
  clearInterval(intervalId);
  clockRunning = false;
}
// Count
function count() {
  time++;

  var converted = timeConverter(time);
  
  console.log(converted);
  $("#display").text(converted);
}
// Convert 
function timeConverter(t) {

  var minutes = Math.floor(t / 60);
  var seconds = t - (minutes * 60);

  if (seconds < 10) {
    seconds = "0" + seconds;
  }
  if (minutes === 0) {
    minutes = "00";
  }
  else if (minutes < 10) {
    minutes = "0" + minutes;
  }
  return minutes + ":" + seconds;
}
// Code for timer end-Jenn