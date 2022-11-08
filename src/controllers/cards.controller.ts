const fs = require("fs/promises");
const { selectCards, selectCard } = require('../models/cards.model')

console.log("in the controller")

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
  let { cardId, sizeId } = request.params;
  try {
    selectCards()
      .then((cards) => {   
        if (cards.length > 0) {
         // selectCard()
         // .then((card) => {
            response.status(200).send( cards[0] )
         // })
          }
          else {
          response.status(404).send("Items not found")
          }
        })
      } catch (error) {
      
      }   
    }  


    

  

