import PedidoService from "../services/PedidoService.js";

export async function criarPedido(req, res){

    try{
        const pedidoCriado = await PedidoService.criarPedido(req.body);
        res.json({
            message:"Pedido criado com sucesso",
            data:pedidoCriado,
        })
    }catch(error){
        console.log(error);
        res.status(500).json({
            message:error.message,
            data:{},
        })
    }
}

export async function buscarPedido(req, res){
    const {id} = req.params;
    try{
        const pedido = await PedidoService.buscarPedido(id);
        res.json(pedido);
    }catch(error){
        res.status(500).json({
            message:error.message,
            data:{},
        })
    }
}

export async function buscarTodosPedidos(req, res){
    const {id} = req.params;
    try{
        const pedido = await PedidoService.buscarTodosPedidos(id);
        res.json(pedido);
    }catch(error){
        res.status(500).json({
            message:error.message,
            data:{},
        })
    }
}

export async function atualizarDadosPedido(req, res){
    try{
        const pedido = await PedidoService.atualizarDadosPedido(req.body);
        res.json(pedido);
    }catch(error){
        res.status(500).json({
            message:error.message,
            data:{},
        })
    }
}

export async function atualizarStatusPedido(req, res){
    try{
        const pedido = await PedidoService.atualizarStatusPedido(req.body);
        res.json(pedido);
    }catch(error){
        res.status(500).json({
            message:error.message,
            data:{},
        })
    }
}

export async function deletarPedido(req, res){
    const {id} = req.body;
    try{
        await PedidoService.deletarPedido(id);
        res.json({
            message: "Pedido deletado com sucesso",
        })
    }catch(error){
        res.status(500).json({
            message:error.message,
            data:{},
        })
    }
}