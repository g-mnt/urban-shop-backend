import Usuario from "../models/Usuario.js";
import {v1 as uuidv1} from "uuid";

class UsuariosService{
    async criarUsuario(fields){

        const {nome, endereco, email, dtNasc, senha} = fields;
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
}

export default new UsuariosService();

