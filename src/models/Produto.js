import Sequelize from "sequelize/dist/index.js";
import {sequelize} from "../database/database.js";

const Produto = sequelize.define('produtos', {
    id: {type: Sequelize.UUIDV4, primaryKey:true},
    nome: {type: Sequelize.TEXT, allowNull:false},
    descricao: {type: Sequelize.TEXT, allowNull:false},
    preco: {type: Sequelize.DECIMAL, allowNull:false},
}, 
    {
        timestamps:false,
        freezeTableName:true,
    }
);

export default Produto;