import express, {json} from 'express';
import morgan from 'morgan';

//importando rotas
import usuariosRoutes from "./routes/usuarios.js";
import produtosRoutes from "./routes/produtos.js";

const app = express();
const PORT = 5000;

app.listen(PORT, () => console.log(`Server running on port: http://localhost:${PORT}`));

//middlewares
app.use(morgan('dev'));
app.use(json({limit: '500mb'}));

//rotas
app.use('/Usuarios', usuariosRoutes);
app.use('/Produtos', produtosRoutes);

