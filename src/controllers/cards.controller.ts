const { selectCards, selectCard } = require('../models/cards.model')

exports.getCards = async (request, response, next) => {
  try {
    const cards = await selectCards();
      response.status(200).send(cards)
  } catch (error) {
      response.status(404).send({ message: error.message });
  };
}; 

exports.getCard = async (request, response) => {
  try {
    const { cardId } = request.params;
    const card = await selectCard( cardId );
      response.status(200).send(card) 
  } catch (error) {
      response.status(404).send({ message: error.message })
  };
};