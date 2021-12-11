CREATE TABLE IF NOT EXISTS usuarios(
    id Uuid PRIMARY KEY,
    nome TEXT NOT NULL,
    email TEXT NOT NULL,
    endereco TEXT NOT NULL,
    senha TEXT NOT NULL,
    dtNasc DATE NOT NULL,
);

CREATE TABLE IF NOT EXISTS produtos(
    id Uuid PRIMARY KEY,
    nome TEXT NOT NULL,
    descricao TEXT NOT NULL,
    preco DECIMAL NOT NULL
)

CREATE TABLE IF NOT EXISTS produto_foto(
    id Uuid PRIMARY KEY,
    idProduto Uuid REFERENCES produtos(id),
    img BLOB NOT NULL,
    principal BOOLEAN DEFAULT false
)

CREATE TABLE IF NOT EXISTS pedidos(
    id Uuid PRIMARY KEY,
    idUsuario Uuid REFERENCES usuarios(id) NOT NULL,
    dtPedido DATE NOT NULL,
    valorTotal DECIMAL NOT NULL,
    status TEXT NOT NULL
)

CREATE TABLE IF NOT EXISTS pedido_produto(
    idProduto Uuid REFERENCES produtos(id),
    idPedido Uuid REFERENCES pedidos(id) NOT NULL,
    quantidade INTEGER NOT NULL
)



