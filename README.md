<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body>
  <header>
    <h1>Documentação da API HopeTrack</h1>
  </header>
  
  ![_21536083-27cf-4cb5-9f19-5a3892de06e1](https://github.com/JonasLProgramador/HopeTrack-Api/assets/172916273/7e8597c4-9d1d-4324-98ce-4f335957f7f6)
  <section id="introducao">
    <h2>Hopetrack 📖</h2>
    <p> O HopeTrack é um aplicativo para registro e gestão de doações, focado em conectar doadores, doações e instituições de caridade. fornece operações CRUD para gerenciar Doadores, Doações e Instituições de Caridade. Inclui validação de dados usando <code>express-validator</code> para garantir a integridade dos dados de entrada.</p>
  </section>

  <nav>
    <ul>
      <li><a href="#introducao">📖 Introdução</a></li>
      <li><a href="#configuracao">⚙️ Configuração</a></li>
      <li><a href="#variaveis-de-ambiente">🔧 Variáveis de Ambiente</a></li>
      <li><a href="#configuracao-do-banco-de-dados">🗃️ Configuração do Banco de Dados</a></li>
      <li><a href="#rotas">🛣️ Rotas da API</a></li>
      <ul>
        <li><a href="#doadores">🤲 Doadores</a></li>
        <ul>
          <li><a href="#criar-doador">➕ Criar Doador</a></li>
          <li><a href="#obter-todos-doadores">📋 Obter Todos os Doadores</a></li>
          <li><a href="#obter-doador-por-id">🔍 Obter Doador por ID</a></li>
          <li><a href="#atualizar-doador">🔄 Atualizar Doador</a></li>
          <li><a href="#deletar-doador">🗑️ Deletar Doador</a></li>
        </ul>
        <li><a href="#doacoes">💸 Doações</a></li>
        <ul>
          <li><a href="#criar-doacao">➕ Criar Doação</a></li>
          <li><a href="#obter-todas-doacoes">📋 Obter Todas as Doações</a></li>
          <li><a href="#obter-doacao-por-id">🔍 Obter Doação por ID</a></li>
          <li><a href="#atualizar-doacao">🔄 Atualizar Doação</a></li>
          <li><a href="#deletar-doacao">🗑️ Deletar Doação</a></li>
        </ul>
        <li><a href="#instituicoes">🏢 Instituições de Caridade</a></li>
        <ul>
          <li><a href="#criar-instituicao">➕ Criar Instituição</a></li>
          <li><a href="#obter-todas-instituicoes">📋 Obter Todas as Instituições</a></li>
          <li><a href="#obter-instituicao-por-id">🔍 Obter Instituição por ID</a></li>
          <li><a href="#atualizar-instituicao">🔄 Atualizar Instituição</a></li>
          <li><a href="#deletar-instituicao">🗑️ Deletar Instituição</a></li>
        </ul>
      </ul>
      <li><a href="#tratamento-de-erros">⚠️ Tratamento de Erros</a></li>
      <li><a href="#conclusao">🎉 Conclusão</a></li>
    </ul>
  </nav>
<section id="tecnologias">
  <h2>Tecnologias 📱</h2>
  <ul>
    <li>Mysql2</li>
    <li>Nodejs</li>
    <li>Express</li>
    <li>Express Validator</li>
  </ul>
</section>
  

  <section id="configuracao">
    <h2>Configuração ⚙️</h2>
    <p>Para configurar o projeto, siga estas etapas:</p>
    <ol>
      <li>Clone o repositório.</li>
      <li>Instale as dependências usando <code>npm install</code>.</li>
      <li>Configure as variáveis de ambiente conforme descrito na seção <a href="#variaveis-de-ambiente">Variáveis de Ambiente</a>.</li>
      <li>Inicie o servidor usando <code>npm start</code>.</li>
    </ol>
  </section>

  <section id="variaveis-de-ambiente">
    <h2>Variáveis de Ambiente 🔧</h2>
    <p>Crie um arquivo <code>.env</code> na raiz do projeto e adicione as seguintes variáveis:</p>
    <pre>
DB_HOST=seu_host_de_banco_de_dados
DB_USER=seu_usuario_de_banco_de_dados
DB_PASS=sua_senha_de_banco_de_dados
DB_NAME=seu_nome_de_banco_de_dados
PORT=seu_numero_de_porta
    </pre>
  </section>

  <section id="configuracao-do-banco-de-dados">
    <h2>Configuração do Banco de Dados 🗃️</h2>
    <p>Para configurar o banco de dados, execute o seguinte script:</p>
    <pre>
-- Script SQL para configurar o banco de dados
CREATE DATABASE HopeTrack;
DROP DATABASE HopeTrack;

Use HopeTrack;

CREATE TABLE Donator (
id int PRIMARY KEY auto_increment,
name VARCHAR(30) NOT NULL,
email VARCHAR(20) UNIQUE NOT NULL
);

SELECT * FROM Donator;

CREATE TABLE Donation(
id int primary key auto_increment,
amount DOUBLE PRECISION NOT NULL,
donation_date DATE NOT NULL,
payment_receipt_link VARCHAR(78),
donator_id INT,
FOREIGN KEY (donator_id) REFERENCES Donator(id) ON DELETE CASCADE ON UPDATE CASCADE
);


CREATE TABLE Charity(
id int primary key auto_increment,
name varchar(30) UNIQUE NOT NULL,
description TEXT NOT NULL,
identification CHAR(14) NOT NULL
);

CREATE TABLE Donator_Charity(
donator_id INT,
charity_id INT,
PRIMARY KEY(donator_id,charity_id), 
FOREIGN KEY  (donator_id) REFERENCES Donator(id) ON DELETE CASCADE ON UPDATE CASCADE,
FOREIGN KEY (Charity_id) REFERENCES Charity(id) ON DELETE CASCADE ON UPDATE CASCADE 
)
    </pre>
    <p>Alternativamente, você pode encontrar o script <a href="https://github.com/JonasLProgramador/HopeTrack-Database.git">aqui</a>.</p>
  </section>

  <section id="rotas">
    <h2>Rotas da API 🛣️</h2>
    <section id="doadores">
      <h3>Doadores 🤲</h3>
      <section id="criar-doador">
        <h4>1. Criar Doador ➕</h4>
        <p><strong>POST /doadores/criar</strong></p>
        <pre>
{
  "nome": "Nome do Doador",
  "email": "doador@example.com"
}
        </pre>
        <p>Validações:</p>
        <ul>
          <li><code>nome</code>: Deve ser uma string não vazia.</li>
          <li><code>email</code>: Deve ser um endereço de e-mail válido.</li>
        </ul>
      </section>
      <section id="obter-todos-doadores">
        <h4>2. Obter Todos os Doadores 📋</h4>
        <p><strong>GET /doadores/mostrar-todos</strong></p>
      </section>
      <section id="obter-doador-por-id">
        <h4>3. Obter Doador por ID 🔍</h4>
        <p><strong>GET /doadores/mostrarPor/:id</strong></p>
        <p>Validações:</p>
        <ul>
          <li><code>id</code>: Deve ser um número inteiro.</li>
        </ul>
      </section>
      <section id="atualizar-doador">
        <h4>4. Atualizar Doador 🔄</h4>
        <p><strong>PUT /doadores/atualizar/:id</strong></p>
        <pre>
{
  "nome": "Nome Atualizado",
  "email": "atualizado@example.com"
}
        </pre>
        <p>Validações:</p>
        <ul>
          <li><code>id</code>: Deve ser um número inteiro.</li>
          <li><code>nome</code>: Opcional, deve ser uma string não vazia.</li>
          <li><code>email</code>: Opcional, deve ser um endereço de e-mail válido.</li>
        </ul>
      </section>
      <section id="deletar-doador">
        <h4>5. Deletar Doador 🗑️</h4>
        <p><strong>DELETE /doadores/deletar/:id</strong></p>
        <p>Validações:</p>
        <ul>
          <li><code>id</code>: Deve ser um número inteiro.</li>
        </ul>
      </section>
    </section>
    <section id="doacoes">
      <h3>Doações 💸</h3>
      <section id="criar-doacao">
        <h4>1. Criar Doação ➕</h4>
        <p><strong>POST /doacoes/criar</strong></p>
        <pre>
{
  "valor": 100.50,
  "data_doacao": "2024-01-01",
  "link_recibo_pagamento": "http://example.com/recibo",
  "id_doador": 1
}
        </pre>
        <p>Validações:</p>
        <ul>
          <li><code>valor</code>: Deve ser um número positivo não nulo.</li>
          <li><code>data_doacao</code>: Deve estar no formato YYYY-MM-DD.</li>
          <li><code>link_recibo_pagamento</code>: Deve ser uma URL válida.</li>
          <li><code>id_doador</code>: Deve ser um número inteiro válido correspondente a um Doador existente.</li>
        </ul>
      </section>
      <section id="obter-todas-doacoes">
        <h4>2. Obter Todas as Doações 📋</h4>
        <p><strong>GET /doacoes/mostrar-todas</strong></p>
      </section>
      <section id="obter-doacao-por-id">
        <h4>3. Obter Doação por ID 🔍</h4>
        <p><strong>GET /doacoes/mostrarPor/:id</strong></p>
        <p>Validações:</p>
        <ul>
          <li><code>id</code>: Deve ser um número inteiro.</li>
        </ul>
      </section>
      <section id="atualizar-doacao">
        <h4>4. Atualizar Doação 🔄</h4>
        <p><strong>PUT /doacoes/atualizar/:id</strong></p>
        <pre>
{
  "valor": 150.75,
  "data_doacao": "2024-02-01",
  "link_recibo_pagamento": "http://example.com/novorecibo",
  "id_doador": 2
}
        </pre>
        <p>Validações:</p>
        <ul>
          <li><code>id</code>: Deve ser um número inteiro.</li>
          <li><code>valor</code>: Opcional, deve ser um número positivo não nulo.</li>
          <li><code>data_doacao</code>: Opcional, deve estar no formato YYYY-MM-DD.</li>
          <li><code>link_recibo_pagamento</code>: Opcional, deve ser uma URL válida.</li>
          <li><code>id_doador</code>: Opcional, deve ser um número inteiro válido correspondente a um Doador existente.</li>
        </ul>
      </section>
      <section id="deletar-doacao">
        <h4>5. Deletar Doação 🗑️</h4>
        <p><strong>DELETE /doacoes/deletar/:id</strong></p>
        <p>Validações:</p>
        <ul>
          <li><code>id</code>: Deve ser um número inteiro.</li>
        </ul>
      </section>
    </section>
    <section id="instituicoes">
      <h3>Instituições de Caridade 🏢</h3>
      <section id="criar-instituicao">
        <h4>1. Criar Instituição de Caridade ➕</h4>
        <p><strong>POST /instituicoes/criar</strong></p>
        <pre>
{
  "nome": "Nome da Instituição",
  "descricao": "Descrição da instituição de caridade.",
  "identificacao": "12345678901234"
}
        </pre>
        <p>Validações:</p>
        <ul>
          <li><code>nome</code>: Deve ser uma string não vazia.</li>
          <li><code>descricao</code>: Deve ser uma string não vazia.</li>
          <li><code>identificacao</code>: Deve ser uma sequência de 14 caracteres.</li>
        </ul>
      </section>
      <section id="obter-todas-instituicoes">
        <h4>2. Obter Todas as Instituições de Caridade 📋</h4>
        <p><strong>GET /instituicoes/mostrar-todas</strong></p>
      </section>
      <section id="obter-instituicao-por-id">
        <h4>3. Obter Instituição de Caridade por ID 🔍</h4>
        <p><strong>GET /instituicoes/mostrarPor/:id</strong></p>
        <p>Validações:</p>
        <ul>
          <li><code>id</code>: Deve ser um número inteiro.</li>
        </ul>
      </section>
      <section id="atualizar-instituicao">
        <h4>4. Atualizar Instituição de Caridade 🔄</h4>
        <p><strong>PUT /instituicoes/atualizar/:id</strong></p>
        <pre>
{
  "nome": "Novo Nome da Instituição",
  "descricao": "Nova descrição da instituição.",
  "identificacao": "98765432109876"
}
        </pre>
        <p>Validações:</p>
        <ul>
          <li><code>id</code>: Deve ser um número inteiro.</li>
          <li><code>nome</code>: Opcional, deve ser uma string.</li>
          <li><code>descricao</code>: Opcional, deve ser uma string.</li>
          <li><code>identificacao</code>: Opcional, deve ser uma sequência de 14 caracteres.</li>
        </ul>
      </section>
      <section id="deletar-instituicao">
        <h4>5. Deletar Instituição de Caridade 🗑️</h4>
        <p><strong>DELETE /instituicoes/deletar/:id</strong></p>
        <p>Validações:</p>
        <ul>
          <li><code>id</code>: Deve ser um número inteiro.</li>
        </ul>
      </section>
    </section>
  </section>

  <section id="tratamento-de-erros">
    <h2>Tratamento de Erros ⚠️</h2>
    <p>A API retorna mensagens de erro específicas para diferentes cenários, como validação de entrada inválida, operação de banco de dados falha, ou solicitação não encontrada.</p>
  </section>

  <section id="conclusao">
    <h2>Conclusão 🎉</h2>
    <p>Esta documentação cobre as principais funcionalidades da API HopeTrack. Para mais detalhes sobre cada rota e exemplos adicionais, consulte o código fonte e os comentários no repositório.</p>
  </section>

</body>
</html>
