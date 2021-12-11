import Pedido from "../models/Pedido.js";
import PedidoProduto from "../models/PedidoProduto.js";
import Produto from "../models/Produto.js";
import moment from "moment";

import {v1 as uuidv1} from "uuid";

class PedidoService{
    async criarPedido({idusuario, valortotal, status, produtos}){

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
            await this.criarPedidoProduto(produtos, id);

            pedidoObj.produtos = produtos;
            
            return pedidoObj;
        }catch(error){
            console.log(error);
            throw new Error('Erro ao cadastrar pedido');
        }
    }

    async criarPedidoProduto(produtos, idpedido){
        for(const produto of produtos){
            const {idproduto, quantidade} = produto; 

            const pedidoProdutoObj = {
                idpedido,
                idproduto,
                quantidade,
            }

            await PedidoProduto.create(pedidoProdutoObj);
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

    async atualizarDadosPedido({id, valortotal, produtos}){
        const pedidoObj = {
            valortotal
        }
        try{
            const updateReturn = await Pedido.update(pedidoObj, {
                where:{
                    id
                }
            });
            if(updateReturn[0] > 0){
                //removendo os produtos para cadastrar novamente;
                await PedidoProduto.destroy({
                    where:{
                        idpedido: id,
                    }
                });

                //colocando os novos produtos.
                await this.criarPedidoProduto(produtos, id);

                return await this.buscarPedido(id);
            }


        }catch(error){
            console.log(error);
            throw new Error('Erro ao atualizar o pedido');
        }

        //se chegou aqui é porque o pedido não existe, já que nenhum foi alterado e não teve erro na alteração.
        throw new Error('Pedido inexistente');
    }

    async atualizarStatusPedido({id, status}){
        const pedidoObj = {
            status
        }

        try{
            const updateReturn = await Pedido.update(pedidoObj, {
                where:{
                    id
                }
            });

            if(updateReturn[0] > 0){
                return await this.buscarPedido(id);
            }

        }catch(error){
            console.log(error);
            throw new Error('Erro ao atualizar o pedido');
        }

        //se chegou aqui é porque o pedido não existe, já que nenhum foi alterado e não teve erro na alteração.
        throw new Error('Pedido inexistente');
    }

    async deletarPedido(id){
        try{
            await PedidoProduto.destroy({
                where:{
                    idpedido:id,
                }
            })

            await Pedido.destroy({
                where:{
                    id,
                }
            })
        }catch(error){
            console.log(error);
            throw new Error('Erro ao deletar o pedido');
        }
    }
}

export default new PedidoService();



