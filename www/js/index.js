console.log("hellogegg");

document.addEventListener('deviceready', start, false);

/******************slidebar */
var categories;
var discount;
var str = "";
var allOfferByCat;
var byCat = [];
var numberOfTurn = 0;
var byCategory = [];
var iconUrl;
var iconMarkers;



// start when device is ready
function start() {
    db.transaction(fillDB, errorCB, successCB);

}

/***************EVENTS WITH CATEGORIES */

function searchAllCategories(tx) {
    tx.executeSql('SELECT * FROM categories ORDER BY category_name ASC;', [], function (tx, result) {
        categories = result.rows;
        console.log(categories)
        return categories;
    });
}

function searchOffersByCategory(tx) {
    var catId = parseInt(str);
    console.log(catId);
    numberOfTurn = 0;
    listBycat = [];

    tx.executeSql('SELECT * FROM partners WHERE fk_category = ' + catId + ';', [], function (tx, result) {
        allOfferByCat = result.rows;
        console.log(allOfferByCat);
        var offersFromCat = [];
        for (var i = 0; i < allOfferByCat.length; i++) {
            offersFromCat.push([allOfferByCat[i].lat, allOfferByCat[i].long, allOfferByCat[i].partner_name]);
            console.log(offersFromCat);
        }
    displayMarkersByCat(offersFromCat);
    console.log(offersFromCat);
    offersFromCat = [];
    });

    // tx.executeSql('SELECT * FROM categories WHERE category_id = ' + catId + ';', [], function (tx, result) {
    //     databyCat = result.rows;
    //     console.log(databyCat);
    //     var iconUrl = [];
    //     for (var i = 0; i < databyCat.length; i++) {
    //         iconUrl.push(databyCat[i].img_url);
    //         console.log(iconUrl);
    //     }
    // });
   
  
}




    function displayMarkersByCat(offersFromCat) {
        console.log(offersFromCat);
       
        // resetInterface();


        // var markers = new L.layerGroup();
        // for (var i = 0; i < offersFromCat.length; i++) {
        //     var data = offersFromCat[i];

        //     console.log(data[i]);
        //     console.log(data[i][0]);
        //     marker = new L.marker([data[i][0], data[i][1]]).bindPopup(data[i][2]);

        //     markers.addLayer(marker);
        // }
        // map.addLayer(markers);
    }

// var markerGastro = L.marker([43.6490449,
//     0.5885573000000477], { icon: gastro }).addTo(mymap);

// markerGastro.bindPopup("<b>LA MIE CALINE</b><br>I am a popup.").openPopup();

// for (var i = 0; i < myItems.length; i++) {
//     var item = myItems[i];
//     marker = new L.marker([item[1],item[2]]).bindPopup(item[0]);
//     markers.addLayer(marker);
// }
// map.addLayer(markers);
// }

/***
 * Button  generatedCategories Navbar
 */

$('#selectCat').one('click', function () {
    db.transaction(searchAllCategories, console.log("categories OK"), function () {
        for (var i = 0; i < categories.length; i++) {
            $('#listCat').append('<a href="#" id="' + categories[i].category_id + '" value="' + categories[i].category_id + '">' + categories[i].category_name + '</a>');
        }
        return categories;
    });
});
/***
 * Link search by categories
 */
$('#listCat').on('click', function () {
    console.log(event.target.id);
    str = event.target.id;
    db.transaction(searchOffersByCategory, errorCB, successCB);
});

function resetInterface() {
    $('#mapid').html("");
}

/***************EVENTS WITH DISCOUNT */

// function searchAllDiscount(tx) {
//     tx.executeSql('SELECT offer_type FROM discount ORDER BY offer_type ASC;', [], function (tx, result) {
//         discount = result.rows;
//         console.log(discount)
//         return discount;
//     });
// }
// /***
//  * Button discount Navbar
//  */




$('#sidebarCollapse').on('click', function () {
    $('#sidebar').toggleClass('active');
    $(this).toggleClass('active');
});



/******************************************************************
 * 
* 
 * 
 * 
* 
 * 
 * -------------------MAP with LEAFLET-------------------------------
 * 
* 
 * 
 * 
* 
 * 
 **********************************************************************************/

var mymap = L.map('mapid').setView([43.6463558, 0.5850507], 9);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery � <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1Ijoia2FjcmVhdGlvbiIsImEiOiJjanN0Zm5tYmgxd3N0NDlvNHd5b2JzY3dnIn0.PWhJG8uoe3_okpyIBmvzVA'
}).addTo(mymap);

//************AJAX REQUEST TO GET INFOS FROM PARTNERS**********
//***************************************************************
//

//     for(var i = 0; i < donnees.length; i++)
// {
//     tableau.push([donnees[i].coordonneesX, donness[i].coordonneesY, donnees[i].nom]);
// }



// var markers/nom cate/ = new L.layerGroup();
// for (var i = 0; i < myItems.length; i++) {
//     var item = myItems[i];
//     marker = new L.marker([item[1],item[2]]).bindPopup(item[0]);
//     markers.addLayer(marker);
// }
// map.addLayer(markers);
// }
//**************************************************************** */



// Marker gastro&alim
// var allGastroOffers;
// for (var i = 0; i < allPartners.length; i++) {
//     allGastro.push([allPartners[i].nomEntreprise, allPartners[i].lat, allPartners[i].long]);
//     console.log(allGastro);
// }

var gastro = L.icon({
    iconUrl: 'www/images/alimentation.png',
    iconSize: [38, 38], // size of the icon

    iconAnchor: [22, 94], // point of the icon which will correspond to marker's location

    popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor

});
console.log(gastro);
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

//Bien �tre

var bien = L.icon({
    iconUrl: 'www/images/bienEtre.png',
    iconSize: [38, 38], // size of the icon

    iconAnchor: [22, 94], // point of the icon which will correspond to marker's location

    popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
});

var markerBien = L.marker([43.6486, 0.5907159999999294], { icon: bien }).addTo(mymap);
markerBien.bindPopup("<b>YVES</b><br>Produit de Beaut� et Soins").openPopup();

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
markerServices.bindPopup("<b>JEROME NARBONNE PHOTOGRAPHE</b><br>R�duction de 10% sur les tarifs affich�s").openPopup();

// tourisme

var tourisme = L.icon({
    iconUrl: 'www/images/tourisme.png',
    iconSize: [38, 38], // size of the icon

    iconAnchor: [22, 94], // point of the icon which will correspond to marker's location

    popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
});

var markerTourisme = L.marker([43.714038, 0.032411000000024615], { icon: tourisme }).addTo(mymap);
markerTourisme.bindPopup("<b>PALMERAIE DU SARTHOU</b><br>Oasis de 8ha � visiter , randonn�es botanique, verger conservatoire, p�pini�re.").openPopup();

// Magasins sp�cialis�s

var shop = L.icon({
    iconUrl: 'www/images/shop.png',
    iconSize: [38, 38], // size of the icon

    iconAnchor: [22, 94], // point of the icon which will correspond to marker's location

    popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
});

var markerShop = L.marker([43.648459, 0.585407000000032], { icon: shop }).addTo(mymap);
markerShop.bindPopup("<b>ATELIER D'ART FLORAL Munier</b><br>10% de remise sur tout achat fleurs plantes vases chocolats d�co confiseries �").openPopup();

/*********END OF CUSTOM ICON*****************/

