# Node Backend Technical Challenge

(This is a 4 hour technical test which I opted to complete in my own time for practice.)

Build a "cards" service for the front-end of an imaginary Greetings Cards website. 
Build a simple REST-like API with two endpoints - one for returning a list of cards and another that returns a single instance of a card.

Three JSON files comprise the source data:
- cards.json
- sizes.json
- templates.json

## Endpoints

### GET `/cards`

This endpoint returns a list of cards.
- `imageUrl` should be the image found on the template that corresponds to the first page for the card.
- `card_id` should be the ID of the card`

Expected JSON response:

```json
[
  {
    "title": "card 1 title",
    "imageUrl": "/front-cover-portrait-1.jpg",
    "card_id": "card001"
  },
  {
    "title": "card 2 title",
    "imageUrl": "/front-cover-portrait-2.jpg",
    "card_id": "card002"
  },
  {
    "title": "card 3 title",
    "imageUrl": "/front-cover-landscape.jpg",
    "card_id": "card003"
  }
]
```

### GET `/cards/:cardId`

This endpoint returns a single card identified by its `id`. 

```json
{
  "title": "card 3 title",
  "imageUrl": "/front-cover-landscape.jpg",
  "card_id": "card003",
  "base_price": 200,
  "availableSizes": [
    {
      "id": "sm",
      "title": "Small"
    },
    {
      "id": "md",
      "title": "Medium"
    },
    {
      "id": "gt",
      "title": "Giant"
    }
  ],
  "pages": [
      {
        "title": "Front Cover",
        "templateId": "template001"
      },
      {
        "title": "Inside Left",
        "templateId": "template002"
      },
      {
        "title": "Inside Right",
        "templateId": "template003"
      },
      {
        "title": "Back Cover",
        "templateId": "template004"
      }
    ]
}
```

Expected JSON response: 

### POST `/cards`

This end point should allow a user to add a card to the list of overall cards. The ID of the card should follow the same format as the existing ones. 

Expected JSON request: 

```json
{
    "title": "example title",
    "sizes": [
      "sm",
      "md",
      "gt"
    ],
    "basePrice": 200,
    "pages": [
      {
        "title": "Front Cover",
        "templateId": "template001"
      },
      {
        "title": "Inside Left",
        "templateId": "template002"
      },
      {
        "title": "Inside Right",
        "templateId": "template003"
      },
      {
        "title": "Back Cover",
        "templateId": "template004"
      }
    ]
  }
```

An example response should return the card as if requested by its ID, see the previous endpoint.  

### DELETE `/cards/:cardId`

Expected response would be a confirmation the deletion has happened, either via status code alone or using code and message. 

## Tools, Libraries and frameworks

An app skeleton is provided, which includes the following tools:

- Express
- Jest for unit/integration testing
- Supertest for integration tests
- TypeScript - If you're not familiar with TypeScript you can use JavaScript instead.

## Scripts

| Command | Description |
|--|--|
| `yarn dev` | run the server in development (watch) mode on port 7000 |
| `yarn test` |  run tests using Jest watch mode |


