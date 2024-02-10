import dotenv from 'dotenv';
import { addUser } from "../modules/usersController";

dotenv.config();

const BASE_URL= `http://localhost:${process.env.PORT}`;

describe('Users API', () => {
  test('Should return an empty array', async () => {
    const resp = await fetch(`${BASE_URL}/api/users`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
      }
    });
    const users = await resp.json();
    expect(users.length).toBe(0)
  });

  test('Should return user after add new user', async () => {
    const user = {
      name: 'Man',
      age: 24,
      hobby: ['music', 'photo']
    }

    const resp = await fetch(`${BASE_URL}/api/users`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user)
    });

    const newUser = await resp.json();
    expect(newUser.id).not.toBeNull();
    expect(newUser.name).toBe('Man');
    expect(newUser.age).toBe(24);
    expect(newUser.hobby.length).toBe(2);
  });

  test('Should return one user after create new user', async () => {
    const resp = await fetch(`${BASE_URL}/api/users`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
      }
    });
    const users = await resp.json();
    expect(users.length).toBe(1)
  });

  test('Should return user by id', async () => {
    const respAllUsers = await fetch(`${BASE_URL}/api/users`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
      }
    });
    const users = await respAllUsers.json();
    const userId = users[0].id;

    const respUserById = await fetch(`${BASE_URL}/api/users/${userId}`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
      }
    });
    const user = await respUserById.json();
    expect(user.id).toBe(userId);
    expect(user.name).toBe('Man');
    expect(user.age).toBe(24);
    expect(user.hobby.length).toBe(2);
  });

  test('Should delete user', async () => {
    const respAllUsers = await fetch(`${BASE_URL}/api/users`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
      }
    });
    const users = await respAllUsers.json();
    const userId = users[0].id;

    const deleteUser = await fetch(`${BASE_URL}/api/users/${userId}`, {
      method: 'DELETE',
    });
    expect(deleteUser.status).toBe(204);
  });

  test('Should return an empty array after delete user', async () => {
    const resp = await fetch(`${BASE_URL}/api/users`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
      }
    });
    const users = await resp.json();
    expect(users.length).toBe(0)
  });
});