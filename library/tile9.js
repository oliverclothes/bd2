class tile9 {
    // for now assume square tiles
    constructor(img) {
        this.img = img
        if (img.width % 3 != 0 || img.width != img.height) {
            console.log("ERROR, 9 tile image has bad dimensions")
        }
    }
    get_tile_size() {
        return this.img.width / 3
    }
    // can draw non-multiple of tile dims
    // but overlaps, so could potentially have problems
    draw(ctx, pos, dim) {
        var length = this.img.width / 3
        var max_row = Math.floor(dim[1] / length - 1)
        var max_col = Math.floor(dim[0] / length - 1)
        for (var row = 1; row < max_row; row++) {
            for (var col = 1; col < max_col; col++) {
                ctx.drawImage(
                    this.img,
                    length, length,
                    length, length,
                    pos[0] + length * col, pos[1] + length * row,
                    length, length
                )
            }        
        }
        var clip_w = dim[0] % length
        var clip_h = dim[1] % length
        // clipping
        ctx.drawImage(
            this.img,
            length, length,
            clip_w, clip_h,
            pos[0] + length * max_col, pos[1] + length * max_row,
            clip_w, clip_h
        )
        for (var row = 1; row < max_row; row++) {
            ctx.drawImage(
                this.img,
                0, length,
                length, length,
                pos[0], pos[1] + length * row,
                length, length
            )
            ctx.drawImage(
                this.img,
                2 * length, length,
                length, length,
                pos[0] + dim[0] - length, pos[1] + length * row,
                length, length
            )
            // clipping
            ctx.drawImage(
                this.img,
                length, length,
                clip_w, length,
                pos[0] + max_col * length, pos[1] + length * row,
                clip_w, length
            )
        }
        // clipping
        ctx.drawImage(
            this.img,
            0, length,
            length, clip_h,
            pos[0], pos[1] + length * max_row,
            length, clip_h
        )
        // clipping
        ctx.drawImage(
            this.img,
            2 * length, length,
            length, clip_h,
            pos[0] + dim[0] - length, pos[1] + length * max_row,
            length, clip_h
        )
        for (var col = 1; col < max_col; col++) {
            ctx.drawImage(
                this.img,
                length, 0,
                length, length,
                pos[0] + length * col, pos[1],
                length, length
            )
            ctx.drawImage(
                this.img,
                length, 2 * length,
                length, length,
                pos[0] + length * col, pos[1] + dim[1] - length,
                length, length
            )
            // clipping
            ctx.drawImage(
                this.img,
                length, length,
                length, clip_h,
                pos[0] + length * col, pos[1] + max_row * length,
                length, clip_h
            )
        }
        // clipping
        ctx.drawImage(
            this.img,
            length, 0,
            clip_w, length,
            pos[0] + length * max_col, pos[1],
            clip_w, length
        )
        // clipping
        ctx.drawImage(
            this.img,
            length, 2 * length,
            clip_w, length,
            pos[0] + length * max_col, pos[1] + dim[1] - length,
            clip_w, length
        )

        ctx.drawImage(
            this.img,
            0, 0,
            length, length,
            pos[0], pos[1],
            length, length
        )
        ctx.drawImage(
            this.img,
            2 * length, 0,
            length, length,
            pos[0] + dim[0] - length, pos[1],
            length, length
        )
        ctx.drawImage(
            this.img,
            0, 2 * length,
            length, length,
            pos[0], pos[1] + dim[1] - length,
            length, length
        )
        ctx.drawImage(
            this.img,
            2 * length, 2 * length,
            length, length,
            pos[0] + dim[0] - length, pos[1] + dim[1] - length,
            length, length
        )
    }
}