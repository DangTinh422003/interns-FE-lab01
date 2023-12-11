import React from "react";
import { ITodo } from "../Todo";
import { useAppDispatch } from "../../redux/hooks";
import { deleteTodoFromFirebase } from "../Todo/thunkAction";

const TodoItem = (props: ITodo) => {
  const [isCompleted, setIsCompleted] = React.useState<boolean>(
    props.isCompleted
  );

  const dispatch = useAppDispatch();

  const handleRemoveTodo = () => {
    dispatch(deleteTodoFromFirebase(props.id));
  };

  return (
    <div style={{ marginBottom: "10px" }}>
      <label data-id={props.id}>
        <input
          type="checkbox"
          checked={isCompleted}
          onChange={(e) => setIsCompleted(!isCompleted)}
        />
        {props.content}
      </label>
      <button
        className="deleteBtn"
        style={{ marginLeft: "5px" }}
        onClick={handleRemoveTodo}
      >
        Xóa
      </button>
      <button>Chỉnh sửa</button>
    </div>
  );
};

export default TodoItem;
