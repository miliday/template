/*
    **************************************************

    Modul for item tracking

    **************************************************

    nickname: {
        Dmitriy_Corty,
        Michael_Holiday
    }
    organization: "Totonis.com"
    date: 25.06.2018
    email: dmitriy.corty@gmail.com

    **************************************************
*/

var ScrollToBlockPosition = function(config){

	if (!config.anchor){
        console.error('selector Anchor must be defined!');
        return
    };

    var $anchor = $(config.anchor);
    if ($anchor.length === 0){
        console.error('Element with selector' + config.anchor + ' is not defined!');
        return
    };

	if (!config.button){
        console.error('button must be defined!');
        return
    };

    var $button = $(config.button);
    if ($button.length === 0) {
        console.error('Element with selector' + config.button + ' is not defined!');
        return
    };

    var $position = $(config.position);
    
    if (config.scrollContainer) {
        var $scrollContainer = $(config.scrollContainer);
    } else {
        var $scrollContainer = $('body, html');
    }
  
    if ($scrollContainer.length === 0) {
        console.error('Element "scrollContainer" is not defined!');
        return
    };  
    
    function getCoords(elem){
        var box = elem.getBoundingClientRect();
        return{
            center:     document.documentElement.scrollTop + box.top - (window.innerHeight / 2.1),
            top:        document.documentElement.scrollTop + box.top,
            bottom:     document.documentElement.scrollTop + box.top - (window.innerHeight * 0.9)
        }
    }        

    function positionOnScroll(){
        if (!config.position){
            $position = getCoords($anchor[0]).top
        }
        else if(config.position === 'center'){
            $position = getCoords($anchor[0]).center
        }
        else if(config.position === 'bottom'){
            $position = getCoords($anchor[0]).bottom
        }
        else if(config.position === 'top'){
            $position = getCoords($anchor[0]).top
        }
        return $position
    }

	$button.click(function(){
        event.preventDefault();
        $scrollContainer.animate({scrollTop: positionOnScroll()}, 500);
  	});
}