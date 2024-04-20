import React, { useState } from "react";
import { Divider, List, ListItem, ListItemText, Paper } from "@mui/material";
import "./TodoStyles.css";

const TodoList = ({ todos, onSelectTodo }) => {
  const [selectedId, setSelectedId] = useState(null);

  return (
    <Paper elevation={10} className="todoListContainer">
      <List>
        {todos.map((todo, index) => (
          <React.Fragment key={todo.id}>
            <ListItem
              button
              onClick={() => {
                onSelectTodo(todo.id);
                setSelectedId(todo.id);
              }}
              sx={{
                "&:hover": {
                  background: "#3b82f6",
                  boxShadow: "0px 2px 5px rgba(0,0,0,0.2)",
                },
                background: todo.id === selectedId ? "#3b82f6" : "transparent",
                color: todo.id === selectedId ? "white" : "inherit",
              }}
            >
              <ListItemText
                primary={todo.title}
                primaryTypographyProps={{ fontWeight: "bold" }}
              />
            </ListItem>
            {index !== todos.length - 1 && <Divider />}
          </React.Fragment>
        ))}
      </List>
    </Paper>
  );
};

export default TodoList;
