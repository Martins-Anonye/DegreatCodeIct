


import { displayClusterMetrics, displayServerResponseMetrics } from './mystatisticmaker.js';

import { payWithPaystack, CustomAlertFrom_sweetalert2_API_Method1, checkEmailData } from './PaystackmakerforPasscodeIDCard.js';


var officialWebsiteAddress = "http://www.degreatcodeict.com";

//loadJs("./mystatisticmaker.js").then(res => { console.log("My result: " + res) }).catch(err => { console.log("My Error:" + err) });



// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-app.js";
import { getStorage, getDownloadURL, ref } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-storage.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-analytics.js";



// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAC0m9Mw4eesl5NoGj_GYmom83pp61bwXk",
    authDomain: "degreatcode-ict-ltd.firebaseapp.com",
    projectId: "degreatcode-ict-ltd",
    storageBucket: "degreatcode-ict-ltd.appspot.com",
    messagingSenderId: "977515281508",
    appId: "1:977515281508:web:e5af58f433b2f3ede6b371",
    measurementId: "G-R08274K20K"
};

//CDN
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


//const getStorage = app.storage();//getStorage(app);
/* module.exports = {
    storage,
}; */


$(document).ready(function () {
    identityMaker(FirstTableUserIdentity);
    identityMaker(SecondTableUserIdentity);

});

