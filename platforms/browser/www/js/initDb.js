console.log("hello cordova DB");

var db = window.openDatabase("database", "1.0", "Cordova Demo", 200000);

var allPartners;
var allCategories;

//this function get datas from jsonend fill the dataBase
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
    $.ajax({
        type: "get",
        url: "json/partenaires08_03.json",
        dataType: "json"
    }).done(function (data) {
        console.log(data)
        allPartners = data;
        db.transaction(fillPartners, errorCB, successCB);
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
function fillPartners(tx) {
    console.log("testfillCate");
    tx.executeSql("DROP TABLE IF EXISTS partners");
    tx.executeSql("CREATE TABLE IF NOT EXISTS partners (partner_id unique, name_ets, tel_ets, mail_ets, site_ets, contact_name, description_ets, image_ets, fk_adress, fk_offer)");
    for (var i = 0; i < allPartners.length; i++) {
        console.log("je boucle dans partners");
        var sql = 'INSERT INTO partners (partner_id unique, name_ets, tel_ets, mail_ets, site_ets, contact_name, description_ets, image_ets, fk_adress, fk_offer) VALUES ('
            + allCategories[i].category_id + ', "' + allCategories[i].category_name + '", "' + allCategories[i].fk_markers + '")';
        tx.executeSql(sql);
    }
}