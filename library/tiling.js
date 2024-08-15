class tiling {
    constructor(img, tile_dims, tile_map) {
        this.img = img
        this.tile_dims = tile_dims
        this.tile_map = tile_map
        // map from tile index to img (x, y)
        this.offsets = []
        for (var row = 0; row * tile_dims[1] <  img.height; row++) {
            for (var col = 0; col * tile_dims[0] <  img.width; col++) {
                this.offsets.push([col * tile_dims[0], row * tile_dims[1]])
            }
        }
    }
    draw(ctx, origin_pos = [0, 0]) {
        var w = this.tile_dims[0]
        var h = this.tile_dims[1]
        var y = 0
        // origin pos is top left of top left tile
        var origin_map_pos = [0, 0]
        var screen_tiles = [8, 8]
        for (var row = 0; row < screen_tiles[1]; row++) {
            for (var col = 0; col < screen_tiles[0]; col++) {
                let tile_id = this.tile_map[origin_map_pos[1] + row][origin_map_pos[0] + col]
                ctx.drawImage(
                    this.img,
                    this.offsets[tile_id][0], this.offsets[tile_id][1],
                    w, h,
                    origin_pos[0] + col * w, origin_pos[1] + row * h,
                    w, h
                )
            }
        }
    }
}