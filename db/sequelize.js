import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
    dialect: process.env.DATABASE_DIALECT,
    username: process.env.DATABASE_USERNAME,
    host: process.env.DATABASE_HOST,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    port: process.env.DATABASE_PORT,
    dialectOptions: {
        ssl: true,
    }

});

try {
  await sequelize.authenticate();
  console.log('Database connection successful.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
  process.exit(1);
}

export default sequelize;
