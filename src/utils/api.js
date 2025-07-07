import axios from 'axios';

// Create axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API calls
export const authAPI = {
  register: (userData) => api.post('/auth/register', userData),
  login: (credentials) => api.post('/auth/login', credentials),
  logout: () => api.post('/auth/logout'),
  getMe: () => api.get('/auth/me'),
  updateProfile: (data) => api.put('/auth/profile', data),
  changePassword: (data) => api.put('/auth/change-password', data),
  forgotPassword: (email) => api.post('/auth/forgot-password', { email }),
  resetPassword: (token, password) => api.put(`/auth/reset-password/${token}`, { password })
};

// Users API calls
export const usersAPI = {
  getAll: (params) => api.get('/users', { params }),
  getById: (id) => api.get(`/users/${id}`),
  update: (id, data) => api.put(`/users/${id}`, data),
  delete: (id) => api.delete(`/users/${id}`),
  getProgress: (id) => api.get(`/users/${id}/progress`),
  getAchievements: (id) => api.get(`/users/${id}/achievements`)
};

// Subjects API calls
export const subjectsAPI = {
  getAll: (grade) => api.get(`/subjects${grade ? `?grade=${grade}` : ''}`),
  getBySlug: (slug) => api.get(`/subjects/${slug}`),
  getChapters: (slug) => api.get(`/subjects/${slug}/chapters`),
  create: (data) => api.post('/subjects', data),
  update: (id, data) => api.put(`/subjects/${id}`, data),
  delete: (id) => api.delete(`/subjects/${id}`)
};

// Materials API calls
export const materialsAPI = {
  getAll: (params) => api.get('/materials', { params }),
  getById: (id) => api.get(`/materials/${id}`),
  search: (query) => api.get(`/materials/search?q=${query}`),
  download: (id) => api.get(`/materials/${id}/download`),
  create: (formData) => api.post('/materials', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  update: (id, data) => api.put(`/materials/${id}`, data),
  delete: (id) => api.delete(`/materials/${id}`)
};

// Quizzes API calls
export const quizzesAPI = {
  getAll: (params) => api.get('/quizzes', { params }),
  getById: (id) => api.get(`/quizzes/${id}`),
  submit: (id, answers, timeTaken) => api.post(`/quizzes/${id}/submit`, { answers, timeTaken }),
  getResults: (id) => api.get(`/quizzes/${id}/results`),
  getStatistics: (id) => api.get(`/quizzes/${id}/statistics`),
  create: (data) => api.post('/quizzes', data),
  update: (id, data) => api.put(`/quizzes/${id}`, data),
  delete: (id) => api.delete(`/quizzes/${id}`)
};

// Games API calls
export const gamesAPI = {
  getAll: (params) => api.get('/games', { params }),
  getById: (id) => api.get(`/games/${id}`),
  play: (id) => api.post(`/games/${id}/play`),
  submitScore: (id, score, timeTaken) => api.post(`/games/${id}/score`, { score, timeTaken }),
  getLeaderboard: (id) => api.get(`/games/${id}/leaderboard`),
  create: (data) => api.post('/games', data),
  update: (id, data) => api.put(`/games/${id}`, data),
  delete: (id) => api.delete(`/games/${id}`)
};

// Community API calls
export const communityAPI = {
  // Discussions
  getDiscussions: (params) => api.get('/community/discussions', { params }),
  getDiscussion: (id) => api.get(`/community/discussions/${id}`),
  createDiscussion: (data) => api.post('/community/discussions', data),
  updateDiscussion: (id, data) => api.put(`/community/discussions/${id}`, data),
  deleteDiscussion: (id) => api.delete(`/community/discussions/${id}`),
  addReply: (id, content) => api.post(`/community/discussions/${id}/reply`, { content }),
  likeDiscussion: (id) => api.post(`/community/discussions/${id}/like`),
  
  // Study Groups
  getStudyGroups: (params) => api.get('/community/study-groups', { params }),
  createStudyGroup: (data) => api.post('/community/study-groups', data),
  joinStudyGroup: (id) => api.post(`/community/study-groups/${id}/join`),
  leaveStudyGroup: (id) => api.post(`/community/study-groups/${id}/leave`),
  
  // Achievements
  getAchievements: () => api.get('/community/achievements'),
  getUserAchievements: () => api.get('/community/achievements/user')
};

// Progress API calls
export const progressAPI = {
  getProgress: () => api.get('/progress'),
  getStats: () => api.get('/progress/stats'),
  getSubjectProgress: (subject) => api.get(`/progress/subject/${subject}`),
  updateProgress: (data) => api.put('/progress/update', data),
  logSession: (data) => api.post('/progress/session', data)
};

// Parental Control API calls
export const parentalAPI = {
  getControls: (childId) => api.get(`/parental/${childId}`),
  updateControls: (childId, data) => api.put(`/parental/${childId}`, data),
  getChildProgress: (childId) => api.get(`/parental/${childId}/progress`),
  getChildActivity: (childId) => api.get(`/parental/${childId}/activity`),
  setTimeControls: (childId, data) => api.put(`/parental/${childId}/time-controls`, data),
  setContentFilters: (childId, data) => api.put(`/parental/${childId}/content-filters`, data),
  getSessionLogs: (childId) => api.get(`/parental/${childId}/session-logs`)
};

// Contact API calls
export const contactAPI = {
  submit: (data) => api.post('/contact', data),
  getMessages: () => api.get('/contact'),
  updateStatus: (id, status) => api.put(`/contact/${id}/status`, { status })
};

// Flashcards API calls
export const flashcardsAPI = {
  getAll: (params) => api.get('/flashcards', { params }),
  getById: (id) => api.get(`/flashcards/${id}`),
  getMy: (params) => api.get('/flashcards/my/flashcards', { params }),
  getPopular: (limit) => api.get(`/flashcards/popular?limit=${limit}`),
  getRecent: (limit) => api.get(`/flashcards/recent?limit=${limit}`),
  search: (params) => api.get('/flashcards/search', { params }),
  create: (data) => api.post('/flashcards', data),
  update: (id, data) => api.put(`/flashcards/${id}`, data),
  delete: (id) => api.delete(`/flashcards/${id}`),
  study: (id, difficulty) => api.post(`/flashcards/${id}/study`, { difficulty }),
  rate: (id, rating) => api.post(`/flashcards/${id}/rate`, { rating })
};

export default api;