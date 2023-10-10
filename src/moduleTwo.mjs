import axios from 'axios';

export const generateFibonacciSequence = (limit) => {
  if (limit <= 0) {
    throw new Error('Limit must be greater than 0');
  }

  const sequence = [0, 1];
  let current = 1;
  while (current < limit) {
    const nextValue = sequence[sequence.length - 1] + sequence[sequence.length - 2];
    sequence.push(nextValue);
    current = nextValue;
  }

  return sequence;
};

export const getUsers = async () => {
  const response = await axios.get('https://jsonplaceholder.typicode.com/users');

  if (response.data.length === 0) {
    throw new Error('No users found');
  }

  // eslint-disable-next-line no-restricted-syntax
  for (const user of response.data) {
    if (user.name.includes('Clementine')) {
      throw new Error('Clementine is not allowed');
    }
  }

  return response.data;
};
