import { MouseEvent, useEffect, useState } from 'react';
import styles from './app.module.css';
import { Form } from './components/Form';
import { Header } from './components/Header';
import { TasksList } from './components/TasksList/index';
import { v4 as uuidv4 } from 'uuid';

type ToDoListTypes = {
    id: string;
    task: string;
    isFinished: boolean;
};

function App() {
    const [inputValue, setInputValue] = useState('');
    const [numberOfTasksCompleted, setNumberOfTasksCompleted] = useState(0);
    const [numberOfTasksPending, setNumberOfTasksPending] = useState(0);
    const [toDoList, setToDoList] = useState<ToDoListTypes[]>([
        {
            id: '1',
            task: 'tarefa 01',
            isFinished: false,
        },
        {
            id: '2',
            task: 'tarefa 02',
            isFinished: false,
        },
    ]);

    useEffect(() => {
        const result = toDoList.reduce(
            (accumulator, task) => {
                if (task.isFinished === true) {
                    accumulator.completedTasks = accumulator.completedTasks + 1;
                } else {
                    accumulator.pendingTasks = accumulator.pendingTasks + 1;
                }
                return accumulator;
            },
            { pendingTasks: 0, completedTasks: 0 }
        );

        setNumberOfTasksCompleted(result.completedTasks);
        setNumberOfTasksPending(result.pendingTasks);
    }, [toDoList]);

    const handleAddTask = (event: MouseEvent<HTMLButtonElement>): void => {
        event.preventDefault();

        if (inputValue.trim() === '') {
            alert('Favor, informe uma tarefa');
            setInputValue('');
            return;
        }

        const confirmAddTask = confirm(`Adicionar tarefa ${inputValue}?`);

        if (!confirmAddTask) {
            setInputValue('');
            return;
        }

        const newTask = {
            id: uuidv4(),
            task: inputValue,
            isFinished: false,
        };

        setToDoList([...toDoList, newTask]);
        setInputValue('');
    };

    const handleMarkTaskAsComplete = (
        event: MouseEvent<HTMLButtonElement>,
        id: string
    ): void => {
        event.preventDefault();

        const searchedTask = toDoList.find((task) => task.id === id);

        if (!searchedTask) {
            alert('Tarefa não encontrada');
            return;
        }

        const message = searchedTask.isFinished
            ? `Desmarcar conclusao da tarefa ${searchedTask.task}?`
            : `Marcar tarefa "${searchedTask.task}" como concluida?`;

        if (!confirm(message)) {
            return;
        }

        const newToDoList = toDoList.filter((task: ToDoListTypes) => {
            if (task.id === searchedTask.id) {
                task.isFinished = !task.isFinished;
            }
            return task;
        });

        setToDoList(newToDoList);
    };

    const handleRemoveTask = (
        event: MouseEvent<HTMLButtonElement>,
        id: string
    ): void => {
        event.preventDefault();

        const searchedTask = toDoList.find((task) => task.id === id);

        if (!searchedTask) {
            alert('Tarefa não encontrada');
            return;
        }

        const message = `Deseja remover a tarefa ${searchedTask.task}`;

        if (!confirm(message)) {
            return;
        }

        const newToDoList = toDoList.filter((task: ToDoListTypes) => {
            if (task.id != searchedTask.id) {
                return task;
            }
        });

        setToDoList(newToDoList);
        alert('Tarefa removida com sucesso');
    };

    return (
        <div className={styles.container}>
            <Header />
            <Form
                handleAddTask={handleAddTask}
                setInputValue={setInputValue}
                inputValue={inputValue}
            />
            <TasksList.Root>
                <TasksList.Header
                    numberOfTasksCompleted={numberOfTasksCompleted}
                    numberOfTasksPending={numberOfTasksPending}
                />
                <TasksList.ToDoList
                    handleMarkTaskAsComplete={handleMarkTaskAsComplete}
                    handleRemoveTask={handleRemoveTask}
                    toDoList={toDoList}
                    isRender={toDoList.length > 0}
                />
                <TasksList.ListEmpty isRender={toDoList.length <= 0} />
            </TasksList.Root>
        </div>
    );
}

export default App;
