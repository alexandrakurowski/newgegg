console.log("hello cordova DB");

var db = window.openDatabase("database", "1.0", "Cordova Demo", 200000);

var allPartners;
var allCategories;
var allEmployee;
var allDiscount;


//this function fill all tables of the db
function fillDB(tx) {
    console.log("start db filding");

    $.ajax({
        type: "get",
        url: "json/categories.json",
        dataType: "json"
    }).done(function (data1) {
        console.log(data1);
        allCategories = data1;
        db.transaction(fillCategories, errorCB, successCB);
    });
    $.ajax({
        type: "get",
        url: "json/partenaires08_03.json",
        dataType: "json"
    }).done(function (data) {
        console.log(data);
        allPartners = data;
        db.transaction(fillPartners, errorCB, successCB);
        db.transaction(fillOffers, errorCB, successCB);
        db.transaction(fillAdresses, errorCB, successCB);
        db.transaction(fillContacts, errorCB, successCB);
        // db.transaction(fillDiscount, errorCB, successCB);
    });
    $.ajax({
        type: "get",
        url: "json/employee.json",
        dataType: "json"
    }).done(function (data2) {
        console.log(data2);
        allEmployee = data2;
        db.transaction(fillEmployee, errorCB, successCB);
    });
}
// funtion error or success for fill db
function errorCB(err) {
    console.log(err);
}

function successCB() {
    console.log("success!");
}



//***************************************************** */
//functions to create and fill each tables of database 
//************************************************************* */

// CATEGORIES TABLE
function fillCategories(tx) {
    console.log("testfillCate");
    tx.executeSql("DROP TABLE IF EXISTS categories");
    tx.executeSql("CREATE TABLE IF NOT EXISTS categories (category_id unique, category_name, img_url)");
    for (var i = 0; i < allCategories.length; i++) {
        console.log("loop into categories");
        var sql = 'INSERT INTO categories (category_id, category_name,img_url) VALUES ('
            + allCategories[i].category_id + ', "' + allCategories[i].category_name + '", "' + allCategories[i].img_url + '")';
        tx.executeSql(sql);
    }
}
//fk_picture INTEGER, fk_category INTEGER, FOREIGN KEY(fk_picture) REFERENCES pictures(picture_id), FOREIGN KEY(fk_category) REFERENCES categories(category_id))
// PARTNERS TABLE
function fillPartners(tx) {
    console.log("testfillPartners");
    tx.executeSql("DROP TABLE IF EXISTS partners");
    tx.executeSql("CREATE TABLE IF NOT EXISTS partners (partner_id unique, partner_name, partner_site, lat FLOAT, long FLOAT, partner_desc, partner_img, offer_types, INTEGER, fk_category INTEGER, FOREIGN KEY(fk_category) REFERENCES categories (category_id))");
    for (var i = 0; i < allPartners.length; i++) {
        console.log("loop into partners");
        var sql = 'INSERT INTO partners (partner_id, partner_name, partner_site,lat, long, partner_desc, partner_img, offer_types,fk_category) VALUES ('
            + allPartners[i].id + ', "' + allPartners[i].nomEntreprise + '", "' + allPartners[i].siteWeb + '","' + allPartners[i].lat + '", "' + allPartners[i].long + '","' + allPartners[i].descriptionEntreprise + '","' + allPartners[i].imageEntreprise + '", "' + allPartners[i].offer_types + '", "' + allPartners[i].fk_category + '" )';
        tx.executeSql(sql);
    }
}

// OFFERS TABLE
function fillOffers(tx) {
    console.log("test function fillOffers");
    tx.executeSql("DROP TABLE IF EXISTS offers");
    tx.executeSql("CREATE TABLE IF NOT EXISTS offers ( partner_id, offer_desc, offer_modality, offer_type, partner_name, lat, long,fk_category, fk_discount)");
    for (var i = 0; i < allPartners.length; i++) {
        console.log("loop into Partners to get offer");
        var sql = 'INSERT INTO offers (partner_id ,offer_desc, offer_modality, offer_type, partner_name, lat, long, fk_category, fk_discount) VALUES ("' + allPartners[i].partner_id + '","' + allPartners[i].descriptifOffre + '", "' + allPartners[i].modalitesOffre + '", "' + allPartners[i].typeOffre + '","' + allPartners[i].partner_name + '","' + allPartners[i].lat + '","' + allPartners[i].long + '", "' + allPartners[i].fk_category + '", "' + allPartners[i].fk_discount + '")';
        tx.executeSql(sql);
    }
}

