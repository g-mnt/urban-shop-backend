import ProdutosService from "../services/ProdutosService.js";

export async function criarProduto(req, res){
    try{
        const produtoCriado = await ProdutosService.criarProduto(req.body);
        res.json({
            message:"Produto criado com sucesso",
            data:produtoCriado,
        })
    }catch(error){
        console.log(error);
        res.status(500).json({
            message:error.message,
            data:{},
        })
    }
}

export async function buscarProduto(req, res){
    const {id} = req.params;
    try{
        const produto = await ProdutosService.buscarProduto(id);
        res.json(produto);
    }catch(error){
        res.status(500).json({
            message:error.message,
            data:{},
        })
    }
}

export async function buscarTodosProdutos(req, res){
    try{
        const produtos = await ProdutosService.buscarTodosProdutos();
        res.json(produtos);
    }catch(error){
        res.status(500).json({
            message:error.message,
            data:{},
        })
    }
}



