import * as path from 'path';
const fs = require("fs/promises");

console.log("in the model")

exports.selectCards = () => {
    try {
        const cardList: object[] = [];
        return fs.readFile(path.resolve(__dirname, `../data/cards.json`))
        .then((cardsData) => {
            const cards = JSON.parse(cardsData);
            //return cards
            
            cardList.push({
                "title": cards[0]["title"],               
            })
            console.log(cardList);
            return cardList;
        }) 
    } catch (error) {

    }
};
