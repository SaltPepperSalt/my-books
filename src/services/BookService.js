import axios from 'axios';
const BOOK_URL = "https://api.marktube.tv/v1/book";
export default class BookService {

  static async getBooks(token) {
    const response = await axios.get(BOOK_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })

    return response.data;
  }
}