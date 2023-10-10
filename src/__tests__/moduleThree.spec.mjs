import axios from 'axios';
import {
  describe, test, expect, jest,
} from '@jest/globals';
import { sortNumbers, getTodos } from '../moduleThree.mjs';

jest.mock('axios');
axios.get = jest.fn();

describe('sortNumbers', () => {
  test('debe arrojar un error si no se ingresan o proporcionan números', () => {
    expect(() => sortNumbers([])).toThrow('No numbers provided');
  });

  test('debe ordenar un arreglo de números en orden ascendente', () => {
    const numeros = [5, 3, 6];
    const numerosOrdenados = sortNumbers(numeros);
    expect(numerosOrdenados).toEqual([3, 5, 6]);
  });
});

describe('getTodos', () => {
  test('debería obtener la lista de todos correctamente', async () => {
    axios.get.mockResolvedValue({
      status: 200,
      data: [
        { id: 1, completed: true },
        { id: 2, completed: false },
      ],
    });

    const todos = await getTodos();
    expect(todos).toEqual([
      { id: 1, completed: true },
      { id: 2, completed: false },
    ]);
  });

  test('se debería mostrar un error si no se encuentra todos', async () => {
    axios.get.mockResolvedValue({ status: 200, data: [] });
    await expect(getTodos()).rejects.toThrow('No todos found');
  });

  test('se debería mostrar un error si no se encuentran los todos completados', async () => {
    axios.get.mockResolvedValue({
      status: 200,
      data: [{ id: 1, completed: false }],
    });
    await expect(getTodos()).rejects.toThrow('No completed todos found');
  });
  test('se espera que la funcion getTodos se retorne un error diferente al status 200', async () => {
    axios.get.mockResolvedValue({ status: 500 });

    await expect(getTodos()).rejects.toThrow('Error fetching todos');
  });
});
