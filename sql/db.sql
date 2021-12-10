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



