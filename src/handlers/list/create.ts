import { APIGatewayProxyHandler, APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import pool from '../../util/pool';
import List from '../../models/List';

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

    const body = JSON.parse(event.body!);

    if (!body.title) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'Attribute title required' })
      }
    }

    const query = await pool.query(`
      INSERT 
      INTO list (title, "updatedAt") 
      VALUES ('${body.title}', '${new Date().toISOString()}') returning id, title, "updatedAt"
    `);

    const response: List = query.rows[0];

    return {
      statusCode: 200,
      body: JSON.stringify(response)
    };
  } catch (err) {
    return {
      statusCode: 400,
      body: JSON.stringify(err),
    }
  }
}