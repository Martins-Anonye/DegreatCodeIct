import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";
import { getDatabase, ref, onValue, set, get, child, update, remove, push } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-database.js";
import { getStorage, ref as storageRef, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-storage.js";
import { firebaseConfig } from "../FirebaseConnection/FirebaseConfiggFile.js";

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const storage = getStorage(app);

const downloadSoftwareTable = document.getElementById("DownloadDegreatcode ICT LTD online classExamSoftwareTable");
const schoolTab = document.getElementById("schooltab");
const governmentTab = document.getElementById("governement1tab");


getListOfApplicant();

function getListOfApplicant(){

    const myRef = ref(database, 'Degreatcode ICT LTD online classExamLinks');

    var promise = new Promise((resolve, reject )=>{

      
   
    get(myRef).then((snapshot) => {
          var schoolData ="";
          var govData1 = "";
           var softwareData = "";

          console.log(snapshot)
      if (snapshot.exists()) {
             var counter = 1;
            snapshot.forEach(function(userDat, indexCount) {
                  var userData = userDat.val();
                  
                  if(userData.tabType == 0){// == software
                     softwareData += TabMaker(counter,softwareData,userData);  
                  }else{

                       if(userData.tabType == 1){// == School
                         schoolData +=  TabMaker("school"+counter,schoolData,userData);  
                       }
                         if(userData.tabType == 2){// == government
                         govData1 +=  TabMaker("govertab1"+counter,govData1,userData);  

                       }

                  }

               counter++;
            });
               schoolTab.innerHTML = schoolData;
                governmentTab.innerHTML = govData1;
               downloadSoftwareTable.innerHTML  = softwareData;
                  var loadedData = new Event("loadedData");
                  document.dispatchEvent(loadedData);
                   return resolve(true);

      } else {
        return resolve(false);
        }
    }).catch((error) => {
      console.error(error);
      return reject(error);
    });







});

return promise;



}


function TabMaker(counter,TabData, userData){
       var  downloadNameOnEyes  = userData.name+'_Plugin';
       var typeNAme = " Pendro AI Plugin";
        if(userData.tabType == 0){
               downloadNameOnEyes = userData.name;
               downloadNameOnEyes = "Pendro AI";
               typeNAme = "Pendro AI  <br> Desktop software For Examination <br> Windows version";
        }

  TabData+= `  <tr>
                <td><div style="text-align: center;">
                  <img src="../images/${userData.name}.png" width="50px" height="50px"> <br>${userData.name}
                <br>
          Type: ${typeNAme}
                </div></td>
                <td>
                  Size &nbsp;  &nbsp; <span >${userData.fileSize}</span><br>
                   Version: &nbsp; <span>${userData.version}</span> <br>
                  Realeased on : <br> <span >${getDateStanderd(userData.date)}</span><br>

                
                </td>
                <td colspan="2" style="color:red; text-align: center;">
                    <br>
                     <button password="${userData.zipPassword}"  id="downloadButton${counter}"
                     > 
                       Download  ${downloadNameOnEyes} Zip file </button> 

                </td>
             
                
            </tr>
`
  downloaderMarker("downloadButton"+counter,userData.name,userData.tabType,userData.url);
return TabData;
}




function getDateStanderd(dateNumber){
  const date = new Date(dateNumber); 
const day = date.getDate(); // Day of the month
const month = date.getMonth() + 1; // Month (0-11, so +1 for correct month)
const year = date.getFullYear(); // Year

//console.log(`Day: ${day}, Month: ${month}, Year: ${year}`);

return `Day: ${day}, Month: ${month}, Year: ${year}`;
}



function downloaderMarker(downloadButtonId,fileName,tabType, downloadUrlFromFirebase){


  document.addEventListener("loadedData",e=>{

     document.getElementById(downloadButtonId).addEventListener("click",e=>{


          
              

          if(tabType >= 1){
          fileName = fileName+"Degreatcode ICT LTD online classSoftwarePlugin.zip";
            }else{
              fileName = fileName+".zip";
            }

          (async () => {
            try {
                // Create a reference to the ZIP file in Firebase Storage
                const zipFileRef = storageRef(storage, downloadUrlFromFirebase);

                // Get the download URL
                const downloadURL = await getDownloadURL(zipFileRef);

                // Create a temporary anchor element to trigger the download
                const a = document.createElement('a');
                a.href = downloadURL;
                a.download = fileName; // Optional: Specify a default filename for the download
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);

              alert("ZIP file downloaded successfully! \n "+fileName);

            } catch (error) {
                console.error("Error downloading ZIP file:", error);
                alert("Error downloading file. Check here for details. \n Error : "+error);
            }
        })();


     });


  });

 

}


