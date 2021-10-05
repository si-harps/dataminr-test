import List from './List';

interface Task {
  id: number;
  title: string;
  updatedAt: string;
  list?: List[];
}

export default Task;
