
import{initializeApp} from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js"; 
import {getDatabase, ref, onValue, set, get,child,update,remove,push} from "https://www.gstatic.com/firebasejs/9.22.1/firebase-database.js";

import {checkEmailUserAccountExist} from "../checkdatabaseForEmail/orderByEmailCheckup.js"
import {checkEmailUserAccountData} from "../checkdatabaseForEmail/orderByEmailCheckupUserData.js"

import {insertDataToFirebase} from './dataInserter.js';


var submitCivilDefence =  document.getElementById("submitCivilDefence");

var GuiTab_GovernementType =  document.getElementById("GuiTab_GovernementType");
        
                
var CivilDefenceFileSize = document.getElementById("CivilDefenceFileSize");
var CivilDefenceVersion = document.getElementById("CivilDefenceVersion");
var CivilDefenceVersionPassword = document.getElementById("CivilDefenceVersionPassword");
fileZieDisplayer("civilDfencePassport",JambSize);


submitCivilDefence.addEventListener("click", e=>{
var tabTypValue  = GuiTab_GovernementType.value; 


var fileSizeValue = CivilDefenceFileSize.innerText;

      var version  =CivilDefenceVersion.value;

     if(version == "" || version == " "|| version =="undefined"){

        alert("Version is empty");
        return false

      }


      var passwordValue =  CivilDefenceVersionPassword.value;
    
    
       if(passwordValue == "" || passwordValue == " "|| passwordValue =="undefined"){

        alert("Password is empty");
        return false

      }

  
(async()=>{


             {
          
                    try{
                    var civilDfencePassportUrl =  await uploader("passport3","progresscounter",year, version,1);
                    // var passporturl3 =  await uploader("passport3","progresscounter",year, season,3);
                    // var passporturl4 =  await uploader("passport4","progresscounter",year, season,4);
                    // var passporturl5 =  await uploader("passport5","progresscounter",year, season,5);

                     insertDataToFirebase("CivilDefence",civilDfencePassportUrl,version,fileSizeValue,passwordValue,tabTypValue).then(data=>{
                                alert("Data Save Succesffuly");
                        }).catch(e=>{
                                alert("Database : "+e);
                        });

                    }catch(e){
                    
                        alert("file Upload : "+e);

                    }

            }

})();// end of async


});



