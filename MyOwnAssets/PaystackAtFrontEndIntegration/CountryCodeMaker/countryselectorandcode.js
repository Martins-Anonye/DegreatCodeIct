document.onreadystatechange = function () {


    (function () {
        console.log(countryCodeAndPhoneCode); //loading Localdata.json file that
        // was added in the head of html


        var dropwdownbtn = `<div class="select-sim" id="select-color">
                   <div class="options" id="myoptionholder">
        </div > </div > `;

        //since no country is selected yet, it remain false;

        localStorage['dgcict_IsCountrySelected'] = "false"; // local storag  can hold string data

        var countrySelectorDiv = document.getElementById("countrySelector");
        countrySelectorDiv.innerHTML = dropwdownbtn;
        var myoptionholder = countrySelectorDiv.getElementsByClassName("options"); //myoptionholder

        //only the checked should be activated_or_displayed after selection
        var option = `<div class="option">
        <input type="radio" name="color" value="" id="color-red" checked />  
        <label for="color-red"  style="background-color:gray" >
              <img src="" alt="" width="30px" height="20px" style="visibility:hidden"/>
             Select an option 
        </label>
        </div>`;

        for (var a = 0; a < countryCodeAndPhoneCode.length; a++) {
            console.log(countryCodeAndPhoneCode[a].isoCode);


            option = option + `<div class="option">
            <input type="radio" name="color" value="" id="color-red"  />
            <label for="color-red">
             <img src='${countryCodeAndPhoneCode[a].flag}' width="30px" height="20px"/>  ${countryCodeAndPhoneCode[a].name}
            </label>
            </div>`;


        }
        myoptionholder[0].innerHTML = option;

        executeClickEvent(countryCodeAndPhoneCode);

    })();
}


function executeClickEvent(arrayData) {
    var g = document.getElementById('myoptionholder');



    for (var i = 0, len = g.children.length; i < len; i++) {
        (function (index) {
            g.children[i].onclick = function () {

                // alert(index);
                //we jump index 0, since index zero is for displaying of data
                if (index > 0) {
                    removeBackgroundFromUnselectedOption_And_AddColorToSelectedONE(g, index, "brown");

                    // we chack the  first data
                    // we update the first element, Since its use to display selected data
                    var updateImageAndCountryName = `<img src="" alt="" width="30px" height="20px"/>${arrayData[index - 1].name}`;

                    // we save it in a local strorage of the web browser. And Its can only hold string data
                    localStorage['dgcict_countryName'] = arrayData[index - 1].name;
                    localStorage['dgcict_countrydialCode'] = "" + arrayData[index - 1].dialCode;
                    localStorage['dgcict_countryIndexNo'] = "" + arrayData[index - 1].dialCode;
                    localStorage['dgcict_IsCountrySelected'] = "true"; // local storage can hold string data


                    g.children[0].getElementsByTagName("label")[0].innerHTML = updateImageAndCountryName;



                    g.children[0].getElementsByTagName("img")[0].src = arrayData[index - 1].flag;
                    g.children[0].getElementsByTagName("img")[0].style.visibility = "visible";
                    //g.children[index].style.backgroundColor = "brown";
                    document.getElementById("PhoneNumber_phodialcode").value = arrayData[index - 1].dialCode;
                    document.getElementById("errordata").style.visibility = "hidden";


                }


            }
        })(i);

    }
}

function removeBackgroundFromUnselectedOption_And_AddColorToSelectedONE(obj, ignorNum, selectedDataColor) {
    for (var i = 0, len = obj.children.length; i < len; i++) {


        obj.children[i].style.backgroundColor = "white";// we rmove background color

    }
    obj.children[ignorNum].style.backgroundColor = selectedDataColor;

}

/* 
Yes, you can use SVG-file inside image tag in SVG! But this tag does not have src attribute. This attribute is from HTML img tag.

Inside image tag you have to use href attribute or also xlink:href attribute (but it is deprecated since SVG 2) for this purpose.

<svg width="50" height="150">       
      <image href="https://developer.mozilla.org/static/platforms/mobile.d9737f9e22aa.svg" width="50"  height="150"/>
</svg> */