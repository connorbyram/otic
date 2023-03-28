import sendRequest from "./send-request";
const BASE_URL = '/api/collections';

export async function index() {
    return sendRequest(BASE_URL);
  }

export async function create(collection) {
  const createResponse = await sendRequest(BASE_URL, 'POST', collection);
  console.log(createResponse, "this is the createResponse")
  return createResponse
  // return sendRequest(BASE_URL, 'POST', collection);
}