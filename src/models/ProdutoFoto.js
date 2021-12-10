import Sequelize from "sequelize/dist/index.js";
import {sequelize} from "../database/database.js";

const ProdutoFoto = sequelize.define('produto_foto', {
    id:{type: Sequelize.UUIDV4, primaryKey:true},
    idproduto: {type: Sequelize.UUIDV4, allowNull:false},
    img: {type: Sequelize.BLOB('tiny'), allowNull:false},
    principal:{type: Sequelize.BOOLEAN, allowNull:false},
}, 
    {
        timestamps:false,
        freezeTableName:true,
    }
);

export default ProdutoFoto;