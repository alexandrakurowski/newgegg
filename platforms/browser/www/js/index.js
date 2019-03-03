console.log("hellogegg");

// var app = {
//     // Application Constructor
//     initialize: function() {
//         document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
//     },

//     // deviceready Event Handler
//     //
//     // Bind any cordova events here. Common events are:
//     // 'pause', 'resume', etc.
//     onDeviceReady: function() {
//         this.receivedEvent('deviceready');
//     },

//     // Update DOM on a Received Event
//     receivedEvent: function(id) {
//         var parentElement = document.getElementById(id);
//         var listeningElement = parentElement.querySelector('.listening');
//         var receivedElement = parentElement.querySelector('.received');

//         listeningElement.setAttribute('style', 'display:none;');
//         receivedElement.setAttribute('style', 'display:block;');

//         console.log('Received Event: ' + id);
//     }
// };

// app.initialize();

function w3_open() {
    document.getElementById("main").style.marginLeft = "25%";
    document.getElementById("mySidebar").style.width = "25%";
    document.getElementById("mySidebar").style.display = "block";
    document.getElementById("openNav").style.display = 'none';
}
function w3_close() {
    document.getElementById("main").style.marginLeft = "0%";
    document.getElementById("mySidebar").style.display = "none";
    document.getElementById("openNav").style.display = "inline-block";
}

/*****************************************************************************************************************************************************************************************************************************************************************
|
|    ALL THE FUNCTIONS TO GET AND INITIALIZE THE MAP with leaflet
 *******************************************************************************
 */

// console.log("hello mymapleaflet");

// //AUCH MAP INTIALIZING [lat, long, zoomsize]
// var mymap = L.map('mapid').setView([0, 586709, 43, 64638], 13);

// // ACCESS TOKEN MAPBOX AND NAME OF THE MAP

// L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
//     attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
//     maxZoom: 18,
//     id: 'mapbox.streets',
//     accessToken: 'pk.eyJ1Ijoia2FjcmVhdGlvbiIsImEiOiJjanJrczE4cDIwMHhzNDVtcDhzdTRraGRvIn0.5fEOyjYgkK_BrlPPp2xJXg'
// }).addTo(mymap);

/* Map with MAPBOX ************************************************
*/

mapboxgl.accessToken = 'pk.eyJ1Ijoia2FjcmVhdGlvbiIsImEiOiJjanJrczE4cDIwMHhzNDVtcDhzdTRraGRvIn0.5fEOyjYgkK_BrlPPp2xJXg';
var map = new mapboxgl.Map({
    container: 'map', // container id
    style: 'mapbox://styles/mapbox/streets-v9', // stylesheet location
    center: [43, 64638, 0, 586709], // starting position [lng, lat]
    zoom: 9 // starting zoom
});



