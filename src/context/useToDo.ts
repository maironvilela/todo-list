/* eslint-disable @typescript-eslint/no-explicit-any */
import { v4 as uuidv4 } from 'uuid';

export const ToDoActions = {
    ADD_TODO: 'ADD_TODO',
    REMOVE_TODO: 'REMOVE_TODO',
    CHANGE_INPUT: 'CHANGE_INPUT',
    CHECK_TODO_COMPLETE: 'CHECK_TODO_COMPLETE',
};

type ToDo = {
    id: string;
    task: string;
    isFinished: boolean;
};

type StateTypes = {
    toDos: ToDo[];
    inputValue: string;
    numberOfTasksCompleted: number;
    numberOfTasksPending: number;
};

import { useReducer } from 'react';

export function useToDo() {
    const initialState = {
        toDos: [],
        inputValue: '',
        numberOfTasksCompleted: 0,
        numberOfTasksPending: 0,
    };

    function toDoReducer(state: StateTypes, action: any) {
        switch (action.type) {
            case ToDoActions.ADD_TODO: {
                console.log(state.inputValue);
                return addToDo(state, action);
            }
            case ToDoActions.CHANGE_INPUT: {
                return changeInput(state, action);
            }
            case ToDoActions.CHECK_TODO_COMPLETE: {
                return markTaskAsComplete(state, action);
            }
            case ToDoActions.REMOVE_TODO: {
                return removeTask(state, action);
            }
        }
        return state;
    }

    const [toDoStates, dispatch] = useReducer(toDoReducer, initialState);

    function addToDo(state: StateTypes, action: any) {
        const newTask = {
            id: uuidv4(),
            task: action.payload,
            isFinished: false,
        };

        const newTasks = [...state.toDos, newTask];

        const { numberOfTasksCompleted, numberOfTasksPending } =
            getSummaryOfTaskStatus(newTasks);

        const newState = {
            ...state,
            inputValue: '',
            numberOfTasksCompleted,
            numberOfTasksPending,
            toDos: newTasks,
        };

        return newState;
    }

    function changeInput(state: StateTypes, action: any) {
        const newState = {
            ...state,
            inputValue: action.payload,
        };
        return newState;
    }

    function markTaskAsComplete(state: StateTypes, action: any) {
        const searchedTask = state.toDos.map((task) => {
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
            toDos: searchedTask,
        };
    }

    function removeTask(state: StateTypes, action: any) {
        const newTasks = state.toDos.filter((task) => {
            return task.id != action.payload;
        });

        const { numberOfTasksCompleted, numberOfTasksPending } =
            getSummaryOfTaskStatus(newTasks);
        return {
            ...state,
            numberOfTasksCompleted,
            numberOfTasksPending,
            toDos: newTasks,
        };
    }

    function getSummaryOfTaskStatus(tasks: ToDo[]) {
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
