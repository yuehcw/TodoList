import React from "react";
import { Divider, List, ListItem, ListItemText, Paper } from "@mui/material";
import "./TodoStyles.css";

const TodoList = ({ todos, onSelectTodo }) => {
  return (
    <Paper elevation={10} className="todoContainer todoListScrollable">
      <List>
        {todos.map((todo, index) => (
          <React.Fragment key={todo.id}>
            <ListItem
              button
              onClick={() => onSelectTodo(todo.id)}
              sx={{
                "&:hover": {
                  background: "#3b82f6",
                  boxShadow: "0px 2px 5px rgba(0,0,0,0.2)",
                },
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
