import Sequelize from "sequelize/dist/index.js";
import {sequelize} from "../database/database.js";

const Usuario = sequelize.define('usuarios', {
    id:{type: Sequelize.UUIDV4, primaryKey:true},
    nome: {type: Sequelize.TEXT, allowNull:false},
    endereco: {type: Sequelize.TEXT, allowNull:false},
    email:{type: Sequelize.TEXT, allowNull:false},
    dtNasc: {type: Sequelize.DATE, allowNull:false},
    senha: {type: Sequelize.TEXT, allowNull:false},
}, 
    {
        timestamps:false,
        freezeTableName:true,
    }
);

export default Usuario;