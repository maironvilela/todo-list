import { TasksList, ToDo } from '..';
import styles from './styles.module.css';
import { FaRegTrashCan } from 'react-icons/fa6';
import { PiCheckCircleBold } from 'react-icons/pi';
import { PiCircleBold } from 'react-icons/pi';

type ToDoListProps = {
    toDoList: ToDo[];
    isRender: boolean;
    handleMarkTaskAsComplete(task: ToDo): void;
    handleRemoveTask(id: string): void;
};



export function TaskListToDoList({
    toDoList,
    isRender,
    handleMarkTaskAsComplete,
    handleRemoveTask,
}: ToDoListProps) {
    return (
        <div className={styles.container}>
            {isRender && (
                <ul>
                    {toDoList.map((task) => {
                        return (
                            <li key={task.id} className={styles['task-item']}>
                                <TasksList.Button
                                    icon={PiCheckCircleBold}
                                    isRendered={task.isFinished}
                                    className={styles['check-button']}
                                    onClick={() =>
                                        handleMarkTaskAsComplete(task)
                                    }
                                />

                                <TasksList.Button
                                    icon={PiCircleBold}
                                    isRendered={!task.isFinished}
                                    className={styles['uncheck-button']}
                                    onClick={() =>
                                        handleMarkTaskAsComplete(task)
                                    }
                                />
                                <span
                                    className={`${task.isFinished ? styles['task-finished'] : ''}`}
                                >
                                    {task.task}
                                </span>

                                <TasksList.Button
                                    icon={FaRegTrashCan}
                                    className={styles['trash-button']}
                                    onClick={() => handleRemoveTask(task.id)}
                                />
                            </li>
                        );
                    })}
                </ul>
            )}
        </div>
    );
}
