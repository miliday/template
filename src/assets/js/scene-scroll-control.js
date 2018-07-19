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
        let object = this

        // request call handler
        this.callHandler(object)
    }
    
    // call handler
    callHandler(object) {

        // handler disable block scroll
        object.tracking.on('sceneScrollOff', () => {
            object.scrollSceneOff(object)
        })
        
        // handler enable block scroll
        object.tracking.on('sceneScrollOn', () => {
            object.scrollSceneOn(object)
        })
    }

    // disable scrolling on the block
    scrollSceneOff(object) {

        // chekc state flag
        if (!object.flag) {
            
            // inverse state flag
            object.flag = !object.flag
            
            object.saveState = object.scene.css('overflow-y')
            object.scene.css('overflow-y', 'hidden')
        }
    }
    
    // enable scrolling on the scene
    scrollSceneOn(object) {

        // chekc state flag
        if (object.flag) {
    
            // inverse state flag
            object.flag = !object.flag
    
            // unlock scroll scene
            object.scene.css('overflow-y', object.saveState)
            object.saveState = null
        }
    }
}