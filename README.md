<p align="center">
  <img width="150" height="150" alt="Símbolo" src="https://github.com/user-attachments/assets/a240fa2a-b2ba-4c1c-87e8-24759c96c950" />
</p>


# Projeto Viva Igarassu
Projeto final para o programa Start, da Rede Cidadã, no qual serão aplicados os ensinamentos aprendidos em aulas para a criação de um website sobre turismo na cidade de Igarassu - PE.

## **Sobre Igarassu**

Igarassu, cujo nome em tupi significa “canoa grande” (da junção de ygara e usu), é reconhecida como uma cidade histórica e foi o primeiro núcleo de povoamento português no Brasil. O município abriga um dos patrimônios históricos e arquitetônicos mais importantes do país, destacando-se a Igreja dos Santos Cosme e Damião, a mais antiga em funcionamento no Brasil, conhecida também pelos milagres atribuídos aos santos padroeiros — como o de 1685, quando a cidade foi poupada da epidemia de febre amarela que atingiu outras regiões próximas.
Outro marco importante é o Convento de Santo Antônio, construído em 1588 pelos franciscanos, que serviu de abrigo às tropas do coronel Manuel Pereira de Morais durante a Revolução Praieira. Atualmente, o local abriga o Museu da Pinacoteca de Igarassu, que preserva um dos acervos mais representativos da pintura colonial brasileira.
Apesar de seu rico patrimônio histórico, cultural e natural, Igarassu ainda enfrenta desafios na promoção do turismo local, devido à falta de divulgação, centralização de informações e incentivos que conectem moradores e visitantes aos atrativos da cidade. Essa ausência de estrutura e comunicação limita o engajamento da comunidade e o potencial econômico e cultural do município, reforçando a importância de iniciativas como este projeto, que buscam valorizar e divulgar o turismo em Igarassu de forma inovadora e acessível.

## **Problema**

Apesar de possuir um rico patrimônio histórico, cultural e natural, Igarassu enfrenta desafios para valorizar e promover seu turismo local.
A cidade carece de divulgação adequada de seus pontos turísticos, informações centralizadas dos eventos culturais/sociais e incentivos que conectem moradores e visitantes aos seus atrativos.
Essa falta de estrutura e comunicação reduz o engajamento da população com o turismo, limitando o potencial econômico e cultural do município.

## **Objetivo do Projeto**

O Viva Igarassu tem como objetivo valorizar o turismo sustentável e educativo em Igarassu, 
conectando história, cultura e tecnologia. Por meio de uma plataforma interativa, 
visitantes e moradores poderão conhecer melhor os pontos turísticos, participar de atividades culturais e contribuir para a preservação do patrimônio local.

## **Funcionalidades Principais**

## 🎭 **Agenda Cultural**

Reúne eventos fixos e temporários de Igarassu, como festas tradicionais, feiras, exposições e apresentações culturais.
Facilita o acesso às datas, locais e horários dos eventos, incentivando a participação da comunidade e dos turistas.

## 🏝️ **Trilha / Álbum Turístico**

Cada ponto turístico visitado gera uma figurinha digital colecionável, formando um álbum interativo.
Estimula o visitante a explorar novos locais e aprender sobre a história e o patrimônio da cidade.
Pode incluir recompensas simbólicas ou descontos para os participantes mais engajados.


# 🌍 Viva Igarassu — Backend

Backend da plataforma **Viva Igarassu**, um sistema voltado para o turismo cultural e histórico da cidade de Igarassu, integrando pontos turísticos, eventos, figurinhas digitais, recompensas e visitas via QR Code.

---

## 🚀 Tecnologias Utilizadas

* **Node.js** + **Express**
* **Prisma ORM** + **MySQL**
* **JWT** (autenticação)
* **Bcrypt** (hash de senhas)
* **Multer** (upload de imagens)
* **QRCode** + **PDFKit** (geração de QR codes e PDFs)
* **Docker Compose** (banco de dados)

---

## 🧱 Arquitetura

```
Routes → Controllers → Services → Repositories → Prisma → MySQL
```

### Camadas

* **Routes**: definição de rotas e middlewares
* **Controllers**: recebem requisições HTTP e retornam respostas
* **Services**: lógica de negócio e validações
* **Repositories**: acesso direto ao banco via Prisma
* **Middlewares**: autenticação (JWT), autorização (roles), upload de arquivos

---

## 📂 Estrutura de Pastas

