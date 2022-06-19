import request from 'supertest';
import app from '../server';

describe('Custom scenario 3', () => {
  const user = {
    username: 'kek',
    age: 42,
    hobbies: ['cheburek'],
  };

  test('Create user => expect response with user data', async () => {
    const response = await request(app).post('/users').send(user);

    expect(response.status).toBe(201);

    const { body } = response;

    expect(body).toMatchObject(user);
  });

  test('Add new hobby to user => updated user expected', async () => {
    const response = await request(app).get(`/users/`);

    expect(response.status).toBe(200);

    const { body } = response;

    expect(body.length).toEqual(1);

    app.close();
  });
});
