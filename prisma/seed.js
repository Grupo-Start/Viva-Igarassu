import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

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
      const endereco = await prisma.enderecos.upsert({
          where: { unique_endereco_key: { 
              logradouro: data.logradouro, 
              numero: data.numero, 
              bairro: data.bairro, 
              cidade: data.cidade, 
              estado: data.estado 
          } },
          update: {},
          create: data,
      });
      enderecosCriados.push(endereco);
  }

  console.log("Criando figurinhas e capturando IDs...");
  const figurinhasData = [
      { nome: "Igreja Matriz dos Santos Cosme e Damião", descricao: "Igreja", valor_figurinha: 100 }, // [0]
      { nome: "Convento do Sagrado Coração de Jesus", descricao: "Igreja", valor_figurinha: 100 }, // [1]
      { nome: "Convento Franciscano e Museu Pinacoteca", descricao: "Igreja", valor_figurinha: 100 }, // [2]
      { nome: "Sobrado do Imperador", descricao: "Museu", valor_figurinha: 100 }, // [3]
      { nome: "Biblioteca Municipal", descricao: "Outros", valor_figurinha: 100 }, // [4]
      { nome: "Museu Histórico de Igarassu", descricao: "Museu", valor_figurinha: 100 }, // [5]
      { nome: "Casa do Artesão e Centro de informações turísticas", descricao: "Outros", valor_figurinha: 100 }, // [6]
  ];

  const figurinhasCriadas = [];
  for (const data of figurinhasData) {
      const figurinha = await prisma.figurinhas.upsert({
          where: { nome: data.nome }, 
          update: {},
          create: data,
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

  await prisma.usuarios.createMany({
    data: [
      {
        nome_completo: "Admin Teste",
        email: "admin@test.com",
        senha: senhaCriptografada,
        role: "adm"
      },
      {
        nome_completo: "Empresa Teste",
        email: "empresa@test.com",
        senha: senhaCriptografada,
        role: "empreendedor"
      },
      {
        nome_completo: "Usuário Teste",
        email: "comum@test.com",
        senha: senhaCriptografada,
        role: "comum"
      }
    ],
    skipDuplicates: true
  });

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