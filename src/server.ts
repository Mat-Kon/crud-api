import http, { type IncomingMessage, type ServerResponse } from 'http';
import dotenv from 'dotenv';
import { addUser, getAllUsers, handlerGetMethod } from './modules/usersController';
import { sendResponse } from './utils/helperFunctions';

dotenv.config();

const PORT = process.env.PORT;
const usersAPI = '/api/users';

const server = http.createServer((
  req: IncomingMessage,
  res: ServerResponse<http.IncomingMessage>
    & { req: http.IncomingMessage }
) =>{
  const requestPath: string = req.url ?? '';
  const method: string = req.method ?? '';

  if (!requestPath.startsWith(usersAPI)) {
    try {
      sendResponse(res, 404, { message: 'Endpoint not found' });
    } catch (error) {
      console.error('Error occurred while sending response:', error);
    }
    return;
  }

  try {
    switch (method) {
      case "GET": return handlerGetMethod(requestPath, res);
      case "POST": return addUser(req, res);
      case "PUT": return sendResponse(res, 200, getAllUsers());
      case "DELETE": return sendResponse(res, 200, getAllUsers());

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
