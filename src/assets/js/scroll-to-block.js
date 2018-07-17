class ScrollToBlockPositionParent{
	constructor(){

		// default value variables
		this.scrollContainer = $('body, html')
		this.position = 'top'
	}
}


class ScrollToBlockPosition extends ScrollToBlockPositionParent{
	constructor(config){

		super()

		// accept config options
		this.button = $(config.button)
		this.anchor = $(config.anchor)

		if(config.position){
			this.position = config.position
		}

		if(config.scrollContainer){
			this.scrollContainer = $(config.scrollContainer)
		}

		// save class context
		let object = this

		
		this.handlerClick(object)
		this.getCoords(object)
		this.positionOnScroll(object)
	}


	// learn how to scroll a lot
	getCoords(object){
        let box = object.anchor[0].getBoundingClientRect();
        return{
            center:     document.documentElement.scrollTop + box.top - (window.innerHeight / 2 - 40),
            top:        document.documentElement.scrollTop + box.top,
            bottom:     document.documentElement.scrollTop + box.top - (window.innerHeight - 80)
        }
    }        

    // comparison of transmitted offset values
	positionOnScroll(object){
        if (!object.position){
            object.position = object.getCoords(object).top
        }
        else if(object.position === 'center'){
            object.position = object.getCoords(object).center
        }
        else if(object.position === 'bottom'){
            object.position = object.getCoords(object).bottom
        }
        else if(object.position === 'top'){
            object.position = object.getCoords(object).top
        }
        return object.position
    }

    // enable click handler
	handlerClick(object){

		object.button.on('click', function(){
			object.scrollContainer.animate({scrollTop: object.positionOnScroll(object)}, 500)
		})
	}
}