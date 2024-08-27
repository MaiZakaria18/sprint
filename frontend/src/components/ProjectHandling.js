import axios from 'axios';

const API_URL = '/projects/';


/**
 * Retrieves a list of projects from the API.
 *
 * @return {Promise<Array>} A promise that resolves to an array of project data.
 * @throws {Error} If there is an error fetching the projects.
 */
export const listProjects = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching projects:', error);
    throw error;
  }
};

/**
 * Creates a new project by sending a POST request to the API with the provided project data.
 *
 * @param {Object} projectData - The data for the project to be created.
 * @return {Object} The created project data.
 */
export const createProject = async (projectData) => {
  try {
    const response = await axios.post(API_URL, projectData); // Correct URL
    return response.data;
  } catch (error) {
    console.error('Error creating project:', error);
    throw error;
  }
};


/**
 * Retrieves a specific project by its ID from the API.
 *
 * @param {number|string} projectId - The ID of the project to be retrieved.
 * @return {Object} The project data retrieved from the API.
 */
export const retrieveProject = async (projectId) => {
  try {
    const response = await axios.get(`${API_URL}${projectId}/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching project details:', error);
    throw error;
  }
};


/**
 * Updates a specific project by sending a PUT request to the API with the provided project data.
 *
 * @param {number|string} projectId - The ID of the project to be updated.
 * @param {Object} projectData - The updated data for the project.
 * @return {Object} The updated project data.
 */
export const updateProject = async (projectId, projectData) => {
  try {
    const response = await axios.put(`${API_URL}${projectId}/`, projectData); // Correct URL
    return response.data;
  } catch (error) {
    console.error('Error updating project:', error);
    throw error;
  }
};


/**
 * Deletes a specific project by sending a DELETE request to the API.
 *
 * @param {number|string} projectId - The ID of the project to be deleted.
 * @return {Object} The response data from the API after deleting the project.
 */
export const deleteProject = async (projectId) => {
  try {
    const response = await axios.delete(`${API_URL}${projectId}/`); // Correct URL
    return response.data;
  } catch (error) {
    console.error('Error deleting project:', error);
    throw error;
  }
};
