
function create_a_person (name, x_index, y_index) {
    person = document.createElement(`span`);

    person.innerHTML = `${name}<span class="crystal">⟠</span>`;
    person.classList.add(`person`);
    person.style.left = x_index * tile_width + `px`;
    person.style.top = y_index * tile_height + `px`;

    person.name = name;
    person.pending_actions = [];

    max_motives();
    Object.keys(person.needs).forEach(function (stat) {
        person[`${stat}_up`] = function (value) {
            person.needs[stat] += value;
            if (person.needs[stat] > 100) {
                person.needs[stat] = 99;
            }
        }
        person[`${stat}_down`] = function (value) {
            person.needs[stat] -= value;
            if (person.needs[stat] < 0) {
                person.needs[stat] = 0;
            }
        }
    })

    people.push(person);
    document.querySelector(`main`).appendChild(person);

    return person;
}

function wait (time) {
    return new Promise(function (resolve) {
        window.setTimeout(resolve, time * 1000);
    });
}

function walk_by (destination) {
    var walked = [];
    person.location = person.location || destination;

    var best_path = Array(100);
    find_best_path(destination, [], [], person.location);
    return best_path.reduce(function (chain, place) {
        return chain.then(function () {
            person.style.top = place.y + `px`;
            person.style.left = place.x + `px`;
            person.location = place;
            return wait(0.25)
        })
    }, Promise.resolve())


    function find_best_path (destination, walked_by, path, tile) {
        if (path.length > best_path.length) {
            return;
        }

        if (destination.adjacent_floor.indexOf(tile) > -1) {
            path = path.concat([tile, destination]);
            if (path.length < best_path.length) {
                best_path = path;
                return;
            }
        } else if (destination === tile) {
            path = path.concat(destination);
            if (path.length < best_path.length) {
                best_path = path;
                return;
            }
        }

        if (walked_by.indexOf(tile) === -1) {
            tile.adjacent_floor.map(find_best_path.bind(`no context`, destination, walked_by.concat(tile), path.concat(tile)))
        }
    }
}
