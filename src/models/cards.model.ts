import * as path from 'path';
const fs = require("fs/promises");

console.log("in the model")

exports.selectCards = () => {
    try {
        return fs.readFile(path.resolve(__dirname, `../data/cards.json`))
        .then((cardsData) => {
            const cards = JSON.parse(cardsData);
            return cards
        })

    } catch (error) {

    }
}