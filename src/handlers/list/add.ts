import { APIGatewayProxyHandler, APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import pool from '../../util/pool';

export const handler: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent, 
): Promise<APIGatewayProxyResult> => {

  if (!event.body) {
    return {
      statusCode: 400,
      body: JSON.stringify({ meassge: 'Unexpected request body' })
    }
  }
  
  try {
    const { 
      listId,
      taskId
    } = JSON.parse(event.body);

    const query = await pool.query(`
      INSERT 
      INTO list_task (list_id, task_id)
      VALUES('${listId}', '${taskId}')
    `);

    const response = query.rows[0];

    return {
      statusCode: 200,
      body: JSON.stringify(response)
    }
  } catch (err) {
    return {
      statusCode: 400,
      body: 'Invalid parameters supplied'
    }
  }
}