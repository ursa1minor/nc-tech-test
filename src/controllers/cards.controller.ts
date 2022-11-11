//const fs = require("fs");
const { selectCards, selectCard } = require('../models/cards.model')

exports.getCards = async (request, response) => {
  try {
    const cards = await selectCards();
    response.status(200).send(cards)
  } catch (error) {
    response.status(404).send("Items not found")
  }
} 

exports.getCard = async (request, response) => {
  try {
    let { cardId } = request.params;
    const card = await selectCard( cardId )
    console.log (cardId)
    response.status(200).send(card)
  } catch (error) {
    response.status(404).send("Item not found")
  }
}