function identityMaker(userIdentityRootData) {

    Array.from(userIdentityRootData.Identity).forEach(identity => {




        var identityCertSN = getUrlData("identity");

        var username = document.getElementsByClassName('username')[0];
        var usernameStati = document.getElementsByClassName('username')[1];

        var userImage = document.getElementsByClassName('userImage')[0];
        var totalclassRemainingInDays = document.getElementById('totalclassRemaining');
        //var totalclassRemainingSpan = totalclassRemaining.getElementsByTagName("span");
        var projectCompleted = document.getElementById('projectCompleted');
        var totalclassAttendedInDays = document.getElementById('totalclassAttended');
        var identityName = document.getElementById('identityName');
        var email = document.getElementById('email');
        var certificateSN = document.getElementById('certificateSN');

        var entryDate = document.getElementById('entryDate');
        var graduationDate = document.getElementById('graduationDate');
        var address = document.getElementById('address');
        var Skills = document.getElementById('Skills');
        var profile_link = document.getElementById('profile_link');
        var identitycopy = document.getElementById('identitycopy');
        var copyalert = document.getElementById('copyalert');
        var certificateBody = document.getElementById('certificateBody');
        var syllablesHolder = document.getElementsByClassName('syllablesHolder')[0];
        //var asideholder = document.getElementsByClassName('asideholder')[0];

        var asidecontainer = document.getElementById('asidecontainer');


        var reasonformaincost = document.getElementById('reasonformaincost');
        var maincostidcard = document.getElementById('maincostidcard');
        var renewalcostidcard = document.getElementById('renewalcostidcard');

        var downloadIdCard = document.getElementById('downloadIdCard');
        var renewidcard = document.getElementById('renewidcard');
        var generateidcard = document.getElementById('generateidcard');
        var passcodeentry = document.getElementById('passcodeentry');

        var genidcard = document.getElementsByClassName('genidcard')[0];
        var renIdCard = document.getElementsByClassName('renIdCard')[0];

        var projectcompleted = document.getElementById('projectcompleted');
        var externalprofilebtn = document.getElementById('externalprofilebtn');
        var externalprofiledesc = document.getElementById('externalprofiledesc');


        identityCertSN = identityCertSN.toUpperCase();
        var certSerialNum = identity.CertSn.toUpperCase();
        if (identityCertSN == certSerialNum) {
            if (identity.ActivateThisAccount_Yes_No.toUpperCase() == "YES") {
                username.innerHTML = identity.Name;
                username.disabled = true;
                username.style.color = "black";

                usernameStati.innerHTML = identity.Name;
                usernameStati.disabled = true;

                userImage.src = getImageUrlMaker(userIdentityRootData, identity);
                userImage.style.width = "100px";
                userImage.style.height = "100px";
                totalclassRemainingInDays.innerText = identity.Totall_NumberOfClasses_Remaining;
                totalclassRemainingInDays.disabled = true;

                projectCompleted.innerText = identity.Totall_NumberOfProject_Completed;
                projectCompleted.disabled = true;

                totalclassAttendedInDays.innerText = identity.Totall_NumberOfClasses_Attended;
                totalclassAttendedInDays.disabled = true;

                identityName.value = identity.Name;
                identityName.disabled = true;

                email.value = identity.Email;
                email.disabled = false; // they will use it to proceed payment for idcard

                certificateSN.value = identity.CertSn;
                certificateSN.disabled = true;

                entryDate.value = identity.Entry_Date;
                entryDate.disabled = true;

                graduationDate.value = identity.Grad_Date;
                graduationDate.disabled = true;

                address.value = identity.Address;
                address.disabled = true;

                profile_link.value = `${officialWebsiteAddress + "?identity=" + identity.CertSn}`;

                identitycopy.addEventListener("click", e => {
                    copyText(profile_link, copyalert);
                });
                var skillLinks = makeUpSkillSet(identity.SkillSet_and_Syllables, Skills);
                Skills.disabled = true;
                asidecontainer.innerHTML = skillLinks;

                generateCertificateInformation(identity.Certficate_Package_Name, certificateBody);




                generalIDCardCostMaker(maincostidcard, reasonformaincost, renewalcostidcard, userIdentityRootData, genidcard, renIdCard);

                var Performance_For_Day1_Day28 = identity.Last25daysstatistics.Performance_For_Day1_Day28;
                var Work_Class_Project_For_Day1_Day28 = identity.Last25daysstatistics.Work_Class_Project_For_Day1_Day28;


                Performance_For_Day1_Day28 = convertStringToArray(Performance_For_Day1_Day28);
                Work_Class_Project_For_Day1_Day28 = convertStringToArray(Work_Class_Project_For_Day1_Day28);


                //console.log(Performance_For_Day1_Day28[27]);
                //console.log(Work_Class_Project_For_Day1_Day28[27]);

                //call statistics
                displayClusterMetrics();
                displayServerResponseMetrics(Performance_For_Day1_Day28, Work_Class_Project_For_Day1_Day28);

                var reNewIdOrGenerateNewOne = identity.IdCard_Passport.YesToGenerateNewIDCard_NoToRenewIDCard;

                if (reNewIdOrGenerateNewOne.toUpperCase() == "YES") {
                    renewidcard.style.display = "none";
                    generateidcard.style.display = "inline-block";
                } else {
                    renewidcard.style.display = "inline-block";
                    generateidcard.style.display = "none";
                }
                renewidcard.addEventListener("click", () => {

                    var cost = userIdentityRootData.ID_Card_Cost.Renewal_Id_Card_Cost;
                    generatePassCodeMaker(email, cost, identity);

                });
                generateidcard.addEventListener("click", () => {
                    var cost = userIdentityRootData.ID_Card_Cost.Main_Cost_New_Id_Card;
                    generatePassCodeMaker(email, cost, identity);

                });


                downloadIdCard.addEventListener("click", () => {

                    var passcord = identity.IdCard_Passport.DownloadID_PassCode_For_Passport.PassCode;

                    var passcodeentryValue = passcodeentry.value;
                    if (passcodeentryValue == passcord) {
                        // firebase execute here

                        var isProxyOn = checkProxyStatus(userIdentityRootData);

                        var storageUrlLink = getStorageLocationForIDCard(userIdentityRootData, identity);

                        if (isProxyOn == true) {
                            var proxyServerUrlForCorsForFirebase = getProxyServerUrl_ForCORS_forFirebase(userIdentityRootData);
                            firebaseMaker(storageUrlLink, proxyServerUrlForCorsForFirebase);
                        }
                        else {
                            googleDriveMaker(storageUrlLink, identity.Name + ".pdf");
                        }
                    }
                    else if (passcodeentryValue == null || typeof passcodeentryValue == undefined || passcodeentryValue == "") {
                        CustomAlertFrom_sweetalert2_API_Method1("Empty Passcode", "Passcode Entry is Empty. You need to generate passcode first. If you have generated passcode, check your e-mail box  folders (all mails /Spam /Trash/ Important) for your passcode. ", "error");

                    }
                    else if (passcodeentryValue != passcord) {
                        CustomAlertFrom_sweetalert2_API_Method1("Wrong Passcode", "You Entered Wrong Passcode, Please Check your e-mail box folders (all mails /Spam /Trash/ Important) and try again.", "error");

                    }
                    else {
                        CustomAlertFrom_sweetalert2_API_Method1("Wrong Passcode", "Passcode is not correct, Please Check your e-mail box  folders (all mails /Spam /Trash/ Important) and try again.", "error");
                    }

                });


                //var url = "https://firebasestorage.googleapis.com/v0/b/somerandombucketname..."


                // try {
                projectCompletedMaker(projectcompleted, identity);
                var externalprofilelinkuse = identity.Personal_Website_link;
                externalprofiledesc.innerText = externalprofilelinkuse.Description;
                externalprofilebtn.addEventListener("click", () => {
                    window.location.href = externalprofilelinkuse.Link;

                })
                /*   }
                  catch (e) {
                      console.log("Error :" + e);
                  } */


            } else {
                username.innerHTML = "This user account has expired. Please contact administrator.";
                username.style.color = "red";
            }
        }

    });
}


