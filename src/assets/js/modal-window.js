class modalWindow {
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
        let object  = this

        // initialize modal window creation
        this.createModal(object)
        this.buildModal(object)

        // append modal in body
        $('body').append(this.modal)
        
        // toggling the visibility of the modal window
        this.handlerOpen(object)
        this.handlerClose(object)
    }

    // creating modal window components
    createModal(object) {

        // create modal
        object.modal = document.createElement('div')
        object.modal = $(object.modal)
        object.modal.addClass('b-modal-window')

        // create modal close btn
        object.triggerClose = document.createElement('div')
        object.triggerClose = $(object.triggerClose)
        object.triggerClose.addClass('b-modal-window__close')
        
        // create modal container
        object.modalContainer = document.createElement('div')
        object.modalContainer = $(object.modalContainer)
        object.modalContainer.addClass('b-modal-window__container')
        
        // create modal title
        object.modalTitle = document.createElement('div')
        object.modalTitle = $(object.modalTitle)
        object.modalTitle.addClass('b-modal-window__title')
        object.modalTitle.text(object.title)
        
        // create modal content wrapper
        object.modalContent = document.createElement('div')
        object.modalContent = $(object.modalContent)
        object.modalContent.addClass('b-modal-window__content')
    }
    
    // build a modal window of components
    buildModal(object) {

        // build modal
        object.modal.append(object.triggerClose, object.modalContainer)
        object.modalContainer.append(object.modalTitle, object.modalContent)
        object.modalContent.append(object.contentElem)
    }

    // handler open modal
    handlerOpen(object) {

        // check event click open btn
        object.triggerOpen.click(function() {           
            object.modalOpen(object)
        })
    }
    
    // handler close modal
    handlerClose(object) {
        
        // check event click close btn
        object.triggerClose.click(function() {
            object.modalClose(object)
        })
    }
    
    // interface close modal
    modalClose(object) {
        
        // chekc state flag
        if (object.flag) {
            
            // inverse state flag
            object.flag = !object.flag
            
            // close modal
            object.modal.removeClass('b-modal-window_collapse')
            
            // unlock scroll body
            object.scrollControll('body', 'on')
        }
    }
    
    // interface open modal
    modalOpen(object) {
        
        // chekc state flag
        if (!object.flag) {
            
            // inverse state flag
            object.flag = !object.flag
            
            // open modal
            object.modal.addClass('b-modal-window_collapse')
            
            // lock scroll body
            object.scrollControll('body', 'off')
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