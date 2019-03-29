console.log("hellogegg");


/* function to init app */

// var app = {
//     // Application Constructor
//     initialize: function () {
//         document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
//     },

//     // deviceready Event Handler
//     //
//     // Bind any cordova events here. Common events are:
//     // 'pause', 'resume', etc.
//     onDeviceReady: function () {
//         this.receivedEvent('deviceready');

//     },

// Update DOM on a Received Event
// receivedEvent: function (id) {
//     var parentElement = document.getElementById(id);
//     var listeningElement = parentElement.querySelector('.listening');
//     var receivedElement = parentElement.querySelector('.received');

//     listeningElement.setAttribute('style', 'display:none;');
//     receivedElement.setAttribute('style', 'display:block;');

//     //     console.log('Received Event: ' + id);
//     // }
// };

// app.initialize();
/******************slidebar */



/******************************************************************
 * 
 * 
 * -------------------MAP with LEAFLET-------------------------------
 * 
 * 
 **********************************************************************************/

var mymap = L.map('mapid').setView([43.6463558, 0.5850507], 9);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1Ijoia2FjcmVhdGlvbiIsImEiOiJjanN0Zm5tYmgxd3N0NDlvNHd5b2JzY3dnIn0.PWhJG8uoe3_okpyIBmvzVA'
}).addTo(mymap);

// ************customize icon for markers of categories************** //
//
//**************************************************************** */
// Marker gastro&alim

var gastro = L.icon({
    iconUrl: 'www/images/alimentation.png',
    iconSize: [38, 38], // size of the icon

    iconAnchor: [22, 94], // point of the icon which will correspond to marker's location

    popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
});

var markerGastro = L.marker([43.6490449,
    0.5885573000000477], { icon: gastro }).addTo(mymap);

markerGastro.bindPopup("<b>LA MIE CALINE</b><br>I am a popup.").openPopup();

// Marker autres

var autres = L.icon({
    iconUrl: 'www/images/autres.png',
    iconSize: [38, 38], // size of the icon

    iconAnchor: [22, 94], // point of the icon which will correspond to marker's location

    popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
});

var markerAutres = L.marker([43.6339184, 0.5826869], { icon: autres }).addTo(mymap);
markerAutres.bindPopup("<b>GEGG</b><br>bureaux").openPopup();

//Bien être

var bien = L.icon({
    iconUrl: 'www/images/bienEtre.png',
    iconSize: [38, 38], // size of the icon

    iconAnchor: [22, 94], // point of the icon which will correspond to marker's location

    popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
});

var markerBien = L.marker([43.6486, 0.5907159999999294], { icon: bien }).addTo(mymap);
markerBien.bindPopup("<b>YVES</b><br>Produit de Beauté et Soins").openPopup();

//loisirs

var loisirs = L.icon({
    iconUrl: 'www/images/loisirs.png',
    iconSize: [38, 38], // size of the icon

    iconAnchor: [22, 94], // point of the icon which will correspond to marker's location

    popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
});

var markerLoisirs = L.marker([43.6482, 0.583486999999991], { icon: loisirs }).addTo(mymap);
markerLoisirs.bindPopup("<b>MOVIDA</b><br>Salle de Sport").openPopup();

//services

var services = L.icon({
    iconUrl: 'www/images/services.png',
    iconSize: [38, 38], // size of the icon

    iconAnchor: [22, 94], // point of the icon which will correspond to marker's location

    popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
});

var markerServices = L.marker([43.6659249, 0.39368869999998424], { icon: services }).addTo(mymap);
markerServices.bindPopup("<b>JEROME NARBONNE PHOTOGRAPHE</b><br>Réduction de 10% sur les tarifs affichés").openPopup();

// tourisme

var tourisme = L.icon({
    iconUrl: 'www/images/tourisme.png',
    iconSize: [38, 38], // size of the icon

    iconAnchor: [22, 94], // point of the icon which will correspond to marker's location

    popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
});

var markerTourisme = L.marker([43.714038, 0.032411000000024615], { icon: tourisme }).addTo(mymap);
markerTourisme.bindPopup("<b>PALMERAIE DU SARTHOU</b><br>Oasis de 8ha à visiter , randonnées botanique, verger conservatoire, pépinière.").openPopup();

// Magasins spécialisés

var shop = L.icon({
    iconUrl: 'www/images/shop.png',
    iconSize: [38, 38], // size of the icon

    iconAnchor: [22, 94], // point of the icon which will correspond to marker's location

    popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
});

var markerShop = L.marker([43.648459, 0.585407000000032], { icon: shop }).addTo(mymap);
markerShop.bindPopup("<b>ATELIER D'ART FLORAL Munier</b><br>10% de remise sur tout achat fleurs plantes vases chocolats déco confiseries …").openPopup();

/*********END OF CUSTOM ICON*****************/

/**************************************************
 * 
 * 
 * call function to init db and get datas and create tables in local
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



