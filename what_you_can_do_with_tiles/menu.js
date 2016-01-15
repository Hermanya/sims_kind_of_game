function print_actions_for_a_tile (actions, tile) {
    var menu = document.querySelector(`menu`);
    hide_menu();

    actions.concat(hide_menu).forEach(function (action, index, all) {
        var button = document.createElement(`button`);
        var angle = index / all.length * Math.PI * 2;
        button.style.transform = `translateX(` + (Math.cos(angle) * 100 - 80) + `px) translateY(` + (Math.sin(angle) * 50 - 50) + `px)`;
        button.textContent = action.name;
        button.addEventListener(`click`, function (event) {
            person.pending_actions.push(action.bind(tile)) ;
            show_pending_actions();
            hide_menu();
            event.stopPropagation();
        });
        menu.appendChild(button);
    })

    tile.appendChild(menu);
}

function hide_menu () {
    var menu = document.querySelector(`menu`);
    Array.from(menu.children).forEach(function (child) {
        menu.removeChild(child);
    });
    return Promise.resolve();
}