```
Vivaigarassu/
├── controllers/        # Lógica de controle das rotas
├── services/          # Regras de negócio
├── repositories/      # Queries ao banco de dados
├── routes/            # Definição de rotas da API
├── middleware/        # Auth, roles, upload, validações
├── prisma/            # Schema e migrations do Prisma
│   ├── schema.prisma
│   ├── seed.js
│   └── migrations/
├── database/          # Cliente Prisma
├── uploads/           # Arquivos enviados (imagens, QR codes, PDFs)
│   ├── recompensas/
│   ├── qrcodes/
│   └── pdfs/
├── utils/             # Funções auxiliares (bcrypt, jwt, response)
├── app.js             # Configuração do Express
├── server.js          # Inicialização do servidor
└── package.json
```

---

## 🔐 Autenticação e Permissões

### Sistema de Autenticação
- **JWT** (JSON Web Token) para autenticação stateless
- Token enviado no header: `Authorization: Bearer <token>`
- Middleware `auth.js` extrai e valida o token

### Roles de Usuário

| Role | Descrição |
|------|-----------|
| `comum` | Usuário padrão — coleciona figurinhas, resgata recompensas |
| `empreendedor` | Gerencia empresas, cria recompensas |
| `adm` | Administrador — acesso total ao sistema |

### Middleware de Permissão

```js
permitir("adm")                    // Apenas admin
permitir("empreendedor")           // Apenas empreendedor
permitir("comum", "adm")           // Comum ou admin
```

---

## 🏛️ Funcionalidades Principais

### 👤 Usuários
- **Cadastro** e **Login** com hash de senha (bcrypt)
- **Perfil do usuário** (GET/PUT `/usuarios/me`)
- **Saldo de moedas** (ganho ao conquistar figurinhas)
- **Controle de role** (comum, empreendedor, adm)

**Endpoints:**
```
POST   /usuarios/cadastrar
POST   /usuarios/login
GET    /usuarios/me              (autenticado)
PUT    /usuarios/me              (autenticado)
```

---

### 🏢 Empresas
- Cadastradas por **empreendedores** ou **admins**
- Associadas automaticamente ao usuário logado
- Base para **eventos** e **recompensas**

**Endpoints:**
```
POST   /empresa                  (empreendedor/adm)
GET    /empresa
GET    /empresa/:id
PUT    /empresa/:id              (empreendedor/adm)
DELETE /empresa/:id              (empreendedor/adm)
```

---

### 📅 Eventos
- Eventos culturais e turísticos
- Associados a empresas e endereços
- CRUD completo para empreendedores e admins

**Endpoints:**
```
POST   /eventos                  (empreendedor/adm)
GET    /eventos
GET    /eventos/:id
PUT    /eventos/:id              (empreendedor/adm)
DELETE /eventos/:id              (empreendedor/adm)
```

---

### 🎁 Recompensas
- Cadastradas por **empreendedores**
- Associadas automaticamente à empresa do usuário
- **Upload de imagens** das recompensas
- Usuários trocam moedas por recompensas

**Endpoints:**
```
POST   /recompensas                      (empreendedor)
POST   /recompensas/:id/imagem           (empreendedor) - upload
GET    /recompensas
GET    /recompensas/:id
PUT    /recompensas/:id                  (empreendedor)
DELETE /recompensas/:id                  (empreendedor)
```

**Upload de Imagem:**
- Form-data com campo `imagem`
- Aceita: jpeg, jpg, png, gif, webp
- Limite: 5MB
- Salva em: `/uploads/recompensas/`

---

### 🔄 Resgates
- **Usuários comuns** resgatam recompensas com moedas
- Validações: saldo suficiente, quantidade disponível
- Registro completo do resgate

**Endpoints:**
```
POST   /resgates/:id_recompensa          (comum)
GET    /resgates/meus                    (comum)
```

**Fluxo de Resgate:**
1. Usuário envia POST com ID da recompensa
2. Sistema valida saldo e disponibilidade
3. Debita moedas do usuário
4. Decrementa quantidade disponível
5. Cria registro de resgate
6. Retorna confirmação

---

### 📍 Pontos Turísticos
- CRUD completo de pontos históricos
- Cada ponto possui **1 figurinha** associada
- Base para **QR Codes** de visitas

**Endpoints:**
```
POST   /pontos-turisticos               (adm)
GET    /pontos-turisticos
GET    /pontos-turisticos/:id
PUT    /pontos-turisticos/:id           (adm)
DELETE /pontos-turisticos/:id           (adm)
```

