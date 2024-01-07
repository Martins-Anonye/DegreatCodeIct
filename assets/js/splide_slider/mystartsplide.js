document.addEventListener('DOMContentLoaded', function () {
                    //  var splide = new Splide('.splide');

                    var splide = new Splide('.splide', {
                        type: 'loop',
                        autoplay: 'play',
                        perPage: 1,
                    });


                    splide.on('autoplay:playing', function (rate) {
                        //console.log(rate); // 0-1
                    });
                    splide.mount();
                });