function generalIDCardCostMaker(mainCostHolder, reasonForMain, renewalCostHolder, userIdentityRootData, genbtn, renewbtn) {
    var ID_Card_Cost = userIdentityRootData.ID_Card_Cost;

    mainCostHolder.innerText = " NGN " + ID_Card_Cost.Main_Cost_New_Id_Card;
    mainCostHolder.style.color = "red";

    reasonForMain.innerText = ID_Card_Cost.Detail_About_Main_Cost;
    reasonForMain.style.color = "blue";

    renewalCostHolder.innerText = " :NGN " + ID_Card_Cost.Renewal_Id_Card_Cost;
    renewalCostHolder.style.color = "red";

    genbtn.innerText = " : NGN " + ID_Card_Cost.Main_Cost_New_Id_Card;
    renewbtn.innerText = ": NGN " + ID_Card_Cost.Renewal_Id_Card_Cost;


}
function convertStringToArray(text) {
    text = text.split(",");
    return text;
}
function copyText(fieldToHighlight, alertHolder) {
    fieldToHighlight.select();
    document.execCommand('copy');
    alertHolder.innerText = "link data copied";

}
function getUrlData(datakey) {
    var urlParameters = window.location.search; // get url starting from ?, not the link
    var searchParams = new URLSearchParams(urlParameters);
    var value = searchParams.get(datakey);
    return value;
}

function makeUpSkillSet(skillSetArray, skillsHolder) {
    var links = "";
    var trainee_Skills = "";
    var counter = 0;
    Array.from(skillSetArray).forEach(skill => {
        if (counter == 0) {
            trainee_Skills = skill.Name_yesCompleted_NoNot.split("_")[0];

            if (skill.IsLinkActive_Yes_Or_No.toUpperCase() == "YES") {
                links = `<a href=${skill.Link}> <button style="color:white; background-color:brown;"> ${trainee_Skills}</button></a> <br>`;

            }
        }
        else {
            trainee_Skills = skill.Name_yesCompleted_NoNot.split("_")[0];


            if (skill.IsLinkActive_Yes_Or_No.toUpperCase() == "YES") {
                links = links + `<a href=${skill.Link}> <button style="color:white; background-color:brown;"> ${trainee_Skills}</button></a> <br>`;

            }
        }
        counter++;
    });

    skillsHolder.value = trainee_Skills;
    return links;
}


function generateCertificateInformation(certArray, certificateBody) {
    var allDataInTableBody = "";
    var counter = 0;
    Array.from(certArray).forEach(certificate => {

        if (counter == 0) {
            allDataInTableBody = `<tr> <td>  ${certificate.Name}</td>  <td> ${certificate.Status_Completed3Not_Complted_But_Active3Stater3Not_Active3Pending}</td> <td>  ${certificate.Date}</td> </tr>`;

        }
        else {
            allDataInTableBody = allDataInTableBody + `<tr> <td>  ${certificate.Name}</td>  <td> ${certificate.Status_Completed3Not_Complted_But_Active3Stater3Not_Active3Pending}</td> <td>  ${certificate.Date}</td> </tr>`;

        }
        counter++;

    });
    //console.log(allDataInTableBody);
    certificateBody.innerHTML = allDataInTableBody;
}



