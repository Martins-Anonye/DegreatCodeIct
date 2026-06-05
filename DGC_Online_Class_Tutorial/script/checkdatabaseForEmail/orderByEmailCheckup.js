

import{initializeApp} from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js"; 
import {getDatabase, ref, onValue, set, get,child,update,remove,push,query, orderByChild,equalTo} from "https://www.gstatic.com/firebasejs/9.22.1/firebase-database.js";




var app =  initializeApp(configuration());
const db = getDatabase(app);

// import {saveSessionAndLogin} from "../../FirebaseLoginSystem/signUpAndSignInAssets/saveSessionAndLogin.js";


function checkEmailUserAccountAndSaveSession(email,password){

    const myRef = ref(db, 'UsersAccount');

    var promise = new Promise((resplve, reject )=>{


   
    // Build the query
const q = query(myRef, orderByChild('email'), equalTo(email));

// Execute the query and get data
get(q).then((snapshot) => {
  if (snapshot.exists()) {
    console.log(snapshot.val());
    saveSessionAndLogin(email,password);

  } else {
        alert("SignUp Please !!! before using this method")  
    }
}).catch((error) => {
  console.error(error);
});


});

}






function checkEmailUserAccountExist(dbRootFolder, email){

    const myRef = ref(db, dbRootFolder );

    var promise = new Promise((resolve, reject )=>{


   
    // Build the query
const q = query(myRef, orderByChild('email'), equalTo(email));

// Execute the query and get data
get(q).then((snapshot) => {
  if (snapshot.exists()) {
   // console.log(snapshot.val());
    
    return resolve(true);
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


function checkEmailUserAccountAndChangeVerificationStatusTrue(email){

    const myRef = ref(db, 'UsersAccount');

    var promise = new Promise((resplve, reject )=>{


   
    // Build the query
    const q = query(myRef, orderByChild('email'), equalTo(email));

    // Execute the query and get data
    get(q).then((snapshot) => {
      if (snapshot.exists()) {

        var KeyAndvalues = snapshot.val();
        //console.log(snapshot.val());
        var key = Object.keys(KeyAndvalues)[0];
        //console.log(key);

        updateVerificationStatus(key);
        //return true;
      } else {
        return false;
        }
    }).catch((error) => {
      console.error(error);
    });


});

return promise;



}



function updateVerificationStatus(insertCode){
 var userRef =    ref(db,'UsersAccount/'+insertCode+'/emailVerified');
    
  set(userRef,true)
  .then(() =>{ 
    console.log('Email verified successfully');
   })
  .catch(error => {
       console.error('Error Email verification update in firebase DB:', error);
    });

}


export{checkEmailUserAccountAndChangeVerificationStatusTrue, checkEmailUserAccountExist}


