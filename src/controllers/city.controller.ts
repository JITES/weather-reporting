import { HttpException } from '@/exceptions/HttpException';
import CityService from '@/services/city.service';
import { isEmpty } from '@/utils/util';
import { NextFunction, Request, Response } from 'express';

class CityController {
  public cityService = new CityService();
  public getNearByCitiesWithLatLong = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const lat = req.query.lat;
      const lng = req.query.lng;
      if (isEmpty(lat) || isEmpty(lng)) throw new HttpException(400, 'lat/lng required');
      const nearByCities = await this.cityService.findNearByCities(lat, lng);
      if (isEmpty(nearByCities)) throw new HttpException(404, 'No near by city');
      res.status(200).type('json').json(nearByCities);
    } catch (error) {
      next(error);
    }
  };

  public getCityById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const cityId = Number(req.params.id);
      const cityDetails = await this.cityService.findCityById(cityId);
      res.status(200).type('json').json(cityDetails);
    } catch (error) {
      next(error);
    }
  };

  public getCityWeather = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const cityId = Number(req.params.id);
      const cityWeatherDetail = await this.cityService.findWeatherByCityId(cityId);
      res.status(200).type('json').json(cityWeatherDetail);
    } catch (error) {
      next(error);
    }
  };
}

export default CityController;
