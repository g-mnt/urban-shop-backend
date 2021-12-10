import UsuariosService from "../services/UsuariosService.js";

export async function criarUsuario(req, res){

    try{
        const usuarioCriado = await UsuariosService.criarUsuario(req.body);
        res.json({
            message:"Usuário criado com sucesso",
            data:usuarioCriado,
        })
    }catch(error){
        console.log(error);
        res.status(500).json({
            message:error.message,
            data:{},
        })
    }
}

export async function buscarUsuario(req, res){
    const {id} = req.params;
    try{
        const usuario = await UsuariosService.buscarUsuario(id);
        res.json(usuario);
    }catch(error){
        res.status(500).json({
            message:error.message,
            data:{},
        })
    }
}