
var makepaymentToServer = document.getElementById("makepaymentToServer");
makepaymentToServer.addEventListener('click', proceedPaymentAction);

var superpaymentdiscountpayment = document.getElementById("superpaymentdiscountpayment");
superpaymentdiscountpayment.addEventListener('click', proceedPaymentActionForSuperPromo);

function proceedPaymentAction() {

    var costreg = document.getElementById("costreg");

    var allCartedData = fetchCartData();

    var paymentPageHTML = `../PaystackAtFrontEndIntegration/paystackInlinePayment.html?transAmounturl=${+costreg.innerText}&purposeurl=${allCartedData}`;
    window.location.href = paymentPageHTML;
}

function proceedPaymentActionForSuperPromo() {

    var cartcountervalue = document.getElementById("cartcountervalue");
    var existingValue = +(cartcountervalue.innerText);
    var max = programPackage.superPromoDiscount.maxNoItems;

    var min = programPackage.superPromoDiscount.minNoItems;
    if (existingValue >= min && existingValue <= max) {
        var superpromoprice = document.getElementById("superpromoprice");

        var allCartedData = fetchCartData();

        var paymentPageHTML = `../PaystackAtFrontEndIntegration/paystackInlinePayment.html?transAmounturl=${+superpromoprice.innerText}&purposeurl=${allCartedData}`;
        window.location.href = paymentPageHTML;
    } else {
        Swal.fire(
            "Operation Denied",

            ` Only ${min} minimum and ${max} Maximum  number of items  are  allowed`,

            "error"
        );
    }






}
function fetchCartData() {
    var cartTable = document.getElementById("cartTable");
    var cartTableRows = cartTable.rows;
    var selectedData = new Array();
    var data;

    var rowcounter = 0;

    Array.from(cartTableRows).forEach(row => {
        //alert("Checking");

        console.log(row.rowIndex);

        if (row.rowIndex > 0 && row.cells.length > 2 && row.rowIndex != cartTableRows[cartTableRows.length - 1]) {
            var packageRowCounter = row.cells[0].getElementsByTagName("span")[0].innerText;


            var checkBox = row.cells[5].getElementsByTagName('input')[0];
            var onlineSupport = "No";
            if (checkBox.checked) {
                onlineSupport = "Yes";
            }

            if (data == null) {
                data = ` <br/> Name : ${row.cells[1].innerText}, Row No: ${packageRowCounter}, package_Code :${row.cells[2].innerText}, Price : ${row.cells[3].innerText}, Duration:${row.cells[4].innerText}, Support Online: ${onlineSupport}`;

            } else {
                data = `${data} <br/> Name : ${row.cells[1].innerText}, Row No: ${packageRowCounter}, package_Code :${row.cells[2].innerText}, Price : ${row.cells[3].innerText}, Duration:${row.cells[4].innerText}, Support Online: ${onlineSupport}`;
                //selectedData.push(rowcounter, data + "\n");
            }
            console.log(data);
            rowcounter++;
        }

    });

    return data;
}










// alert(selectedData);


/*  for (var a = 0; a < cartTableRows.length; a++) {
 
     var cells = cartTableRows[a];
 
 } */
