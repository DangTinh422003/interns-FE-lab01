import React, { useEffect } from "react";
import TodoItem from "../TodoItem";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { RootState } from "../../redux/store";
import { addTodoToFirebase, fetchTodosFromFirebase } from "./thunkAction";

export interface ITodo {
  id: string;
  content: string;
  isCompleted: boolean;
}

const TodoApp = () => {
  const [task, setTask] = React.useState<string>("");
  const [isTaskCompleted, setIsTaskCompleted] = React.useState<boolean>(false);

  const dispatch = useAppDispatch();
  const { todos } = useAppSelector((state: RootState) => state.totos);

  const handleAddTodo = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    dispatch(
      addTodoToFirebase({
        id: Math.random().toString(),
        content: task,
        isCompleted: isTaskCompleted,
      })
    );
    setTask("");
    setIsTaskCompleted(false);
  };

  useEffect(() => {
    dispatch(fetchTodosFromFirebase());
  }, [dispatch]);

  return (
    <div className="totoApp">
      <div>
        <input
          type="text"
          placeholder="Nhập todo..."
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <input
          type="checkbox"
          name="checkComplete"
          id="checkComplete"
          checked={isTaskCompleted}
          onChange={(e) => setIsTaskCompleted(!isTaskCompleted)}
        />
        <button type="button" className="addTodoBtn" onClick={handleAddTodo}>
          Thêm
        </button>
      </div>
      <ul>
        {todos.map((todo, index) => {
          return (
            <li key={todo.id}>
              <TodoItem {...todo} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default TodoApp;
