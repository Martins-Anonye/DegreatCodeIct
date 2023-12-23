var appcartegorySelector = document.getElementById("appcartegorySelector");



var listOfCategory = data.appCategoryList;
var categoryOption = "<option> Select Packages</option>";
Array.from(listOfCategory).forEach(
    category => {
        //alert("check" + category.name);
        // if (categoryOption != null) {
        if (getUrlData("categoryDropdownlist") != null && getUrlData("categoryDropdownlist") == category.name) {
            categoryOption = `${categoryOption} <option selected>${category.name}</option>`;

        }
        else {
            categoryOption = `${categoryOption} <option>${category.name}</option>`;

        }
        // }
    }
);
appcartegorySelector.innerHTML = categoryOption;




appcartegorySelector.addEventListener("change", categoryChanged);
function categoryChanged(e) {
    e.preventDefault();
    window.location.href = `ListOfItemsToPurchase.html?categoryDropdownlist=${appcartegorySelector.value}`;
}


var homebtn = document.getElementById("homebtn");
homebtn.addEventListener("click", visiteHomePage);
function visiteHomePage(e) {
    e.preventDefault();
    window.location.href = programPackage.PageURL.HomePageURL;
}

var webhome = document.getElementById("webhome");
webhome.addEventListener("click", visitewebHomePage);
function visitewebHomePage(e) {
    e.preventDefault();
    window.location.href = programPackage.PageURL.WebsitePageURL;

}



var Androidhome = document.getElementById("Androidhome");
Androidhome.addEventListener("click", visiteAdroidHomePage);
function visiteAdroidHomePage(e) {
    e.preventDefault();
    window.location.href = programPackage.PageURL.AndroidPageURL;

}

var IOsHome = document.getElementById("IOsHome");
IOsHome.addEventListener("click", visiteIOsHomeHomePage);
function visiteIOsHomeHomePage(e) {
    e.preventDefault();
    window.location.href = programPackage.PageURL.IOsPageURL;

}


var contactus = document.getElementById("contactus");
contactus.addEventListener("click", visitecontactusPage);
function visitecontactusPage(e) {
    e.preventDefault();
    window.location.href = programPackage.PageURL.ContactUsURL;

}


