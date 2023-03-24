import sendRequest from "./send-request";
const BASE_URL = '/api/collections';

export async function index() {
    return sendRequest(BASE_URL);
  }

  export async function create(collection) {
    return sendRequest(BASE_URL, 'POST', collection);
  }