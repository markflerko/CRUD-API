import request from 'supertest';
import app from '../server';

describe('Custom scenario', () => {
  const user = {
    username: 'kek',
    age: 42,
    hobbies: ['cheburek'],
  };

  let id: string;

  test('Create user => expect response with user data', async () => {
    const response = await request(app).post('/users').send(user);

    expect(response.status).toBe(201);

    id = response.body.id;

    const { body } = response;

    expect(body).toMatchObject(user);
  });

  test('Delete user => success no content code expected', async () => {
    const response = await request(app).del(`/users/${id}`);

    expect(response.status).toBe(204);
  });

  test('delete not existing user => human friendly message expected', async () => {
    const response = await request(app).del(`/users/${id}`);

    expect(response.status).toBe(404);
    expect(response.text).toBe(`Sorry but no user with id: ${id} exist \n`);
  });
});