// ADRESSES TABLE
function fillAdresses(tx) {
    console.log("testAdresses");
    tx.executeSql("DROP TABLE IF EXISTS adresses");
    tx.executeSql("CREATE TABLE IF NOT EXISTS adresses(street_number, street_name, town, postal_code, lat, long, partner_name)");
    for (var i = 0; i < allPartners.length; i++) {
        console.log("loop into partners/adresses")
        var sql = 'INSERT INTO adresses(street_number, street_name, town, postal_code, lat, long, partner_name) VALUES("' + allPartners[i].numeroRue + '","' + allPartners[i].nomRue + '", "' + allPartners[i].ville + '", "' + allPartners[i].codePostal + '", "' + allPartners[i].lat + '", "' + allPartners[i].long + '", "' + allPartners[i].partner_name + '")';
        tx.executeSql(sql);
    }
}

// CONTACTS TABLE
function fillContacts(tx) {
    console.log("test fill contact");
    tx.executeSql("DROP TABLE IF EXISTS contacts");
    tx.executeSql("CREATE TABLE IF NOT EXISTS contacts(contact_name, contact_role, contact_mail, contact_tel, partner_name)");
    for (var i = 0; i < allPartners.length; i++) {
        console.log("loop into partners/contact");
        var sql = 'INSERT INTO contacts (contact_name, contact_role, contact_mail, contact_tel, partner_name) VALUES ("' + allPartners[i].nomContact + '", "' + allPartners[i].roleContact + '", "' + allPartners[i].mailContact + '", "' + allPartners[i].telContact + '", "' + allPartners[i].partner_name + '")';
        tx.executeSql(sql);
    }
}


// EMPLOYEE TABLE
function fillEmployee(tx) {
    console.log("test fill employee");
    tx.executeSql("DROP TABLE IF EXISTS employee");
    tx.executeSql("CREATE TABLE IF NOT EXISTS employee(id_gegg, employee_name, employee_firstName, employee_mail, admin)");
    for (var i = 0; i < allEmployee.length; i++) {
        console.log("loop into employee");
        var sql = 'INSERT INTO employee(id_gegg, employee_name, employee_firstName, employee_mail, admin) VALUES ("' + allEmployee[i].gegg_id + '", "' + allEmployee[i].name_employee + '","' + allEmployee[i].firstName_employee + '","' + allEmployee[i].mail_employee + '","' + allEmployee[i].admin + '")';
        tx.executeSql(sql);
    }
}

// DISCOUNT TABLE  // attention rajouter champs nom reduction dans fichier excell

// function fillDiscount(tx) {
//     console.log("test function fillDiscount");
//     tx.executeSql("DROP TABLE IF EXISTS discount");
//     tx.executeSql("CREATE TABLE IF NOT EXISTS discount (discount_name, offer_type)");
//     for (var i = 0; i < allPartners.length; i++) {
//         console.log("loop into Partners to get discount");
//         var sql = 'INSERT INTO discount (discount_name, offer_type) VALUES ("' + allPartners[i].discount_name + '", "' + allPartners[i].typeOffre + '")';
//         tx.executeSql(sql);
//     }
//}

// USERS TABLE

// A REPRENDRE AVEC LA FONCTION S'INSCRIRE QUI VA REMPLIR LES CHAMPS
//
// function fillUsers(tx) {
//     console.log(" test function fill user");
//     tx.executeSql("DROP TABLE IF EXISTS users");
//     tx.executeSql("CREATE TABLE IF NOT EXISTS users(user_pwd, user_mail, fk_employee)");  // BEWARE no partner_name init in V1
//     for (var i = 0; i < allEmployee.length; i++){
//         console.log("loop into employee ");
//         var sql = 'INSERT INTO users (user_pwd, user_mail)'
//     }
// }





