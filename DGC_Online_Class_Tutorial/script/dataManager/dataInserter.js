
import{initializeApp} from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js"; 
import {getDatabase, ref, onValue, set, get,child,update,remove,push} from "https://www.gstatic.com/firebasejs/9.22.1/firebase-database.js";

import {checkEmailUserAccountExist} from "../checkdatabaseForEmail/orderByEmailCheckup.js"
import {checkEmailUserAccountData} from "../checkdatabaseForEmail/orderByEmailCheckupUserData.js"


var app =  initializeApp(configuration());

function insertDataToFirebase(keyName,dataToInsert,version,fileSize,password,tabType){


    var promise  = new Promise((resolve,reject)=>{


        
    var timestamp = Date.now();



const database = getDatabase(app);

// Reference to your database path
var newPostRef = "Degreatcode ICT LTD online classExamLinks/"+keyName;

const dataRef = ref(database,newPostRef);
// Use push() to generate a new unique key and get a reference to that new location
//const newPostRef = push(dataRef);

// Get the unique push ID (the key) from the new reference
//const pushId = newPostRef.key;




    
set(dataRef, 
          {
           url:dataToInsert,
           name:keyName,
           zipPassword:password,
           version: version,
           fileSize:fileSize,
           date:timestamp,
           tabType:tabType
               
          }
      ) .then(() => {
        var info  = "Data written successfully!";
        console.log(info);

        return resolve(info);
    })
    .catch((error) => {

        var info  = "Error writing data: "+error;
        console.log(info);

        return reject(info);
    });





    });


    return promise;

}




export{insertDataToFirebase}
