const select = new mdc.select.MDCSelect(document.querySelector('.mdc-select'));

let model = null;
const char2id = {
    " ": 0,
    "!": 1,
    "\"": 2,
    "#": 3,
    "$": 4,
    "%": 5,
    "&": 6,
    "'": 7,
    "(": 8,
    ")": 9,
    "*": 10,
    "+": 11,
    ",": 12,
    "-": 13,
    ".": 14,
    "/": 15,
    "0": 16,
    "1": 17,
    "2": 18,
    "3": 19,
    "4": 20,
    "5": 21,
    "6": 22,
    "7": 23,
    "8": 24,
    "9": 25,
    ":": 26,
    ";": 27,
    "<": 28,
    "=": 29,
    "?": 30,
    "A": 31,
    "B": 32,
    "C": 33,
    "D": 34,
    "E": 35,
    "F": 36,
    "G": 37,
    "H": 38,
    "I": 39,
    "J": 40,
    "K": 41,
    "L": 42,
    "M": 43,
    "N": 44,
    "O": 45,
    "P": 46,
    "Q": 47,
    "R": 48,
    "S": 49,
    "T": 50,
    "U": 51,
    "V": 52,
    "W": 53,
    "X": 54,
    "Y": 55,
    "Z": 56,
    "[": 57,
    "]": 58,
    "_": 59,
    "a": 60,
    "b": 61,
    "c": 62,
    "d": 63,
    "e": 64,
    "f": 65,
    "g": 66,
    "h": 67,
    "i": 68,
    "j": 69,
    "k": 70,
    "l": 71,
    "m": 72,
    "n": 73,
    "o": 74,
    "p": 75,
    "q": 76,
    "r": 77,
    "s": 78,
    "t": 79,
    "u": 80,
    "v": 81,
    "w": 82,
    "x": 83,
    "y": 84,
    "z": 85,
    "{": 86,
    "}": 87,
    "\u00ad": 88,
    "\u00b7": 89,
    "\u00e0": 90,
    "\u00e1": 91,
    "\u00e8": 92,
    "\u00e9": 93,
    "\u00ea": 94,
    "\u00eb": 95,
    "\u00ed": 96,
    "\u00ef": 97,
    "\u00f6": 98,
    "\u200b": 99,
    "\u200e": 100,
    "\u2010": 101,
    "\u2012": 102,
    "\u2013": 103,
    "\u2212": 104,
    "\u300a": 105,
    "\u300b": 106,
    "\ufb02": 107,
    "\ufeff": 108
};
const id2char =
[
    " ", "!", "\"", "#", "$", "%", "&", "'", "(", ")", "*", "+", ",", "-", ".", "/", "0", "1", "2", "3", "4", "5", "6",
    "7", "8", "9", ":", ";", "<", "=", "?", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O",
    "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "[", "]", "_", "a", "b", "c", "d", "e", "f", "g", "h", "i",
    "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "{", "}", "\u00ad", "\u00b7",
    "\u00e0", "\u00e1", "\u00e8", "\u00e9", "\u00ea", "\u00eb", "\u00ed", "\u00ef", "\u00f6", "\u200b", "\u200e",
    "\u2010", "\u2012", "\u2013", "\u2212", "\u300a", "\u300b", "\ufb02", "\ufeff"
];

function randomChoice(p) {
    let rnd = p.reduce((a, b) => a + b) * Math.random();
    return p.findIndex(a => (rnd -= a) < 0);
}

async function generateQuote(category){

    if (model === null) {
        model = await tf.loadModel('https://raw.githubusercontent.com/jyang14/ai-quote-generation-data/3e50d6f3abf7d61a09d65a43b5768a7cf5c7a027/model.json');
    }

    let seed_txt = '(' + category + ')《';
    let seed = seed_txt.split('').map((x) => char2id[x]);
    model.reset_states();
    for (let i = 0; i < seed_txt.length - 1; i++) {
        model.predict([seed[i]]);
    }

    let result = '';
    let next = [seed[i]];
    while (next[0] !== '》') {
        let p = model.predict(next);
        next = [randomChoice(p)];
        result += next[0];

    }

    $('#quote').html(result);

};

select.listen('change', () => {
    const category = select.value;
    generateQuote(category);
});