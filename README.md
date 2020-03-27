# misc-repo


#registry_script.js

   It will take a back up of kcid,osid, email data of a user from registry with view template Employee_SearchResult.json 
   where kcid is not null and create a backup file Employee.json
   
   $node registry_script.js
   
#kc_registry.js

  It will take a back up of all users from the given relam from keycloak database and store in Keycloak_Backup.json.
  
   $ node kc_registry.js
  
#Keycloak-Update
 A java project will read the Employee.json created on step 1 and use Base32 encoder and update keycloak database.
 
 Project Can be run:
    Get the keycloak token set env token.
    
    step 1:  $ export token = <keycloak token>
    
    step 2 : $ mvn clean package
    
    step 3 : $ java -jar target/keycloak-update-0.0.1-SNAPSHOT-jar-with-dependencies.jar Employee.json 
   
