const Sequelize = require("sequelize");
require('dotenv').config({ path: '../.env' })

const sequelize = new Sequelize(
   process.env.MYSQL_DATABASE,process.env.MYSQL_USER,process.env.MYSQL_PASSWORD,
    {
      host: 'localhost',
      dialect: 'mysql',
      define: {
         timestamps: false, //Universal model config;
         underscore: true, //Universal model config;
       },
    }
  );
sequelize.authenticate().then(() => {
   console.log('Connection has been established successfully.');
}).catch((error) => {
   console.error('Unable to connect to the database: ', error);
});

module.exports = {
   sequelize,
 };