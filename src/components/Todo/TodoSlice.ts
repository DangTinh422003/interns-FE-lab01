import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { ITodo } from ".";
import {
  addTodoToFirebase,
  deleteTodoFromFirebase,
  fetchTodosFromFirebase,
} from "./thunkAction";

interface StateType {
  status: "loading" | "fullfilled" | "rejected" | "idle";
  todos: ITodo[];
}

const initialState: StateType = {
  status: "idle",
  todos: [],
};

export const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<ITodo>) => {
      state.todos.push(action.payload);
    },
    updateTodo: (state, action: PayloadAction<ITodo>) => {
      const todo = state.todos.find((todo) => todo.id === action.payload.id);
      if (todo) {
        todo.isCompleted = !todo.isCompleted;
        todo.content = action.payload.content;
      }
    },
    removeTodo: (state, action: PayloadAction<string>) => {
      const index = state.todos.findIndex((todo) => todo.id === action.payload);
      state.todos.splice(index, 1);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodosFromFirebase.fulfilled, (state: StateType, action) => {
        state.status = "fullfilled";
        state.todos = action.payload;
      })
      .addCase(addTodoToFirebase.fulfilled, (state: StateType, action) => {
        state.todos.push(action.payload);
      })
      .addCase(deleteTodoFromFirebase.fulfilled, (state: StateType, action) => {
        state.todos = state.todos.filter((toto) => toto.id !== action.payload);
      });
  },
});

export const { addTodo, updateTodo, removeTodo } = todoSlice.actions;
