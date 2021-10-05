import { APIGatewayProxyHandler, APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { pool, response } from '../../util';

export const handler: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent, 
): Promise<APIGatewayProxyResult> => {

  let query = `
    SELECT
      list.id AS "list.id", 
      list.title AS "list.title", 
      list."updatedAt" AS "list.updatedAt", 
      task.id AS "task.id", 
      task.title AS "task.title", 
      task."updatedAt" AS "task.updatedAt" 
    FROM list 
    LEFT JOIN list_task on list_id = list.id 
    LEFT JOIN task ON task.id = list_task.task_id
  `;

  if (event.pathParameters && event.pathParameters.id) {
    query += `WHERE list.id = ${event.pathParameters.id}`;
  } else {
    query += `ORDER BY list.id ASC`;
  }

  const result = await pool.query(query);
  const body = response(result.rows);

  if (!body) {
    return {
      statusCode: 400,
      body: JSON.stringify({ meassge: 'Unable to retreive task list' })
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify(body)
  };
}