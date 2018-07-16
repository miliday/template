class ScrollToBlock {
      constructor(config) {
  
            // accept config options
            this.anchor             = $(config.anchor)
            this.trigger            = $(config.trigger)
            this.speed              = 800 || config.speed
            this.scrollContainer    = $(config.scrollContainer) || $('body, html') 

            console.log(this.anchor);
            console.log(this.trigger);
            console.log(this.speed);
            console.log(this.scrollContainer);
            
  
            // save class context 
            let object = this
      
            // request call handler
            this.clickHandler(object)
      }
      
      // scrolling to block
      scrollContainer(object) {

            // calc how much scroll
            let top = object.anchor[0].offsetTop;
            
            // enable croll to block
            object.scrollContainer.animate({scrollTop: top}, object.speed)
      }

      // handler call
      clickHandler(object) { 
            
            // check event click scroll btn
            object.trigger.click(function() {

                  // disable defoult action
                  event.preventDefault()

                  // scrolling to block
                  object.scrollContainer(object)
            })
      }
}