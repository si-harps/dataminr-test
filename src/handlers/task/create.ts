import { APIGatewayProxyHandler, APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import pool from '../../util/pool';
import Task from '../../models/Task';

export const handler: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent, 
): Promise<APIGatewayProxyResult> => {

  if (!event.body) {
    return {
      statusCode: 400,
      body: JSON.stringify({ meassge: 'Unexpected request body' })
    }
  }

  const body = JSON.parse(event.body);

  if (!body.title) {
    return {
      statusCode: 400,
      body: JSON.stringify({ meassge: 'Attribute title required' })
    }
  }

  const query = await pool.query(`
    INSERT 
    INTO task (title, "updatedAt") 
    VALUES ('${body.title}', '${new Date().toISOString()}') returning id, title, "updatedAt"
  `);

  const response: Task = query.rows[0];

  return {
    statusCode: 200,
    body: JSON.stringify(response)
  };
}