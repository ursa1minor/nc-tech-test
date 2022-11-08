const fs = require("fs/promises");
const { selectCards, selectCard } = require('../models/cards.model')

exports.getCards = (request, response) => {
    try {
        selectCards()
          .then((cards) => {   
            if (cards.length > 0) {
              response.status(200).send( cards )
              }
              else {
              response.status(404).send("Items not found")
              }
            })
          } catch (error) {
          
          }   
        }  

exports.getCard = (request, response) => {
  let { cardId } = request.params;
    try {
        selectCard( cardId )
          .then((card) => { 

            if (card) {           
              response.status(200).send( card )
             } else {
              response.status(404).send("Item not found")
              }
            })
          } catch (error) {
                
          }   
        }  
        

    


    

  

