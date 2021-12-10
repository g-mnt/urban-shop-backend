import { Sequelize } from "sequelize/dist/index.js";

export const sequelize = new Sequelize('urbanShop', 'postgres', 'root', {
    host: 'localhost',
    dialect:'postgres',
    pool:{
        max:5,
        min:0,
        require: 30000,
        idle: 10000
    }
});
