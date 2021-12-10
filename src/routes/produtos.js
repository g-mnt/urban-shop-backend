import {Router} from 'express';
import {criarProduto, buscarProduto, buscarTodosProdutos} from '../controllers/ProdutosController.js';
const routes = Router();

routes.post('/', criarProduto);
routes.get('/', buscarTodosProdutos);

routes.get('/:id', buscarProduto);

export default routes;