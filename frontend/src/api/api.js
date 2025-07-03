// src/api/api.js

const API_BASE_URL = 'http://localhost:8080/api'; // Your Spring Boot backend URL

// Generic fetch utility to handle response parsing and error propagation
const apiFetch = async (url, options) => {
    try {
        const response = await fetch(`${API_BASE_URL}${url}`, options);
        const data = await response.json().catch(() => ({ message: response.statusText || 'Unknown error' }));

        if (!response.ok) {
            throw new Error(data.message || 'Something went wrong with the request.');
        }

        return data;
    } catch (error) {
        console.error("API call error:", error);
        throw error; // Re-throw to be caught by the component
    }
};

// --- Authentication API calls ---
export const authApi = {
    login: async (username, password) => {
        return apiFetch('/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
        });
    },

    signup: async (username, password, section) => {
        return apiFetch('/auth/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password, section }),
        });
    },

    logout: async (username) => {
        try {
            await fetch(`${API_BASE_URL}/auth/logout`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username }),
            });
            return { message: "Logged out successfully" };
        } catch (error) {
            console.error("Logout API call error:", error);
            throw new Error("Failed to communicate with logout service.");
        }
    },
};

// --- Job-related API calls ---
export const jobApi = {
    postJob: async (jobData) => {
        return apiFetch('/jobs', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(jobData),
        });
    },

    getRecommendations: async (applicantUsername) => {
        return apiFetch(`/resumes/recommendations/${applicantUsername}`);
    },

    /**
     * Fetches all available job listings from the backend.
     * Assumes a GET request to '/jobs' will return all jobs.
     */
    getAllJobs: async () => {
        return apiFetch('/jobs', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }, // Optional for GET requests, but harmless
        });
    },
};

// --- Resume-related API calls ---
export const resumeApi = {
    uploadResume: async (formData) => {
        return apiFetch('/resumes/upload', {
            method: 'POST',
            body: formData, // Do not set Content-Type for FormData
        });
    },
};