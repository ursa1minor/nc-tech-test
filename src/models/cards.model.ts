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
        const singleCardList: object[] = [];
        const cardsData = await fs.readFile(path.resolve(__dirname, `../data/cards.json`));
        const cards = JSON.parse(cardsData);
        const foundCard = cards.find((card: {id: string}) => card.id === cardId)
        const templatesData = await fs.readFile(path.resolve(__dirname, `../data/templates.json`))
        const templates = JSON.parse(templatesData);

        if (foundCard) {
            let foundTemplate = templates.find((template: {id: string}) => template.id === foundCard["pages"][0]["templateId"])
            
            singleCardList.push({
                "title": foundCard["title"],
                "imageUrl": foundTemplate["imageUrl"],
                "card_id": foundCard["id"],
                "base_price": foundCard["basePrice"],
                "availableSizes": foundCard["sizes"],
                "pages": foundCard["pages"]
            })
        }
        return singleCardList[0];
    } catch (error) {
        return error;   
    }  
}; 
