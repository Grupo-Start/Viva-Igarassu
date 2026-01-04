# Viva Igarassu — Backend

Backend RESTful da plataforma **Viva Igarassu**, voltada ao turismo cultural e histórico da cidade de Igarassu/PE. O sistema integra pontos turísticos, eventos, álbum de figurinhas digitais, recompensas e registro de visitas via QR Code.

---

## Sumário

* [Contexto e Motivação](#contexto-e-motivação)
* [Objetivo do Projeto](#objetivo-do-projeto)
* [Tecnologias](#tecnologias)
* [Arquitetura](#arquitetura)
* [Estrutura de Pastas](#estrutura-de-pastas)
* [Autenticação e Permissões](#autenticação-e-permissões)
* [Funcionalidades e Endpoints](#funcionalidades-e-endpoints)
* [QR Codes e Visitas](#qr-codes-e-visitas)
* [Uploads e Cloudinary](#uploads-e-cloudinary)
* [Setup e Execução](#setup-e-execução)
* [Variáveis de Ambiente](#variáveis-de-ambiente)
* [Testes e Coverage](#testes-e-coverage)
* [Banco de Dados](#banco-de-dados)
* [Segurança](#segurança)
* [Checklist para Avaliação](#checklist-para-avaliação)

---

## Contexto e Motivação

Igarassu é um dos mais importantes núcleos históricos do Brasil, com patrimônio arquitetônico e cultural relevante. Apesar disso, enfrenta desafios na divulgação, centralização de informações e incentivo ao turismo local. O **Viva Igarassu** surge para conectar história, cultura e tecnologia, ampliando o acesso a informações e estimulando o engajamento de moradores e visitantes.

## Objetivo do Projeto

Valorizar o turismo sustentável e educativo por meio de uma plataforma interativa que permita:

* Descoberta de pontos turísticos e eventos
* Engajamento via álbum de figurinhas digitais
* Recompensas simbólicas para usuários
* Registro de visitas por QR Code

---

## Tecnologias

* **Node.js** + **Express**
* **Prisma ORM** + **MySQL**
* **JWT** (autenticação stateless)
* **Bcrypt** (hash de senhas)
* **Multer** (uploads)
* **Cloudinary** (opcional, storage externo)
* **QRCode** + **PDFKit** (QR Codes e PDFs)
* **Docker Compose** (MySQL)
* **Jest** (testes e coverage)

---

## Arquitetura

```
Routes → Controllers → Services → Repositories → Prisma → MySQL
```

**Camadas**

* **Routes**: definição de rotas e middlewares
* **Controllers**: interface HTTP
* **Services**: regras de negócio e validações
* **Repositories**: acesso a dados via Prisma
* **Middlewares**: autenticação, autorização (roles) e uploads

---

## Estrutura de Pastas

```
backend/
├── controllers/
├── services/
├── repositories/
├── routes/
├── middleware/
├── prisma/
│   ├── schema.prisma
│   ├── seed.js
│   └── migrations/
├── database/
├── uploads/            # ignorado no git
│   ├── recompensas/
│   ├── qrcodes/
│   └── pdfs/
├── utils/
├── app.js
├── server.js
└── package.json
```

---

## Autenticação e Permissões

* **JWT** no header `Authorization: Bearer <token>`
* Middleware valida token e verifica blacklist

### Roles

| Role           | Descrição                                  |
| -------------- | ------------------------------------------ |
| `comum`        | Coleciona figurinhas e resgata recompensas |
| `empreendedor` | Gerencia empresas, eventos e recompensas   |
| `adm`          | Acesso administrativo total                |

**Exemplo de middleware:**

```js
permitir('adm')
permitir('empreendedor')
permitir('comum', 'adm')
```

---

## Funcionalidades e Endpoints

### Usuários

```
POST   /usuarios/cadastrar
POST   /usuarios/login
POST   /usuarios/logout           (auth)
GET    /usuarios/me               (auth)
PUT    /usuarios/me               (auth)
```

### Empresas

```
POST   /empresa                   (empreendedor/adm)
GET    /empresa
GET    /empresa/:id
PUT    /empresa/:id               (empreendedor/adm)
DELETE /empresa/:id               (empreendedor/adm)
```

### Eventos

```
POST   /eventos                   (empreendedor/adm)
GET    /eventos
GET    /eventos/:id
PUT    /eventos/:id               (empreendedor/adm)
DELETE /eventos/:id               (empreendedor/adm)
```

### Recompensas

```
POST   /recompensas               (empreendedor)
POST   /recompensas/:id/imagem    (empreendedor)
GET    /recompensas
GET    /recompensas/:id
PUT    /recompensas/:id           (empreendedor)
DELETE /recompensas/:id           (empreendedor)
```

### Pontos Turísticos

```
POST   /pontos-turisticos          (adm)
GET    /pontos-turisticos
GET    /pontos-turisticos/:id
PUT    /pontos-turisticos/:id      (adm)
DELETE /pontos-turisticos/:id      (adm)
```

### Figurinhas e Álbum

```
POST   /figurinhas                 (adm)
GET    /figurinhas
GET    /figurinhas/:id
GET    /meu-album-de-figurinhas    (auth)
```

### Resgates

```
POST   /resgates/:id_recompensa    (comum)
GET    /resgates/meus              (comum)
```

---

## QR Codes e Visitas

```
POST /qrcodes/pontos-turisticos/:id/qrcode   (adm)
POST /qrcodes/gerar-todos                    (adm)
POST /visitas/qr?token=TOKEN                 (comum)
```

**Fluxo:** QR → Front (`FRONT_URL`) → Backend valida → concede figurinha/moedas.

---

## Uploads e Cloudinary

* Campo: `imagem`
* Tipos: `jpeg, jpg, png, gif, webp`
* Limite: **5MB**
* Com `CLOUDINARY_*` configurado: upload externo
* Caso contrário: fallback em `uploads/`

---

## Setup e Execução

```bash
copy .env.example .env   # Windows
npm install
npx prisma generate
npx prisma migrate dev
node server.js
```

Servidor: `http://localhost:3001`

---

## Variáveis de Ambiente

* `DATABASE_URL`
* `PORT`
* `JWT_SECRET`
* `FRONT_URL`
* `CLOUDINARY_CLOUD_NAME`
* `CLOUDINARY_API_KEY`
* `CLOUDINARY_API_SECRET`

---

## Testes e Coverage

```bash
npm test
npm test -- --coverage
```

---

## Banco de Dados

**Modelos principais:** usuarios, empresa, eventos, pontos_turisticos, figurinhas, recompensas, resgates, qr_codes.

**Constraint:**

```prisma
@@unique([id_usuario, id_figurinha])
```

---

## Segurança

* Hash de senhas (bcrypt)
* JWT com expiração
* Blacklist de tokens
* Validação de roles
* Validação de uploads
---

**Viva Igarassu. Viva nossa história.**
