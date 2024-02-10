import { v1 as uuidv1, validate } from 'uuid';
import { User } from '../utils/types';
import { type IncomingMessage, type ServerResponse } from 'http';
import { sendResponse } from '../utils/helperFunctions';

const users: User[] = [];
// username: string, age: number, hobbies: string[]
const addUser = (
  req: IncomingMessage,
  res: ServerResponse<IncomingMessage>
    & { req: IncomingMessage }
) => {
  let body = '';

  try {
    req.on('data', chunk => {
      body += chunk.toString();
    });

    req.on('end', () => {
      const userData = JSON.parse(body);

      if (!userData.name || !userData.age) {
        return sendResponse(res, 400, { message: 'Username and age are required fields' });
      }
      const newUser = {
        id: uuidv1(),
        ...userData
      };
      users.push(newUser);
      sendResponse(res, 201, newUser)
    });
  } catch {
    sendResponse(res, 500, { message: 'Internal server error' })
  }
}

const getAllUsers = () => {
  return users;
};

const getUserById = (userId: string) => {
  const user = users.find((user) => user.id === userId);
  if (user) {
    return user;
  } else {
    return null;
  }
};

const handlerGetMethod = (
  url: string,
  res: ServerResponse<IncomingMessage>
    & { req: IncomingMessage }
) => {
  const reqParams = url.split('/');

  if (reqParams.length === 3) {
    sendResponse(res, 200, getAllUsers());
  }

  if (reqParams.length === 4){
    const userId = reqParams[3];
    const user = getUserById(userId);

    if (!validate(userId)) {
      return sendResponse(res, 400, { message: 'Invalid user ID' });
    }

    if (user) {
      sendResponse(res, 200, user);
    } else {
      sendResponse(res, 404, { message: 'User is not found' });
    }
  }
};

export {
  addUser,
  getAllUsers,
  handlerGetMethod
}