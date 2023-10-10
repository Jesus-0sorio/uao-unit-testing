import axios from 'axios';

export const sortNumbers = (numbers) => {
  if (numbers.length < 1) {
    throw new Error('No numbers provided');
  }

  return numbers.sort((a, b) => a - b);
};

export const getTodos = async () => {
  const response = await axios.get('https://jsonplaceholder.typicode.com/todos');

  if (response.status !== 200) {
    throw new Error('Error fetching todos');
  }

  const todos = response.data;

  if (!Array.isArray(todos) || todos.length === 0) {
    throw new Error('No todos found');
  }

  const completedTodos = todos.filter((todo) => todo.completed);

  if (completedTodos.length === 0) {
    throw new Error('No completed todos found');
  }

  return todos;
};
