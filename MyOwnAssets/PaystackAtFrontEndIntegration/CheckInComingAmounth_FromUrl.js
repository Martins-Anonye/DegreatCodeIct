
checkAmountInUrl();
checkPurposeUrl();

function checkAmountInUrl() {


    var url = getUrlData("transAmounturl");
    url = url * 1; // we convert to number


    if ((url !== NaN) && (url != null) && (url > 0)) {
        var amountvar = document.getElementById('amount');
        amountvar.value = url;
        amountvar.style.color = "blue";
        amountvar.style.fontSize = "16px";


        amountvar.disabled = true;

    } else {

        if (url != '') {
            // show the amount box since an amount was not specified by GET

            document.getElementById('amount').disabled = false;
            document.getElementById('errordata').innerHTML = "Enter a valid amount";


        }
        else {
            // show the amount box since an amount was not specified by GET

            document.getElementById('amount').disabled = false;

        }
    }



}

function checkPurposeUrl() {
    var url = getUrlData("purposeurl");


    if (url != null) {
        var purposevar = document.getElementById('purpose');
        purposevar.innerHTML = url;
        purposevar.style.color = "blue";
        purposevar.style.fontSize = "16px";

        purposevar.disabled = true;


    }
    else {

        document.getElementById('purpose').disabled = false;

    }



}



function getUrlData(datakey) {
    var urlParameters = window.location.search; // get url starting from ?, not the link
    var searchParams = new URLSearchParams(urlParameters);
    var value = searchParams.get(datakey);
    return value;


}
