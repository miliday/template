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