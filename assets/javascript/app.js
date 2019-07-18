 

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
  var fbProject;

  console.log(firebase);
  if (!firebase.apps.length) {
    fbProject = firebase.initializeApp(firebaseConfig);
  }
  //var fbProject = firebase.initializeApp(firebaseConfig);
  console.log("Post init");
  console.log("project name : "+ fbProject.name);

  var database = firebase.database();
 
  var location
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