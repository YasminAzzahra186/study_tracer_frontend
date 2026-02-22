import api from './axios';

export const alumniApi = {
  getProfile() {
    return api.get('/alumni/profile');
  },

  updateProfile(data) {
    return api.put('/alumni/profile', data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },

  updateCareerStatus(data) {
    return api.post('/alumni/career-status', data);
  },

  getSavedLowongan() {
    return api.get('/alumni/saved-lowongan');
  },

  toggleSaveLowongan(id) {
    return api.post(`/alumni/lowongan/${id}/toggle-save`);
  },

  // Kuesioner
  getKuesionerDetail(id) {
    return api.get(`/alumni/kuesioner/${id}`);
  },

  submitKuesionerAnswers(kuesionerId, data) {
    return api.post(`/alumni/kuesioner/${kuesionerId}/jawaban`, data);
  },
};

// Public endpoints
export const publicApi = {
  getPublishedLowongan() {
    return api.get('/lowongan/published');
  },

  getLowonganDetail(id) {
    return api.get(`/lowongan/${id}`);
  },

  getPublishedKuesioner() {
    return api.get('/kuesioner/published');
  },
};
