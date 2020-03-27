var request = require("request")
var async = require("async")
var fs = require("fs");
var path = require("path");

const KC_URL="http://localhost:8081"
const REALM="PartnerRegistry"


var fileName ="Keycloak_Backup.json"



var headers = {
    'content-type': 'application/json',
    authorization: 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJOZmpnU21RdjJ6clJSSmJpR2ltNFdFcndiemZNcHpSOGI0b2R4SkZMNjA4In0.eyJqdGkiOiI5MjI3ZDVlNS1hMmEyLTQxNjMtYTMzMC1hYTg2ZTE4Nzc3NWUiLCJleHAiOjE1ODUyMjIwNTMsIm5iZiI6MCwiaWF0IjoxNTg1MjE4NDUzLCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjgwODEvYXV0aC9yZWFsbXMvUGFydG5lclJlZ2lzdHJ5IiwiYXVkIjoicmVhbG0tbWFuYWdlbWVudCIsInN1YiI6ImVhZWQ1ZTMxLWQ1ZjEtNDNmYS05MGI1LTdkNGNjNGUwOGM4MyIsInR5cCI6IkJlYXJlciIsImF6cCI6InV0aWxzIiwiYXV0aF90aW1lIjowLCJzZXNzaW9uX3N0YXRlIjoiYzYyMTYxYzctNTg0YS00ZjUxLTljOWEtMjgwMDUwNjNiZDUwIiwiYWNyIjoiMSIsInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJhZG1pbiJdfSwicmVzb3VyY2VfYWNjZXNzIjp7InJlYWxtLW1hbmFnZW1lbnQiOnsicm9sZXMiOlsibWFuYWdlLXVzZXJzIiwidmlldy11c2VycyIsIm1hbmFnZS1jbGllbnRzIiwicXVlcnktZ3JvdXBzIiwicXVlcnktdXNlcnMiXX19LCJzY29wZSI6InByb2ZpbGUgZW1haWwiLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsIm5hbWUiOiJTYXRpc2ggS3VtYXIgTmlybWFsa2FyIiwicHJlZmVycmVkX3VzZXJuYW1lIjoic2F0aXNoa3VtYXIubmlybWFsa2FyQHRhcmVudG8uY29tIiwiZ2l2ZW5fbmFtZSI6IlNhdGlzaCBLdW1hciBOaXJtYWxrYXIiLCJlbWFpbCI6InNhdGlzaGt1bWFyLm5pcm1hbGthckB0YXJlbnRvLmNvbSJ9.jTsXTuyCrjf2Uq_Lx6YQBAYOIHQxBNfrodq6geZyFOcx1y7UcmIEkEGninzAHFSOHZVy4iIj3M0aT-O6d5tA0x7MIE9O8uOZxPyObcTESiqA7yc2CsEvRlwiYSmqbj19VrvbfWWz8Bj_q2pldMxS77D1iDHSn3mUamUucrbr0joL_O04DhB80QZAtOot1NBSU0Mmek05zHeUDMElcZVjlFgmjCAPy3TZr8pY6qxwy4xi503pYuwm1qoT6GqUKtHRQAHPkljK2Ah4DG-h4blV_OpspEZN-vAWZfBTHQDWPE3Iani0IKTmsUyHU5IoHYp8oJdWesGYl6wuxBvs3wlQ9Q'
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


