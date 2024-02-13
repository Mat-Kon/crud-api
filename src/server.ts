import http, { type IncomingMessage, type ServerResponse } from 'http';
import dotenv from 'dotenv';
import { handlerUsersRoute } from './handlers/handlerUsersRoute';

dotenv.config();

const PORT = process.env.PORT;

const server = http.createServer((
  req: IncomingMessage,
  res: ServerResponse<IncomingMessage>
    & { req: IncomingMessage }
) =>{
  handlerUsersRoute(req, res);
});

server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
