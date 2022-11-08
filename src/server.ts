import * as express from "express";
export const app = express()

import * as path from 'path';
const fs = require("fs/promises");
const { getCards } = require('./controllers/cards.controller')

app.set('json spaces', 2);

app.get('/cards', getCards);

//app.get('/cards/:cardId/:sizeId?', () => {
  // respond with card by id
//})
