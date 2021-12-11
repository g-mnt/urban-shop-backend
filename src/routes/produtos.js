import {Router} from 'express';
import {criarProduto, buscarProduto, buscarTodosProdutos} from '../controllers/ProdutosController.js';
const routes = Router();

// rotas de post
routes.post('/', criarProduto);

//rotas de get
routes.get('/', buscarTodosProdutos);
routes.get('/:id', buscarProduto);

//rotas de put

//rotas de delete

export default routes;