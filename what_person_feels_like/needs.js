function decrement_needs () {
    person.querySelector(`.crystal`).style.color = crystal_color(Object.keys(person.needs).reduce(function (result, key) {
        return (result + person.needs[key]) / 2;
    }, 0));

    people.forEach(function (person) {
        Object.keys(person.needs).forEach(function (key) {
            person.needs[key]--;
            if (person.needs[key] < 0) {
                person.needs[key] = 0;
            }
        })
    });
    show_stats();
}

function show_stats() {
    const stats = Object.keys(person.needs).map(function (key) {
        var value = person.needs[key],
            max_length = 10,
            length = Math.ceil(value / 100 * max_length),
            color =  crystal_color(value),
            bar = `<font style="color: ${color};"><${Array(max_length + 1).join(`<`).slice(0, length)}></font>` + Array(max_length + 1).join(`>`).slice(length);
        return `<section title="${value}%">${key}: ${bar} </section>`;
    }).join("\n")
    document.querySelector(`footer`).innerHTML = `
        <aside id="whose-stats">${person.name}</aside>
        <div id="stats-themselves">${stats}</div>
    `;
}

function crystal_color (value) {
    const colors = [`red`, `orange`, `yellowgreen`, `green`];
    return colors[Math.floor(value / 100 * colors.length)]
}

function max_motives () {
    person.needs = {
        hunger: 100,
        energy: 100,
        libido: 100,
        hygine: 100,
        laptop: 100,
        toilet: 100
    };
}
