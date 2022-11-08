import * as path from 'path';
const fs = require("fs/promises");

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
        const singleCardList: object[] = [];
        return fs.readFile(path.resolve(__dirname, `../data/cards.json`))
        .then((cardsData) => {
            const cards = JSON.parse(cardsData);
            const foundCard = cards.find((card: {id: string}) => card.id === cardId)
                return fs.readFile(path.resolve(__dirname, `../data/templates.json`))
                .then((templatesData) => {
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
        })
          
         })
            
        } catch (error) {

    }  
}
