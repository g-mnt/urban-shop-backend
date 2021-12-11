import {Router} from 'express';
import {criarUsuario, buscarUsuario, realizarLogin, atualizarUsuario, deletarUsuario} from '../controllers/UsuariosController.js';
const routes = Router();

//rotas posts
routes.post('/', criarUsuario);
routes.post('/Login', realizarLogin);

//rotas get
routes.get('/:id', buscarUsuario);

//rotas put
routes.put('/', atualizarUsuario);

//rotas delete
routes.delete('/', deletarUsuario);


export default routes;