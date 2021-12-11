import Pedido from "../models/Pedido.js";
import PedidoProduto from "../models/PedidoProduto.js";
import Produto from "../models/Produto.js";
import moment from "moment";

import {v1 as uuidv1} from "uuid";

class PedidoService{
    async criarPedido(fields){

        const {idusuario, valortotal, status, produtos} = fields;
        const id = uuidv1();
        const dtpedido = moment().format("YYYY-MM-DD");
        const pedidoObj = {
            id, 
            idusuario,
            dtpedido,
            valortotal,
            status
        }

        try{
            await Pedido.create(pedidoObj);
            for(const produto of produtos){
                const {idproduto, quantidade} = produto; 

                const pedidoProdutoObj = {
                    idpedido:id,
                    idproduto,
                    quantidade,
                }

                await PedidoProduto.create(pedidoProdutoObj);
            }

            pedidoObj.produtos = produtos;
            
            return pedidoObj;
        }catch(error){
            console.log(error);
            throw new Error('Erro ao cadastrar pedido');
        }
    }
    
    async buscarPedido(id){
        try{
            const pedido = await Pedido.findByPk(id);
            

            const pedidoProdutos = await PedidoProduto.findAll({
                where:{
                    idpedido: pedido.getDataValue('id'),
                }
            })
            
            const produtos = [];

            for(const pedidoProduto of pedidoProdutos){
                const produtoObj = await Produto.findByPk(pedidoProduto.getDataValue('idproduto'));
                produtoObj.setDataValue("quantidade", pedidoProduto.getDataValue('quantidade'));
                produtos.push(produtoObj);    
            }

            pedido.setDataValue("produtos", produtos || []);
            return pedido;
        }catch(error){
            console.log(error);
            throw new Error('Erro ao buscar pedido');
        }
    }
    
    async buscarTodosPedidos(idusuario){
        try{
            const pedidos = await Pedido.findAll({
                where:{
                    idusuario
                }
            });

            for(const pedido of pedidos){
                const idpedido = pedido.getDataValue("id");

                const pedidoProdutos = await PedidoProduto.findAll({
                    where:{
                        idpedido,
                    }
                });

                const produtos = [];

                for(const pedidoProduto of pedidoProdutos){
                    const produtoObj = await Produto.findByPk(pedidoProduto.getDataValue('idproduto'));
                    produtoObj.setDataValue("quantidade", pedidoProduto.getDataValue('quantidade'));
                    produtos.push(produtoObj);    
                }

                pedido.setDataValue("produtos", produtos || []);          
            }

            return pedidos;
        }catch(error){
            console.log(error);
            throw new Error('Erro ao buscar todos os pedidos');
        }
    }
}

export default new PedidoService();



