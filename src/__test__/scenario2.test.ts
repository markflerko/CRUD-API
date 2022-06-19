import request from 'supertest';
import app from '../server';

describe('Custom scenario 2', () => {
  const user = {
    username: 'kek',
    age: 42,
    hobbies: ['cheburek'],
  };

  const userUpdate = {
    username: 'kek',
    age: 42,
    hobbies: ['cheburek', 'new Hobby'],
  };

  let id: string;

  test('Create user => expect response with user data', async () => {
    const response = await request(app).post('/users').send(user);

    expect(response.status).toBe(201);

    id = response.body.id;

    const { body } = response;

    expect(body).toMatchObject(user);
  });

  test('Add new hobby to user => updated user expected', async () => {
    const response = await request(app).put(`/users/${id}`).send(userUpdate);

    expect(response.status).toBe(200);

    id = response.body.id;

    const { body } = response;

    expect(body).toMatchObject(userUpdate);

    app.close();
  });
});
