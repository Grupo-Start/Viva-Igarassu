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

# 🌍 Viva Igarassu — Backend

Backend da plataforma **Viva Igarassu**, um sistema voltado para o turismo cultural e histórico da cidade de Igarassu, integrando pontos turísticos, eventos, figurinhas digitais, recompensas e visitas via QR Code.

---

## 🚀 Tecnologias Utilizadas

* **Node.js**
* **Express**
* **Prisma ORM**
* **MySQL**
* **JWT (JSON Web Token)**
* **Docker / Docker Compose**
* **QRCode (npm)**

---

## 🧱 Arquitetura

O projeto segue uma arquitetura em camadas:

```
Routes → Controllers → Services → Repositories → Prisma → Banco
```

### 📌 Responsabilidades

* **Routes**: definem as rotas da API
* **Controllers**: recebem requisições e retornam respostas
* **Services**: concentram as regras de negócio
* **Repositories**: acesso ao banco de dados (Prisma)
* **Middlewares**: autenticação, autorização e validações

---

## 📂 Estrutura de Pastas

```
src/
├── controllers/
├── services/
├── repositories/
├── routes/
├── middleware/
├── database/
│   └── prismaClient.js
├── prisma/
│   └── schema.prisma
├── app.js
└── server.js
```

---

## 🔐 Autenticação e Permissões

A API utiliza **JWT** para autenticação.

### Roles disponíveis:

* `adm`
* `comum`
* `empreendedor`

### Middleware de permissão:

```js
permitir("adm")
permitir("comum")
```

Cada rota valida o papel do usuário antes de executar a ação.

---

## 🏛️ Funcionalidades Principais

### 👤 Usuários

* Cadastro e login
* Perfil do usuário
* Controle de saldo de moedas
* Controle de permissões por role (`adm`, `comum`, `empreendedor`)

### 🏢 Empresas

* Cadastro e gerenciamento de empresas locais
* Empresas associadas a eventos, recompensas e serviços
* Acesso restrito por perfil (empreendedor / admin)

### 📅 Eventos

* CRUD de eventos culturais e turísticos
* Associação com empresas
* Controle de permissão (admin e empreendedor)
* Listagem pública para usuários

### 🎁 Recompensas

* Cadastro de recompensas pelo administrador
* Recompensas associadas a empresas
* Definição de custo em moedas

### 🔄 Resgates

* Usuário troca moedas por recompensas
* Validação de saldo disponível
* Registro histórico de resgates

### 📍 Pontos Turísticos

* CRUD completo
* Associação com figurinhas
* Base para visitas via QR Code

### ⭐ Figurinhas

* CRUD (admin)
* Associadas a pontos turísticos
* Valor em moedas

### 🎒 Álbum de Figurinhas (Usuário)

Endpoint:

```
GET /meu-album-de-figurinhas
```

Retorna:

* total de figurinhas
* quantas o usuário conquistou
* lista com status `conquistada: true | false`

---

### 📸 QR Code e Visitas

* QR Codes são gerados pelo admin
* Cada QR aponta para um ponto turístico
* Usuário escaneia o QR estando logado
* A visita concede automaticamente a figurinha (se ainda não conquistada)

Endpoint:

```
POST /visitas/qr?token=TOKEN
```

---

### 📸 QR Code e Visitas

* QR Codes são gerados pelo admin
* Cada QR aponta para um ponto turístico
* Usuário escaneia o QR estando logado
* A visita concede automaticamente a figurinha (se ainda não conquistada)

Endpoint:

```
POST /visitas/qr?token=TOKEN
```

---

### 🎁 Recompensas e Resgates

* Recompensas cadastradas pelo admin
* Usuário troca moedas por recompensas
* Controle de resgates

---

## 🗄️ Banco de Dados (Prisma)

### Relacionamentos Importantes

* `usuarios` ↔ `usuario_figurinha`
* `figurinhas` ↔ `usuario_figurinha`
* `pontos_turisticos` ↔ `figurinhas`
* `pontos_turisticos` ↔ `qr_codes_pontos`

A tabela `usuario_figurinha` possui **unique composto**:

```prisma
@@unique([id_usuario, id_figurinha])
```

Garantindo que o usuário não ganhe a mesma figurinha duas vezes.

---

## 🧪 Rodando o Projeto

### 1️⃣ Instalar dependências

```bash
npm install
```

### 2️⃣ Configurar variáveis de ambiente

Crie um arquivo `.env`:

```env
DATABASE_URL="mysql://user:password@localhost:3307/bdvivaigarassu"
JWT_SECRET="sua_chave_secreta"
API_URL="http://localhost:3001"
```

### 3️⃣ Rodar migrations

```bash
npx prisma migrate dev
```

### 4️⃣ Iniciar o servidor

```bash
npm run dev
```

---

## 📬 Padrão de Respostas

### Sucesso

```json
{
  "message": "Operação realizada com sucesso"
}
```

### Erro

```json
{
  "error": "Mensagem de erro"
}
```

---

## 🧠 Observações Finais

* O backend foi pensado para ser **escalável** e **manutenível**
* Regras de negócio centralizadas nos services
* Sem duplicação de lógica
* Pronto para integração com front-end (Web ou Mobile)

---

## 💙 Viva Igarassu

Uma plataforma que une **história, cultura e tecnologia** para impulsionar o turismo local.

**Viva Igarassu. Viva nossa história.**
