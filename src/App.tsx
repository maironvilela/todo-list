/* eslint-disable react-hooks/exhaustive-deps */
import { MouseEvent, useContext, useEffect, useState } from 'react';
import styles from './app.module.css';
import { Form } from './components/Form';
import { Header } from './components/Header';
import { TasksList } from './components/TasksList/index';
import { v4 as uuidv4 } from 'uuid';
import { DialogContext } from './context/dialog';

type ToDoListTypes = {
    id: string;
    task: string;
    isFinished: boolean;
};

function App() {
    const [inputValue, setInputValue] = useState('');
    const [idTaskToRemove, setIdTaskToRemove] = useState('');
    const [idTaskToMarkComplete, setIdTaskToMarkComplete] = useState('');
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
    const { isLoader, toggleIsLoader, toggleDialog, setMessage, setHandle } =
        useContext(DialogContext);

    useEffect(() => {
        if (!isLoader) setInputValue('');
    }, [isLoader]);

    useEffect(() => {
        getSummaryOfTaskStatus();

        function getSummaryOfTaskStatus() {
            const result = toDoList.reduce(
                (accumulator, task) => {
                    if (task.isFinished === true) {
                        accumulator.completedTasks =
                            accumulator.completedTasks + 1;
                    } else {
                        accumulator.pendingTasks = accumulator.pendingTasks + 1;
                    }
                    return accumulator;
                },
                { pendingTasks: 0, completedTasks: 0 }
            );

            setNumberOfTasksCompleted(result.completedTasks);
            setNumberOfTasksPending(result.pendingTasks);
        }
    }, [toDoList]);

    useEffect(() => {
        handleConfirmationDialogToRemoveTask(idTaskToRemove);
    }, [idTaskToRemove]);

    useEffect(() => {
        handleMarkTaskAsComplete(idTaskToMarkComplete);
    }, [idTaskToMarkComplete]);
    const handleConfirmationDialogToSaveTasks = (
        event: MouseEvent<HTMLButtonElement>
    ): void => {
        event.preventDefault();

        toggleIsLoader();
        setMessage(`Deseja Adiconar a tarefa  ${inputValue}?`);
        setHandle({ execute: addTask });
        toggleDialog();
    };
    const addTask = () => {
        const newTask = {
            id: uuidv4(),
            task: inputValue,
            isFinished: false,
        };

        setToDoList([...toDoList, newTask]);
        setInputValue('');
    };

    function handleConfirmationDialogToRemoveTask(id: string): void {
        if (id.trim() === '') {
            return;
        }
        const searchedTask = toDoList.find((task) => task.id === id);

        if (!searchedTask) {
            alert('Tarefa não encontrada - Remove');
            return;
        }

        toggleIsLoader();
        toggleDialog();
        setHandle({ execute: remove });

        setMessage(`Deseja remover a tarefa: ${searchedTask?.task}?`);
    }

    const remove = () => {
        const newToDoList = toDoList.filter((task: ToDoListTypes) => {
            if (task.id != idTaskToRemove) {
                return task;
            }
        });

        setToDoList(newToDoList);
        alert('Tarefa removida com sucesso');
    };

    const handleMarkTaskAsComplete = (id: string): void => {
        if (id.trim() === '') {
            return;
        }
        const searchedTask = toDoList.find((task) => task.id === id);

        if (!searchedTask) {
            alert('Tarefa não encontrada');
            return;
        }

        const message = searchedTask.isFinished
            ? `Desmarcar conclusao da tarefa ${searchedTask.task}?`
            : `Marcar tarefa "${searchedTask.task}" como concluida?`;

        toggleIsLoader();
        toggleDialog();
        setMessage(message);
        setHandle({ execute: togleMarkStatusTask });
        setIdTaskToMarkComplete('');
    };

    const togleMarkStatusTask = () => {
        const newToDoList = toDoList.filter((task: ToDoListTypes) => {
            if (task.id === idTaskToMarkComplete) {
                task.isFinished = !task.isFinished;
            }
            return task;
        });

        setToDoList(newToDoList);
    };

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <Header />
                <Form
                    handleAddTask={handleConfirmationDialogToSaveTasks}
                    setInputValue={setInputValue}
                    inputValue={inputValue}
                />
                <TasksList.Root>
                    <TasksList.Header
                        numberOfTasksCompleted={numberOfTasksCompleted}
                        numberOfTasksPending={numberOfTasksPending}
                    />
                    <TasksList.ToDoList
                        handleMarkTaskAsComplete={setIdTaskToMarkComplete}
                        handleRemoveTask={setIdTaskToRemove}
                        toDoList={toDoList}
                        isRender={toDoList.length > 0}
                    />
                    <TasksList.ListEmpty isRender={toDoList.length <= 0} />
                </TasksList.Root>
            </div>
        </div>
    );
}

export default App;
