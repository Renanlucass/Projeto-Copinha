import * as SQLite from 'expo-sqlite';

const getDatabase = async () => {
  const db = await SQLite.openDatabaseAsync('Championships.db');

  await db.execAsync('PRAGMA foreign_keys = ON;');

  const columns = await db.getAllAsync(`PRAGMA table_info(teams);`);
  const hasImageUriColumn = columns.some(column => column.name === 'imageUri');

  if (!hasImageUriColumn) {
    await db.runAsync('ALTER TABLE teams ADD COLUMN imageUri TEXT;');
  }

  await db.execAsync(`
      PRAGMA journal_mode = WAL;
      
      CREATE TABLE IF NOT EXISTS championships (
        id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
        name TEXT NOT NULL,
        image TEXT
      );
      
      CREATE TABLE IF NOT EXISTS teams (
        id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
        name TEXT NOT NULL,
        imageUri TEXT
      );
      
      CREATE TABLE IF NOT EXISTS championship_teams (
        championship_id INTEGER,
        team_id INTEGER,
        FOREIGN KEY (championship_id) REFERENCES championships (id) ON DELETE CASCADE,
        FOREIGN KEY (team_id) REFERENCES teams (id) ON DELETE CASCADE,
        PRIMARY KEY (championship_id, team_id)
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


const getChampionships = async () => {
  const db = await SQLite.openDatabaseAsync('Championships.db');


  const columns = await db.getAllAsync(`PRAGMA table_info(championships);`);
  const hasImageUriColumn = columns.some(column => column.name === 'imageUri');

  let query = 'SELECT * FROM championships';
  if (hasImageUriColumn) {
    query = 'SELECT id, name, image, imageUri FROM championships';
  } else {
    query = 'SELECT id, name, image FROM championships';
  }

  const result = await db.getAllAsync(query);
  return result;
};

export { getChampionships };


export const updateChampionship = async (id, name, image) => {
  const db = await getDatabase();
  await db.runAsync('UPDATE championships SET name = ?, image = ? WHERE id = ?', [name, image, id]);
};

export const deleteChampionship = async (id) => {
  const db = await getDatabase();
  await db.runAsync('DELETE FROM championships WHERE id = ?', [id]);
};

export const addTeam = async (teamName, imageUri) => {
  const db = await getDatabase();
  const result = await db.runAsync('INSERT INTO teams (name, imageUri) VALUES (?, ?)', [teamName, imageUri]);
  return result.insertId;
};


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

export const addTeamToChampionship = async (championshipId, teamId) => {
  const db = await getDatabase();
  await db.runAsync('INSERT INTO championship_teams (championship_id, team_id) VALUES (?, ?)', [championshipId, teamId]);
};

export const getTeamsForChampionship = async (championshipId) => {
  const db = await getDatabase();
  const result = await db.getAllAsync(`
      SELECT teams.*
      FROM teams
      JOIN championship_teams ON teams.id = championship_teams.team_id
      WHERE championship_teams.championship_id = ?
    `, [championshipId]);
  return result;
};
