import { createMocks } from 'node-mocks-http';
import handler from './bestTimeToBuySell_AMAZON';
import axios from 'axios';

jest.mock('axios');

describe('Amazon Stock price data API', () => {
  test('GET /api/stock/bestTimeToBuySell_AMAZON returns 200 status code and data', async () => {
    const mockData = [
      {
        company: 'AMAZON',
        highestPriceOfTheDay: 100,
        lowestPriceOfTheDay: 50,
        timestamp: Date.now(),
      },
      {
        company: 'AMAZON',
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
    expect(res._getJSONData()).toHaveProperty("transactions_amazon");
    expect(res._getJSONData()).toHaveProperty("profit_amazon");

    expect(res._getJSONData().transactions_amazon[0]).toEqual(expect.objectContaining({
        action: expect.any(String),
        shares: expect.any(Number),
        company: expect.any(String),
        date: expect.any(String),
        price: expect.any(Number),
      }));
  });
});