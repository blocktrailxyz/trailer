import sequelize from "config/database";

(async () => {
  await sequelize.sync({ force: true });
})();
