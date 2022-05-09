import App from '@/app';
import validateEnv from '@utils/validateEnv';
import CityRoute from './routes/city.route';

validateEnv();

const app = new App([new CityRoute()]);

app.listen();
