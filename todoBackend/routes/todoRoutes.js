const express = require('express');
const todoRouter = express.Router();
const uuid = require('uuid');

const todo = [];

todoRouter.get('/:todoId', (req, res) => {
  const todoId = req.params.todoId;
  const targetTodo = todo.find((todo) => todo.id === todoId);
  res.send(targetTodo);
});

todoRouter.delete('/:todoId', (req, res) => {
  const todoId = req.params.todoId;
  const targetTodoIndex = todo.findIndex((todo) => todo.id === todoId);
  todo.splice(targetTodoIndex, 1);
  res.send(`Successfully Deleted todo with id: ${todoId}`);
});

todoRouter.put('/:todoId', (req, res) => {
  const todoId = req.params.todoId;
  const targetTodoIndex = todo.findIndex((todo) => todo.id === todoId);
  const updatedTodo = Object.assign(todo[targetTodoIndex], req.body);
  res.send(updatedTodo);
});

todoRouter
  .route('/')
  .get((req, res) => {
    res.send(todo);
  })
  .post((req, res) => {
    const newTodo = req.body;
    newTodo.id = uuid.v4();
    todo.push(newTodo);
    res.send(todo);
  });

module.exports = todoRouter;
