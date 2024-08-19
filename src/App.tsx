import { FormEvent, useContext } from 'react';
import styles from './app.module.css';
import { Form } from './components/Form';
import { Header } from './components/Header';
import { TasksList } from './components/TasksList/index';
import { DialogContext } from './context/dialog';
import { Task, ToDoActions, useToDo } from './context/useToDo';


function App() {

    const { toDoStates, dispatch } = useToDo()
    const { tasks, numberOfTasksCompleted, numberOfTasksPending } = toDoStates
    const { setMessage, toggleDialog, setHandle } = useContext(DialogContext);

    function handleAddTask(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const data = new FormData(event.currentTarget)
        const task = data.get('task')?.toString()

        if (!task) {
            return;
        }

        openDialog(`Deseja Adicionar a tarefa  ${task}?`);
        setHandle({ execute: () => { dispatchAddTask(task) } });
        event.currentTarget.reset()
    }


    function handleRemoveTask(id: string) {
        if (id.trim() === '') {
            return;
        }

        const searchedTask = tasks.find((task) => task.id === id);
        if (!searchedTask) {
            alert('Tarefa não encontrada - Remove');
            return;
        }

        const message = `Deseja remover a tarefa: ${searchedTask?.task}?`;
        openDialog(message);
        setHandle({ execute: () => { dispatchRemoveTask(id) } });

    }


    function handleMarkTaskAsComplete(task: Task): void {
        if (!task) {
            return;
        }
        const message = task.isFinished ? `Marcar tarefa: ${task.task} como pendente?` : `Marcar tarefa  ${task.task}  como concluída?`;
        openDialog(message);
        setHandle({ execute: () => { dispatchMarkTaskAsComplete(task.id) } });
    }


    function dispatchRemoveTask(id: string) {
        dispatch({
            type: ToDoActions.REMOVE_TASK,
            payload: id
        })

    }
    function dispatchAddTask(task: string) {
        console.log
        dispatch({
            type: "ADD_TASK",
            payload: task
        })
    }
    function dispatchMarkTaskAsComplete(id: string) {
        dispatch({
            type: ToDoActions.CHECK_TASK_COMPLETE,
            payload: id
        })
    }



    function openDialog(message: string) {
        setMessage(message);
        toggleDialog()
    }

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <Header />
                <Form
                    handleAddTask={handleAddTask}
                />
                <TasksList.Root>
                    <TasksList.Header
                        numberOfTasksCompleted={numberOfTasksCompleted}
                        numberOfTasksPending={numberOfTasksPending}
                    />
                    <TasksList.ToDoList
                        handleMarkTaskAsComplete={handleMarkTaskAsComplete}
                        handleRemoveTask={handleRemoveTask}
                        toDoList={tasks}
                        isRender={tasks.length > 0}
                    />
                    <TasksList.ListEmpty isRender={tasks.length <= 0} />
                </TasksList.Root>
            </div>

        </div>
    );

}

export default App;
