import { HttpException } from '@exceptions/HttpException';
import { City } from '@interfaces/city.interface';
import cityModel from '@models/cities.model';
import Http from '@/client/http';
import dotenv from 'dotenv';
dotenv.config();
class CityService {
  public cities = cityModel;
  rangeKM = process.env.RANGE_KM || 10;
  radiusOfEarthInKM = 6371;

  public async findCityById(cityId: number): Promise<City> {
    const city: City = await this.cities.findOne({ id: cityId }, { id: 1, name: 1, 'loc.coordinates': 1, _id: 0 });
    if (!city) throw new HttpException(404, 'Not found');
    return city;
  }

  public async findWeatherByCityId(cityId: number): Promise<any> {
    const city: City = await this.cities.findOne({ id: cityId });
    if (!city) throw new HttpException(404, 'Not found');
    const weatherDetails = await Http.get(this.generateOpenWeatherAPIURL(city));
    if (!weatherDetails) throw new HttpException(404, 'Weather data does not exist');
    return weatherDetails.data;
  }

  public async findNearByCities(lat, lng): Promise<any> {
    try {
      const nearByCities = await this.cities
        .find(
          {
            loc: {
              $geoWithin: {
                $centerSphere: [[lng, lat], Number(this.rangeKM) / this.radiusOfEarthInKM],
              },
            },
          },
          { id: 1, name: 1, _id: false },
        )
        .find(error => {
          if (error) console.log(error);
        });
      return nearByCities;
    } catch (error) {
      console.log(error);
    }
  }

  public generateOpenWeatherAPIURL(city: City): string {
    const apiKey: string = process.env.API_KEY;
    const uri: string = process.env.OPEN_WEATHER_API;
    // lat lng as per mapping during data migration coordinates array
    return `${uri}?lat=${city.loc.coordinates[1]}&lon=${city.loc.coordinates[0]}&appid=${apiKey}`;
  }
}

export default CityService;