---

### ⭐ Figurinhas
- Cada figurinha representa um ponto turístico
- Possui **valor em moedas**
- Conquistadas via **visita com QR Code**

**Endpoints:**
```
POST   /figurinhas                      (adm)
GET    /figurinhas
GET    /figurinhas/:id
PUT    /figurinhas/:id                  (adm)
DELETE /figurinhas/:id                  (adm)
```

---

### 🎒 Álbum de Figurinhas

Mostra progresso do usuário na coleção de figurinhas.

**Endpoint:**
```
GET /meu-album-de-figurinhas            (autenticado)
```

**Resposta:**
```json
{
  "total_figurinhas": 10,
  "conquistadas": 3,
  "faltando": 7,
  "album": [
    {
      "id_figurinha": "uuid",
      "nome": "Igreja dos Mártires",
      "descricao": "...",
      "valor_figurinha": 50,
      "conquistada": true,
      "data_conquista": "2025-12-15T10:30:00Z"
    },
    {
      "id_figurinha": "uuid",
      "nome": "Convento Santo Antônio",
      "conquistada": false
    }
  ]
}
```

---

### 📸 QR Codes e Visitas

**Geração de QR Codes (Admin):**

```
POST /qrcodes/pontos-turisticos/:id/qrcode    (adm)
POST /qrcodes/gerar-todos                     (adm)
```

- Gera QR Code **PNG** e **PDF** para cada ponto
- Token único por ponto
- Salva em `/uploads/qrcodes/` e `/uploads/pdfs/`

**Visita via QR Code (Usuário Comum):**

```
POST /visitas/qr?token=TOKEN                  (comum)
```

**Fluxo da Visita:**
1. Usuário escaneia QR Code no ponto turístico
2. App envia token para a API
3. Sistema valida token e verifica se usuário já tem a figurinha
4. Se não tem: concede a figurinha e adiciona moedas
5. Se já tem: retorna erro "Você já possui essa figurinha"

---

### 📊 Dashboard

#### Dashboard do Usuário (comum)
```
GET /dashboard/usuario                        (comum)
```

**Retorna:**
```json
{
  "usuario": {
    "nome": "João Silva",
    "saldo": 150
  },
  "figurinhas": {
    "total_conquistadas": 5
  },
  "recompensas_resgatadas": [
    {
      "id_resgate": "uuid",
      "nome": "Desconto 10%",
      "empresa": "Restaurante Igarassu",
      "valor": 50,
      "codigo": "ABC123",
      "data_resgate": "2025-12-15",
      "imagem": "http://localhost:3001/uploads/recompensas/imagem.jpg"
    }
  ]
}
```

#### Dashboard Admin
```
GET /dashboard/admin                          (adm)
```

**Retorna:**
```json
{
  "usuarios": 120,
  "empresas": 25,
  "eventos": 15,
  "pontos_turisticos": 10,
  "figurinhas": 10,
  "recompensas_disponiveis": 30,
  "recompensas_resgatadas": 45,
  "total_moedas_resgatadas": 2250,
  "total_visitas": 89
}
```

#### Visitas por Ponto
```
GET /dashboard/visitas-por-ponto              (adm)
```

**Retorna:**
```json
[
  {
    "ponto_id": "uuid",
    "ponto_nome": "Igreja dos Mártires",
    "figurinha_nome": "Figurinha Igreja",
    "total_visitas": 45
  },
  {
    "ponto_id": "uuid",
    "ponto_nome": "Convento Santo Antônio",
    "figurinha_nome": "Figurinha Convento",
    "total_visitas": 0
  }
]
```

#### Visitas por Período
```
GET /dashboard/visitas-por-periodo?dias=30    (adm)
```

**Parâmetros:**
- `dias`: número de dias (padrão: 30)

**Retorna:**
```json
[
  {
    "data": "2025-12-01",
    "total_visitas": 5
  },
  {
    "data": "2025-12-02",
    "total_visitas": 0
  },
  {
    "data": "2025-12-03",
    "total_visitas": 8
  }
]
```

---

## 🗄️ Banco de Dados

### Principais Modelos

- `usuarios` - Usuários do sistema
- `empresa` - Empresas locais
- `eventos` - Eventos culturais
- `pontos_turisticos` - Pontos históricos
- `figurinhas` - Figurinhas colecionáveis
- `usuario_figurinhas` - Relação usuário ↔ figurinha (unique composto)
- `qr_codes_pontos` - QR Codes dos pontos
- `recompensas` - Recompensas disponíveis
- `resgates` - Histórico de resgates
- `enderecos` - Endereços (eventos e pontos)

