import axios from 'axios';
import {
  describe,
  test,
  expect,
  jest,
} from '@jest/globals';
import { divide, getPosts } from '../moduleOne.mjs';

jest.mock('axios');

axios.get = jest.fn();

describe('Testeo de la función divide', () => {
  test('Se espera que el resultado de dividir 6/3 sea 2', () => {
    expect(divide(6, 3)).toBe(2);
  });

  test('Se espera que el resultado de dividir 6/0 sea un error', () => {
    expect(() => divide(6, 0)).toThrow('Error dividing by zero');
  });

  test('Se espera que el resultado de dividir 0/6 sea 0', () => {
    expect(divide(0, 6)).toBe(0);
  });
});

describe('Testeo de la función getPosts', () => {
  test('Se espera que la funcion getPosts retorne un array de 2 elementos', async () => {
    const data = [
      {
        userId: 1,
        id: 1,
        title: 'Title 1',
        body: 'Body 1',
      },
      {
        userId: 2,
        id: 2,
        title: 'Title 2',
        body: 'Body 2',
      },
    ];

    axios.get.mockResolvedValue({ status: 200, data });

    const posts = await getPosts();

    expect(posts).toEqual(data);
    expect(posts.length).toBe(2);
  });

  test('Se espera que la funcion getPosts retorne un error si el status de la respuesta no es 200', async () => {
    axios.get.mockResolvedValue({ status: 500 });

    await expect(getPosts()).rejects.toThrow('Error fetching posts');
  });

  test('Se espera que la funcion getPosts retorne un error si la respuesta no es un array', async () => {
    axios.get.mockResolvedValue({ status: 200, data: {} });

    await expect(getPosts()).rejects.toThrow('Data is not an array');
  });

  test('Se espera que la funcion getPosts retorne un error si la respuesta es un array vacio', async () => {
    axios.get.mockResolvedValue({ status: 200, data: [] });

    await expect(getPosts()).rejects.toThrow('No posts found');
  });

  test('Se espera que la funcion getPosts retorne un error si la respuesta es un array con mas de 10 elementos', async () => {
    axios.get.mockResolvedValue({ status: 200, data: new Array(11) });

    await expect(getPosts()).rejects.toThrow('Too many posts');
  });
});
