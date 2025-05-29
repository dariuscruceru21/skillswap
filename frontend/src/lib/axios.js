import axios from "axios";

const api = axios.create({
	baseURL: import.meta.env.VITE_API_URL || 'https://skillswap-backend-7yxq.onrender.com',
	withCredentials: true, // Include cookies in requests
	headers: {
		'Content-Type': 'application/json',
	},
})

// Add a request interceptor to include the auth token
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

// Add a response interceptor to handle errors
api.interceptors.response.use(
	(response) => response,
	async (error) => {
		const originalRequest = error.config;
		
		// If the error is 401 and we haven't tried to refresh the token yet
		if (error.response?.status === 401 && !originalRequest._retry && !originalRequest.url.includes('/refresh-token')) {
			originalRequest._retry = true;
			
			try {
				// Try to refresh the token
				await api.post('/api/auth/refresh-token');
				// Retry the original request
				return api(originalRequest);
			} catch (refreshError) {
				// If refresh token fails, redirect to signin
				window.location.href = '/signin';
			}
		}
		
		return Promise.reject(error);
	}
);

export default api;