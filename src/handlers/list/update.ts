import { APIGatewayProxyHandler, APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import pool from '../../util/pool';
import List from '../../models/List';

export const handler: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent, 
): Promise<APIGatewayProxyResult> => {

  const { id } = event.pathParameters!;
  const body = JSON.parse(event.body!);

  if (!id || !body.title) {
    return {
      statusCode: 400,
      body: JSON.stringify({ meassge: 'Attributes id and title required' })
    }
  }

  const query = await pool.query(`
    UPDATE list 
    SET title = '${body.title}', "updatedAt" = '${new Date().toISOString()}'
    WHERE id = '${id}'
    returning id, title, "updatedAt"
  `);

  const response: List = query.rows[0];

  return {
    statusCode: 200,
    body: JSON.stringify(response)
  }
}