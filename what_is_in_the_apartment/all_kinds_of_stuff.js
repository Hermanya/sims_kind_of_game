var stuff = [{
    name: `wall`,
    char: `╣╗╚╔║╝═╠`,
    style: {
        color: `#E2D5C4`,
        background: `#FAEBD7`
    }
}, {
    name: `door`,
    char: `/`,
    style: {
        color: `white`
    }
}, {
    name: `window`,
    char: `|-╰╭`,
    style: {
        color: `skyblue`,
        background: `#FAEBD7`
    }
}, {
    name: `floor`,
    char: ` `,
    actions: [
        function walk_here () {
            return walk_by(this);
        }
    ]
}, {
    name: `lamp`,
    char: `∗`,
    actions: [
        function toggle () {
            this.on = !this.on;
            if (this.on) {
                this.style.color = `yellow`;
                this.style.textShadow = `yellow 0px 0px 16px`;
            } else {
                this.style.color = `black`;
                this.style.textShadow = `none`;
            }
        }
    ]
}, {
    name: `bed tops`,
    char: `⫑⫒`,
    style: {
        background: `#A8DE8E`,
        color: `#68aE5E`
    }
}, {
    name: `bed`,
    char: `⪒⪑`,
    style: {
        background: `#A8DE8E`,
        color: `#68aE5E`
    },
    actions: [
        function sleep () {
            return walk_by(this).then(function () {
                person.classList.add(`zzz`);
                return wait(20);
            }).then(function () {
                person.energy_up(100);
                person.classList.remove(`zzz`);
            });
        },
        function nap () {
            return walk_by(this).then(function () {
                person.classList.add(`zzz`);
                return wait(3);
            }).then(function () {
                person.energy_up(10);
                person.classList.remove(`zzz`);
            });
        },
        function use_laptop () {
            return walk_by(this).then(function () {
                person.classList.add(`with-laptop`);
                return wait(5);
            }).then(function () {
                person.laptop_up(100);
                person.classList.remove(`with-laptop`);
            });
        },
        function fap () {
            return walk_by(this).then(function () {
                person.classList.add(`hide-parts`);
                return wait(3);
            }).then(function () {
                person.libido_up(100);
                person.hygine_down(50);
                person.classList.remove(`hide-parts`);
            });
        }
    ]
}, {
    name: `lamp`,
    char: `∗`
}, {
    name: `bath`,
    char: `⋂`,
    style: {
        color: `whitesmoke`,
        background: `white`
    }
}, {
    name: `shower`,
    char: `⨃`,
    style: {
        color: `whitesmoke`,
        background: `white`
    },
    actions: [
        function shower () {
            return walk_by(this).then(function () {
                person.classList.add(`shower`);
                return wait(8);
            }).then(function () {
                person.hygine_up(100);
                person.classList.remove(`shower`);
            });
        }
    ]
}, {
    name: `toilet`,
    char: `⩌`,
    style: {
        color: `white`
    },
    actions: [
        function number_one () {
            return walk_by(next_to(this)).then(function () {
                person.classList.add(`hide-parts`);
                return wait(3);
            }).then(function () {
                person.toilet_up(50);
                person.hygine_down(15);
                person.classList.remove(`hide-parts`);
            });
        },
        function number_two () {
            return walk_by(this).then(function () {
                person.classList.add(`hide-parts`);
                return wait(8);
            }).then(function () {
                person.toilet_up(100);
                person.hygine_down(15);
                person.classList.remove(`hide-parts`);
            });
        }
    ]
}, {
    name: `fridge`,
    char: `⍃`,
    style: {
        color: `whitesmoke`,
        background: `white`
    },
    actions: [
        function eat_leftovers () {
            return walk_by(next_to(this)).then(function () {
                person.classList.add(`with-plate`);
                return wait(5);
            }.bind(this)).then(function () {
                person.hunger_up(60);
                person.classList.remove(`with-plate`);
            }.bind(this));
        }
    ]
}, {
    name: `washer`,
    char: `⌼`,
    style: {
        color: `silver`,
        background: `lemonchiffon`
    },
    actions: [
        function wash_hands () {
            return walk_by(next_to(this)).then(function () {
                this.classList.add(`water`);
                return wait(3);
            }.bind(this)).then(function () {
                person.hygine_up(15);
                this.classList.remove(`water`);
            }.bind(this));
        }
    ]
}, {
    name: `counter`,
    char: `⌸`,
    style: {
        color: `whitesmoke`,
        background: `lemonchiffon`
    }
}, {
    name: `stove`,
    char: `⌹`,
    style: {
        color: `grey`,
        background: `whitesmoke`
    }
}, {
    name: `table`,
    char: `⧠`,
    style: {
        background: `white`,
        color: `whitesmoke`
    }
}];

function next_to(place) {
    var floor = place.adjacent_floor[0];
    var place_next_to = Object.create(place);
    if (floor) {
        place_next_to.y = (place.y + floor.y) / 2;
        place_next_to.x = (place.x + floor.x) / 2;
    }
    return place_next_to;
}
