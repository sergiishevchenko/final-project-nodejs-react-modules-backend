import { Sequelize } from "sequelize";
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "postgres",
    dialectOptions: {
      ssl: false, // Вимкнути SSL для локального сервера
    },
  }
);

try {
  await sequelize.authenticate();
  console.log('Database connection successful.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
  process.exit(1);
}

export default sequelize;
