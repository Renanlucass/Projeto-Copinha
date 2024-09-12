import * as SQLite from 'expo-sqlite';

const getDatabase = async () => {
  const db = await SQLite.openDatabaseAsync('Championships.db');

  await db.execAsync('PRAGMA foreign_keys = OFF;');

  await db.closeAsync();

  const newDb = await SQLite.openDatabaseAsync('Championships.db');

  await new Promise(resolve => setTimeout(resolve, 500));

  await newDb.execAsync(`
    PRAGMA journal_mode = WAL;

    CREATE TABLE IF NOT EXISTS championships (
      id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
      name TEXT NOT NULL,
      image TEXT,
      description TEXT
    );

    CREATE TABLE IF NOT EXISTS teams (
      id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
      name TEXT NOT NULL,
      imageUri TEXT
    );

    CREATE TABLE IF NOT EXISTS matches (
      id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
      teamAId INTEGER NOT NULL,
      teamBId INTEGER NOT NULL
    );
  `);

  return newDb;
};

export const initializeDatabase = async () => {
  await getDatabase();
};

export const addChampionship = async (name, image, description) => {
  const db = await getDatabase();
  const result = await db.runAsync(
    'INSERT INTO championships (name, image, description) VALUES (?, ?, ?)',
    [name, image, description]
  );
  return result.insertId;
};

export const getChampionships = async () => {
  const db = await SQLite.openDatabaseAsync('Championships.db');

  const result = await db.getAllAsync('SELECT * FROM championships');
  return result;
};

// Atualizar Campeonato
export const updateChampionship = async (id, name, image) => {
  const db = await getDatabase();
  await db.runAsync('UPDATE championships SET name = ?, image = ? WHERE id = ?', [name, image, id]);
};

//Deletar Campeonato 
export const deleteChampionship = async (id) => {
  const db = await getDatabase();
  await db.runAsync('DELETE FROM championships WHERE id = ?', [id]);
};

// Adicionar Times
export const addTeam = async (teamName, imageUri) => {
  const db = await getDatabase();
  const result = await db.runAsync('INSERT INTO teams (name, imageUri) VALUES (?, ?)', [teamName, imageUri]);
  return result.insertId;
};

// Atualizar Times
export const updateTeam = async (id, name, imageUri) => {
  const db = await getDatabase();
  await db.runAsync('UPDATE teams SET name = ?, imageUri = ? WHERE id = ?', [name, imageUri, id]);
};

export const getTeams = async () => {
  const db = await getDatabase();
  const result = await db.getAllAsync('SELECT * FROM teams ORDER BY id DESC');
  return result;
};

export const deleteTeam = async (id) => {
  const db = await getDatabase();
  await db.runAsync('DELETE FROM teams WHERE id = ?', [id]);
};

// Adicionar um novo confronto
export const addMatch = async (teamAId, teamBId) => {
  const db = await getDatabase();
  const result = await db.runAsync(
    'INSERT INTO matches (teamAId, teamBId) VALUES (?, ?)',
    [teamAId, teamBId]
  );
  return result.insertId;
};

// Recuperar todos os confrontos
export const getMatches = async () => {
  const db = await getDatabase();
  const result = await db.getAllAsync(`
    SELECT m.id, tA.name as teamAName, tA.imageUri as teamAImage, tB.name as teamBName, tB.imageUri as teamBImage
    FROM matches m
    JOIN teams tA ON m.teamAId = tA.id
    JOIN teams tB ON m.teamBId = tB.id
  `);
  return result;
};
