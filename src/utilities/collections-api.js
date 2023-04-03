import sendRequest from "./send-request";
const BASE_URL = '/api/collections';

export async function index() {
    return sendRequest(BASE_URL);
  }

export async function create(collection) {
  return sendRequest(BASE_URL, 'POST', collection);
}

export async function deleteCollection(id) {
  return sendRequest(`${BASE_URL}/${id}`, 'DELETE')
}

export async function updateCollection(id, formData) {
  return sendRequest(`${BASE_URL}/${id}`, 'PUT', formData)
}

export function uploadImage(imageData) {
  // See refactored sendRequest function that now accepts a 4th arg
  // used to specify that the payload is a FormData object
  return sendRequest(`${BASE_URL}/upload`, 'POST', imageData, true);
}

export function uploadTrack(id, trackData) {
  return sendRequest(`${BASE_URL}/${id}/uploadtrack`, 'POST', trackData, true);
}