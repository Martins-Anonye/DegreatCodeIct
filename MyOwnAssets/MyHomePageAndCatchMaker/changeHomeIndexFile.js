document.onreadystatechange = function () {
  var homeImg = document.getElementById("homeImg");
  homeImg.src = "MyOwnAssets/MyHomePageAndCatchMaker/Images/HomeIndexGif.gif";


  var typedwriter = document.getElementById("typedwriter");

  var typed = new Typed(typedwriter, {
    // strings: ["My Data Maker", "Micheal Data Killer"],
    strings: advert.advertdata,
    typeSpeed: 40,
    loop: true,
    backDelay: 900,
    backSpeed: 20,
  });

  // we have class of library, websitedev, mobiledev, onlinelive, desktopapp, embaddedpro, game, projectManagSys, forex, videoedit, digitmark



  var library = document.getElementsByClassName("library")[0];
  library.innerText = "?";
  var websitedev = document.getElementsByClassName("websitedev")[0];
  websitedev.innerHTML = getAmount(28);
  var mobiledev = document.getElementsByClassName("mobiledev")[0];
  mobiledev.innerHTML = getAmount(35);
  var onlinelive = document.getElementsByClassName("onlinelive")[0];
  onlinelive.innerText = "?";
  var desktopapp = document.getElementsByClassName("desktopapp")[0];
  desktopapp.innerHTML = getAmount(50);
  var embaddedpro = document.getElementsByClassName("embaddedpro")[0];
  embaddedpro.innerHTML = getAmount(51);

  var projectManagSys = document.getElementsByClassName("projectManagSys")[0];
  projectManagSys.innerHTML = getAmount(48);
  var forex = document.getElementsByClassName("forex")[0];
  forex.innerHTML = getAmount(49);

  var essential = document.getElementsByClassName("essential")[0];
  essential.innerHTML = getAmount(49);

  var graphics = document.getElementsByClassName("graphics")[0];
  graphics.innerHTML = getAmount(4);

  var datascience = document.getElementsByClassName("datascience")[0];
  datascience.innerHTML = getAmount(47);


  var game = document.getElementsByClassName("game")[0];
  game.innerHTML = "<span style=color:blue>" + getAmount(39) + "</span>";

  var videoedit = document.getElementsByClassName("videoedit")[0];
  videoedit.innerHTML = "<span style=color:blue>" + getAmount(6) + "</span>";


  var digitmark = document.getElementsByClassName("digitmark")[0];
  digitmark.innerHTML = "<span style=color:blue>" + getAmount(10) + "</span>";


  var identity = getUrlData("identity");
  if (identity != "" && identity != null && identity != " ") {
    //file:///C:/Users/DEGREATCODE%20ICT%20LTD/Documents/Dgc%20site/DGCBOOTSTRAP/index.html?identity=DGC100.008D0301108N005
    //alert("loading student url" + identity);
    var identityPageHTML = `dashboard.html?identity=${identity}`;

    window.location.href = identityPageHTML;
  }

  embadeYoutubeToWebpage();

}();

function getAmount(index) {
  var amt = "<strike>N</strike>" + programPackage.programs[index].price;
  return amt;
}

function getUrlData(datakey) {
  var urlParameters = window.location.search; // get url starting from ?, not the link
  var searchParams = new URLSearchParams(urlParameters);
  var value = searchParams.get(datakey);
  return value;
}


function embadeYoutubeToWebpage() {

  var morevideos = "<a href='https://www.youtube.com/channel/UCPWbEaPROm9VmZamuN6aN1A'><button>More Videos</button> </a>"


  var divToHoldYoutube = document.getElementsByClassName('youtube-col')[0];


  // To get the iframe code of your youtube video.To do this , Go to your youtube channel, select a video,   click on share , select embad video. 
  // copy the iframe code and replace the iframe section bellow with the new one.

  var youtubeChannel = `<div><iframe width="430" height="315" src="https://www.youtube.com/embed/5PoREReTaKQ?si=L_D4fjeCNi08x32c" title="DegreatCode Youtube Chanel Videos" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
</div>`;

  var CHANNELNAME = `UCPWbEaPROm9VmZamuN6aN1A`;  //channel id

  var subscriptionButton = `<div class="g-ytsubscribe" data-channelid="${CHANNELNAME}" ddata-layout="full" data-count="hidden" title="subscribe" ></div >`;

  var content = youtubeChannel + "<br> <button style='cursor:revert;'> <b>  Subscribe -->  </b>" + subscriptionButton + " </button> &nbsp &nbsp &nbsp" + morevideos;
  divToHoldYoutube.innerHTML = content;
  // for button to  work add this code inthe head 
  // <script src="https://apis.google.com/js/platform.js"></script>
}


/* 
give the text holder id="typedwriter"  at <P> </p> tag

give the image id="homeImg"


//in the mainHomePage badges  <span class="badge bg-primary cardbadge onlinelive">42</span> 
we have class of library, websitedev, mobiledev, onlinelive, desktopapp, embaddedpro, gameVideoDig, projectManagSys,forex
//use to load price in the mainHomePage  

<script src="https://apis.google.com/js/platform.js"></script>
<script src="MyOwnAssets/database/DGC price data.json"></script> 

 <script src="MyOwnAssets/database/advertdata.json"></script>

 
    <script src="MyOwnAssets/MyHomePageAndCatchMaker/typed.umd.js" type="text/javascript"> </script>
    <script src="MyOwnAssets/MyHomePageAndCatchMaker/changeHomeIndexFile.js"></script>

    */