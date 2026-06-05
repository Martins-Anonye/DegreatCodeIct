
firebase.initializeApp(configuration());

            // Get a reference to the storage service
            const storage = firebase.storage();


  function uploader(fileInputId,progresscounter,year,seasonTitle,fileNumber){


    var Mypromise = new Promise((resolve,rejected)=>{



        const progresscounterRst = document.getElementById(progresscounter);


        const fileInput = document.getElementById(fileInputId);
                const file = fileInput.files[0];

                var date = new Date();
                var mdate = date.getFullYear()+"_"+date.getMonth()+"_"+date.getDay();
                if (file) {
                    // Create a storage reference
                    const storageRef = storage.ref('Degreatcode ICT LTD online classExamSoftware/'+year+"/"+seasonTitle+"/"+mdate+"/"+file.name);

                    // Upload the file
                    const uploadTask = storageRef.put(file);

                    // Monitor upload progress
                    uploadTask.on('state_changed',
                        (snapshot) => {
                            // Observe state change events such as progress, pause, and resume
                            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                            var upld ='Upload is ' + progress + '% done';
                            console.log(upld);
                            progresscounterRst.innerText= upld+" : At file number = "+fileNumber;
                        },
                        (error) => {
                            // Handle unsuccessful uploads
                            console.error("Upload failed:", error);
                            return rejected("Upload failed  AT File Number : "+fileNumber+". Error:"+error);
                        },
                        () => {
                            // Handle successful uploads on complete
                            uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                               console.log('File available at', downloadURL);

                                return resolve(downloadURL);
                            });
                        }
                    );
                } else {
                    //console.log("No file selected.");

                 return rejected("No file selected At file number: "+fileNumber);

                }




    });
     

    return Mypromise;



}







function fileZieDisplayer(fileInputId, fileSizeDisplay){
var fileInput = document.getElementById(fileInputId);


    fileInput.addEventListener('change', (event) => {
  if (event.target.files.length > 0) {
    const file = event.target.files[0]; // Get the first selected file
    const fileSizeInBytes = file.size;

    // Convert bytes to a more readable format (e.g., KB, MB)
    let fileSizeFormatted;
    if (fileSizeInBytes < 1024) {
      fileSizeFormatted = `${fileSizeInBytes} bytes`;
    } else if (fileSizeInBytes < 1024 * 1024) {
      fileSizeFormatted = `${(fileSizeInBytes / 1024).toFixed(2)} KB`;
    } else {
      fileSizeFormatted = `${(fileSizeInBytes / (1024 * 1024)).toFixed(2)} MB`;
    }

    fileSizeDisplay.textContent = `${fileSizeFormatted}`;
  } else {
    fileSizeDisplay.textContent = 'No file selected.';
  }
});
}

