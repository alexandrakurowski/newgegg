console.log("hello cordova DB");

var db = window.openDatabase("database", "1.0", "Cordova Demo", 200000);

var allPartners;
var allCategories;

//this function get datas from json and fill the dataBase
function fillDB(tx) {
    console.log("start db filding");

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
        db.transaction(fillOffers, errorCB, successCB);
        db.transaction(fillAdresses, errorCB, successCB);
        db.transaction(fillContacts, errorCB, successCB);

    });

}
// funtion error or success for fill db
function errorCB(err) {
    console.log(err);
}

function successCB() {
    console.log("success!");
}



//function to fill all tables of database 
function fillCategories(tx) {
    console.log("testfillCate");
    tx.executeSql("DROP TABLE IF EXISTS categories");
    tx.executeSql("CREATE TABLE IF NOT EXISTS categories (category_id unique, category_name, fk_markers)");
    for (var i = 0; i < allCategories.length; i++) {
        console.log("loop into categories");
        var sql = 'INSERT INTO categories (category_id, category_name,fk_markers) VALUES ('
            + allCategories[i].category_id + ', "' + allCategories[i].category_name + '", "' + allCategories[i].fk_markers + '")';
        tx.executeSql(sql);
    }
}
//fill  all tables  with datas Json
function fillPartners(tx) {
    console.log("testfillPartners");
    tx.executeSql("DROP TABLE IF EXISTS partners");
    tx.executeSql("CREATE TABLE IF NOT EXISTS partners (partner_id unique, partner_name, partner_site,twitter_link, facebook_link, partner_desc, partner_activity, partner_tel, partner_img,fk_adresses, fk_offers, fk_contacts)");
    for (var i = 0; i < allPartners.length; i++) {
        console.log("loop into partners");
        var sql = 'INSERT INTO partners (partner_id, partner_name, partner_site,twitter_link, facebook_link, partner_desc, partner_activity, partner_tel, partner_img,fk_adresses, fk_offers, fk_contacts) VALUES ('
            + allPartners[i].id + ', "' + allPartners[i].nomEntreprise + '", "' + allPartners[i].siteWeb + '", "' + allPartners[i].twitter_link + '", "' + allPartners[i].facebook_link + '", "' + allPartners[i].descriptionEntreprise + '", "' + allPartners[i].typeActivite + '", "' + allPartners[i].telephoneEntreprise + '", "' + allPartners[i].imageEntreprise + '", "' + allPartners[i].fk_adresses + '", "' + allPartners[i].fk_offers + '", "' + allPartners[i].fk_contacts + '") ';
        tx.executeSql(sql);
    }
}
function fillOffers(tx) {
    console.log("test function fillOffers");
    tx.executeSql("DROP TABLE IF EXISTS offers");
    tx.executeSql("CREATE TABLE IF NOT EXISTS offers (offer_desc, offer_modality, fk_partners, fk_categories, fk_discount)");
    for (var i = 0; i < allPartners.length; i++) {
        console.log("loop into Partners to get offer");
        var sql = 'INSERT INTO offers (offer_desc, offer_modality, fk_partners, fk_categories, fk_discount) VALUES ("' + allPartners[i].descriptifOffre + '", "' + allPartners[i].modalitesOffre + '", "' + allPartners[i].fk_partners + '", "' + allPartners[i].fk_categories + '", "' + allPartners[i].fk_discount + '")';
        tx.executeSql(sql);
    }
}
function fillAdresses(tx) {
    console.log("testAdresses");
    tx.executeSql("DROP TABLE IF EXISTS adresses");
    tx.executeSql("CREATE TABLE IF NOT EXISTS adresses(street_number, street_name, town, postal_code, lat, long, fk_partners)");
    for (var i = 0; i < allPartners.length; i++) {
        console.log("loop into adresses")
        var sql = 'INSERT INTO adresses(street_number, street_name, town, postal_code, lat, long, fk_partners) VALUES("' + allPartners[i].numeroRue + '","' + allPartners[i].nomRue + '", "' + allPartners[i].ville + '", "' + allPartners[i].codePostal + '", "' + allPartners[i].lat + '", "' + allPartners[i].long + '", "' + allPartners[i].fk_partners + '")';
        tx.executeSql(sql);
    }
}
function fillContacts(tx) {
    console.log("test fill contact");
    tx.executeSql("DROP TABLE IF EXISTS contacts");
    tx.executeSql("CREATE TABLE IF NOT EXISTS contacts(contact_name, contact_role, contact_mail, contact_tel, fk_partners)");
    for (var i = 0; i < allPartners.length; i++) {
        console.log("loop into contact");
        var sql = 'INSERT INTO contacts (contact_name, contact_role, contact_mail, contact_tel, fk_partners) VALUES ("' + allPartners[i].nomContact + '", "' + allPartners[i].roleContact + '", "' + allPartners[i].mailContact + '", "' + allPartners[i].telContact + '", "' + allPartners[i].fk_partners + '")';
        tx.executeSql(sql);
    }
}
