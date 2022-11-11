const fs = require("fs/promises");
import * as path from 'path';

exports.selectCards = async () => {
    try {
        const cardList: object[] = [];
        const cardsData = await fs.readFile(path.resolve(__dirname, `../data/cards.json`));
        const cards = JSON.parse(cardsData);
        const templatesData = await fs.readFile(path.resolve(__dirname, `../data/templates.json`));
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
    } catch (error) {
        return error;
    }
}

exports.selectCard = async ( cardId ) => {
    try {
        const cardsData = await fs.readFile(path.resolve(__dirname, `../data/cards.json`));
        const cards = JSON.parse(cardsData);
        const foundCard = cards.find((card: {id: string}) => card.id === cardId)

        if (!foundCard) {
            throw 404;
        } else {
            
        const card = {
            "title": "",
            "imageUrl": "",
            "card_id": "",
            "base_price": "",
            "availableSizes": "",
            "pages": ""
        } 

        const templatesData = await fs.readFile(path.resolve(__dirname, `../data/templates.json`))
        const templates = JSON.parse(templatesData);
        const foundTemplate = templates.find((template: {id: string}) => template.id === foundCard["pages"][0]["templateId"])
            
            card.title = foundCard["title"];
            card.imageUrl = foundTemplate["imageUrl"];
            card.card_id = foundCard["id"];
            card.base_price = foundCard["basePrice"];
            card.availableSizes = foundCard["sizes"];
            card.pages = foundCard["pages"]; 
        return card;     
        } 
    } catch (error) {
        return error;   
    }  
}; 
