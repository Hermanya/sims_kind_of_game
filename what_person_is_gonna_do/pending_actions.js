function show_pending_actions () {
    document.querySelector(`header`).innerHTML = [person.isDoing].concat(person.pending_actions).map(function (action) {
        return action.name.replace(`bound `, ``);
    }).join(` <font style="color:blue;">>></font> `);
}

function do_next_thing () {
    var action = person.pending_actions.shift() || what_would_be_their_next_action();
    person.isDoing = action;
    show_pending_actions();
    (action() || Promise.resolve()).then(do_next_thing);
}

function what_would_be_their_next_action () {
    var stat_name = pick_one_considering_probability(prepare(person.needs)),
        related_actions = stuff.reduce(function (actions, kind) {
            return actions.concat((kind.actions || []).filter(function (action) {
                return action.toString().match(`${stat_name}_up`);
            }));
        }, []),
        action_we_gonna_do = one_of(related_actions),
        tile_with_that_action = one_of(Array.from(document.querySelectorAll(`.tile`)).filter(function (tile) {
            return tile.actions.some(function (action) {
                return action === action_we_gonna_do;
            });
        }));

    if (tile_with_that_action) {
        return action_we_gonna_do.bind(tile_with_that_action);
    } else {
        return what_would_be_their_next_action();
    }
}

function one_of (xs) {
    return xs[Math.floor(Math.random() * xs.length)];
}

function prepare (stats) {
    var sum = Object.keys(stats).reduce(function (sum, key) {
        var inverted_value = 100 - stats[key];
        return sum + inverted_value;
    }, 0);

    return Object.keys(stats).reduce(function (result, key) {
        var inverted_value = 100 - stats[key];
        result[key] = inverted_value / sum;
        return result;
    }, {});
}
