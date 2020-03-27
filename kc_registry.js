var request = require("request")
var async = require("async")
var fs = require("fs");
var path = require("path");

const KC_URL="http://localhost:8081"
const REALM="PartnerRegistry"


var fileName ="Keycloak_Backup.json"



var headers = {
    'content-type': 'application/json',
    authorization: 'Bearer '
}

const getAllUser= function(callback) {
  
    try {
        const options = {
            method: 'GET',
            url: KC_URL + "/auth/admin/realms/" + REALM + '/users?max=1000',
            json: true,
            headers: headers
        }
        
    
        request.get(options, function (err, response) {

            if (err) {
                console.error(err)
                console.log(" error for " + payload)
                callback(err)
            } else {
                var apiResponse = JSON.parse(JSON.stringify(response.body))

                callback(null, apiResponse)
               
            }
        })
    } catch (err) {

    }
}


function populateData(cb) {
   
    
    getAllUser(cb)
    
}

var WriteError = function(){
    // do nothing
}
populateData(function (err, result) {
    if (err) {
        return (err);
        console.log("Errorrrrr==>", err);
    }else{

        console.log('Total Records: '+result.length)
         var json = JSON.stringify(result,null,4);
         fs.writeFile(fileName ,json, 'utf8', WriteError);
       
    }
})


