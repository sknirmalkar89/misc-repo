var request = require("request")
var async = require("async")
var fs = require("fs");
var path = require("path");

var baseUrl = "http://localhost:8080"

var entityType = "Employee"

var fileName ="Employee.json"
var searchPayload = {
    id: "open-saber.registry.search",
    
    request : {
       entityType:[entityType],
       filters:{
           kcid:{neq:null}
       }
  
        
    }
}


var EmployeeListObj = {
    Employee: []
 };


const searchEmployeeRegistry = function(callback1, callback2){

    var searchUrl =baseUrl+"/search"
    let headers = {
        'content-type': 'application/json',
        'accept': 'application/json',
        'x-authenticated-user-token': ""
    }

    let option = {
        json: true,
        headers: headers,
        body:searchPayload,
        url: searchUrl
    }

    //Get Employee Detail from registry : kcid, email, osid
    request.post(option, function (err, response) {
        //console.log("This is the api response " + JSON.stringify(body))
        var apiResponse = JSON.parse(JSON.stringify(response.body))
        if (err) {
            console.error(err)
            console.log(" error for " + payload)
            callback2(err)
        } else {
            var responseErr = apiResponse
            if (responseErr == "") {
                callback2(responseErr, null)
            } else {
                callback1(apiResponse.result, headers, callback2)
            }
        }
    })
    
}


const readEmployeeRegistry = function(obj, headers,callback){

    var readUrl =baseUrl+"/read"
    const employeeTemplate = "Employee_SearchResult.json"
    var employeeList = obj[entityType]

    const promises = employeeList.map((employee) => new Promise((resolve, reject) =>  {


        var readTemplate = {
            id: "open-saber.registry.read",
            
            request : {
               Employee:{
                   osid: employee.osid        
               },
               viewTemplate:{
                   subject:entityType,
                   fields:[
                       {
                           name:"osid"
                       },
                       {
                           name:"kcid"
                       },
                       {
                           name:"email"
                       }
                   ]
               }  
                
            }
        }
         


        let option = {
            json: true,
            headers: headers,
            body:readTemplate,
            url: readUrl
        }
        //Get Employee Detail from registry : kcid, email, osid
        request.post(option, function (err, response) {
            //console.log("This is the api response " + JSON.stringify(body))
            if (err) {
                console.error(err)
                console.log(" error for " + readTemplate)
                reject('error')

            } else {
                var responseD = JSON.parse(JSON.stringify(response.body))
                resolve(responseD.result)          
            }
        }) ;       
      }));
      
      const result = Promise.all(promises);


      result.then( function(values){
        console.log("Total Records: "+values.length)

          values.forEach(element =>{
            EmployeeListObj.Employee.push(element[entityType])
            var json = JSON.stringify(EmployeeListObj,null,4);

            fs.writeFile(fileName, json, 'utf8', callback);

          })
      })
      


        
    
}


const populate_data_tasks = function(cb){

   
   searchEmployeeRegistry(readEmployeeRegistry, cb)

   console.log(EmployeeListObj.Employee.length)


}


function populateData(cb) {
   
    
    populate_data_tasks(cb)
    
}


populateData(function (err, result) {
    if (err) {
        return (err);
        console.log("Errorrrrr==>", err);
    }
    return result;
})

