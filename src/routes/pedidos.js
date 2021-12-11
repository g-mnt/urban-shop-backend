import {Router} from 'express';
import {criarPedido, buscarPedido, buscarTodosPedidos, atualizarDadosPedido, deletarPedido, atualizarStatusPedido} from '../controllers/PedidoController.js';
const routes = Router();

//rotas post
routes.post('/', criarPedido);

//rotas get
routes.get('/:id', buscarPedido);
routes.get('/Usuario/:id', buscarTodosPedidos);

//rotas put
routes.put('/', atualizarDadosPedido);
routes.put('/AtualizarStatus', atualizarStatusPedido)
//rotas delete
routes.delete('/', deletarPedido);

export default routes;