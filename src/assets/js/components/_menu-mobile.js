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