

import{initializeApp} from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js"; 
import {getDatabase, ref, onValue, set, get,child,update,remove,push,query, orderByChild,equalTo} from "https://www.gstatic.com/firebasejs/9.22.1/firebase-database.js";




var app =  initializeApp(configuration());
const db = getDatabase(app);

// import {saveSessionAndLogin} from "../../FirebaseLoginSystem/signUpAndSignInAssets/saveSessionAndLogin.js";






function checkEmailUserAccountData(dbRootFolder, email){

    const myRef = ref(db, dbRootFolder );

    var promise = new Promise((resolve, reject )=>{


   
    // Build the query
const q = query(myRef, orderByChild('email'), equalTo(email));

var objData = {};
// Execute the query and get data
get(q).then((snapshot) => {
  if (snapshot.exists()) {

        snapshot.forEach(function(childSnapshot) {
          console.log(childSnapshot.val());
         // objData[childSnapshot.key] =   ;

          return resolve(childSnapshot.val());

          })
           
  } else {
    return resolve(false);
    }
}).catch((error) => {
  console.error(error);

  return reject(error);
});


});

return  promise;

}







function checkCandidateNominationAccountData(dbRootFolder, candidateID){

  const myRef = ref(db, dbRootFolder );

  var promise = new Promise((resolve, reject )=>{


 
  // Build the query
const q = query(myRef, orderByChild('candidateID'), equalTo(candidateID));

var objData = {};
// Execute the query and get data
get(q).then((snapshot) => {
if (snapshot.exists()) {

      snapshot.forEach(function(childSnapshot) {
        console.log(childSnapshot.val());
       // objData[childSnapshot.key] =   ;

        return resolve(childSnapshot.val());

        })
         
} else {
  return resolve(false);
  }
}).catch((error) => {
console.error(error);

return reject(error);
});


});

return  promise;

}

export{ checkEmailUserAccountData,checkCandidateNominationAccountData};


