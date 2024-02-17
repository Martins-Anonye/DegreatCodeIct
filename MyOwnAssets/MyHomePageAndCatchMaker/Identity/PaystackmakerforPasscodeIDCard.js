
var paystack_key;



var electric_email;
var Elastic_Password;
var electric_user_name;


(function () {
    // console.log(+"Yes User Data " + data); //loading Localdata.json file that
    paystack_key = data.Paystack_Detail[0].paystack_test_Key;

})();


(function () {
    // console.log(data); //loading Localdata.json file that
    // was added in the head of html


    electric_email = data.Electric_Email_Data[0].server_Verified_Email;
    electric_user_name = data.Electric_Email_Data[0].Electric_Verify_Username;
    Elastic_Password = data.Electric_Email_Data[0].Elastic_Password_For_Verified_Email;


})();



Promise.all([

    //online resources loading

    loadScript("https://smtpjs.com/v3/smtp.js", checkScriptIsLoaded("Electric Email Data Loaded")),
    loadScript("https://cdn.jsdelivr.net/npm/sweetalert2@9", checkScriptIsLoaded("SMS Data Loaded")),
    loadExternalCSSFromInternet("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css", "Sms alert style loaded"),
    loadScript("https://js.paystack.co/v1/inline.js", checkScriptIsLoaded("paystack module loaded")),

    //local resources loading

    // loadScript("../../database/Localdata.json", checkScriptIsLoaded("Local Data Loaded")),

    //var data = "../database/Localdata/";
]).then(() => {


})


function checkScriptIsLoaded(ScriptName) {
    console.log(ScriptName + " Has been Loaded Successfully");
}
function loadScript(url, callback) {
    // Adding the script tag to the head as suggested before
    // body or head
    var head = document.getElementsByTagName("head")[0];
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;

    // Then bind the event to the callback function.
    // There are several events for cross browser compatibility.
    script.onreadystatechange = callback;
    script.onload = callback;

    // Fire the loading
    head.appendChild(script);
}

function loadExternalCSSFromInternet(url, fileName) {
    var element = document.createElement("link");
    element.setAttribute("rel", "stylesheet");
    element.setAttribute("type", "text/css");
    element.setAttribute("href", url);
    document.getElementsByTagName("head")[0].appendChild(element);


    element.onload = function () {

        //resolve();

        console.log(fileName + ' CSS has loaded!');
    };


}


export function payWithPaystack(email, amount, name, globalId, passcord, expireOn) {
    //e.preventDefault();

    console.log("Key access :" + paystack_key);
    let handler = PaystackPop.setup({
        key: paystack_key, // Replace with your public key
        email: email,
        firstname: name,
        lastname: globalId,
        amount: amount * 100,
        message: "<h5> DegreatCode Passcode Payment </h5>",
        currency: 'NGN', // Use GHS for Ghana Cedis or USD for US Dollars

        ref: '' + Math.floor((Math.random() * 1000000000) + 1), // generates a pseudo-unique reference. Please replace with a reference you generated. Or remove the line entirely so our API will generate one for you
        // label: "Optional string that replaces customer email"
        //meta data is extral information your want to include, this is optional. its accessable by custom_field
        /*  meta: {
             custom_field: [
                 {
                     first_name: "My Data",
                     last_name: "myrest",
                     purpose: purpose
                 }
             ]
         },
  */
        onClose: function () {
            CustomAlertFrom_sweetalert2_API_Method1("Close Box", "close ?", "question");

        },
        callback: function (response) {
            // this callback scope can only access response data.
            // any value or variable comming outside from this scope is not accessible
            //use browser cache or browser localstorage to transmit data that is not recorded with-in respond-data of paystack
            // log the respond in the consle to see variable you can access in response data.
            // variable you can use here are variable that you declared here.

            console.log(response);

            let callback_refID = '\n Payment  Reference: ' + response.reference;




            // similar behavior as an HTTP redirect
            // window.location.replace("http://stackoverflow.com");

            // similar behavior as clicking on a link
            // window.location.href = `paymentcongratulations.html?urlrefid=${callback_refID}&messagedata=${othermessage}`;

            //window.location.href = "paymentcongratulations.html";


            //  var url = `paymentcongratulations.html?urlrefid=${callback_refID}&Payment_Status=${response.message}`;

            console.log(url);
            //CustomAlertFrom_sweetalert2_API_Method4(url);
            var body = " Your payment reference identity is : " + callback_refID + ".  Your Passcord is : <h3> <b> " + passcord + "</b></h3> expire on : " + expireOn;
            var subject = "DegreatCode ICT Passcode Payment for ID Card  ";
            sendEmail(email, body, subject);

        }
    });

    handler.openIframe();
}


function sendEmail(destEmail, MessageBody, subject) {
    // e.preventDefault();
    Email.send({



        //Using  elasticemail. webaddress:  https://elasticemail.com/
        // (1)Start,  verify donmain, verify email (i dont own a domain), 
        //(2) return to settings, smtp -> create credential, username= email address, create,
        //(3) COPY THE INFORMATION TO THE CODE BELLOW

        Host: "smtp.elasticemail.com",

        Username: electric_user_name, // electrify verified  user name
        Password: Elastic_Password, //electrify  password
        To: destEmail,
        From: electric_email, // electrify  verified user name
        Subject: subject,
        Body: MessageBody
    }).then(
        // message => alert("mail sent successfully: " + message)

        message => {
            CustomAlertFrom_sweetalert2_API_Method1("Email Messanger", "Payment-Mail Sent Successfully", "success");
        }
    );
}



export function CustomAlertFrom_sweetalert2_API_Method1(title, message, type) {
    // Make a simple alert 
    // with the given text 
    Swal.fire(
        //'Hey!',
        title,

        // 'Welcome to GeeksForGeeks',
        message,

        // 'success'
        type
    );
}

export function checkEmailData(emailValue) {
    var isEmailIsChecked = false;
    // emailValue = document.getElementById('email-address').value;
    // var emailValue = email.value;
    var atIndex = emailValue.indexOf("@");
    var dotIndex = emailValue.lastIndexOf(".");
    console.log(atIndex);
    console.log(dotIndex);
    //@ cant start email meaning index is greater than 0, And Position of @ is less than . position
    //Meaning @ comes befor .
    if ((atIndex > 0) && (atIndex < dotIndex)) {
        var comExtractor = emailValue.slice(dotIndex, emailValue.length);
        console.log(comExtractor);
        var dotcomdataLower = comExtractor.toLowerCase();
        if (dotcomdataLower == ".com") {
            //document.getElementById("errordata").style.visibility = "hidden";
            isEmailIsChecked = true;
        } else {

            CustomAlertFrom_sweetalert2_API_Method1("Wrong Email ", "Email Not Valid, add .com", "error");
            isEmailIsChecked = false;
        }

    } else {
        CustomAlertFrom_sweetalert2_API_Method1("Wrong Email ", "Email Not Valid", "error");

        isEmailIsChecked = false;
    }

    return isEmailIsChecked;
}