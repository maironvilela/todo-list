import { TasksListButton } from './TasksListButton';
import { TasksListEmptyList } from './TasksListEmptyList';
import { TaskListHeader } from './TasksListHeader';
import { TasksListRoot } from './TasksListRoot';
import { TaskListToDoList } from './TasksListToDoList';

export type ToDoListTypes = {
    id: string;
    task: string;
    isFinished: boolean;
};

export const TasksList = {
    Root: TasksListRoot,
    ListEmpty: TasksListEmptyList,
    Header: TaskListHeader,
    ToDoList: TaskListToDoList,
    Button: TasksListButton,
};
