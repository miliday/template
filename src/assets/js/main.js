/*
    ---------------------------------------------------------------
    Startup template creator - "Made with love, especially for you"
    ---------------------------------------------------------------
    nickname: Michael Holiday
    organization: "Totonis.com"
    date: 18.06.2018
    email: mr.michael.holiday@gmail.com
    ---------------------------------------------------------------
    parting words: "Only fools go all the time ahead. Smart people go where they want."
    ---------------------------------------------------------------
*/

class SceneScrollControl {
    constructor(config) {

        // accept config options
        this.scene      = $(config.scene)
        this.tracking   = $(config.tracking)

        // additional variables
        this.saveState  = null
        this.flag       = false

        // save class context 
        let that = this

        // request call handler
        this.callHandler(that)
    }
    
    // call handler
    callHandler(that) {

        // handler disable block scroll
        that.tracking.on('sceneScrollOff', () => {
            that.scrollSceneOff(that)
        })
        
        // handler enable block scroll
        that.tracking.on('sceneScrollOn', () => {
            that.scrollSceneOn(that)
        })
    }

    // disable scrolling on the block
    scrollSceneOff(that) {

        // chekc state flag
        if (!that.flag) {
            
            // inverse state flag
            that.flag = !that.flag
            
            that.saveState = that.scene.css('overflow-y')
            that.scene.css('overflow-y', 'hidden')
        }
    }
    
    // enable scrolling on the scene
    scrollSceneOn(that) {

        // chekc state flag
        if (that.flag) {
    
            // inverse state flag
            that.flag = !that.flag
    
            // unlock scroll scene
            that.scene.css('overflow-y', that.saveState)
            that.saveState = null
        }
    }
}
class ScrollToBlockParent{
	constructor(){

		// default value variables
		this.place 	= $('html')
		this.offset = 0
		this.speed 	= 600
	}
}


class ScrollToBlock extends ScrollToBlockParent {
	constructor(config){

		super()

		// accept config options
		this.trigger 	= $(config.trigger)
		this.anchor 	= $(config.anchor)

		if (config.offset) {
			this.offset = config.offset
		}
		
		if (config.speed) {
			this.speed = config.speed
		}

		if (config.place) {
			this.place = $(config.place)
		}

		// save class context
		let that = this

		// handler click
		this.callHandler(that)
	}

    // enable event handler
	callHandler(that) {

		// enable click handler
		that.trigger.on('click', function() {

			// disable default action
			event.preventDefault()

			// enable scrolling
			that.scroll(that)
		})
	}
	
	// function for scrolling the place to the anchor
	scroll(that) {
		
		// Animation scroll
		that.place.animate({
			scrollTop: that.calcPosition(that)
		}, that.speed)
	}

	// Returns the required scrollTop from offsetTop
	calcPosition(that) {

		// calc variables
		let anchorOffsetTop = that.anchor.eq(0).offset().top
		let calc			= anchorOffsetTop - that.offset		
		return calc
	}
}
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

/*
    ---------------------------------------------------------------
    Startup template creator - "Made with love, especially for you"
    ---------------------------------------------------------------
    nickname: Michael Holiday
    organization: "Totonis.com"
    date: 18.06.2018
    email: mr.michael.holiday@gmail.com
    ---------------------------------------------------------------
    parting words: "In their youth they learn, and they understand it in old age."
    ---------------------------------------------------------------
*/

class MobileMenu {
    constructor(config) {

        // accept config options
        this.menu = $(config.menu)
        this.menuToggle = $(config.menuToggle)
        this.menuClassCollapse = config.menuClassCollapse
        this.menuToggleClassClose = config.menuToggleClassClose
        this.breakPoint = config.breakPoint

        // additional variables
        this.flag = false
        this.flagBgreak = false

        // save class context 
        let that = this

        // launch of the menu visibility toggle handler
        this.handlerToggle(that)
    }

    // handler toggle menu
    handlerToggle(that) {

        // track the click event of the toggle
        that.menuToggle.click(function () {

            // check whether the menu is open
            if (that.flag) {
                
                // close the menu
                that.menuClose(that)
            }
           
            // check whether the menu is close
            else if (!that.flag) {

                // open the menu
                that.menuOpen(that)
            } 
            
        })
    }

    // interface open menu
    menuOpen(that) {

        // inverse state flag
        that.flag = !that.flag

        // open menu
        that.menu.addClass(that.menuClassCollapse)
        that.menuToggle.addClass(that.menuToggleClassClose)

        // lock scroll body
        that.scrollControll('body', 'off')

        //enable the resize handler
        that.resizeHandler('on', that, 'body')
    }

    // interface close menu
    menuClose(that) {

            // inverse state flag
            that.flag = !that.flag

            // close menu
            that.menu.removeClass(that.menuClassCollapse)
            that.menuToggle.removeClass(that.menuToggleClassClose)

            // unlock scroll body
            that.scrollControll('body', 'on')

            // disable the resize handler
            that.resizeHandler('off', that, 'body')
    }

