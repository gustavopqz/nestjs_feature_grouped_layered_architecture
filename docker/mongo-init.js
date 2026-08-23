const dbName = process.env.MONGO_INITDB_DATABASE;
const appUsername = process.env.MONGO_APP_USERNAME;
const appPassword = process.env.MONGO_APP_PASSWORD;

const appDb = db.getSiblingDB(dbName);

// evita erro se script rodar novamente
const existingUser = appDb.getUser(appUsername);

if (!existingUser) {
  appDb.createUser({
    user: appUsername,
    pwd: appPassword,
    roles: [
      {
        role: "readWrite",
        db: dbName
      }
    ]
  });
}