// data/database.js

import * as SQLite from 'expo-sqlite';

const getDatabase = async () => {
  const db = await SQLite.openDatabaseAsync('championship.db');
  await db.execAsync(`
    PRAGMA journal_mode = WAL;
    CREATE TABLE IF NOT EXISTS championships (
      id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
      name TEXT NOT NULL,
      image TEXT
    );
  `);
  return db;
};

export const initializeDatabase = async () => {
  await getDatabase();
};

export const addChampionship = async (name, image) => {
  const db = await getDatabase();
  const result = await db.runAsync('INSERT INTO championships (name, image) VALUES (?, ?)', [name, image]);
  return result.insertId;
};

export const getChampionships = async () => {
  const db = await getDatabase();
  const result = await db.getAllAsync('SELECT * FROM championships ORDER BY id DESC');
  return result;
};

export const updateChampionship = async (id, name, image) => {
  const db = await getDatabase();
  await db.runAsync('UPDATE championships SET name = ?, image = ? WHERE id = ?', [name, image, id]);
};

export const deleteChampionship = async (id) => {
  const db = await getDatabase();
  await db.runAsync('DELETE FROM championships WHERE id = ?', [id]);
};
