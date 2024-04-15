const client = require(`./client`);

const createTables = async() => {
  try {
 await client.query(`
  CREATE TABLE activities (
    id SERIAL PRIMARY KEY,
    name VARCHAR(25) UNIQUE NOT NULL,
    description TEXT
  );
  
  CREATE TABLE routines (
    id SERIAL PRIMARY KEY,
    is_public BOOLEAN,
    name VARCHAR(25),
    description TEXT
  );
  
  CREATE TABLE routines_activities (
    id SERIAL PRIMARY KEY,
    routine_id INT REFERENCES routines(id),
    activities_id INT REFERENCES activities(id),
    count INT
  );`)
} catch (error) {
  console.log(`createTables error: ${error}`);
}
}

const dropTables = async() => {
  try {
    await client.query (`
    DROP TABLE IF EXISTS activities;
    DROP TABLE IF EXISTS routines;
    DROP TABLE IF EXISTS routines_activities;`)
  } catch(error) {
    console.log(error);
  }
}

const syncAndSeed = async() => {
  await client.connect();
  console.log("CONNECTED");

  await dropTables();
  console.log(`TABLE DROPED`)

  await createTables();
  console.log(`TABLE CREATED`);

  await client.end();
  console.log("DISCONNECTED");
}

syncAndSeed();