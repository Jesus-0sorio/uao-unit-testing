import {
  describe,
  test,
  expect,
  jest,
} from '@jest/globals';
import axios from 'axios';
import { generateFibonacciSequence, getUsers } from '../moduleTwo.mjs';

describe('generateFibonacciSequence', () => {
  test('Positivo: generar secuencia de fibonacci', () => {
    expect(generateFibonacciSequence(5)).toEqual([0, 1, 1, 2, 3, 5]);
    expect(generateFibonacciSequence(10)).toEqual([0, 1, 1, 2, 3, 5, 8, 13]);
  });

  test('debería arrojar un error si el límite es menor o igual a 0', () => {
    expect(() => generateFibonacciSequence(0)).toThrow('Limit must be greater than 0');
    expect(() => generateFibonacciSequence(-5)).toThrow('Limit must be greater than 0');
  });
});

describe('getUsers', () => {
  test('debería obtener usuarios correctamente', async () => {
    // Mockear la función axios.get para simular una respuesta con usuarios
    axios.get = jest.fn().mockResolvedValue({
      data: [{ name: 'John' }, { name: 'Jane' }],
    });
    const users = await getUsers();
    expect(users.length).toBeGreaterThan(0);
  });

  test('debería arrojar un error si no se encuentran usuarios', async () => {
    // Mockear la función axios.get para simular una respuesta vacía
    axios.get = jest.fn().mockResolvedValue({ data: [] });

    await expect(getUsers()).rejects.toThrow('No users found');
  });

  test('debería arrojar un error si se encuentra un usuario llamado Clementine', async () => {
    // Mockear la función axios.get para simular un usuario llamado Clementine
    axios.get = jest.fn().mockResolvedValue({
      data: [{ name: 'John' }, { name: 'Clementine' }],
    });

    await expect(getUsers()).rejects.toThrow('Clementine is not allowed');
  });
});
