import { v1 as uuidv1 } from 'uuid';
import { User } from '../utils/types';

const users: User[] = [];

const addUser = (username: string, age: number, hobbies: string[]): User => {
  return {
    id: uuidv1(),
    username,
    age,
    hobbies
  };
}

const getAllUsers = () => {
  return users;
};

export {
  addUser,
  getAllUsers
}