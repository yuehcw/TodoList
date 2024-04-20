import React, { useEffect, useState } from "react";
import { fetchTodo, updateTodo } from "../Service/service";
import { Paper, Typography, Button } from "@mui/material";
import "./TodoStyles.css";

const TodoDetails = ({ todoId, onDelete }) => {
  const [todo, setTodo] = useState(null);

  useEffect(() => {
    const fetchTodoDetails = async () => {
      try {
        if (todoId) {
          const storedTodo = JSON.parse(localStorage.getItem(`todo_${todoId}`));
          if (storedTodo) {
            setTodo(storedTodo);
          } else {
            const data = await fetchTodo(todoId);
            setTodo(data);
            localStorage.setItem(`todo_${todoId}`, JSON.stringify(data));
          }
        } else {
          setTodo(null);
        }
      } catch (error) {
        console.error("Error fetching todo details:", error);
      }
    };
    fetchTodoDetails();
  }, [todoId]);

  useEffect(() => {
    const clearLocalStorage = () => {
      localStorage.clear();
    };

    window.addEventListener("beforeunload", clearLocalStorage);

    return () => {
      window.removeEventListener("beforeunload", clearLocalStorage);
    };
  }, []);

  const handleComplete = async () => {
    try {
      if (todo) {
        const updatedTodoData = { ...todo, completed: true };
        const updatedTodo = await updateTodo(todo.id, updatedTodoData);
        console.log("API call successful. Marked as completed", updatedTodo);
        setTodo(updatedTodo);
        localStorage.setItem(`todo_${todo.id}`, JSON.stringify(updatedTodo));
      }
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  const handleDelete = () => {
    onDelete(todo.id);
    setTodo(null);
  };

  if (!todo) {
    return <div></div>;
  }

  return (
    <Paper elevation={10} className="todoContainer todoContainerflex">
      <Typography variant="h6" gutterBottom>
        Title: {todo.title}
      </Typography>
      <Typography variant="h6" gutterBottom>
        User ID: {todo.id}
      </Typography>
      <Typography color="textSecondary" gutterBottom>
        {todo.completed ? "Completed" : "Not Completed"}
      </Typography>
      <div>
        <Button
          variant="contained"
          color="error"
          onClick={() => handleDelete()}
        >
          Delete
        </Button>
        {!todo.completed && (
          <Button
            variant="contained"
            color="success"
            onClick={() => handleComplete()}
            style={{ marginLeft: 8 }}
          >
            Completed
          </Button>
        )}
      </div>
    </Paper>
  );
};

export default TodoDetails;
