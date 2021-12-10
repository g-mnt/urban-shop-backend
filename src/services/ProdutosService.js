import Produto from "../models/Produto.js";
import ProdutoFoto from "../models/ProdutoFoto.js";

import {v1 as uuidv1} from "uuid";

class ProdutosService{
    async criarProduto(fields){

        const {nome, descricao, preco, fotos} = fields;
        const id = uuidv1();
        const produtoObj = {
            id,
            nome,
            descricao,
            preco,
        }
        try{
            await Produto.create(produtoObj);
            for(const foto of fotos){
                const fotoId = uuidv1();
                const produtoFotoObj = {
                    id:fotoId,
                    img: foto.img,
                    idproduto: id,
                    principal: foto.principal,
                }

                await ProdutoFoto.create(produtoFotoObj);
            }
            
            return produtoObj;
        }catch(error){
            console.log(error);
            throw new Error('Erro ao cadastrar produto');
        }
    }
    
    async buscarProduto(id){
        try{
            const produto = await Produto.findOne({
                where:{
                    id,
                }
            });

            const fotos = await ProdutoFoto.findAll({
                where:{
                    idproduto: id,
                }
            })

            for(const foto of fotos){
                foto.setDataValue("img", foto.getDataValue("img").toString('ascii'));
            }

            produto.setDataValue("fotos", fotos || []);
            return produto;
        }catch(error){
            console.log(error);
            throw new Error('Erro ao buscar produto');
        }
    }
    
    async buscarTodosProdutos(){
        try{
            const produtos = await Produto.findAll();
            for(const produto of produtos){
                const idproduto = produto.getDataValue("id");

                const fotos = await ProdutoFoto.findAll({
                    where:{
                        idproduto,
                    }
                })
    
                for(const foto of fotos){
                    foto.setDataValue("img", foto.getDataValue("img").toString('ascii'));
                }

                produto.setDataValue("fotos", fotos || []);                
            }

            return produtos;
        }catch(error){
            console.log(error);
            throw new Error('Erro ao buscar todos os produtos');
        }
    }
}

export default new ProdutosService();



