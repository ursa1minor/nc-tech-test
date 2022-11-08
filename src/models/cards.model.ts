import * as path from 'path';
const fs = require("fs/promises");
import * as express from "express";

console.log("in the model")

exports.selectCards = () => {
    try {
        const cardList: object[] = [];
        return fs.readFile(path.resolve(__dirname, `../data/cards.json`))
        .then((cardsData) => {
            const cards = JSON.parse(cardsData);
            return fs.readFile(path.resolve(__dirname, `../data/templates.json`))
            .then((templatesData) => {
                const templates = JSON.parse(templatesData);

                for (let card in cards) {
                    let foundTemplate = templates.find((template: {id: string}) => template.id === cards[card]["pages"][0]["templateId"])

                    cardList.push({
                        "title": cards[card]["title"], 
                        "imageUrl": foundTemplate["imageUrl"],
                        "card_id": cards[card]["id"]
                        })
                }
                return cardList;
            })
        }) 
    } catch (error) {

    }
};

exports.selectCard = ( cardId ) => {
    try {
        
        return fs.readFile(path.resolve(__dirname, `../data/cards.json`))
        .then((cardsData) => {
            const cards = JSON.parse(cardsData);
            const foundCard = cards.find((card: {id: string}) => card.id === cardId)
            if (foundCard) {
                return foundCard;
            }
            
        })
        
    } catch (error) {

    }  
}
