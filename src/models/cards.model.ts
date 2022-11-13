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
    };  
};

exports.insertCard = async ( card ) => {
    try {
        if (!Object.keys(card).length) {
            throw 400;
        } 
        if (!Object.keys(card).includes("sizes")) {
            throw 400;
        }
        if (!Object.keys(card).includes("basePrice")) {
            throw 400;
        }
        if (!Object.keys(card).includes("pages")) {
            throw 400;
        }
        let cardAdded = false;

        do {

            const cardsData = await fs.readFile(path.resolve(__dirname, `../data/cards.json`));
            const cards = JSON.parse(cardsData);
            const cardCount = cards.length;
            const newCardCount = cardCount + 1;

            if (cardCount < 9) {
                card.id = `card00${cardCount + 1}`; 
                } else if (cardCount < 99) {
                card.id = `card0${cardCount + 1}`;
                } else {
                card.id = `card${cardCount + 1}`;
            }
            card.id = `card00${cardCount + 1}`;
            card.title = `card ${cardCount + 1} title`

            const newCardsList = [...cards, card]

            if (newCardsList.length !== newCardCount) {
                throw 500;
            };

            const newCardsData = JSON.stringify(newCardsList)
            fs.writeFile(path.resolve(__dirname, `../data/cards.json`), newCardsData, (err) => {
                if (err) throw err;
            })

            const newFileContents = await fs.readFile(path.resolve(__dirname, `../data/cards.json`));
            const newFileCardsList = JSON.parse(newFileContents);
            const newFileCardCount = newFileCardsList.length;

            if (newCardCount !== newFileCardCount) {
            throw 500;
            } 
            cardAdded = true;
            return card; 
        } while (cardAdded === false)     
    } catch (error) {
        return error; 
    }
};

exports.removeCard = async ( cardId ) => {
    try {
        console.log(cardId)
        const cardsData = await fs.readFile(path.resolve(__dirname, `../data/cards.json`));
        const cards = JSON.parse(cardsData);
        const foundCard = cards.find((card: {id: string}) => card.id === cardId)

        if (!foundCard) {
            throw 404;
        } else {
        const cardCount = cards.length;
        const newCardCount = cardCount - 1;

        const cardIndex = cards.findIndex((card: {id: string}) => card.id === cardId);
        console.log(cardIndex)
        const newCards = cards;
        const deletedCard = newCards.splice(cardIndex, 1);

        if (newCards.length !== newCardCount) {
            throw 500;
        } else {
            const newCardsData = JSON.stringify(newCards);
            fs.writeFile(path.resolve(__dirname, `../data/cards.json`), newCardsData, (err) => {
                if (err) throw err;
                }) 
        }} 
    } catch (error) {
        return error;  
    }
}
 
