## Task List

Setup

Run this command to install dependencies:
```
yarn install 
```
Run this command to start application using nodemon to monitor changes:
```
yarn dev
```
Run this command to run test suite:
```
yarn test
```

Test failing

- Load JSON data into memory
- Use Insomnia to read data
- Set up Controller / Model file structure

GET /cards
- Write GET /cards tests
- Return list of cards

GET /cards/:cardId
- Write GET /cards/:cardId tests
- Find card by id

- Update sizes.json to contain correct size information
- Adopt 'async await' syntax
- Write further GET /cards/:cardId tests to test for display sizes information

POST /cards
- Take a copy of the data folder
- Write POST /cards tests
- Post new card

## Still to do

- Write further GET /cards/:cardId/:sizeId? tests to allow for optional size parameter

- DELETE /cards/:cardId