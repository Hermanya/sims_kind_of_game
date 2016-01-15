function build_an_apartment (plan) {
    plan.split(`\n`).map(function (row, y_index) {
        row = row.replace(/[A-Z]/, function (match, x_index) {
            person = create_a_person(match, x_index, y_index);
            return ` `;
        });
        var parent = document.createElement(`div`);
        parent.classList.add('row-of-things-in-the-apartment');
        row = assemble_tiles(row, y_index).map(function (child) {
            parent.appendChild(child);
            return child;
        });
        document.querySelector(`main`).appendChild(parent);
        return row;
    }).map(function (row, y_index, allRows) {
        row.forEach(function (tile, x_index) {
            tile.adjacent_floor = [
                allRows[y_index - 1][x_index],
                allRows[y_index][x_index + 1],
                allRows[y_index][x_index - 1],
                allRows[y_index + 1][x_index]
            ].filter(function (tile) {
                return tile && tile.title === `floor`;
            });
        })
    })
}

function assemble_tiles (tiles, y_index) {
    return tiles.split(``).map(function (char, x_index) {
        return assemble_a_tile(char, x_index, y_index, tiles);
    });
}

function assemble_a_tile (char, x_index, y_index, tiles) {
    var tile = document.createElement(`span`);
    tile.x = x_index * tile_width;
    tile.y = y_index * tile_height;
    tile.classList.add(`tile`);
    if (x_index >= tiles.length - tiles.trimLeft().length) {
        tile.style.background = `burlywood`;
    }
    stuff.filter(function (type) {
        return type.char.indexOf(char) !== -1;
    }).map(function (type) {
        tile.title = type.name;
        tile.actions = type.actions || [];
        type.style && Object.keys(type.style).forEach(function (key) {
            tile.style[key] = type.style[key];
        });
        type.actions && type.actions[0] && tile.addEventListener(`click`, function () {
            print_actions_for_a_tile(type.actions, tile);
        });
    });
    tile.appendChild(document.createTextNode(char));
    return tile;
}
