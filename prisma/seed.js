import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import QRCode from "qrcode";
import crypto from "crypto";
import fs from "fs";
import path from "path";
import PDFDocument from "pdfkit";

const prisma = new PrismaClient();

async function main() {
  console.log("Iniciando seed...");

  console.log("Criando endereços e capturando IDs...");
  const enderecosData = [
      { logradouro: "R. Barbosa Lima", numero: "S/N", bairro: "Centro", cidade: "Igarassu", estado: "PE", cep: "53615-000", latitude: -7.83394, longitude: -34.90615 },
      { logradouro: "R. Barbosa Lima", numero: "S/N", bairro: "Centro", cidade: "Igarassu", estado: "PE", cep: "53615-000", latitude: -7.8343,  longitude: -34.90645 },
      { logradouro: "R. Dr. João Elísio", numero: "S/N", bairro: "Centro", cidade: "Igarassu", estado: "PE", cep: "53615-000", latitude: -7.83255, longitude: -34.90507 },
      { logradouro: "R. Barbosa Lima", numero: "148", bairro: "Centro", cidade: "Igarassu", estado: "PE", cep: "53615-000", latitude: -7.83469, longitude: -34.90673 },
      { logradouro: "R. Barbosa Lima", numero: "34",  bairro: "Centro", cidade: "Igarassu", estado: "PE", cep: "53615-000", latitude: -7.83523, longitude: -34.90632 },
      { logradouro: "R. Barbosa Lima", numero: "18",  bairro: "Centro", cidade: "Igarassu", estado: "PE", cep: "53615-000", latitude: -7.8341,  longitude: -34.90632 },
      { logradouro: "R. Barbosa Lima", numero: "S/N", bairro: "Centro", cidade: "Igarassu", estado: "PE", cep: "53615-000", latitude: -7.8349,  longitude: -34.90682 },
  ];

  const enderecosCriados = [];
  for (const data of enderecosData) {
      const endereco = await prisma.enderecos.create({
          data: data
      });
      enderecosCriados.push(endereco);
  }

  console.log("Criando figurinhas e capturando IDs...");
  const figurinhasData = [
      { nome: "Igreja Matriz dos Santos Cosme e Damião", descricao: "Igreja", valor_figurinha: 100 }, // [0]
      { nome: "Convento do Sagrado Coração de Jesus", descricao: "Igreja", valor_figurinha: 100 }, // [1]
      { nome: "Convento Franciscano e Museu Pinacoteca", descricao: "Igreja", valor_figurinha: 200 }, // [2]
      { nome: "Sobrado do Imperador", descricao: "Museu", valor_figurinha: 100 }, // [3]
      { nome: "Biblioteca Municipal", descricao: "Outros", valor_figurinha: 100 }, // [4]
      { nome: "Museu Histórico de Igarassu", descricao: "Museu", valor_figurinha: 100 }, // [5]
      { nome: "Casa do Artesão e Centro de informações turísticas", descricao: "Outros", valor_figurinha: 100 }, // [6]
  ];

  const figurinhasCriadas = [];
  for (const data of figurinhasData) {
      const figurinha = await prisma.figurinhas.create({
          data: data
      });
      figurinhasCriadas.push(figurinha);
  }

  console.log("Criando pontos turísticos...");
  await prisma.pontos_turisticos.createMany({
    data: [
      {
        nome: "Igreja Matriz dos Santos Cosme e Damião",
        descricao: "Considerada a igreja mais antiga em funcionamento do Brasil.",
        horario_funcionamento: "segunda-quarta: 09h às 15h",
        preco_entrada: 0.0,
        tipo: "Hist_rico",
        id_figurinha: figurinhasCriadas[0].id_figurinha,
        id_endereco: enderecosCriados[0].id_endereco
      },
      {
        nome: "Convento do Sagrado Coração de Jesus",
        descricao: "Fundado no século XVIII.",
        horario_funcionamento: "segunda-sexta: 09h às 15h",
        preco_entrada: 0.0,
        tipo: "Hist_rico",
        id_figurinha: figurinhasCriadas[1].id_figurinha,
        id_endereco: enderecosCriados[1].id_endereco
      },
      {
        nome: "Convento Franciscano e Museu Pinacoteca",
        descricao: "Museu com pinturas e peças sacras.",
        horario_funcionamento: "segunda-sexta: 09h às 17h",
        preco_entrada: 5.0,
        tipo: "Hist_rico",
        id_figurinha: figurinhasCriadas[2].id_figurinha,
        id_endereco: enderecosCriados[2].id_endereco
      },
      { 
        nome: "Sobrado do Imperador", 
        descricao: "Construído entre os séculos XVII e XVIII, este imponente casarão do Centro Histórico de Igarassu abrigou funções como Casa de Câmara e Cadeia. Em 1859 recebeu Dom Pedro II, o que lhe conferiu o nome “Sobrado do Imperador”.", 
        horario_funcionamento: "segunda-sexta: 08h às 16h55, sábado-domingo: fechado", 
        preco_entrada: 0.0, 
        tipo: "Hist_rico", 
        id_figurinha: figurinhasCriadas[3].id_figurinha,
        id_endereco: enderecosCriados[3].id_endereco 
      },
      { 
        nome: "Biblioteca publica de Igarassu", 
        descricao: "Instalada em um prédio histórico, representa a continuidade do poder público desde os tempos coloniais, preservando documentos e tradições políticas da cidade.",
        horario_funcionamento: "segunda-sexta: 07h às 17h, sábado-domingo: fechado", 
        preco_entrada: 0.0, 
        tipo: "Hist_rico", 
        id_figurinha: figurinhasCriadas[4].id_figurinha,
        id_endereco: enderecosCriados[4].id_endereco 
      },
      { 
        nome: "Museu Histórico de Igarassu", 
        descricao: "A Biblioteca Pública de Igarassu teve origem em iniciativas do século XIX, com o antigo Gabinete de Leitura. A primeira biblioteca oficial foi criada em 1942, mas sem registros de funcionamento. A biblioteca atual foi fundada em 1969, renomeada em 1970 e passou por vários endereços ao longo dos anos. Após um período desativada, foi reaberta em 2 de dezembro de 2005 na Rua Frei Caneca, com acervo renovado e foco em leitura, pesquisa e cultura", 
        horario_funcionamento: "segunda-sexta: 08h às 17h, Sábado-Domingo: fechado", 
        preco_entrada: 0.0, 
        tipo: "Hist_rico", 
        id_figurinha: figurinhasCriadas[5].id_figurinha,
        id_endereco: enderecosCriados[5].id_endereco 
      }, 
      { 
        nome: "Casa do Artesão e Centro de informações turísticas", 
        descricao: "Espaço dedicado à arte local, onde visitantes encontram artesanato regional e informações sobre os atrativos culturais e turísticos da cidade.", 
        horario_funcionamento: "segunda-sexta: 09h às 15h, sábado-domingo: 09h às 12h", 
        preco_entrada: 0.0, 
        tipo: "Hist_rico", 
        id_figurinha: figurinhasCriadas[6].id_figurinha,
        id_endereco: enderecosCriados[6].id_endereco 
      } 
    ], 
    skipDuplicates: true 
  });

  console.log("Criando usuários...");
  const senhaCriptografada = await bcrypt.hash("123456", 10);

  const usuarioAdmin = await prisma.usuarios.upsert({
    where: { email: "admin@test.com" },
    update: {},
    create: {
      nome_completo: "Admin Teste",
      email: "admin@test.com",
      senha: senhaCriptografada,
      role: "adm",
      saldo_moedas: 0
    }
  });

  const usuarioEmpreendedor = await prisma.usuarios.upsert({
    where: { email: "empresa@test.com" },
    update: {},
    create: {
      nome_completo: "Empresa Teste",
      email: "empresa@test.com",
      senha: senhaCriptografada,
      role: "empreendedor",
      saldo_moedas: 0
    }
  });

  const usuarioComum = await prisma.usuarios.upsert({
    where: { email: "comum@test.com" },
    update: {},
    create: {
      nome_completo: "Usuário Teste",
      email: "comum@test.com",
      senha: senhaCriptografada,
      role: "comum",
      saldo_moedas: 500
    }
  });

  console.log("Criando empresa...");
  const empresaExistente = await prisma.empresa.findFirst({
    where: { id_usuario: usuarioEmpreendedor.id_usuario }
  });

  const empresa = empresaExistente || await prisma.empresa.create({
    data: {
      nome_empresa: "Restaurante Viva Igarassu",
      cnpj: "12.345.678/0001-90",
      tipo_servico: "alimentacao",
      id_usuario: usuarioEmpreendedor.id_usuario
    }
  });

  console.log("Criando eventos...");
  await prisma.eventos.createMany({
    data: [
      {
        nome: "Festival Cultural de Igarassu",
        descricao: "Festival anual com música, dança e gastronomia local",
        data: new Date("2025-01-15"),
        horario: new Date("2025-01-15T09:00:00"),
        id_empresa: empresa.id_empresa,
        id_endereco: enderecosCriados[0].id_endereco
      },
      {
        nome: "Feira de Artesanato",
        descricao: "Exposição e venda de artesanato local",
        data: new Date("2025-02-10"),
        horario: new Date("2025-02-10T10:00:00"),
        id_empresa: empresa.id_empresa,
        id_endereco: enderecosCriados[6].id_endereco
      }
    ],
    skipDuplicates: true
  });

  console.log("Criando recompensas...");
  await prisma.recompensas.createMany({
    data: [
      {
        nome: "Desconto 10% no Restaurante",
        descricao: "Ganhe 10% de desconto em qualquer prato do cardápio",
        preco_moedas: 50,
        quantidade_disponivel: 100,
        id_empresa: empresa.id_empresa
      },
      {
        nome: "Sobremesa Grátis",
        descricao: "Ganhe uma sobremesa grátis na compra de um prato principal",
        preco_moedas: 30,
        quantidade_disponivel: 50,
        id_empresa: empresa.id_empresa
      },
      {
        nome: "Entrada Premium Grátis",
        descricao: "Uma entrada premium por nossa conta",
        preco_moedas: 80,
        quantidade_disponivel: 30,
        id_empresa: empresa.id_empresa
      }
    ],
    skipDuplicates: true
  });

  console.log("Criando algumas visitas de exemplo...");
  const pontosTuristicos = await prisma.pontos_turisticos.findMany({
    take: 3
  });

  for (const ponto of pontosTuristicos) {
    await prisma.usuario_figurinhas.upsert({
      where: {
        id_usuario_id_figurinha: {
          id_usuario: usuarioComum.id_usuario,
          id_figurinha: ponto.id_figurinha
        }
      },
      update: {},
      create: {
        id_usuario: usuarioComum.id_usuario,
        id_figurinha: ponto.id_figurinha,
        conquistada_em: new Date()
      }
    });
  }

  console.log("Atualizando saldo do usuário comum com as figurinhas conquistadas...");
  const figurinhasConquistadas = await prisma.usuario_figurinhas.findMany({
    where: { id_usuario: usuarioComum.id_usuario },
    include: { figurinhas: true }
  });

  const saldoTotal = figurinhasConquistadas.reduce((acc, uf) => acc + uf.figurinhas.valor_figurinha, 0) + 500;
  
  await prisma.usuarios.update({
    where: { id_usuario: usuarioComum.id_usuario },
    data: { saldo_moedas: saldoTotal }
  });

  console.log("Gerando QR Codes para todos os pontos turísticos...");
  const todosPontos = await prisma.pontos_turisticos.findMany();
  
  const pastaQr = path.resolve("uploads/qrcodes");
  const pastaPdf = path.resolve("uploads/pdfs");
  fs.mkdirSync(pastaQr, { recursive: true });
  fs.mkdirSync(pastaPdf, { recursive: true });

  for (const ponto of todosPontos) {
    const token = crypto.randomBytes(16).toString("hex");
    const url = `${process.env.API_URL}/visitas/qr?token=${token}`;

    const nomeQr = `ponto-${ponto.id_ponto}.png`;
    const caminhoQr = path.join(pastaQr, nomeQr);

    await QRCode.toFile(caminhoQr, url, {
      width: 400,
      margin: 2
    });

    const nomePdf = `qr-ponto-${ponto.id_ponto}.pdf`;
    const caminhoPdf = path.join(pastaPdf, nomePdf);

    const doc = new PDFDocument({ margin: 50 });
    doc.pipe(fs.createWriteStream(caminhoPdf));
    
    doc.fontSize(20).text("Viva Igarassu", { align: "center" });
    doc.moveDown();
    doc.fontSize(16).text(ponto.nome, { align: "center" });
    doc.moveDown();
    doc.fontSize(12).text("Escaneie o QR Code para marcar sua visita:", { align: "center" });
    doc.moveDown();
    doc.image(caminhoQr, { fit: [300, 300], align: "center" });
    doc.end();

    await prisma.qr_codes_pontos.create({
      data: {
        token,
        id_ponto: ponto.id_ponto,
        imagem_path: `/uploads/qrcodes/${nomeQr}`,
        pdf_path: `/uploads/pdfs/${nomePdf}`
      }
    });

    console.log(`QR Code gerado para: ${ponto.nome}`);
  }

  console.log("Seed finalizado com sucesso!");
}

main()
  .catch((e) => {
    console.error("Erro no seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });