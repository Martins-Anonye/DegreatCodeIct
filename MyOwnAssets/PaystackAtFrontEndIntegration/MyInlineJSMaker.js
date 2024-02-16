
$(document).ready(function () {

    //loading local file has been disable by web browser except modules.
    // you must use url attribute to load file. Or using <input> tag from html 
    // I discovered this update was discovered in 2023
    /*
     $.getJSON("Localdata.json", function (json) {
         // console.log(json); // this will show the info it in firebug console
         //const mjson = JSON.parse(json.a);
 
         return false;
     });
 
     */



    var loading = document.getElementById("loading");
    loading.innerHTML = "Page is Ready";
    loading.style.backgroundColor = "black";
    loading.style.color = "white";

});

var loading = document.getElementById("loading");
loading.onload = function () {
    loading.innerHTML = "Page is loading";
    loading.style.backgroundColor = "black";
};


var json = function () {
    var jsonTemp = null;
    $.ajax({
        'async': false,
        // 'url': "https://api.npoint.io/2d34f45ed824afaaea07", //working
        // 'url': "Localdata.json", // accessing local data has been disabled by all web browser except <input> tag of HTML and except module javascript
        'success': function (data) {
            jsonTemp = data;
            console.log(data); // this will show the info its in firebug console
            //const mjson = JSON.parse(data.a);
        }
    });
    return jsonTemp;
}();

//const mjson = JSON.parse(json.a);

// obj.employees[1].firstName + " " + obj.employees[1].lastName;



var paystack_key;

(function () {
    console.log(data); //loading Localdata.json file that
    // was added in the head of html

    paystack_key = data.Paystack_Detail[0].paystack_test_Key;

})();

//paymentForm.addEventListener("submit", sendEmail, false);

/*
document.addEventListener(event, function, Capture)

You can add many event listeners to the document:

document.addEventListener("click", myFunction1);
document.addEventListener("click", myFunction2);

You can add different types of events:

document.addEventListener("mouseover", myFunction);
document.addEventListener("click", someOtherFunction);
document.addEventListener("mouseout", someOtherFunction);

document.addEventListener("click", function() {
  myFunction(p1, p2);
});

document.addEventListener("click", function(){
  document.body.style.backgroundColor = "red";
});

Using the removeEventListener() method:

// Add an event listener
document.addEventListener("mousemove", myFunction);

// Remove event listener
document.removeEventListener("mousemove", myFunction);

// note: any function with no or one argument can be done as show bellow
myFunction(e){}


document.addEventListener("click", myFunction); // this advisible when you wanna control form  default actions like action-url by using e.preventDefault() 
also mean myFunction();
that is onclick="validateAndPay();"
*/



document.getElementById("errordata").style.backgroundColor = "white";
document.getElementById("errordata").style.color = "red";
document.getElementById("errordata").style.visibility = "hidden";


var emailtag = document.getElementById('email-address');
clearErrorDataWhenUserIsEnter(emailtag);
emailtag.addEventListener("focusout", checkEmailData);

var isEmailIsChecked = false;
var emailValue;
function checkEmail() {
    emailValue = document.getElementById('email-address').value;


    if (!simpleValidEmail(emailValue)) {

        document.getElementById("errordata").innerHTML = "Please provide a valid email";
        document.getElementById("errordata").style.visibility = "visible";

        isEmailIsChecked = false;

        console.log("email is not valid");
        return;
    } else {
        document.getElementById("errordata").style.visibility = "hidden";

        isEmailIsChecked = true;
    }
}
function checkEmailData() {
    emailValue = document.getElementById('email-address').value;
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
            document.getElementById("errordata").style.visibility = "hidden";
            isEmailIsChecked = true;
        } else {

            document.getElementById("errordata").innerHTML = "Email Not Valid, add .com";
            document.getElementById("errordata").style.visibility = "visible";
            isEmailIsChecked = false;
        }

    } else {
        document.getElementById("errordata").innerHTML = "Email Not Valid";
        document.getElementById("errordata").style.visibility = "visible";
        isEmailIsChecked = false;
    }


}

var fnametag = document.getElementById("first-name");

clearErrorDataWhenUserIsEnter(fnametag);

fnametag.addEventListener("focusout", checkFirstName);
var isFirstNameIsChecked = false;
var fname;
function checkFirstName() {

    fname = document.getElementById("first-name").value;

    if (fname.length < 2) {
        // console.log("Last Name is Not valid");
        document.getElementById("errordata").innerHTML = "First Name  Not valid";
        document.getElementById("errordata").style.visibility = "visible";

        isFirstNameIsChecked = false;

    } else {
        // we check if user combine text and number
        for (var a = 0; a < fname.length; a++) {
            //  console.log(fname[a]);
            var intName = fname[a]; //
            if (!isNaN(+intName)) {

                document.getElementById("errordata").innerHTML = "First Name  can't contain number";
                document.getElementById("errordata").style.visibility = "visible";
                isFirstNameIsChecked = false;
                // alert("number");
                break;

            } else {
                isFirstNameIsChecked = true;

                document.getElementById("errordata").style.visibility = "hidden";

            }

        }
    }


}


var lastnametag = document.getElementById("last-name");
clearErrorDataWhenUserIsEnter(lastnametag);

lastnametag.addEventListener("focusout", checkLastName);

var isLastNameChecked = false;
var lastname;
function checkLastName() {
    lastname = document.getElementById("last-name").value;

    if (lastname.length < 2) {
        // console.log("Last Name is Not valid");
        document.getElementById("errordata").innerHTML = "Last Name  Not valid";
        document.getElementById("errordata").style.visibility = "visible";

        isLastNameChecked = false;

    } else {
        // we check if user combine text and number
        for (var a = 0; a < lastname.length; a++) {
            //  console.log(fname[a]);
            var intName = lastname[a]; //
            if (!isNaN(+intName)) {

                document.getElementById("errordata").innerHTML = "Last Name  can't contain number";
                document.getElementById("errordata").style.visibility = "visible";
                isLastNameChecked = false;
                // alert("number");
                break;

            } else {
                isLastNameChecked = true;
                document.getElementById("errordata").style.visibility = "hidden";

            }

        }
    }
}

var phoneNumbertag = document.getElementById("PhoneNumber");
clearErrorDataWhenUserIsEnter(phoneNumbertag);

phoneNumbertag.addEventListener("focusout", checkPhoneNumber);

var isNumberChecked = false;
var phoneNumber;
function checkPhoneNumber() {
    phoneNumber = document.getElementById("PhoneNumber").value;
    // we check if user combine text and number

    // we need number not text
    for (var a = 0; a < phoneNumber.length; a++) {
        //  console.log(phoneNumber[a]);

        if (isNaN(phoneNumber)) {

            document.getElementById("errordata").innerHTML = "Phone Number  can't contain text";
            document.getElementById("errordata").style.visibility = "visible";
            isNumberChecked = false;
            // alert("number");
            break;

        } else {

            //no plus is ten + Countrycode = 11
            if (phoneNumber.length < 10) {
                document.getElementById("errordata").innerHTML = "Phone number not completed";
                document.getElementById("errordata").style.visibility = "visible";
                isNumberChecked = false;
            }
            else if (phoneNumber.length > 11) {
                document.getElementById("errordata").innerHTML = "Phone number digit have exceed";
                document.getElementById("errordata").style.visibility = "visible";
                isNumberChecked = false;
            }
            else {

                var dgcict_IsCountrySelected = localStorage['dgcict_IsCountrySelected']; // local storag  can hold string data

                if (dgcict_IsCountrySelected == "false") {
                    document.getElementById("errordata").innerHTML = "Country Name Not Selected  !!";
                    document.getElementById("errordata").style.visibility = "visible";
                    isNumberChecked = false;
                } else {

                    isNumberChecked = true;
                    document.getElementById("errordata").style.visibility = "hidden";
                }
            }


        }

    }
    //document.getElementById("errordata").style.visibility = "hidden";

    //isNumberChecked = true;

}




var amounttag = document.getElementById("amount");
clearErrorDataWhenUserIsEnter(amounttag);

