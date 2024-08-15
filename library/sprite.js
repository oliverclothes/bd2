function integer_check(stuff) {
    function isNumber(o) {
        return typeof o == "number" || (typeof o == "object" && o.constructor === Number);
    }
    for (var chunk of stuff) {
        if (isNumber(chunk)) {
            if (Math.floor(chunk) != chunk) {
                console.log("ERROR! NON INTEGER in INTEGER CHECK")
            }
        }
        else if(chunk.constructor === Array) {
            integer_check(chunk)
        }
        else {
            console.log("ERROR, can't check type")
        }
    }

}

// pos is stored as a float, then rounded to an integer at rendering
class sprite {
    constructor(image, image_offset_pos, dim, anims, ticks_per_frame, pos) {
        if (!("idle" in anims)) {
            anims["idle"] = [0]
            console.log("WARNING: no idle animation defined")
        }
        integer_check([image_offset_pos, dim, anims, ticks_per_frame, pos])
        this.image = image
        this.image_offset_pos = image_offset_pos
        this.dim = dim
        this.anims = anims
        this.ticks_per_frame = ticks_per_frame
        this.pos = pos
        this.velocity = [0, 0]
        this.ticks = 0,
        this.current_anim = "idle",
        this.next_anim = "idle",
        this.flip = false
    }
    play_anim(anim_name, flip=false) {
        this.flip = flip
        // to keep the refresh rate consistent,
        // wait till next animation refresh to start the animation
        if (anim_name in this.anims) {
            this.next_anim = anim_name
        }
        else {
            console.log("ERROR, calling animation that doesn't exist")
        }
    }
    set_speed_x(speed) {
        this.velocity[0] = speed
    }
    tick_draw(ctx) {
        if (this.ticks % this.ticks_per_frame == 0 &&
            this.next_anim != this.current_anim) {
            this.ticks = 0
            this.current_anim = this.next_anim
        }
        var anim = this.anims[this.current_anim]
        var frame = Math.floor(this.ticks / this.ticks_per_frame) % anim.length
        var x = Math.floor(this.pos[0])
        var v = this.velocity[0]
        if (this.flip) {
            ctx.translate(ctx.canvas.width, 0)
            ctx.scale(-1, 1)
            x = ctx.canvas.width - this.dim[0] - x
            v *= -1
        }
        ctx.drawImage(
            this.image,
            this.image_offset_pos[0] + anim[frame] * this.dim[0],
            this.image_offset_pos[1],
            this.dim[0], this.dim[1],
            x,
            Math.floor(this.pos[1]),
            this.dim[0], this.dim[1]
        )
        if (this.flip) {
            ctx.scale(-1, 1)
            ctx.translate(-ctx.canvas.width, 0)
        }
        this.pos[0] += v / this.ticks_per_frame
        this.pos[1] += this.velocity[1]
        this.ticks = (this.ticks + 1) % (this.ticks_per_frame * anim.length)
    }
}
