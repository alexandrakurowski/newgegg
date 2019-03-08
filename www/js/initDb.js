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
    console.log("testfillCate");
    tx.executeSql("DROP TABLE IF EXISTS categories");
    tx.executeSql("CREATE TABLE IF NOT EXISTS categories (category_id unique, category_name, fk_markers)");
    for (var i = 0; i < allCategories.length; i++) {
        console.log("je boucle dans categories");
        var sql = 'INSERT INTO categories (category_id, category_name,fk_markers) VALUES ('
            + allCategories[i].category_id + ', "' + allCategories[i].category_name + '", "' + allCategories[i].fk_markers + '")';
        tx.executeSql(sql);
    }
}