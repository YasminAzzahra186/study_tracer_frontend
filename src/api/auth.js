import api from './axios';

export const authApi = {
  /**
   * POST /register
   * Sends all registration data (account + profile + career status) in one request
   */
  register(formData) {
    return api.post('/register', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },

  /**
   * POST /login
   * @param {{ email: string, password: string }} credentials
   */
  async login(credentials) {
    return api.post('/login', credentials);
  },

  /**
   * POST /logout
   */
  logout() {
    return api.post('/logout');
  },

  /**
   * GET /me — get authenticated user info
   */
  me() {
    return api.get('/me');
  },
};
