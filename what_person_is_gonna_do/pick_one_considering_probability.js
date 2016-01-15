console.log(pick_one_considering_probability({
    'hi': 0.5,
    'hello': 0.25,
    'what is up': 0.15,
    'how are you': 0.1
}));

function pick_one_considering_probability (odds) {
    var lucky_number = Math.random(),
    outcomes = Object.keys(odds);
    return outcomes.reduce(function (result, outcome) {
        if (result) {
            return result;
        }
        lucky_number -= Number(odds[outcome]);
        if (lucky_number < 0) {
            return outcome;
        }
    }, undefined) || Object.keys(odds)[0];
}
