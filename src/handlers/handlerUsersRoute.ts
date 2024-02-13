import { type IncomingMessage, type ServerResponse } from 'http';
import { addUser, deleteUser, handlerGetMethod, updateUser } from '../modules/usersController';
import { sendResponse } from '../utils/helperFunctions';


const USER_PATH = '/api/users';

const handlerUsersRoute = (
  req: IncomingMessage,
  res: ServerResponse<IncomingMessage>
    & { req: IncomingMessage }
) => {
  const requestPath: string = req.url ?? '';
  const method: string = req.method ?? '';

  if (!requestPath.startsWith(USER_PATH)) {
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
      case "PUT": return updateUser(req, res);
      case "DELETE": return deleteUser(req, res);

      default: return sendResponse(res, 500, { message: 'Invalid method' });
    }
  } catch (error) {
    console.error('Error occurred while processing request:', error);
    sendResponse(res, 500, { message: 'Internal Server Error' });
  }
};

export { handlerUsersRoute }