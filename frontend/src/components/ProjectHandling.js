import axios from 'axios';

// Base URL for the API
const API_URL = '/projects/';

// Function to list all projects
export const listProjects = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching projects:', error);
    throw error;
  }
};

// Function to create a new project
export const createProject = async (projectData) => {
  try {
    const response = await axios.post(API_URL, projectData); // Correct URL
    return response.data;
  } catch (error) {
    console.error('Error creating project:', error);
    throw error;
  }
};

// Function to retrieve a specific project
export const retrieveProject = async (projectId) => {
  try {
    const response = await axios.get(`${API_URL}${projectId}/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching project details:', error);
    throw error;
  }
};

// Function to update a specific project
export const updateProject = async (projectId, projectData) => {
  try {
    const response = await axios.put(`${API_URL}${projectId}/`, projectData); // Correct URL
    return response.data;
  } catch (error) {
    console.error('Error updating project:', error);
    throw error;
  }
};

// Function to delete a specific project
export const deleteProject = async (projectId) => {
  try {
    const response = await axios.delete(`${API_URL}${projectId}/`); // Correct URL
    return response.data;
  } catch (error) {
    console.error('Error deleting project:', error);
    throw error;
  }
};
