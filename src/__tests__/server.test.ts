import * as request from 'supertest'
import { app } from '../server'

describe(`GET /cards`, () => {
  test('returns 200 and cards list', async () => {
    const response = await request(app).get('/cards');
    expect(response.status).toBe(200);
    expect(response.body.length).not.toBe(0);
  })
  test('returns 404 if items not found', async () => {
    const response = await request(app).get('/notCards');
    expect(response.status).toBe(404);
  })
  test('returns card containing correct key value properties', async () => {
    const response = await request(app).get('/cards');
    expect(response.status).toBe(200);
    expect(response.body[0]).toEqual(expect.objectContaining({title: "card 1 title"}));
    expect(response.body[0]).toEqual(expect.objectContaining({imageUrl: "/front-cover-portrait-1.jpg"}));
  })
})

describe(`GET /cards/:cardId/:sizeId?`, () => {
  test('returns matching card title', async () => {
    const response = await request(app).get('/cards/card001')
    expect(response.status).toBe(200)
    expect(response.body).toEqual(expect.objectContaining({
      title: 'card 1 title',
    }))
  })
  test('returns 404 if card title not found', async () => {
        const response = await request(app).get('/cards/card017');
        expect(response.status).toBe(404);
      })
})
