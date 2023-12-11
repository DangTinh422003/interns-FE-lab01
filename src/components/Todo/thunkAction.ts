import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  addDoc,
  collection,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../../firebase";
import { ITodo } from ".";

export const fetchTodosFromFirebase = createAsyncThunk(
  "todos/fetchTodos",
  async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "todos"));
      const todos = querySnapshot.docs.map(
        (doc): ITodo => ({
          id: doc.id,
          content: doc.data().content,
          isCompleted: doc.data().isCompleted,
        })
      );
      return todos;
    } catch (error) {
      console.error("Error fetching todos:", error);
      throw error;
    }
  }
);

export const addTodoToFirebase = createAsyncThunk(
  "todos/addTodo",
  async (todo: ITodo) => {
    try {
      const docRef = await addDoc(collection(db, "todos"), {
        id: todo.id,
        content: todo.content,
        isCompleted: todo.isCompleted,
      });
      return { ...todo, id: docRef.id };
    } catch (error) {
      console.error("Error adding todo:", error);
      throw error;
    }
  }
);

export const deleteTodoFromFirebase = createAsyncThunk(
  "todos/deleteTodo",
  async (id: string): Promise<string> => {
    try {
      const docRef = doc(db, "todos", id);
      await deleteDoc(docRef);
      return id;
    } catch (error) {
      console.error("Error deleting todo:", error);
      throw error;
    }
  }
);
