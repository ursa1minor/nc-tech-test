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
                "availableSizes": [],
                "pages": ""
        } 

            const templatesData = await fs.readFile(path.resolve(__dirname, `../data/templates.json`))
            const templates = JSON.parse(templatesData);
            const foundTemplate = templates.find((template: {id: string}) => template.id === foundCard["pages"][0]["templateId"])

            const sizesData = await fs.readFile(path.resolve(__dirname, `../data/sizes.json`));
            const sizes = JSON.parse(sizesData);
            const foundSizes: object[] = [];
        
            for (let i = 0; i < sizes.length; i++ ) {
                let foundSize = sizes.find((size: {id: string}) => size.id === foundCard["sizes"][i])
                if (foundSize) {
                    foundSizes.push(foundSize)
                }      
            }
                    card.title = foundCard["title"];
                    card.imageUrl = foundTemplate["imageUrl"];
                    card.card_id = foundCard["id"];
                    card.base_price = foundCard["basePrice"];
                    card.availableSizes = foundSizes;
                    card.pages = foundCard["pages"]; 
                return card;   
            
        }
    } catch (error) {
        return error;   
    }  
};
 
