-- CreateTable
CREATE TABLE `empresa` (
    `id_empresa` VARCHAR(191) NOT NULL,
    `nome_empresa` VARCHAR(100) NOT NULL,
    `cnpj` VARCHAR(18) NOT NULL,
    `tipo_servico` ENUM('hospedagem', 'alimentação', 'artesanato', 'guiaturistico', 'transporte', 'outros') NOT NULL,
    `data_cadastro` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `id_usuario` VARCHAR(191) NOT NULL,

    INDEX `fk_empresa_usuarios1_idx`(`id_usuario`),
    PRIMARY KEY (`id_empresa`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `enderecos` (
    `id_endereco` VARCHAR(191) NOT NULL,
    `logradouro` VARCHAR(150) NOT NULL,
    `numero` VARCHAR(10) NOT NULL,
    `bairro` VARCHAR(100) NOT NULL,
    `cidade` VARCHAR(100) NOT NULL,
    `estado` CHAR(2) NOT NULL,
    `cep` CHAR(9) NOT NULL,
    `latitude` DECIMAL(10, 8) NULL,
    `longitude` DECIMAL(10, 8) NULL,

    PRIMARY KEY (`id_endereco`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `figurinhas` (
    `id_figurinha` VARCHAR(191) NOT NULL,
    `nome` VARCHAR(100) NOT NULL,
    `descricao` TEXT NOT NULL,
    `data_cadastro` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `valor_figurinha` INTEGER NOT NULL,

    PRIMARY KEY (`id_figurinha`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pontos_turisticos` (
    `id_ponto` VARCHAR(191) NOT NULL,
    `nome` VARCHAR(150) NOT NULL,
    `descricao` TEXT NOT NULL,
    `horario_funcionamento` VARCHAR(150) NULL,
    `preco_entrada` DECIMAL(10, 2) NULL,
    `tipo` ENUM('Histórico', 'Natural', 'cultural', 'outro') NOT NULL DEFAULT 'Histórico',
    `id_figurinha` VARCHAR(191) NOT NULL,
    `id_endereco` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `pontos_turisticos_id_figurinha_key`(`id_figurinha`),
    UNIQUE INDEX `pontos_turisticos_id_endereco_key`(`id_endereco`),
    INDEX `fk_pontos_turisticos_enderecos1_idx`(`id_endereco`),
    INDEX `fk_pontos_turisticos_figurinha_idx`(`id_figurinha`),
    PRIMARY KEY (`id_ponto`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `resgates` (
    `id_resgates` VARCHAR(191) NOT NULL,
    `data_resgate` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `valor_resgatado` INTEGER NOT NULL,
    `id_recompensas` VARCHAR(191) NOT NULL,
    `id_usuario` VARCHAR(191) NOT NULL,

    INDEX `fk_resgates_recompensas1_idx`(`id_recompensas`),
    INDEX `fk_resgates_usuarios1_idx`(`id_usuario`),
    PRIMARY KEY (`id_resgates`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `usuario_figurinhas` (
    `id_usuario_figurinha` VARCHAR(191) NOT NULL,
    `conquistada_em` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `id_figurinha` VARCHAR(191) NOT NULL,
    `id_usuario` VARCHAR(191) NOT NULL,

    INDEX `fk_usuario_figurinha_figurinha_idx`(`id_figurinha`),
    INDEX `fk_usuario_figurinha_usuario_idx`(`id_usuario`),
    UNIQUE INDEX `usuario_figurinha_unique`(`id_usuario`, `id_figurinha`),
    PRIMARY KEY (`id_usuario_figurinha`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `usuarios` (
    `id_usuario` VARCHAR(191) NOT NULL,
    `nome_completo` VARCHAR(150) NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `senha` VARCHAR(100) NOT NULL,
    `preferencia` ENUM('eventos culturais', 'trilhas históricas', 'gastronomia', 'artesanato', 'educativo') NULL,
    `data_cadastro` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `saldo_moedas` INTEGER NULL DEFAULT 0,
    `role` ENUM('comum', 'adm', 'empreendedor') NOT NULL,

    UNIQUE INDEX `usuarios_email_key`(`email`),
    PRIMARY KEY (`id_usuario`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `eventos` (
    `id_evento` VARCHAR(191) NOT NULL,
    `nome` VARCHAR(100) NOT NULL,
    `descricao` TEXT NULL,
    `data` DATE NOT NULL,
    `horario` TIME(0) NULL,
    `id_endereco` VARCHAR(191) NOT NULL,
    `id_empresa` VARCHAR(191) NOT NULL,

    INDEX `fk_eventos_empresa1_idx`(`id_empresa`),
    INDEX `fk_eventos_enderecos1_idx`(`id_endereco`),
    PRIMARY KEY (`id_evento`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `recompensas` (
    `id_recompensas` VARCHAR(191) NOT NULL,
    `nome` VARCHAR(100) NULL,
    `descricao` TEXT NULL,
    `quantidade_disponivel` INTEGER NULL,
    `preco_moedas` INTEGER NULL,
    `imagem_path` VARCHAR(191) NULL,
    `id_empresa` VARCHAR(191) NOT NULL,

    INDEX `fk_recompensas_empresa1_idx`(`id_empresa`),
    PRIMARY KEY (`id_recompensas`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `qr_codes_pontos` (
    `id_qr_code` VARCHAR(191) NOT NULL,
    `token` VARCHAR(191) NOT NULL,
    `id_ponto` VARCHAR(191) NOT NULL,
    `imagem_path` VARCHAR(191) NULL,
    `pdf_path` VARCHAR(191) NULL,
    `criado_em` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `qr_codes_pontos_token_key`(`token`),
    PRIMARY KEY (`id_qr_code`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `empresa` ADD CONSTRAINT `fk_empresa_usuarios1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios`(`id_usuario`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `pontos_turisticos` ADD CONSTRAINT `fk_pontos_turisticos_enderecos1` FOREIGN KEY (`id_endereco`) REFERENCES `enderecos`(`id_endereco`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `pontos_turisticos` ADD CONSTRAINT `fk_pontos_turisticos_figurinhas1` FOREIGN KEY (`id_figurinha`) REFERENCES `figurinhas`(`id_figurinha`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `resgates` ADD CONSTRAINT `fk_resgates_recompensas1` FOREIGN KEY (`id_recompensas`) REFERENCES `recompensas`(`id_recompensas`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `resgates` ADD CONSTRAINT `fk_resgates_usuarios1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios`(`id_usuario`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `usuario_figurinhas` ADD CONSTRAINT `fk_usuario_figurinhas_figurinhas1` FOREIGN KEY (`id_figurinha`) REFERENCES `figurinhas`(`id_figurinha`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `usuario_figurinhas` ADD CONSTRAINT `fk_usuario_figurinhas_usuarios1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios`(`id_usuario`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `eventos` ADD CONSTRAINT `fk_eventos_empresa1` FOREIGN KEY (`id_empresa`) REFERENCES `empresa`(`id_empresa`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `eventos` ADD CONSTRAINT `fk_eventos_enderecos1` FOREIGN KEY (`id_endereco`) REFERENCES `enderecos`(`id_endereco`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `recompensas` ADD CONSTRAINT `fk_recompensas_empresa1` FOREIGN KEY (`id_empresa`) REFERENCES `empresa`(`id_empresa`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `qr_codes_pontos` ADD CONSTRAINT `qr_codes_pontos_id_ponto_fkey` FOREIGN KEY (`id_ponto`) REFERENCES `pontos_turisticos`(`id_ponto`) ON DELETE RESTRICT ON UPDATE CASCADE;