    // handler resize
    resizeHandler(command, that, place) {

        // сhecking the command to enable the handler
        if (command == 'on') {
            
            // enable the resize handler
            $(window).on('resize', function () {
            
                // the window width is greater than or equal to the breakpoint
                if ($(window).width() >= that.breakPoint && !that.flagBgreak) {
                    
                    // inverse state flag Break
                    that.flagBgreak = true
    
                    // unlock scroll body
                    that.scrollControll(place, 'on')
                } 
                
                // the width of the window is less than the breakpoint
                else if ($(window).width() < that.breakPoint && that.flagBgreak) {
                    
                    // inverse state flag Break
                    that.flagBgreak = false
    
                    // lock scroll body
                    that.scrollControll(place, 'off')
                }
            })
        } 
        
        // сhecking the command to disable the handler
        else if (command == 'off') {            

            // disable the resize handler
            $(window).off('resize')

            // false state flag Break
            that.flagBgreak = false
        }

    }

    // interface scroll controll
    scrollControll(place, command) {

        // checking the command to turn on the scroll
        if (command == 'on') {
            $(place).trigger('sceneScrollOn')

        } 
        
        // checking the command to turn off the scroll
        else if (command == 'off') {
            $(place).trigger('sceneScrollOff')
        }
    }
}
/*
    ---------------------------------------------------------------
    Startup template creator - "Made with love, especially for you"
    ---------------------------------------------------------------
    nickname: Michael Holiday
    organization: "Totonis.com"
    date: 18.06.2018
    email: mr.michael.holiday@gmail.com
    ---------------------------------------------------------------
    parting words: "Well-bred people do not talk in the community about the weather or about religion."
    ---------------------------------------------------------------
*/

class ModalWindow {
    constructor(config) {

        // accept config options
        this.title              = config.title
        this.contentElem        = $(config.contentElem)
        this.triggerOpen        = $(config.triggerOpen)
        
        // modal window conponents
        this.modal              = null
        this.triggerClose       = null
        this.modalContainer     = null
        this.modalTitle         = null

        // additional variables
        this.flag   = false
        
        // save class context 
        let that  = this

        // initialize modal window creation
        this.createModal(that)
        this.buildModal(that)

        // append modal in body
        $('body').append(this.modal)
        
        // toggling the visibility of the modal window
        this.handlerOpen(that)
        this.handlerClose(that)
    }

    // creating modal window components
    createModal(that) {

        // create modal
        that.modal = document.createElement('div')
        that.modal = $(that.modal)
        that.modal.addClass('b-modal-window')

        // create modal close btn
        that.triggerClose = document.createElement('div')
        that.triggerClose = $(that.triggerClose)
        that.triggerClose.addClass('b-modal-window__close')
        
        // create modal container
        that.modalContainer = document.createElement('div')
        that.modalContainer = $(that.modalContainer)
        that.modalContainer.addClass('b-modal-window__container')
        
        // create modal title
        that.modalTitle = document.createElement('div')
        that.modalTitle = $(that.modalTitle)
        that.modalTitle.addClass('b-modal-window__title')
        that.modalTitle.text(that.title)
        
        // create modal content wrapper
        that.modalContent = document.createElement('div')
        that.modalContent = $(that.modalContent)
        that.modalContent.addClass('b-modal-window__content')
    }
    
    // build a modal window of components
    buildModal(that) {

        // build modal
        that.modal.append(that.triggerClose, that.modalContainer)
        that.modalContainer.append(that.modalTitle, that.modalContent)
        that.modalContent.append(that.contentElem)
    }

    // handler open modal
    handlerOpen(that) {

        // check event click open btn
        that.triggerOpen.click(function() {           
            that.modalOpen(that)
        })
    }
    
    // handler close modal
    handlerClose(that) {
        
        // check event click close btn
        that.triggerClose.click(function() {
            that.modalClose(that)
        })

        // check event click close btn
        $(document).keydown(function(e) {
            console.log(123);
            
            // ESCAPE key pressed
            if (e.keyCode == 27) {
                that.modalClose(that)
            }
        })
    }
    
    // interface close modal
    modalClose(that) {
        
        // chekc state flag
        if (that.flag) {
            
            // inverse state flag
            that.flag = !that.flag
            
            // close modal
            that.modal.removeClass('b-modal-window_collapse')
            
            // unlock scroll body
            that.scrollControll('body', 'on')
        }
    }
    
    // interface open modal
    modalOpen(that) {
        
        // chekc state flag
        if (!that.flag) {
            
            // inverse state flag
            that.flag = !that.flag
            
            // open modal
            that.modal.addClass('b-modal-window_collapse')
            
            // lock scroll body
            that.scrollControll('body', 'off')
        }
    }

    // interface scroll controll
    scrollControll(place, command) {

        // check the received command
        if (command == 'on') {
            $(place).trigger('sceneScrollOn')

        } else if (command == 'off') {
            $(place).trigger('sceneScrollOff')
        }
    }
}
//# sourceMappingURL=main.js.map
