console.log("hello cordova DB");

var db = window.openDatabase("database", "1.0", "Cordova Demo", 200000);

var allPartners;
var allCategories;

//cette fonction importe les données des fichiers json grâce à des requêtes ajax et éxécute les fonctions
//qui remplissent les tables
function fillDB(tx) {
    console.log("je remplie la db");

    $.ajax({
        type: "get",
        url: "json/categories.json",
        dataType: "json"
    }).done(function (data1) {
        console.log(data1)
        allCategories = data1;
        db.transaction(fillCategories, errorCB, successCB);
    });
}
// funtion error or success for fill db
function errorCB(err) {
    console.log(err);
}

function successCB() {
    console.log("success!");
}



//remplie la table categories avec les données du json
function fillCategories(tx) {
    tx.executeSql("DROP TABLE IF EXISTS categories");
    tx.executeSql("CREATE TABLE IF NOT EXISTS categories (id_category unique, name_category, fk_markers)");
    for (var i = 0; i < allCategories.length; i++) {
        console.log("je boucle dans categories");
        var sql = 'INSERT INTO categories (id_category, name_category,fk_markers) VALUES ('
            + allCategories[i].id_category + ', "' + allCategories[i].name_category + '", "' + allCategories[i].fk_markers + '")';
        tx.executeSql(sql);
    }

