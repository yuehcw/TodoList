import React, { useEffect, useState } from "react";
import { fetchTodo, updateTodo } from "../Service/service";
import { Paper, Typography, Button, Box } from "@mui/material";
import { Modal } from "antd";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";

import "./TodoStyles.css";
import CompletedAnimation from "./CompletedAnimation";

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

  const showDeleteConfirm = () => {
    Modal.confirm({
      title: "Are you sure delete this task?",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        handleDelete();
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  const handleDelete = () => {
    onDelete(todo.id);
    setTodo(null);
  };

  if (!todo) {
    return <div></div>;
  }

  return (
    <Paper elevation={10} className="todoDetailContainer">
      <div className="innerContainer">
        {todo.completed && (
          <CompletedAnimation
            isCompleted={todo.completed}
            style={{
              position: "absolute",
            }}
          />
        )}
        <Typography
          variant="subtitle1"
          gutterBottom
          sx={{ textAlign: "left", width: "100%" }}
        >
          <strong>Title:</strong> {todo.title}
        </Typography>
        <Typography
          variant="subtitle1"
          gutterBottom
          sx={{ textAlign: "left", width: "100%" }}
        >
          <strong>User Id:</strong> {todo.id}
        </Typography>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          sx={{
            paddingTop: "8px",
          }}
        >
          {todo.completed ? (
            <CheckCircleIcon color="success" sx={{ marginRight: "4px" }} />
          ) : (
            <ErrorIcon color="error" sx={{ marginRight: "4px" }} />
          )}
          <Typography
            variant="subtitle1"
            color="textSecondary"
            component="span"
            sx={{
              fontSize: "1.45rem", // Custom font size
            }}
          >
            <strong>{todo.completed ? "Completed" : "Not Completed"}</strong>
          </Typography>
        </Box>

        <div className="todoActions">
          <Button
            variant="contained"
            color="error"
            onClick={() => showDeleteConfirm()}
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
      </div>
    </Paper>
  );
};

export default TodoDetails;
