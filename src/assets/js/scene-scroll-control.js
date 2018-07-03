class sceneScrollControl {
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