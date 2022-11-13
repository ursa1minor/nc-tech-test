import * as express from "express";
export const app = express()

const fs = require("fs/promises");
const { getCards, getCard, postCard, deleteCard } = require('./controllers/cards.controller')

app.use(express.json());
app.set('json spaces', 2);

app.get('/cards', getCards);

app.get('/cards/:cardId/:sizeId?', getCard);

app.post('/cards', postCard);

app.delete('/cards/:cardId/', deleteCard);


