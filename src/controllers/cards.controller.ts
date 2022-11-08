import * as path from 'path';
const fs = require("fs/promises");

console.log("in the controller")

exports.getCards = (request, response) => {
    
    try {
            return fs.readFile(path.resolve(__dirname, `../data/cards.json`))
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

