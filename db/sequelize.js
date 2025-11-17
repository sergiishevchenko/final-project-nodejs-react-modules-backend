import { Sequelize } from "sequelize";

const {
  DATABASE_DIALECT = "postgres",
  DATABASE_HOST = "localhost",
  DATABASE_PORT = "5432",
  DATABASE_NAME,
  DATABASE_USERNAME,
  DATABASE_PASSWORD,
  DATABASE_SSL = "false",
} = process.env;

const isLocalhost = DATABASE_HOST === 'localhost' || DATABASE_HOST === '127.0.0.1';
const needsSSL = DATABASE_SSL === "true" || (!isLocalhost && DATABASE_SSL !== "false");

const sequelize = new Sequelize({
  dialect: DATABASE_DIALECT,
  username: DATABASE_USERNAME,
  host: DATABASE_HOST,
  password: DATABASE_PASSWORD,
  database: DATABASE_NAME,
  port: Number(DATABASE_PORT),
  dialectOptions: {
    ssl: needsSSL ? { 
      rejectUnauthorized: false
    } : false,
  },
});

try {
  await sequelize.authenticate();
  console.log('Database connection successful.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
  process.exit(1);
}

export default sequelize;
