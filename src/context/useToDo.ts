/* eslint-disable @typescript-eslint/no-explicit-any */
import { v4 as uuidv4 } from 'uuid';
import { useReducer } from 'react';

export const ToDoActions = {
    ADD_TASK: 'ADD_TASK',
    REMOVE_TASK: 'REMOVE_TASK',
    CHECK_TASK_COMPLETE: 'CHECK_TASK_COMPLETE',
};

export type Task = {
    id: string;
    task: string;
    isFinished: boolean;
};

type StateTypes = {
    tasks: Task[];
    inputValue: string;
    numberOfTasksCompleted: number;
    numberOfTasksPending: number;
};

export function useToDo() {
    const initialState = {
        tasks: [],
        inputValue: '',
        numberOfTasksCompleted: 0,
        numberOfTasksPending: 0,
    };
    const [toDoStates, dispatch] = useReducer(toDoReducer, initialState);

    function toDoReducer(state: StateTypes, action: any) {
        switch (action.type) {
            case ToDoActions.ADD_TASK: {
                return addTask(state, action);
            }
            case ToDoActions.CHECK_TASK_COMPLETE: {
                return markTaskAsComplete(state, action);
            }
            case ToDoActions.REMOVE_TASK: {
                return removeTask(state, action);
            }
        }
        return state;
    }

    function addTask(state: StateTypes, action: any) {
        const newTask = {
            id: uuidv4(),
            task: action.payload,
            isFinished: false,
        };

        const newTasks = [...state.tasks, newTask];

        const { numberOfTasksCompleted, numberOfTasksPending } =
            getSummaryOfTaskStatus(newTasks);

        const newState = {
            ...state,
            inputValue: '',
            numberOfTasksCompleted,
            numberOfTasksPending,
            tasks: newTasks,
        };

        return newState;
    }

    function markTaskAsComplete(state: StateTypes, action: any) {
        const searchedTask = state.tasks.map((task) => {
            if (task.id === action.payload) {
                task.isFinished = !task.isFinished;
            }
            return task;
        });

        const { numberOfTasksCompleted, numberOfTasksPending } =
            getSummaryOfTaskStatus(searchedTask);
        return {
            ...state,
            numberOfTasksCompleted,
            numberOfTasksPending,
            tasks: searchedTask,
        };
    }

    function removeTask(state: StateTypes, action: any) {
        const newTasks = state.tasks.filter((task) => {
            return task.id != action.payload;
        });

        const { numberOfTasksCompleted, numberOfTasksPending } =
            getSummaryOfTaskStatus(newTasks);
        return {
            ...state,
            numberOfTasksCompleted,
            numberOfTasksPending,
            tasks: newTasks,
        };
    }

    function getSummaryOfTaskStatus(tasks: Task[]) {
        const result = tasks.reduce(
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

        return {
            numberOfTasksCompleted: result.completedTasks,
            numberOfTasksPending: result.pendingTasks,
        };
    }

    return { toDoStates, dispatch };
}
