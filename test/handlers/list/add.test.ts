import request from 'supertest';
import List from '../../../src/models/List';

const server = request('http://localhost:4000');

let taskId: number;

// Cleanup placeholder
afterAll(() => {

});

beforeAll( async () => {

  const response = await server
      .post('/dev/task')
      .send({ title: 'Task 2'});
  
  taskId = response.body.id;
});

describe('Given a valid payload', () => {
  describe('When adding a task to a list', () => {
    it('should take a body and return an API Gateway response', async () => {

      const createTask = await server
        .post('/dev/list')
        .send({ title: 'List 2' });

      const body: List = createTask.body;

      const response = await server
        .post('/dev/list/add')
        .send({
          listId: createTask.body.id,
          taskId
        });

      expect(response.statusCode).toEqual(204);
    });
  });
});