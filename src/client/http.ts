import axios from 'axios';

class Http {
  public static async get(url: string): Promise<any> {
    try {
      const data = await axios.get(url);
      return data;
    } catch (error) {
      console.log(error.message);
    }
  }
}
export default Http;
