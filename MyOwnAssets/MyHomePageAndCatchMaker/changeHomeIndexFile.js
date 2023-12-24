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

}();




/* 
give the text holder id="typedwriter"  at <P> </p> tag

give the image id="homeImg"


  <script src="MyOwnAssets/database/advertdata.json"></script>
    <script src="MyOwnAssets/MyHomePageAndCatchMaker/typed.umd.js" type="text/javascript"> </script>
    <script src="MyOwnAssets/MyHomePageAndCatchMaker/changeHomeIndexFile.js"></script>

    */