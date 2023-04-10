import { createMocks } from 'node-mocks-http';
import handler from './bestTimeToBuySell_GOOGLE';
import axios from 'axios';

jest.mock('axios');

describe('Amazon Stock price data API', () => {
  test('GET /api/stock/bestTimeToBuySell_GOOGLE returns 200 status code and data', async () => {
    const mockData = [
      {
        company: 'GOOGLE',
        highestPriceOfTheDay: 100,
        lowestPriceOfTheDay: 50,
        timestamp: Date.now(),
      },
      {
        company: 'GOOGLE',
        highestPriceOfTheDay: 150,
        lowestPriceOfTheDay: 75,
        timestamp: Date.now() + 86400000,
      },
    ];

    (axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValueOnce({
      data: mockData,
    });

    const { req, res } = createMocks({
      method: 'GET',
    });

    await handler(req, res);

    expect(res.statusCode).toBe(200);
    expect(res._getJSONData()).toHaveProperty("transactions_google");
    expect(res._getJSONData()).toHaveProperty("profit_google");

    expect(res._getJSONData().transactions_google[0]).toEqual(expect.objectContaining({
        action: expect.any(String),
        shares: expect.any(Number),
        company: expect.any(String),
        date: expect.any(String),
        price: expect.any(Number),
      }));
  });
});