module.exports = {
    type: "postgres",
    name: "default",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "postgres",
    database: "slipslap",
    synchronize: true,
    logging: true,
    entities: ["src/entities/**/*.ts"],
    migrations: ["src/migration/**/*.ts"],
    subscribers: ["src/subscriber/**/*.ts"],
    cli: {
      entitiesDir: "src/entities",
      migrationsDir: "src/migration",
      subscribersDir: "src/subscriber",
    },
  };
  