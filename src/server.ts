import http from 'http';
import dotenv from 'dotenv';
import { getAllUsers } from './modules/usersController';
import { sendResponse } from './utils/helperFunctions';

dotenv.config();

const PORT = process.env.PORT;
const usersAPI = '/api/users';

const server = http.createServer((req, res) =>{
  const requestPath: string = req.url ?? '';
  const method: string = req.method ?? '';

  if (requestPath !== usersAPI) {
    try {
      sendResponse(res, 404, { message: 'Endpoint not found' });
    } catch (error) {
      console.error('Error occurred while sending response:', error);
    }
    return;
  }

  try {
    switch (method) {
      case "GET": return sendResponse(res, 200, getAllUsers());

      default: return sendResponse(res, 500, { message: 'Invalid method' });
    }
  } catch (error) {
    console.error('Error occurred while processing request:', error);
    sendResponse(res, 500, { message: 'Internal Server Error' });
  }
});

server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