function firebaseMaker(firebaseFolder_Slash_FileAndExtensionName, proxyServerUrlForCorsForFirebase) {

    // var mfirebaseFolderFileAndExtensionName = "OLO_KAKA_DGC100.108D0312013N008/OLO_KAKA.pdf";

    const storage = getStorage();
    // note storage.ref(...) is for firebase 9 and bellow.
    // ours is version 10.XXX , so use ref() from import statement.
    getDownloadURL(ref(storage, firebaseFolder_Slash_FileAndExtensionName))  //'images/stars.jpg'
        .then((url) => {
            // `url` is the download URL for 'images/stars.jpg'


            // This can be downloaded directly:
            //console.log("User Date: " + url);
            const xhr = new XMLHttpRequest();
            xhr.responseType = 'blob';
            xhr.onload = (event) => {
                const blob = xhr.response;
                //download the file here
                var filename = url.substring(url.lastIndexOf("/") + 1).split("?")[0];

                const urldld = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.style.display = 'none';
                a.href = urldld;
                // the filename you want
                //a.download = 'todo-1.json';
                a.download = filename;
                document.body.appendChild(a);
                a.click();
                window.URL.revokeObjectURL(urldld);
            };
            var proxyServerToBypassCors = proxyServerUrlForCorsForFirebase + '' + encodeURIComponent(url);
            xhr.open('GET', proxyServerToBypassCors);
            xhr.send();

            // Or inserted into an <img> element
            //const img = document.getElementById('myimg');
            //img.setAttribute('src', url);


        })
        .catch((error) => {
            // Handle any errors

            console.log(error);
        });




    /*      User does not have permission to access this object
 
     solution
 
 
     Update your security rules with match /{allPaths=**} to indicate that public read and write access is allowed on all paths:
 
 service firebase.storage {
   match /b/savephoto-a1cc3.appspot.com/o {
     match /{allPaths=**} {
       // Allow access by all users
       allow read, write;
     }
   }
 }

 // not this
   //allow read, write: if false;
      */
}

function googleDriveMaker(url, NewfileNameAndExtension) {
    window.open(url, '_blank');
    /*  const xhr = new XMLHttpRequest();
     xhr.responseType = 'blob';
     xhr.onload = (event) => {
         const blob = xhr.response;
         //download the file here
         // var filename = url.substring(url.lastIndexOf("/") + 1).split("?")[0];
         var filename = NewfileNameAndExtension;
         const urldld = window.URL.createObjectURL(blob);
         const a = document.createElement('a');
         a.style.display = 'none';
         a.href = urldld;
         // the filename you want
         //a.download = 'todo-1.json';
         a.download = filename;
         document.body.appendChild(a);
         a.click();
         window.URL.revokeObjectURL(urldld);
     };
     // var proxyServerToBypassCors = proxyServerUrlForCorsForFirebase + '' + encodeURIComponent(url);
     xhr.open('GET', url);
     xhr.send(); */
}
function getImageUrlMaker(rootData, indexObj) {

    var useProxyconnection_YesUse_NoNOt = rootData.UseProxyconnection_YesUse_NoNOt.toUpperCase();
    var imageUrl = "";
    if (useProxyconnection_YesUse_NoNOt == "YES") {
        // we use Firebase storage
        imageUrl = indexObj.IdCard_Passport.Firebase_Storage.ImageUrl_Passport;
    } else {
        imageUrl = indexObj.IdCard_Passport.Google_Drive_Storage.ImageUrl_Passport;
    }
    return imageUrl;
}

function getProxyServerUrl_ForCORS_forFirebase(rootData) {



    var proxyUrlConnectionLink = "";
    var selectedProxy = rootData.Proxy.UseProxy_Server_Index;
    var proxyUrlArray = rootData.Proxy.Proxy_Server;


    for (var counter = 0; counter < proxyUrlArray.length; counter++) {
        if (counter == +selectedProxy) {
            proxyUrlConnectionLink = proxyUrlArray[counter].Url_connection_for_CorsSolution;
            break;
        }
    }

    return proxyUrlConnectionLink;


}

function getStorageLocationForIDCard(rootData, userIdentityData) {
    var strorageData = "";
    var useProxyconnection_YesUse_NoNOt = rootData.UseProxyconnection_YesUse_NoNOt.toUpperCase();
    if (useProxyconnection_YesUse_NoNOt == "YES") {

        strorageData = userIdentityData.IdCard_Passport.Firebase_Storage.IdCard_FolderName_Slash_IdCard_FileNameAndExtensionName;
    } else {

        strorageData = userIdentityData.IdCard_Passport.Google_Drive_Storage.IdCard_Url;
    }
    return strorageData;
}
function checkProxyStatus(rootData) {
    var useProxyconnection_YesUse_NoNOt = rootData.UseProxyconnection_YesUse_NoNOt.toUpperCase();
    var isProxyOn = false;
    if (useProxyconnection_YesUse_NoNOt == "YES") {
        isProxyOn = true;
    } else {
        isProxyOn = false;
    }
    return isProxyOn;
}


