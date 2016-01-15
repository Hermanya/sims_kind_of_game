var person;

const people = [],
    tile_width = 39,
    tile_height = 53;

build_an_apartment(`
╔══╗
║⋂⩌╚╗
║⨃ ⌼╠════╗
╠═ ╔╝⌸⌼⌸⌹|
/  ║⍃    ║
╚╗ ╚═ ═══╣
H║       ╰
 ║   ⧠ ⪒⪑ |
 ║    ∗⫑⫒╭
 ╚═══════╝
`);
setInterval(decrement_needs, 1000);
do_next_thing();
