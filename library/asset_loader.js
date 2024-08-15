function my_clone(item) {
    return JSON.parse(JSON.stringify(item))
}

class asset_loader {
    constructor() {
        // maps number loaded to an array of callbacks
        this.callbacks = {}
        this.images = {}
    }
    load_image(image_name) {
        var im = new Image()
        this.images[image_name] = im
        im.src = image_name
        return new Promise(resolve=>{im.onload = resolve})
    }
    // resource_list is ordered by importance
    // resources needed earlier in the game should be first
    // index of resource in the array is used in checks
    set_resources(resource_list, delayed) {
        this.loader_state = "initialized"
        this.resource_list = resource_list
        this.delayed = delayed
        if(!delayed) {
            this.start_loading()
        }
    }
    async start_loading() {
        var to_load = my_clone(this.resource_list)
        console.log("files to load: " + to_load)
        this.loader_state = "loading"
        for(var file_i in to_load) {
            var file = to_load[file_i]
            console.log("loading: " + file)
            await this.load_image(file)
            if(file_i in this.callbacks) {
                for(var callback of this.callbacks[file_i]) {
                    callback()
                }
            }
        }
        console.log("finished loading")
        this.loader_state = "loaded"
    }
    add_callback_after_loading(n, callback) {
        if(!(n in this.callbacks)) {
            this.callbacks[n] = []
        }
        this.callbacks[n].push(callback)
    }
}
