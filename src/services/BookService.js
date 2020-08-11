import axios from 'axios';

const BOOK_API_URL = 'https://api.marktube.tv/v1/book';
export default class BookService {
  static async getBooks(token) {
    const response = await axios.get(BOOK_API_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }
  static async addBook(
    token,
    book,
  ) {
    const response = await axios.post(BOOK_API_URL, book, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }
  static async editBook(
    token,
    bookId,
    book,
  ) {
    const response = await axios.patch(
      `${BOOK_API_URL}/${bookId}`,
      book, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  }
  static async deleteBook(token, bookId) {
    await axios.delete(`${BOOK_API_URL}/${bookId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}