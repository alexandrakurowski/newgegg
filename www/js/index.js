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

/* ******************** Map with MAPBOX ************************************************
*/

mapboxgl.accessToken = 'pk.eyJ1Ijoia2FjcmVhdGlvbiIsImEiOiJjanN0Zm5tYmgxd3N0NDlvNHd5b2JzY3dnIn0.PWhJG8uoe3_okpyIBmvzVA';
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [0.5850507, 43.6463558], // starting position [lng, lat]
    zoom: 9 // starting zoom
});

/* add icon gegg in static mode */
/* TEST ICON CAT MAPBOX OK
// map.on('load', function () {
//     map.loadImage('https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Cat_silhouette.svg/400px-Cat_silhouette.svg.png', function (error, image) {
//         if (error) throw error;
//         map.addImage('cat', image);
//         map.addLayer({
//             "id": "points",
//             "type": "symbol",
//             "source": {
//                 "type": "geojson",
//                 "data": {
//                     "type": "FeatureCollection",
//                     "features": [{
//                         "type": "Feature",
//                         "geometry": {
//                             "type": "Point",
//                             "coordinates": [0.5826869, 43.6339184]
//                         }
//                     }]
//                 }
//             },
//             "layout": {
//                 "icon-image": "cat",
//                 "icon-size": 0.25
//             }
//         });
//     });
// });
*/
/* TEST POP UP MAP BOX */

map.on('load', function () {
    map.loadImage('images/autres.png', function (error, image) {
        if (error) throw error;
        map.addImage('autres', image);
        //Add a layer showing the places.
        map.addLayer({
            "id": "places",
            "type": "symbol",
            "source": {
                "type": "geojson",
                "data": {
                    "type": "FeatureCollection",
                    "features": [{
                        "type": "Feature",
                        "properties": {
                            "description": "<strong>Make it Mount Pleasant</strong><p><a href=\"http://www.mtpleasantdc.com/makeitmtpleasant\" target=\"_blank\" title=\"Opens in a new window\">Make it Mount Pleasant</a> is a handmade and vintage market and afternoon of live entertainment and kids activities. 12:00-6:00 p.m.</p>",
                            "icon": "autres"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [0.5826869, 43.6339184]
                        }
                    }, {
                        "type": "Feature",
                        "properties": {
                            "description": "<strong>Mad Men Season Five Finale Watch Party</strong><p>Head to Lounge 201 (201 Massachusetts Avenue NE) Sunday for a <a href=\"http://madmens5finale.eventbrite.com/\" target=\"_blank\" title=\"Opens in a new window\">Mad Men Season Five Finale Watch Party</a>, complete with 60s costume contest, Mad Men trivia, and retro food and drink. 8:00-11:00 p.m. $10 general admission, $20 admission and two hour open bar.</p>",
                            "icon": "bien_etre"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [0.5907159999999294, 43.6486]
                        }
                    }]
                }
            },
            "layout": {
                "icon-image": "autres",
                "icon-size": 0.25,
                "icon-allow-overlap": true
            }
        });
    });
    // When a click event occurs on a feature in the places layer, open a popup at the
    // location of the feature, with description HTML from its properties.
    map.on('click', 'places', function (e) {
        var coordinates = e.features[0].geometry.coordinates.slice();
        var description = e.features[0].properties.description;

        // Ensure that if the map is zoomed out such that multiple
        // copies of the feature are visible, the popup appears
        // over the copy being pointed to.
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }

        new mapboxgl.Popup()
            .setLngLat(coordinates)
            .setHTML(description)
            .addTo(map);
    });
});

// Change the cursor to a pointer when the mouse is over the places layer.
map.on('mouseenter', 'places', function () {
    map.getCanvas().style.cursor = 'pointer';
});

// Change it back to a pointer when it leaves.
map.on('mouseleave', 'places', function () {
    map.getCanvas().style.cursor = '';
});


/**************************************************
 * 
 * 
 * call function to init db and get datas for front
 *
 * *******************************************************/

document.addEventListener('deviceready', start, false);

var categories;
var partners;

function start() {
    db.transaction(fillDB, errorCB, successCB);

}

function searchAllCategories(tx) {
    tx.executeSql('SELECT * FROM categories ORDER BY category_name ASC;', [], function (tx, result) {
        categories = result.rows;
        console.log(categories);
        return categories;
    });
}
function searchAllPartners(tx) {
    tx.executeSql('SELECT * FROM partners ORDER BY id ASC;', [], function (tx, result) {
        partners = result.rows;
        console.log(partners);
        return partners;
    });
}
