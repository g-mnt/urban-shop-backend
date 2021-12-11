import Usuario from "../models/Usuario.js";
import Pedido from "../models/Pedido.js";
import PedidoProduto from "../models/PedidoProduto.js";
import {v1 as uuidv1} from "uuid";

class UsuariosService{
    async criarUsuario({nome, endereco, email, dtNasc, senha}){

        const id = uuidv1();
        const userObj = {
            id,
            nome,
            endereco,
            email,
            dtNasc,
            senha
        }
    
        try{
            await Usuario.create(userObj);
            delete userObj.senha;
            return userObj;
        }catch(error){
            console.log(error);
            throw new Error('Erro ao cadastrar usuario');
        }
    }
    
    async buscarUsuario(id){    
        try{
            const usuario = await Usuario.findOne({
                where:{
                    id,
                },
                attributes:['id', 'nome', 'endereco', 'dtNasc', 'email']
            });
    
            return usuario;
        }catch(error){
            console.log(error);
            throw new Error('Erro ao buscar usuario');
        }
    }

    async login({email, senha}){
        try{
            const usuario = await Usuario.findOne({
                where:{
                    email, 
                    senha
                },
                attributes:['id', 'nome', 'endereco', 'dtNasc', 'email']
            })

            return usuario;
        
        }catch(error){
            console.log(error);
            throw new Error("Erro ao tentar fazer o login");
        }
        
    }

    async atualizarUsuario({id, nome, endereco, email, dtNasc, senha}){
        const usuarioObj = {
            nome,
            endereco,
            email,
            dtNasc,
            senha
        }
        try{
            const updateReturn = await Usuario.update(usuarioObj, {
                where:{
                    id
                },
            });

            if(updateReturn[0] > 0){
                return await this.buscarUsuario(id);
            }
            
        }catch(error){
            console.log(error);
            throw new Error("Erro ao alterar usuário");
        }

        //se chegou até aqui é porque não retornou um usuário atualizado nem um erro durante a atualização, então usuário inexistente.
        throw new Error("Usuário inexistente");
    }

    async deletarUsuario(id){
        try{
            //pegando pedidos para deletar pedidos-produto
            const pedidos = await Pedido.findAll({
                where:{
                    idusuario:id,
                }
            })

            for(const pedido of pedidos){
                //deletando os pedidos-produto desse usuário
                await PedidoProduto.destroy({
                    where:{
                        idpedido: pedido.id,
                    }
                });
            }

            //deletando os pedidos desse usuario
            await Pedido.destroy({
                where:{
                    idusuario: id,
                }
            })            

            //deletando o usuario
            await Usuario.destroy({
                where:{
                    id,
                }
            })
        }catch(error){ 
            console.log(error);
            throw new Error("Erro ao deletar o usuário");
        }

    }
}

export default new UsuariosService();

