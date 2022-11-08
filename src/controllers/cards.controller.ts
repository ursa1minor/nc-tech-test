import * as path from 'path';
const fs = require("fs/promises");
const { selectCards } = require('../models/cards.model')

console.log("in the controller")

exports.getCards = (request, response) => {
    try {
        selectCards()
          .then((cards) => {   
            if (cards.length > 0) {
              response.status(200).send(  cards )
              }
              else {
              response.status(404).send("Items not found")
              }
            })
          } catch (error) {
          
          }   
        }       

