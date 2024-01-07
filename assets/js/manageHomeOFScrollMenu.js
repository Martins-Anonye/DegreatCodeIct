var hscroll = document.getElementsByClassName("hscroll")[0];

var leftscrollmenu = document.getElementsByClassName("leftscrollmenu")[0];
var rightscrollmenu = document.getElementsByClassName("rightscrollmenu")[0];


 var maxScroll =  hscroll.scrollWidth-hscroll.clientWidth;
var steps = 0;


rightscrollmenu.addEventListener("click",function(){
    
   
   
    //console.log(maxScroll);
    if(steps >= maxScroll ){
        //we hide right button
              rightscrollmenu.style.display ="none";
     leftscrollmenu.style.display ="inline-block";
    }else{
        // we increase and scroll right

            steps += 100;
            hscroll.scrollLeft =steps;

        // we keep showing both button
         leftscrollmenu.style.display ="inline-block";
            rightscrollmenu.style.display ="inline-block";

   
    }
    
});

leftscrollmenu.addEventListener("click",function(){
   
    
    if(steps <= 0 ){
//    we hide left button
    leftscrollmenu.style.display ="none";
     rightscrollmenu.style.display ="inline-block";
    }else{
        // wedecrease it and scroll left
        steps -= 100;
    hscroll.scrollLeft = steps;
       // we keep showing both button
         leftscrollmenu.style.display ="inline-block";
            rightscrollmenu.style.display ="inline-block";

    }
    
    
});