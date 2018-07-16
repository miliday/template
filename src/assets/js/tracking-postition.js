/*
    **************************************************

    Modul for item tracking

    **************************************************

    nickname: Dmitriy_Corty
    organization: "Totonis.com"
    date: 25.06.2018
    email: dmitriy.corty@gmail.com

    **************************************************
*/


var ItemTracking = function(config){

    if (!config.blockForTracing){
        console.error('selector blockForTracing must be defined!');
        return
    };

    var $blockForTracing = $(config.blockForTracing);

    if ($blockForTracing.length === 0){
        console.error('Element with selector' + config.blockForTracing + ' is not defined!');
        return
    };
    
    var $offsetForAction = $(config.offsetForAction);

    if (!config.offsetForAction){
        $offsetForAction = [0]
    };

    if (!config.classToAdd){
        console.error('selector classToAdd must be defined!');
        return
    };

    var $classToAdd = config.classToAdd;

    window.onscroll = function(){
        getClass($blockForTracing[0], $classToAdd)
    }

    function getCoords(elem) { 
        var box = elem.getBoundingClientRect();
        return {
            top: box.top - window.innerHeight
        };
    }

    function getClass(elem, addClass){
        if(getCoords($blockForTracing[0]).top <= -parseInt($offsetForAction[0], 10)){
            elem.classList.add(addClass)
            elem.style.opacity = 1  //нужно что-то придумать по лучше
        }
        else if(getCoords($blockForTracing[0]).top >= -parseInt($offsetForAction[0], 10)){
            elem.classList.remove(addClass)
            elem.style.opacity = 0  //нужно что-то придумать по лучше
        }
        
    }
}
