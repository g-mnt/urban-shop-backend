import Usuario from "../models/Usuario.js";
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
}

export default new UsuariosService();

