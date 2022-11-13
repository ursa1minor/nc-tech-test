const { selectCards, selectCard, insertCard } = require('../models/cards.model')

exports.getCards = async (req, res) => {
  try {
    const cards = await selectCards();
      res.status(200).send(cards)
  } catch (error) {
      res.status(404).send({ message: error.message });
  };
}; 

exports.getCard = async (req, res) => {
  try {
    const { cardId } = req.params;
    const card = await selectCard( cardId );
      res.status(200).send(card) 
  } catch (error) {
      res.status(404).send({ message: error.message });
  };
};

exports.postCard = async (req, res) => {
  try {    
    const card = await insertCard( req.body );
      res.status(201).send(card)
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
}