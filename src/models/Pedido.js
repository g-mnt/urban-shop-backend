import Sequelize from "sequelize/dist/index.js";
import {sequelize} from "../database/database.js";

const Pedido = sequelize.define('pedidos', {
    id: {type: Sequelize.UUIDV4, primaryKey:true},
    idusuario: {type: Sequelize.UUIDV4, allowNull:false},
    dtpedido: {type: Sequelize.DATE, allowNull:false},
    valortotal: {type: Sequelize.DECIMAL, allowNull:false},
    status: {type: Sequelize.TEXT, allowNull:false},
}, 
    {
        timestamps:false,
        freezeTableName:true,
    }
);

export default Pedido;