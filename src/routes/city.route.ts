import { Router } from 'express';
import CityController from '@/controllers/city.controller';
import { Routes } from '@interfaces/routes.interface';

class CityRoute implements Routes {
  public path = '/cities';
  public router = Router();
  public cityController = new CityController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.cityController.getNearByCitiesWithLatLong);
    this.router.get(`${this.path}/:id(\\d+)`, this.cityController.getCityById);
    this.router.get(`${this.path}/:id(\\d+)/weather`, this.cityController.getCityWeather);
  }
}

export default CityRoute;
