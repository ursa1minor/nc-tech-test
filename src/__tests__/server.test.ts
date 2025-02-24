import * as request from "supertest";
import { app } from "../server";
const fs = require("fs/promises");
import * as path from 'path';

const seedArray = [
  {
    "id": "card001",
    "title": "card 1 title",
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
  },
  {
    "id": "card002",
    "title": "card 2 title",
    "sizes": [
      "md"
    ],
    "basePrice": 200,
    "pages": [
      {
        "title": "Front Cover",
        "templateId": "template005"
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
  },
  {
    "id": "card003",
    "title": "card 3 title",
    "sizes": [
      "md",
      "lg"
    ],
    "basePrice": 200,
    "pages": [
      {
        "title": "Front Cover",
        "templateId": "template006"
      },
      {
        "title": "Inside Top",
        "templateId": "template007"
      },
      {
        "title": "Inside Bottom",
        "templateId": "template007"
      },
      {
        "title": "Back Cover",
        "templateId": "template008"
      }
    ]
  }
]

const seed = async () => {
  const seedData = JSON.stringify(seedArray)
  await fs.writeFile(path.resolve(__dirname, `../data/cards.json`), seedData, (err) => {
    if (err) throw err;
  }) 
}

beforeAll(() => {
  return seed(); 
});

describe(`GET /cards`, () => {
  test("returns 200 and cards list", async () => {
    const response = await request(app).get("/cards");
    expect(response.status).toBe(200);
    expect(response.body.length).not.toBe(0);
  });
  test("returns 404 if items not found", async () => {
    const response = await request(app).get("/notCards");
    expect(response.status).toBe(404);
  });
  test("returns 200 and list contains card with correct key value properties", async () => {
    const response = await request(app).get("/cards");
    expect(response.status).toBe(200);
    expect(response.body[0]).toEqual(
      expect.objectContaining({ title: "card 1 title" })
    );
    expect(response.body[0]).toEqual(
      expect.objectContaining({ imageUrl: "/front-cover-portrait-1.jpg" })
    );
  });
});

describe(`GET /cards/:cardId/:sizeId?`, () => {
  test("returns 200 and matching card title", async () => {
    const response = await request(app).get("/cards/card001");
    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        title: "card 1 title",
      })
    );
  });
  test("returns 404 if card title not found", async () => {
    const response = await request(app).get("/cards/card017");
    expect(response.status).toBe(404);
  });
  test("returns 200 and card containing correct key value properties", async () => {
    const response = await request(app).get("/cards/card002");
    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({ title: "card 2 title" })
    );
    expect(response.body).toEqual(
      expect.objectContaining({ imageUrl: "/front-cover-portrait-2.jpg" })
    );
    expect(response.body).toEqual(
      expect.objectContaining({
        availableSizes: [{ id: "md", title: "Medium" }],
      })
    );
  });
  test("returns 200 and card containing correct key value properties including multiple sizes", async () => {
    const response = await request(app).get("/cards/card001");
    expect(response.status).toBe(200);
    expect(response.body.availableSizes).toEqual([
      { id: "sm", title: "Small" },
      { id: "md", title: "Medium" },
      { id: "gt", title: "Giant" },
    ]);
  });
});

describe("POST /cards", () => {
  test("returns 201, single card posted and new data returned", async () => {
    const card = {
      title: "example title",
      sizes: ["sm", "md", "gt"],
      basePrice: 100,
      pages: [
        {
          title: "Front Cover",
          templateId: "template001",
        },
        {
          title: "Inside Left",
          templateId: "template002",
        },
        {
          title: "Inside Right",
          templateId: "template003",
        },
        {
          title: "Back Cover",
          templateId: "template004",
        },
      ],
    };
    const response = await request(app).post("/cards").send(card);
    expect(response.status).toBe(201);
    expect(response.body).toEqual(expect.objectContaining({ basePrice: 100 }));
    expect(response.body).toEqual(
      expect.objectContaining({ sizes: ["sm", "md", "gt"] })
    );
  });
  test("returns 400 if new card object contains no data", async () => {
    const card = {};
    const response = await request(app).post("/cards").send(card);
    expect(response.status).toBe(400);
  });
  test("returns 400 if new card object does not contain expected keys", async () => {
    const card = { key: "value" };
    const response = await request(app).post("/cards").send(card);
    expect(response.status).toBe(400);
  });
});

describe(`DELETE /cards/:cardId`, () => {
  test("returns 200", async () => {
    const response = await request(app).delete("/cards/card002");
    expect(response.status).toBe(200);
  });
  test("returns 404 if card title not found", async () => {
    const response = await request(app).get("/cards/card017");
    expect(response.status).toBe(404);
  });
});
