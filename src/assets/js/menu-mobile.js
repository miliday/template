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
        let object = this

        // launch of the menu visibility toggle handler
        this.handlerToggle(object)
    }

    // handler toggle menu
    handlerToggle(object) {

        // track the click event of the toggle
        object.menuToggle.click(function () {

            // check whether the menu is open
            if (object.flag) {
                
                // close the menu
                object.menuClose(object)
            }
           
            // check whether the menu is close
            else if (!object.flag) {

                // open the menu
                object.menuOpen(object)
            } 
            
        })
    }

    // interface open menu
    menuOpen(object) {

        // inverse state flag
        object.flag = !object.flag

        // open menu
        object.menu.addClass(object.menuClassCollapse)
        object.menuToggle.addClass(object.menuToggleClassClose)

        // lock scroll body
        object.scrollControll('body', 'off')

        //enable the resize handler
        object.resizeHandler('on', object, 'body')
    }

    // interface close menu
    menuClose(object) {

            // inverse state flag
            object.flag = !object.flag

            // close menu
            object.menu.removeClass(object.menuClassCollapse)
            object.menuToggle.removeClass(object.menuToggleClassClose)

            // unlock scroll body
            object.scrollControll('body', 'on')

            // disable the resize handler
            object.resizeHandler('off', object, 'body')
    }

    // handler resize
    resizeHandler(command, object, place) {

        // сhecking the command to enable the handler
        if (command == 'on') {
            
            // enable the resize handler
            $(window).on('resize', function () {
            
                // the window width is greater than or equal to the breakpoint
                if ($(window).width() >= object.breakPoint && !object.flagBgreak) {
                    
                    // inverse state flag Break
                    object.flagBgreak = true
    
                    // unlock scroll body
                    object.scrollControll(place, 'on')
                } 
                
                // the width of the window is less than the breakpoint
                else if ($(window).width() < object.breakPoint && object.flagBgreak) {
                    
                    // inverse state flag Break
                    object.flagBgreak = false
    
                    // lock scroll body
                    object.scrollControll(place, 'off')
                }
            })
        } 
        
        // сhecking the command to disable the handler
        else if (command == 'off') {            

            // disable the resize handler
            $(window).off('resize')

            // false state flag Break
            object.flagBgreak = false
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