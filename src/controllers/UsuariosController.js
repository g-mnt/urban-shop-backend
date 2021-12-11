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

export async function realizarLogin(req, res){
    try{
        const usuario = await UsuariosService.login(req.body);
        if(usuario){
            res.json({
                message:"Usuario logado com sucesso",
                data:usuario,
            });
            return;
        }

        res.status(401).json({
            message:"Email ou senha inválidos",
            data:{},
        })
        
    }catch(error){
        console.log(error);
        res.status(500).json({
            message:error.message,
            data:{},
        })
    }
}