### Relacionamentos Importantes

```
usuarios ──┬── empresa (1:N)
           ├── resgates (1:N)
           └── usuario_figurinhas (1:N)

pontos_turisticos ──┬── figurinhas (1:1)
                    ├── qr_codes_pontos (1:N)
                    └── enderecos (1:1)

empresa ──┬── eventos (1:N)
          └── recompensas (1:N)

recompensas ──── resgates (1:N)
figurinhas ──── usuario_figurinhas (1:N)
```

### Unique Constraints

```prisma
// Garante que usuário não ganhe a mesma figurinha 2x
@@unique([id_usuario, id_figurinha])
```

---

## 🧪 Rodando o Projeto

### 1️⃣ Clonar o repositório

```bash
git clone <repo-url>
cd Vivaigarassu
```

### 2️⃣ Instalar dependências

```bash
npm install
```

### 3️⃣ Configurar variáveis de ambiente

Crie `.env`:

```env
DATABASE_URL="mysql://user:password@localhost:3306/bdvivaigarassu"
JWT_SECRET="sua_chave_secreta_aqui"
API_URL="http://localhost:3001"
```

### 4️⃣ Subir banco de dados (Docker)

```bash
cd database
docker-compose up -d
```

### 5️⃣ Rodar migrations

```bash
npx prisma migrate dev
```

Ou sincronizar schema direto:

```bash
npx prisma db push
```

### 6️⃣ Gerar cliente Prisma

```bash
npx prisma generate
```

### 7️⃣ (Opcional) Popular banco com dados iniciais

```bash
npx prisma db seed
```

### 8️⃣ Iniciar o servidor

```bash
npm start
# ou
node server.js
```

Servidor rodando em: `http://localhost:3001`

---

## 📬 Padrão de Respostas da API

### Sucesso
```json
{
  "message": "Operação realizada com sucesso",
  "data": { ... }
}
```

### Erro de Validação
```json
{
  "message": "Campos obrigatórios não preenchidos"
}
```

### Erro de Autenticação
```json
{
  "message": "Token inválido"
}
```

### Erro de Permissão
```json
{
  "message": "Acesso permitido apenas para administradores"
}
```

---

## 🔑 Testando a API

### 1. Cadastrar usuário
```http
POST /usuarios/cadastrar
Content-Type: application/json

{
  "nome_completo": "João Silva",
  "email": "joao@email.com",
  "senha": "senha123",
  "role": "comum"
}
```

### 2. Fazer login
```http
POST /usuarios/login
Content-Type: application/json

{
  "email": "joao@email.com",
  "senha": "senha123"
}
```

Salve o `token` retornado.

### 3. Acessar rota protegida
```http
GET /dashboard/usuario
Authorization: Bearer <token>
```

### 4. Resgatar recompensa
```http
POST /resgates/:id_recompensa
Authorization: Bearer <token>
```

---

## 🛡️ Segurança

- ✅ Senhas com hash (bcrypt)
- ✅ Tokens JWT com expiração (1h)
- ✅ Validação de roles em rotas sensíveis
- ✅ Unique constraints no banco
- ✅ Validação de tipos de arquivo no upload
- ✅ Limite de tamanho de arquivo (5MB)

---

## 🧠 Observações Técnicas

- **Arquitetura em camadas** para separação de responsabilidades
- **Services** concentram lógica de negócio (não duplicada)
- **Repositories** isolam queries ao banco
- **Middlewares** reutilizáveis e compostos
- **Prisma Client** gerado automaticamente com types
- **Uploads** salvos localmente (pode migrar para S3/CDN)
- **QR Codes** únicos por ponto turístico
- **Transações** garantem consistência (ex: resgate de recompensa)

---

## 📦 Próximas Melhorias

- [ ] Integração com Storage (AWS S3, Cloudinary)
- [ ] Sistema de notificações (push/email)
- [ ] Websockets para atualizações em tempo real
- [ ] Rate limiting e throttling
- [ ] Logs estruturados (Winston, Pino)
- [ ] Testes automatizados (Jest)
- [ ] CI/CD (GitHub Actions)
- [ ] Documentação com Swagger/OpenAPI

---

## 💙 Viva Igarassu

Uma plataforma que une **história, cultura e tecnologia** para impulsionar o turismo local.

**Viva Igarassu. Viva nossa história.**
