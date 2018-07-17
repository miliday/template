/*
    ---------------------------------------------------------------
    Startup template creator - "Made with love, especially for you"
    ---------------------------------------------------------------
    nickname: Michael Holiday
    organization: "Totonis.com"
    date: 18.06.2018
    email: mr.michael.holiday@gmail.com
    ---------------------------------------------------------------
    parting words: "A clever person creates more opportunities than he finds."
    ---------------------------------------------------------------
*/

class ItemTrackingParent {
    constructor() {

        // default value variables
        this.place = $(document)
        this.eventPlace = $('body')
        this.offset = 0
    }
}

class ItemTracking extends ItemTrackingParent {

    constructor(config) {
        super()

        // accept config options
        this.trigger = $(config.trigger)
        this.callBack = config.callBack
        
        if (config.offset) {
            this.offset = parseInt(config.offset, 10)
        }

        if (config.place) {
            this.place = $(config.place)
        }

        // accept config options for custom event
        if (config.eventName) {
            this.eventName = config.eventName
        }
        if (config.eventPlace) {
            this.eventPlace = $(config.eventPlace)
        }

        // additional variable
        this.window = $(window)
        this.flagEvent = false

        // save class context 
        let object = this        

        // handler scroll
        this.handlerScroll(object)
    }

    // visibility action function
    visibilityAction(object) {
        
        // enable callBack function
        object.callBack()
    
        // call function custom event 
        object.customEvent(object)
    }

    // enable custom event
    customEvent(object) {

        // check necessity in custom event
        if (object.eventName && !object.flagEvent) {

            // inverse state flag
            object.flagEvent = !object.flagEvent

            // output a custom event on the place
            object.eventPlace.trigger(object.eventName)
        }
    }

    // enable scroll handler
    handlerScroll(object) {
        
        // handler scroll in place
        object.place.on('scroll', function() {
            
            // check element view in screen
            if (object.calcPosition(object) <= 0) {

                // run callBack function of config
                object.visibilityAction(object) 
            }
            
        })
    }

    // to calc position block in window
    calcPosition(object) {

        // get offset top trigger subtract window height and add offset of config
        let calc = object.trigger.eq(0).offset().top - object.place.scrollTop() - object.window.height() + object.offset

        return Math.round(calc)
    }
}
