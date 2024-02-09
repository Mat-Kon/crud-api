import http from 'http';
import dotenv from 'dotenv';
import { getAllUsers } from './modules/usersController';

dotenv.config();

const PORT = process.env.PORT;
const usersAPI = '/api/users';

const server = http.createServer((req, res) =>{
  const requestPath: string = req.url ?? '';
  const method: string = req.method ?? '';

  if (requestPath !== usersAPI) {
    try {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: `Path ${requestPath} is not found` }));
    } catch (error) {
      console.error('Error occurred while sending response:', error);
    }
    return;
  }

  try {
    switch (method) {
      case "GET":
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(getAllUsers()));
        break;
      default:
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Invalid method' }));
        break;
    }
  } catch (error) {
    console.error('Error occurred while processing request:', error);
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Internal Server Error' }));
  }
});

server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
