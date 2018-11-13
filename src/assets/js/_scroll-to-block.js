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