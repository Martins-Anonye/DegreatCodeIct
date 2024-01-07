function delateRoll_ManageCartLibrary_CartRegRow_FromCartTableUsingCartDeleteButton() {
    var cartTable = document.getElementById("cartTable");

    var cartTableRows = cartTable.rows;
    var cartTableBody = document.getElementById("cartTableBody");

    (function () {
        console.log("Displaying Database \n" + programPackage); //loading Localdata.json file that

        // was added in the head of html
        Array.from(cartTableRows).forEach(row => { //row = tr
            // var row = cartTableRows[a];
            var cartTableRowsCell = row.cells;

            if (row.cells.length > 6) {//  if the row have upto 7  column // at sixth index that is sevent col
                //not all the row have delete button
                var delbtn = row.getElementsByTagName('img')[0];
                if (delbtn != null) {

                    var columnCounter = 0;
                    const cells = Array.from(row.cells);

                    cells.forEach(cell => {


                        if (columnCounter == 2) {//at 3rd column that 2nd index //cart Library
                            var priceSpan = cell.getElementsByTagName("span");
                            cell.getElementsByTagName('button')[0].addEventListener('click', function () {
                                var packageCode = cell.getElementsByTagName('label')[0];
                                var data = row.cells[1].innerText;
                                Swal.fire(
                                    //'Hey!',
                                    "Library and Material Notification",

                                    // 'Welcome to GeeksForGeeks',
                                    "Library , Materials,Textbook, Video, Guide and Handout will be forwarded to you after your registration for " + data + "  (" + packageCode.innerText + ")",

                                    'success'

                                );
                            });

                        }
                        if (columnCounter == 5) {//at 6 column that 5th index // cart regRow
                            cell.getElementsByTagName('button')[0].addEventListener('click', function () {

                                transferRowDataForRegistration(row);


                            });

                            var checkBox = cell.getElementsByTagName('input')[0];
                            checkBox.disabled = true;

                        }
                        /*
                            if (cells.length > 2 && columnCounter == 3) { //WE CHECK IF THE ROW HAVE MORETHAN 2 TD (COLUMN)
                                // console.log("Row Check A " + cartTableRows[a].cells[3]);
                                price = +(row.children[3].innerText);
                                console.log("Row Check B " + price);
                                
                                    if (!isNaN(price)) {
                                        priceArray[row.rowIndex] = price;
                                        console.log("Deleted Price  " + row.rowIndex + " | " + priceArray[row.rowIndex]);
                                
                                        } 
                        }*/
                        var price = getPriceFromTableColumn(row);


                        if (columnCounter == 6) {// at sixth index that is sevent col
                            addEventToDesc(cartTableRows, row);
                            displayImageCaptureFullPopUp(row);

                            cell.getElementsByTagName('img')[0].addEventListener('click', function () {
                                // The row index  at which it was in the original table is not same as at the CartTable
                                // And Arrange will scarter when any item is deleted from cart table.
                                // var clonedRow = cartTableBody.getElementsByClassName(`clonedRow${cartTableRows.rowIndex}`); // we get the row element
                                //And using increament variable to creart index for cartTable at the original table may  
                                //cos problem (row.rowIndex will scarter) when any item is deleted from cart table so we use original table sn which is unique and constant across
                                // both cart table and original table.


                                //we use table sn as the index

                                var cartRowIndexToBeUseByCart = row.cells[0].getElementsByTagName('span')[0].innerText;

                                console.log("cart RowIndex " + cartRowIndexToBeUseByCart);


                                var myRowIndex = cartRowIndexToBeUseByCart;
                                console.log("cart My RowIndex " + cartRowIndexToBeUseByCart);






                                var clonedRow = document.getElementById(`clonedRow${myRowIndex}`); // we get the zeroIndex row element
                                //cartTable
                                if (clonedRow != null) {
                                    cartTableBody.removeChild(clonedRow);
                                    removePriceFromCardAndDecreamentCounter(price);

                                }


                                var clonedRowDesc = document.getElementById(`clonedRowDesc${myRowIndex}`); // we get the firstIndex row element
                                if (clonedRowDesc != null) {
                                    cartTableBody.removeChild(clonedRowDesc);

                                }


                                var rowseperator = document.getElementById(`rowseperator${myRowIndex}`); // we get the SecondIndex row element
                                if (rowseperator != null) {
                                    cartTableBody.removeChild(rowseperator);

                                }
                                superPromoCalc();

                                /// we turn on add button on the original table row
                                var originatableButtonForSynchWithCartTb = document.getElementsByClassName(`originatableButtonForSynchWithCartTb${cartRowIndexToBeUseByCart}`)[0];
                                var originatableImgForSynchWithCartTb = document.getElementsByClassName(`originatableImgForSynchWithCartTb${cartRowIndexToBeUseByCart}`)[0];

                                originatableButtonForSynchWithCartTb.disabled = false;// +button  //enable
                                originatableImgForSynchWithCartTb.style.backgroundColor = "brown"; //we use color to show that is disabled
                                originatableButtonForSynchWithCartTb.style.backgroundColor = "white";

                            })


                        }

                        columnCounter++;

                    });//here

                }; //del
            }
        });
    })();
}