class Util {
    constructor() {

    }

    static getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }

    static replaceCharAt(str, index, char) {
        return str.substr(0, index) + char + str.substr(index + 1);
    }

    static getCharToNum(number) {
        let alphabet = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
        return alphabet[number - 1];
    }
}

module.exports = Util;
