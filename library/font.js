class font {
    constructor(img, dims, img_chars) {
        this.img = img
        this.dims = dims
        this.pos_map = []
        var cur_x = 0, cur_y = 0
        for (var i = 0; i < img_chars.length; i++) {
            var c = img_chars.charCodeAt(i)
            this.pos_map[c] = [cur_x, cur_y]
            cur_x += dims[0]
            if (cur_x >= img.width) {
                cur_x %= img.width
                cur_y += dims[1]
            }
        }
    }
    print(ctx, text, pos = [0, 0]) {
        for (var i = 0; i < text.length; i++) {
            if (text[i] != " ") {
                var c = text.charCodeAt(i)
                ctx.drawImage(
                    this.img,
                    this.pos_map[c][0], this.pos_map[c][1],
                    this.dims[0], this.dims[1],
                    pos[0] + this.dims[0] * i, pos[1],
                    this.dims[0], this.dims[1]
                )
            }
        }
    }
}