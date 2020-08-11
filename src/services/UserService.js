import axios from 'axios';
export default class UserService {
  static async login(email, password) {
    const response = await axios.post('https://api.marktube.tv/v1/me', {
      email,
      password
    });
    return response.data.token
  }
}