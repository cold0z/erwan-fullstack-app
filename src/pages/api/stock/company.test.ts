import { createMocks } from 'node-mocks-http';
import handler from './[company]';


process.env.MONGODB_URI = 'mongodb+srv://haddoujihad:kWiSXQjvStwl3wTS@cluster0.vsgein5.mongodb.net/?retryWrites=true&w=majority';

describe('Stock price data API', () => {
  test('GET /api/stock/GOOGLE returns 200 status code and data', async () => {
    const { req, res } = createMocks({
      method: 'GET',
      query: {
        company: 'GOOGLE',
      },
    });

    await handler(req, res);

    expect(res.statusCode).toBe(200);
    expect(res._getJSONData()).toEqual(expect.any(Array));
    expect(res._getJSONData()[0]).toEqual(expect.objectContaining({
      timestamp: expect.any(Number),
      highestPriceOfTheDay: expect.any(Number),
      lowestPriceOfTheDay: expect.any(Number),
    }));
  });

  test('GET /api/stock/AMAZON returns 200 status code and data', async () => {
    const { req, res } = createMocks({
      method: 'GET',
      query: {
        company: 'AMAZON',
      },
    });

    await handler(req, res);

    expect(res.statusCode).toBe(200);
    expect(res._getJSONData()).toEqual(expect.any(Array));
    expect(res._getJSONData()[0]).toEqual(expect.objectContaining({
      timestamp: expect.any(Number),
      highestPriceOfTheDay: expect.any(Number),
      lowestPriceOfTheDay: expect.any(Number),
    }));
  });

  test('GET /api/stock/invalid returns 404 status code', async () => {
    const { req, res } = createMocks({
      method: 'GET',
      query: {
        company: 'invalid',
      },
    });

    await handler(req, res);

    expect(res.statusCode).toBe(404);
  });
});