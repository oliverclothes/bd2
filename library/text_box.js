class text_box {
    // for now, just one-line centered
    constructor(font, border_9tile, y = 1, inner_padding = 1) {
        this.main_font = font
        this.border = border_9tile
        this.pad = inner_padding
        this.y = y
        
        addEventListener("click", (event) => {
            var scale = ctx.canvas.width / ctx.canvas.offsetWidth
            var x = scale * event.offsetX //- ctx.canvas.offsetLeft)
            var y = scale * event.offsetY //- ctx.canvas.offsetTop)
            if (x >= this.pos[0] && x < this.pos[0] + this.dims[0] &&
                y >= this.pos[1] && y < this.pos[1] + this.dims[1]) {
                console.log("clicked button")
                this.sound.play()
                if (this.click_callback) {
                    this.click_callback(event)
                }
            }
        })
        this.visible = true
    }
    set_visible(visible) {
        this.visible = visible
    }
    set_text(text) {
        this.text = text
    }
    set_sound(sound) {
        this.sound = sound
    }
    set_callback(click_callback) {
        this.click_callback = click_callback
    }
    draw(ctx) {
        if (this.visible) {
            var w = this.text.length * this.main_font.dims[0]
            var tw = this.border.get_tile_size()
            var h = this.main_font.dims[1]
            var text_x = Math.floor((ctx.canvas.width - w) / 2)
            this.pos = [text_x - tw - this.pad, this.y]
            this.dims = [w + 2 * tw + 2 * this.pad, h + 2 * tw + 2 * this.pad]
            this.border.draw(ctx, this.pos, this.dims)
            this.main_font.print(ctx, this.text, [text_x, this.y + tw + this.pad])
        }
    }
}