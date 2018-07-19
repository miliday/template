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
        let that = this        

        // handler scroll
        this.handlerScroll(that)
    }

    // visibility action function
    visibilityAction(that) {
        
        // enable callBack function
        that.callBack()
    
        // call function custom event 
        that.customEvent(that)
    }

    // enable custom event
    customEvent(that) {

        // check necessity in custom event
        if (that.eventName && !that.flagEvent) {

            // inverse state flag
            that.flagEvent = !that.flagEvent

            // output a custom event on the place
            that.eventPlace.trigger(that.eventName)
        }
    }

    // enable scroll handler
    handlerScroll(that) {
        
        // handler scroll in place
        that.place.on('scroll', function() {
            
            // check element view in screen
            if (that.calcPosition(that) <= 0) {

                // run callBack function of config
                that.visibilityAction(that) 
            }
            
        })
    }

    // to calc position block in window
    calcPosition(that) {

        // get offset top trigger subtract window height and add offset of config
        let calc = that.trigger.eq(0).offset().top - that.place.scrollTop() - that.window.height() + that.offset

        return Math.round(calc)
    }
}
