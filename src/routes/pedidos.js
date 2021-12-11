import {Router} from 'express';
import {criarPedido, buscarPedido, buscarTodosPedidos} from '../controllers/PedidoController.js';
const routes = Router();

routes.post('/', criarPedido);
routes.get('/:id', buscarPedido);
routes.get('/Usuario/:id', buscarTodosPedidos);
export default routes;