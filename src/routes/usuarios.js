import {Router} from 'express';
import {criarUsuario, buscarUsuario} from '../controllers/UsuariosController.js';
const routes = Router();

routes.post('/', criarUsuario);
routes.get('/:id', buscarUsuario);

export default routes;