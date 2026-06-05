




import{initializeApp} from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js"; 
import {getDatabase, ref, onValue, set, get,child,update,remove,push} from "https://www.gstatic.com/firebasejs/9.22.1/firebase-database.js";

import {checkEmailUserAccountExist} from "../checkdatabaseForEmail/orderByEmailCheckup.js"
import {checkEmailUserAccountData} from "../checkdatabaseForEmail/orderByEmailCheckupUserData.js"

import {insertDataToFirebase} from './dataInserter.js';


var submitPendro = document.getElementById("submitPendro");
var submitWaec = document.getElementById("submitWaec");
var submitJamb =  document.getElementById("submitJamb");


var submitNeco =  document.getElementById("submitNeco");

var year = new Date().getFullYear();

var Degreatcode ICT LTD online classSoftwareSzie = document.getElementById("Degreatcode ICT LTD online classSoftwareSize");
var Degreatcode ICT LTD online classSoftwareVersion = document.getElementById("Degreatcode ICT LTD online classSoftwareVersion");

var Degreatcode ICT LTD online classSoftwareVersionPassword = document.getElementById("Degreatcode ICT LTD online classSoftwareVersionPassword");
var GuiTab_SecondarySchoolType =  document.getElementById("GuiTab_SecondarySchoolType");
fileZieDisplayer("passport",Degreatcode ICT LTD online classSoftwareSzie);
submitPendro.addEventListener("click", e=>{

var fileSizeValue = document.getElementById("Degreatcode ICT LTD online classSoftwareSize").innerText;

    var version  =Degreatcode ICT LTD online classSoftwareVersion.value;

     if(version == "" || version == " "|| version =="undefined"){

        alert("Version is empty");
        return false

      }


      var passwordValue =  Degreatcode ICT LTD online classSoftwareVersionPassword.value;
    
    
       if(passwordValue == "" || passwordValue == " "|| passwordValue =="undefined"){

        alert("Password is empty");
        return false

      }

      passwordValue="";// does not require password


(async()=>{


             {
          
                    try{
                    var passporturl1 =  await uploader("passport","progresscounterSoftWare",year, version,"software");
                    
                     insertDataToFirebase("pendroAlSoftware",passporturl1,version,fileSizeValue,passwordValue,0).then(data=>{
                                alert("Data Save Succesffuly");
                        }).catch(e=>{
                                alert("Database : "+e);
                        });

                    }catch(e){
                    
                        alert("file Upload : "+e);

                    }

            }

})();// end of async

});// end of button click




  
                
                

                
var WaecFileSize = document.getElementById("WaecFileSize");
var WaeceVersion = document.getElementById("WaeceVersion");
var WaecVersionPassword = document.getElementById("WaecVersionPassword");
fileZieDisplayer("passport2",WaecFileSize);

submitWaec.addEventListener("click", e=>{

var fileSizeValue = WaecFileSize.innerText;
var tabTypValue =  GuiTab_SecondarySchoolType.value;

      var version  =WaeceVersion.value;

     if(version == "" || version == " "|| version =="undefined"){

        alert("Version is empty");
        return false

      }


      var passwordValue =  WaecVersionPassword.value;
    
    
       if(passwordValue == "" || passwordValue == " "|| passwordValue =="undefined"){

        alert("Password is empty");
        return false

      }

(async()=>{


             {
          
                    try{
                    var passporturl2 =  await uploader("passport2","progresscounter",year, version,2);
                    // var passporturl3 =  await uploader("passport3","progresscounter",year, season,3);
                    // var passporturl4 =  await uploader("passport4","progresscounter",year, season,4);
                    // var passporturl5 =  await uploader("passport5","progresscounter",year, season,5);

                     insertDataToFirebase("waec",passporturl2,version,fileSizeValue,passwordValue,tabTypValue).then(data=>{
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





   
                
                
                
var JambSize = document.getElementById("JambSize");
var JambVersion = document.getElementById("JambVersion");
var JambVersionPassword = document.getElementById("JambVersionPassword");
fileZieDisplayer("passport3",JambSize);


submitJamb.addEventListener("click", e=>{

var tabTypValue =  GuiTab_SecondarySchoolType.value;

var fileSizeValue = JambSize.innerText;

      var version  =JambVersion.value;

     if(version == "" || version == " "|| version =="undefined"){

        alert("Version is empty");
        return false

      }


      var passwordValue =  JambVersionPassword.value;
    
    
       if(passwordValue == "" || passwordValue == " "|| passwordValue =="undefined"){

        alert("Password is empty");
        return false

      }

  
(async()=>{


             {
          
                    try{
                    var passport3 =  await uploader("passport3","progresscounter",year, version,3);
                    // var passporturl3 =  await uploader("passport3","progresscounter",year, season,3);
                    // var passporturl4 =  await uploader("passport4","progresscounter",year, season,4);
                    // var passporturl5 =  await uploader("passport5","progresscounter",year, season,5);

                     insertDataToFirebase("jamb",passport3,version,fileSizeValue,passwordValue,tabTypValue).then(data=>{
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






var NecoFileSize = document.getElementById("NecoFileSize");
var NecoVersion = document.getElementById("NecoVersion");
var NecoVersionPassword = document.getElementById("NecoVersionPassword");
fileZieDisplayer("passport3",JambSize);

submitNeco.addEventListener("click",e=>{
var tabTypValue =  GuiTab_SecondarySchoolType.value;


var fileSizeValue = NecoFileSize.innerText;

      var version  =NecoVersion.value;

     if(version == "" || version == " "|| version =="undefined"){

        alert("Version is empty");
        return false

      }


      var passwordValue =  NecoVersionPassword.value;
    
    
       if(passwordValue == "" || passwordValue == " "|| passwordValue =="undefined"){

        alert("Password is empty");
        return false

      }

  
(async()=>{


             {
          
                    try{
                    var passporturl4 =  await uploader("passport4","progresscounter",year, version,4);
                    // var passporturl3 =  await uploader("passport3","progresscounter",year, season,3);
                    // var passporturl4 =  await uploader("passport4","progresscounter",year, season,4);
                    // var passporturl5 =  await uploader("passport5","progresscounter",year, season,5);

                     insertDataToFirebase("neco",passporturl4,version,fileSizeValue,passwordValue,tabTypValue).then(data=>{
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


