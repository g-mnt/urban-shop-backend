import {Router} from 'express';
import {criarUsuario, buscarUsuario, realizarLogin} from '../controllers/UsuariosController.js';
const routes = Router();

routes.post('/', criarUsuario);
routes.post('/Login', realizarLogin);
routes.get('/:id', buscarUsuario);


export default routes;