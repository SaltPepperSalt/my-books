const SESSIONSTORAGE_KEY = 'token'

export default class TokenService {
  static save(token) {
    sessionStorage.setItem(SESSIONSTORAGE_KEY, token);
  }

  static get() {
    return sessionStorage.getItem(SESSIONSTORAGE_KEY);
  }
}