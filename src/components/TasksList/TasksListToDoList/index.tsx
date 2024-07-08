import { TasksList, ToDoListTypes } from '..';
import styles from './styles.module.css';
import { FaRegTrashCan } from 'react-icons/fa6';
import { PiCheckCircleBold } from 'react-icons/pi';
import { PiCircleBold } from 'react-icons/pi';
import { MouseEvent } from 'react';

type ToDoListProps = {
    toDoList: ToDoListTypes[];
    isRender: boolean;
    handleMarkTaskAsComplete(
        event: MouseEvent<HTMLButtonElement>,
        id: string
    ): void;
    handleRemoveTask(event: MouseEvent<HTMLButtonElement>, id: string): void;
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
                                    onClick={(e) =>
                                        handleMarkTaskAsComplete(e, task.id)
                                    }
                                />

                                <TasksList.Button
                                    icon={PiCircleBold}
                                    isRendered={!task.isFinished}
                                    className={styles['uncheck-button']}
                                    onClick={(e) =>
                                        handleMarkTaskAsComplete(e, task.id)
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
                                    onClick={(e) =>
                                        handleRemoveTask(e, task.id)
                                    }
                                />
                            </li>
                        );
                    })}
                </ul>
            )}
        </div>
    );
}
