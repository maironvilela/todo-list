/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react';
import styles from './styles.module.css';
import SvgIconUncheckedCheckBox from '../../assets/check-box-unchecked';
import SvgIconCheckedCheckBox from '../../assets/check-box-checked';

type ToDoListTypes = {
    id: string;
    task: string;
    isFinished: boolean;
};

type ToDoListProps = {
    toDoList: ToDoListTypes[];
};

export function TasksList() {
    const [tasksCreated, setTasksCreated] = useState(0);
    const [tasksCompleted, setTasksCompleted] = useState(0);
    const [toDoList, setToDoList] = useState<ToDoListTypes[]>([
        {
            id: '001',
            task: 'Integer urna interdum massa libero auctor neque turpis turpis semper. Duis vel sed fames integer.',
            isFinished: false,
        },
        {
            id: '002',
            task: 'Integer urna interdum massa libero auctor neque turpis turpis semper. Duis vel sed fames integer.',
            isFinished: true,
        },
        {
            id: '002',
            task: 'Integer urna interdum massa libero auctor neque turpis turpis semper. Duis vel sed fames integer.',
            isFinished: true,
        },
    ]);
    return (
        <div className={styles.container}>
            <header>
                <div className={styles['tasks-created']}>
                    <strong>Tarefas Criadas</strong>
                    <span>{tasksCreated}</span>
                </div>
                <div className={styles['tasks-completed']}>
                    <strong>Tarefas Concluidas</strong>
                    <span>{tasksCompleted}</span>
                </div>
            </header>
            <main>
                {toDoList.length > 0 ? (
                    <ToDoList toDoList={toDoList} />
                ) : (
                    <ListaVazia />
                )}
            </main>
        </div>
    );
}

function ListaVazia() {
    return (
        <div className={styles['empty-list']}>
            <img src="./empty-list.png" />
            <strong>Você ainda não tem tarefas cadastradas</strong>
            <span>Crie tarefas e organize seus itens a fazer</span>
        </div>
    );
}

function ToDoList({ toDoList }: ToDoListProps) {
    return (
        <>
            <ul>
                {toDoList.map((task) => {
                    return (
                        <li key={task.id} className={styles['task-item']}>
                            {task.isFinished ? (
                                <button>
                                    <SvgIconCheckedCheckBox />
                                </button>
                            ) : (
                                <button>
                                    <SvgIconUncheckedCheckBox />
                                </button>
                            )}

                            <span
                                className={`${task.isFinished ? styles['task-finished'] : ''}`}
                            >
                                {task.task}
                            </span>
                        </li>
                    );
                })}
            </ul>
        </>
    );
}
