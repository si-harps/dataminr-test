import List from '../models/List';

const response = (data: any): List|List[] => {

  const lists: List[] = [];
  const processed: Number[] = [];

  for (let row of data) {

    if(!~processed.indexOf(row['list.id'])) {
      lists.push({
        id: row['list.id'],
        title: row['list.title'],
        updatedAt: row['list.updatedAt'],
        tasks: []
      });
      processed.push(row['list.id']);
    }
  }

  for (let row of data) {

    if (row['task.id']) {
      const index = processed.indexOf(row['list.id']);
      lists[index].tasks!.push({
        id: row['task.id'],
        title: row['task.title'],
        updatedAt: row['task.updatedAt'],
      })
    }
  }

  return lists.length === 1 
    ? lists[0] 
    : lists;
}

export default response;