import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {RootState} from "../../app/store";

interface Todo {
    title: string;
    content: string;
}

interface ScheduleState {
    todoList: Todo[];
}

const initialState: ScheduleState = {
    todoList: [],
}

export const scheduleSlice = createSlice({
    name: 'schedule',
    initialState,
    reducers: {
        createTodo: (state, action: PayloadAction<Todo>) => {
            state.todoList.push({ ...action.payload })
        },
        deleteTodo: (state, action: PayloadAction<number>) => {
            state.todoList.splice(action.payload, 1);
        },
        deleteAll: state => {
            state.todoList = [];
        },
    }
});

export const { createTodo, deleteTodo, deleteAll } = scheduleSlice.actions;

export const todoList = (state: RootState) => state.schedule.todoList;

export default scheduleSlice.reducer;