function generatePassCodeMaker(email, cost, userIdentityData) {
    var isEmailValidTrueFalse = checkEmailData(email.value);
    if (isEmailValidTrueFalse == true) {


        var passcord = userIdentityData.IdCard_Passport.DownloadID_PassCode_For_Passport.PassCode;

        var globalId = userIdentityData.CertSn;
        var passcord = userIdentityData.IdCard_Passport.DownloadID_PassCode_For_Passport.PassCode;
        var expireOn = userIdentityData.IdCard_Passport.DownloadID_PassCode_For_Passport.PassCode_Expire;
        payWithPaystack(email.value, cost, identity.Name, globalId, passcord, expireOn);

    }
    else if (email.value == null || typeof email.value == undefined || email.value == "") {
        CustomAlertFrom_sweetalert2_API_Method1("E-mail is Empty ", "Your Email Address is empty, please provide your email address above.", "error");

    }
    else {
        CustomAlertFrom_sweetalert2_API_Method1("Wrong Email ", "Your Email Address is wrong, Please provide valid email address above.", "error");
    }


}


function projectCompletedMaker(tbodypalceholder, identity) {
    var Project_CompletedData = identity.Project_Completed;
    var projectrows = "";
    Array.from(Project_CompletedData).forEach((project) => {
        var data = project.Desc_Slash_Category_Slash_Status_Slash_StartDateAndEndDate;
        var dataArray = data.split("/");
        var desc = dataArray[0];
        var otherSlashedData = "";
        for (var a = 0; a < dataArray.length; a++) {
            if (a > 0) {
                otherSlashedData = otherSlashedData + "" + dataArray[a];
            }
        }
        projectrows = projectrows + `<tr><td>${project.Name}  </td>   <td>${desc} <br> ${otherSlashedData} . <a href="${project.Link}"> <button> Visit </button> </a>  </td> </tr>`;
    });
    tbodypalceholder.innerHTML = projectrows;
}



/*
To connect this file:
add this line of code to dashboard.html

 <!------
        Statistics Data are added bellow
        MyOwnAssets/MyHomePageAndCatchMaker/Identity/Statistics/
        --->
    <script type="text/javascript"
        src="MyOwnAssets/MyHomePageAndCatchMaker/Identity/Statistics/scripts/jquery-1.11.1.min.js"></script>
    <script type="text/javascript"
        src="MyOwnAssets/MyHomePageAndCatchMaker/Identity/Statistics/jqwidgets/jqxcore.js"></script>
    <script type="text/javascript"
        src="MyOwnAssets/MyHomePageAndCatchMaker/Identity/Statistics/jqwidgets/jqxdraw.js"></script>
    <script type="text/javascript"
        src="MyOwnAssets/MyHomePageAndCatchMaker/Identity/Statistics/jqwidgets/jqxchart.core.js"></script>

    <script type="text/javascript"
        src="MyOwnAssets/MyHomePageAndCatchMaker/Identity/Statistics/jqwidgets/jqxdata.js"></script>
    <link rel="stylesheet" href="MyOwnAssets/MyHomePageAndCatchMaker/Identity/Statistics/jqwidgets/styles/jqx.base.css"
        type="text/css" />



 <!---
        users statistic div builder
        -->

    <script src="MyOwnAssets/MyHomePageAndCatchMaker/Identity/statisticsHTMLDIVMaker.js"></script>


    <!---
        users identity are added bellow
        -->

<script src="MyOwnAssets/database/Localdata.json"></script>

    <script src="MyOwnAssets/MyHomePageAndCatchMaker/Identity/Identitydatabase/FirstTableIdentityData.json"></script>
    <script src="MyOwnAssets/MyHomePageAndCatchMaker/Identity/Identitydatabase/SecondTableIdentityData.json"></script>

    <script type="module" src="MyOwnAssets/MyHomePageAndCatchMaker/Identity/ChangDashboard.js"></script>
 


*/