import React, { useEffect, useState } from "react";
import TodoList from "./Components/TodoList";
import TodoDetails from "./Components/TodoDetails";
import { deleteTodo, fetchTodos } from "./Service/service";
import { Grid } from "@mui/material";
import "./App.css";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [selectedTodo, setSelectedTodo] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchTodos();
        console.log(data);
        setTodos(data);
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    };

    fetchData();
  }, []);

  const handleTodoSelect = (id) => {
    setSelectedTodo(id);
  };

  const handleDeleteTodo = async (todoId) => {
    try {
      const status = await deleteTodo(todoId);
      if (status === 200) {
        console.log("API call successful. Deleted the todo");
        const updatedTodos = todos.filter((todo) => todo.id !== todoId);
        setTodos(updatedTodos);
        if (selectedTodo === todoId) {
          setSelectedTodo(null);
        }
      } else {
        console.error("Failed to delete todo. Status:", status);
      }
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  return (
    <div className="App">
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        style={{ minHeight: "100vh" }}
      >
        <Grid item>
          <TodoList todos={todos} onSelectTodo={handleTodoSelect} />
        </Grid>
        <Grid item>
          {selectedTodo && (
            <TodoDetails todoId={selectedTodo} onDelete={handleDeleteTodo} />
          )}
        </Grid>
      </Grid>
    </div>
  );
};

export default App;
