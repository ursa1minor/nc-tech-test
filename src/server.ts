import * as express from "express";
export const app = express()

import * as path from 'path';
const fs = require("fs/promises");

app.set('json spaces', 2);

app.get('/cards', async (request, response) => {
  // respond with a list of cards
  try {
    return fs.readFile(path.resolve(__dirname, `./data/cards.json`))
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
})

//app.get('/cards/:cardId/:sizeId?', () => {
  // respond with card by id
//})
