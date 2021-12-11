import Sequelize from "sequelize/dist/index.js";
import {sequelize} from "../database/database.js";

const PedidoProduto = sequelize.define('pedido_produto', {
    idproduto: {type: Sequelize.UUIDV4, primaryKey:true},
    idpedido: {type: Sequelize.UUIDV4, allowNull:false},
    quantidade: {type: Sequelize.INTEGER, allowNull:false},
}, 
    {
        timestamps:false,
        freezeTableName:true,
    }
);

export default PedidoProduto;