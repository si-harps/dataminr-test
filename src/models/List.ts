import Task from './Task';

interface List {
  id: number;
  title: string;
  updatedAt: string;
  tasks?: Task[];
}

export default List;
