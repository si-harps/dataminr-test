import request from 'supertest';
import Task from '../../../src/models/List';

const server = request('http://localhost:4000');

let id: number;

// Cleanup placeholder
afterAll( async () => {
  // Delete ${id} from database
});

describe('Given a valid payload', () => {
  describe('When creating a new list', () => {
    it('should take a body and return an API Gateway response', async () => {

      const response = await server
        .post('/dev/task')
        .send({ title: 'Task 1' });

      const body: Task = response.body;

      id = body.id

      expect(response.statusCode).toEqual(200);
      expect(body.title.trim()).toEqual('Task 1');
      expect(typeof body.id).toBe('number');
    });
  });
});

describe('Given an invalid payload', () => {
  describe('When attempting to create a new list', () => {
    it('should take a body and return a bad request', async () => {

      const response = await server
        .post('/dev/task')

      expect(response.statusCode).toEqual(400);
    });
  });
});