amounttag.addEventListener("focusout", checkAmount);
var isAmountCheck = false;
var amountm;
function checkAmount() {
    amountm = (document.getElementById("amount").value) * 1;


    // (+amountm != null) && (+amountm > 0)
    //myIsNumericProcessor(amountm)

    if ((+amountm != null) && (+amountm > 0)) {

        document.getElementById("errordata").style.visibility = "hiden";

        isAmountCheck = true;


    } else {
        document.getElementById("errordata").innerHTML = "Provide valid amount";
        document.getElementById("errordata").style.visibility = "visible";
        isAmountCheck = false;
        // alert("number");
        return false;
    }

}


var purposetag = document.getElementById("purpose");
clearErrorDataWhenUserIsEnter(purposetag);

purposetag.addEventListener("focusout", checkPurpose);
var isPurposeChecked = false;
var purpose;


function checkPurpose() {
    purpose = document.getElementById("purpose").value;
    if (!isNaN(purpose)) {
        console.log("purpose is empty");
        document.getElementById("errordata").innerHTML = "Purpose  Not valid";
        document.getElementById("errordata").style.visibility = "visible";
        isPurposeChecked = false;
        return false;

    } else {
        document.getElementById("errordata").style.visibility = "hidden";
        isPurposeChecked = true;
        return true;

    }
}




const paymentForm = document.getElementById('paymentForm');
//paymentForm.addEventListener("submit", payWithPaystack, false);
paymentForm.addEventListener("submit", validateAndPay, false);

function validateAndPay(a) {

    a.preventDefault(); // Note, the function must have e variable as an arguement for this to work, the e can be any thing

    /*character e is a special windows-prototype variable
     that handles the action of the form 
     when the form try to submit-to url used in action
     attribute of the form.  If  e.preventDefault() is not declared,
     Form will keep trying to use action attribute. which will make 
     user inputed data that have been entered in the field
     to wipe off or got reset.
   */




    if (isEmailIsChecked == true && isFirstNameIsChecked == true && isLastNameChecked == true && isNumberChecked == true && isPurposeChecked == true && isAmountCheck == true) {

        //we store it inside browser local storage that accept only string
        localStorage['dgcict_purpose'] = purpose; // only strings 
        localStorage['dgcict_firstname'] = fname; // only strings
        localStorage['dgcict_lastname'] = lastname; // only strings
        localStorage['dgcict_amountm'] = amountm; // only strings
        localStorage['dgcict_PhoneNumber'] = localStorage['dgcict_countrydialCode'] + "" + PhoneNumber; // only strings
        localStorage['dgcict_student_email'] = emailValue; // only strings


        console.log("Paystack payment processor start");
        payWithPaystack();

        return true;
    }







}

function clearErrorDataWhenUserIsEnter(docid) {
    docid.addEventListener("keyup", function () {
        document.getElementById("errordata").innerHTML = "";


    });
}

function simpleValidEmail(email) {
    return email.length < 256 && /^[^@]+@[^@]+[A-Za-z0-9]{2,}\.[^@]+[A-Za-z0-9]{2,}$/.test(email);
};

function payWithPaystack() {
    //e.preventDefault();

    let handler = PaystackPop.setup({
        key: paystack_key, // Replace with your public key
        email: document.getElementById("email-address").value,
        firstname: document.getElementById("first-name").value,
        lastname: document.getElementById("last-name").value,
        amount: document.getElementById("amount").value * 100,
        message: purpose,
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


            var url = `paymentcongratulations.html?urlrefid=${callback_refID}&Payment_Status=${response.message}`;

            console.log(url);
            CustomAlertFrom_sweetalert2_API_Method4(url);

        }
    });

    handler.openIframe();
}








function CustomAlertFrom_sweetalert2_API_Method1(title, message, type) {
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

function CustomAlertFrom_sweetalert2_API_Method4(url) {
    //icon can be success, warning, question
    // you can use icon or image url
    Swal.fire({
        title: "Payment Completed Successfuly",
        text: "Click the button to continue",
        icon: "success",
        // imageUrl: "https://unsplash.it/400/200",
        showCancelButton: false,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Continue",
        allowOutsideClick: false
    }).then((result) => {
        if (result.isConfirmed) {
            /* Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
            }); */

            window.location.href = url;
        }
    });
}




