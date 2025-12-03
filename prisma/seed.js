const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {

  await prisma.enderecos.createMany({
   

    data: [
      { id_endereco: 1, logradouro: "R. Barbosa Lima", numero: "S/N", bairro: "Centro", cidade: "Igarassu", estado: "PE", cep: "53615-000", latitude: -7.83394, longitude: -34.90615 },
      { id_endereco: 2, logradouro: "R. Barbosa Lima", numero: "S/N", bairro: "Centro", cidade: "Igarassu", estado: "PE", cep: "53615-000", latitude: -7.8343, longitude: -34.90645 },
      { id_endereco: 3, logradouro: "R. Dr. João Elísio", numero: "S/N", bairro: "Centro", cidade: "Igarassu", estado: "PE", cep: "53615-000", latitude: -7.83255, longitude: -34.90507 },
      { id_endereco: 4, logradouro: "R. Barbosa Lima", numero: "148", bairro: "Centro", cidade: "Igarassu", estado: "PE", cep: "53615-000", latitude: -7.83469, longitude: -34.90673 },
      { id_endereco: 5, logradouro: "R. Barbosa Lima", numero: "34", bairro: "Centro", cidade: "Igarassu", estado: "PE", cep: "53615-000", latitude: -7.83523, longitude: -34.90632 },
      { id_endereco: 6, logradouro: "R. Barbosa Lima", numero: "18", bairro: "Centro", cidade: "Igarassu", estado: "PE", cep: "53615-000", latitude: -7.8341, longitude: -34.90632 },
      { id_endereco: 7, logradouro: "R. Barbosa Lima", numero: "S/N", bairro: "Centro", cidade: "Igarassu", estado: "PE", cep: "53615-000", latitude: -7.8349, longitude: -34.90682 },
    ],
     skipDuplicates: true
  })

  await prisma.figurinhas.createMany({
    data: [
      { id_figurinha: 1, nome: "Igreja Matriz dos Santos Cosme e Damião", descricao: "Igreja", valor_figurinha: 100 },
      { id_figurinha: 2, nome: "Convento do Sagrado Coração de Jesus", descricao: "Igreja", valor_figurinha: 100 },
      { id_figurinha: 3, nome: "Convento Franciscano e Museu Pinacoteca de Igarassu", descricao: "Igreja", valor_figurinha: 100 },
      { id_figurinha: 4, nome: "Sobrado do Imperador", descricao: "Museu", valor_figurinha: 100 },
      { id_figurinha: 5, nome: "Biblioteca Municipal de Igarassu", descricao: "Outros", valor_figurinha: 100 },
      { id_figurinha: 6, nome: "Museu Histórico de Igarassu", descricao: "Museu", valor_figurinha: 100 },
      { id_figurinha: 7, nome: "Casa do Artesão e Centro de informações turísticas", descricao: "Outros", valor_figurinha: 100 }
    ],
    skipDuplicates: true
  })

  await prisma.pontos_turisticos.createMany({
    data: [
      {
        id_ponto: 1,
        nome: "Igreja Matriz dos Santos Cosme e Damião",
        descricao: "Considerada a igreja mais antiga em funcionamento do Brasil, construída em 1535. Um marco da fé e da história pernambucana, com arquitetura colonial e forte valor religioso.",
        horario_funcionamento: "segunda-quarta: 09h às 15h, quinta: 09h às 20h, sábado: 09h às 13h, domingo: 06h às 13h",
        preco_entrada: 0.0,
        tipo: "Hist_rico",
        id_figurinha: 1,
        id_endereco: 1
      },
      {
        id_ponto: 2,
        nome: "Convento do Sagrado Coração de Jesus",
        descricao: "Fundado no século XVIII como recolhimento feminino, o convento impressiona pela arquitetura barroca e pela história religiosa ligada à devoção e à educação de mulheres em Igarassu.",
        horario_funcionamento: "segunda-sexta: 09h às 15h, sábado-domingo: 09h às 13h",
        preco_entrada: 0.0,
        tipo: "Hist_rico",
        id_figurinha: 1,
        id_endereco: 2
      },
      {
        id_ponto: 3,
        nome: "Convento Franciscano e Museu Pinacoteca de Igarassu",
        descricao: "Datado do século XVI, reúne obras sacras e pinturas de valor histórico. Seu museu preserva parte importante da arte e religiosidade do período colonial.",
        horario_funcionamento: "segunda-sexta: 09h às 17h, sábado: 09h às 12h, domingo: fechado",
        preco_entrada: 5.0,
        tipo: "Hist_rico",
        id_figurinha: 1,
        id_endereco: 3
      },
      {
        id_ponto: 4,
        nome: "Sobrado do Imperador",
        descricao: "Construído entre os séculos XVII e XVIII, este imponente casarão do Centro Histórico de Igarassu abrigou funções como Casa de Câmara e Cadeia. Em 1859 recebeu Dom Pedro II, o que lhe conferiu o nome “Sobrado do Imperador”.",
        horario_funcionamento: "segunda-sexta: 08h às 16h55, sábado-domingo: fechado",
        preco_entrada: 0.0,
        tipo: "Hist_rico",
        id_figurinha: 1,
        id_endereco: 4
      },
      {
        id_ponto: 5,
        nome: "Biblioteca publica de Igarassu",
        descricao: "Instalada em um prédio histórico, representa a continuidade do poder público desde os tempos coloniais, preservando documentos e tradições políticas da cidade.",
        horario_funcionamento: "segunda-sexta: 07h às 17h, sábado-domingo: fechado",
        preco_entrada: 0.0,
        tipo: "Hist_rico",
        id_figurinha: 1,
        id_endereco: 5
      },
      {
        id_ponto: 6,
        nome: "Museu Histórico de Igarassu",
        descricao: "A Biblioteca Pública de Igarassu teve origem em iniciativas do século XIX, com o antigo Gabinete de Leitura. A primeira biblioteca oficial foi criada em 1942, mas sem registros de funcionamento. A biblioteca atual foi fundada em 1969, renomeada em 1970 e passou por vários endereços ao longo dos anos. Após um período desativada, foi reaberta em 2 de dezembro de 2005 na Rua Frei Caneca, com acervo renovado e foco em leitura, pesquisa e cultura",
        horario_funcionamento: "segunda-sexta: 08h às 17h, Sábado-Domingo: fechado",
        preco_entrada: 0.0,
        tipo: "Hist_rico",
        id_figurinha: 1,
        id_endereco: 6
      },
      {
        id_ponto: 7,
        nome: "Casa do Artesão e Centro de informações turísticas",
        descricao: "Espaço dedicado à arte local, onde visitantes encontram artesanato regional e informações sobre os atrativos culturais e turísticos da cidade.",
        horario_funcionamento: "segunda-sexta: 09h às 15h, sábado-domingo: 09h às 12h",
        preco_entrada: 0.0,
        tipo: "Hist_rico",
        id_figurinha: 1,
        id_endereco: 7
      }
    ],
    skipDuplicates: true
  })

  console.log("Seed finalizado com sucesso!")
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
