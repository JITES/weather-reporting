import mongoose from 'mongoose';
import request from 'supertest';
import App from '../app';
import CityRoute from '../routes/city.route';
import Http from '../client/http';
import CityService from '../services/city.service';
afterAll(async () => {
  await new Promise<void>(resolve => setTimeout(() => resolve(), 500));
});

describe('Weather', () => {
  describe('[GET] /cities find city', () => {
    xit('should return city when a valid id is provided', async () => {
      const cityRoute = new CityRoute();
      const cities = cityRoute.cityController.cityService.cities;
      cities.findOne = jest.fn().mockReturnValue({
        _id: '6276f5513e52c857040b35c2',
        id: 30543,
        name: 'Al Ghaylah',
        state: '',
        country: 'YE',
        loc: { type: 'Point', coordinates: [45.583328, 14.59583] },
      });

      (mongoose as any).connect = jest.fn();
      const app = new App([cityRoute]);
      return request(app.getServer()).get(`/cities/30543`).expect(200);
    });

    it('should return city when a valid id is provided', async () => {
      const cityRoute = new CityRoute();
      const cities = cityRoute.cityController.cityService.cities;

      cities.findOne = jest.fn().mockReturnValue({});
      cities.find = jest.fn().mockReturnValue({
        _id: '6276f5513e52c857040b35c2',
        id: 30543,
        name: 'Al Ghaylah',
        state: '',
        country: 'YE',
        loc: { type: 'Point', coordinates: [45.583328, 14.59583] },
      });
      (mongoose as any).connect = jest.fn();
      const app = new App([cityRoute]);
      return request(app.getServer()).get(`/cities/30543/weather`).expect(200);
    });
  });
});
