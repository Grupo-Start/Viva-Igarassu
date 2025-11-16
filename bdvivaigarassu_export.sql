-- MySQL dump 10.13  Distrib 8.0.43, for Win64 (x86_64)
--
-- Host: localhost    Database: bdvivaigarassu
-- ------------------------------------------------------
-- Server version	8.0.43

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `empresa`
--

DROP TABLE IF EXISTS `empresa`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `empresa` (
  `id_empresa` int NOT NULL AUTO_INCREMENT,
  `nome_empresa` varchar(100) DEFAULT NULL,
  `cnpj` varchar(18) DEFAULT NULL,
  `tipo_servico` enum('hospedagem','alimentação','artesanato','guiaturistico','transporte','outros') DEFAULT NULL,
  `data_cadastro` date DEFAULT NULL,
  `id_usuario` int NOT NULL,
  PRIMARY KEY (`id_empresa`,`id_usuario`),
  KEY `fk_empresa_usuarios1_idx` (`id_usuario`),
  CONSTRAINT `fk_empresa_usuarios1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `empresa`
--

LOCK TABLES `empresa` WRITE;
/*!40000 ALTER TABLE `empresa` DISABLE KEYS */;
/*!40000 ALTER TABLE `empresa` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `enderecos`
--

DROP TABLE IF EXISTS `enderecos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `enderecos` (
  `id_endereco` int NOT NULL AUTO_INCREMENT,
  `logradouro` varchar(150) NOT NULL,
  `numero` varchar(10) NOT NULL,
  `bairro` varchar(100) NOT NULL,
  `cidade` varchar(100) NOT NULL,
  `estado` char(2) NOT NULL,
  `cep` char(9) NOT NULL,
  `latitude` decimal(10,8) DEFAULT NULL,
  `longitude` decimal(10,8) DEFAULT NULL,
  PRIMARY KEY (`id_endereco`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `enderecos`
--

LOCK TABLES `enderecos` WRITE;
/*!40000 ALTER TABLE `enderecos` DISABLE KEYS */;
INSERT INTO `enderecos` VALUES (1,'R. Barbosa Lima','S/N','Centro','Igarassu','PE','53615-000',-7.83394000,-34.90615000),(2,'R. Barbosa Lima','S/N','Centro','Igarassu','PE','53615-000',-7.83430000,-34.90645000),(3,'R. Dr. João Elísio','S/N','Centro','Igarassu','PE','53615-000',-7.83255000,-34.90507000),(4,'R. Barbosa Lima','148','Centro','Igarassu','PE','53615-000',-7.83469000,-34.90673000),(5,'R. Barbosa Lima','34','Centro','Igarassu','PE','53615-000',-7.83523000,-34.90632000),(6,'R. Barbosa Lima','18','Centro','Igarassu','PE','53615-000',-7.83410000,-34.90632000),(7,'R. Barbosa Lima','S/N','Centro','Igarassu','PE','53615-000',-7.83490000,-34.90682000);
/*!40000 ALTER TABLE `enderecos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `eventos`
--

DROP TABLE IF EXISTS `eventos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `eventos` (
  `id_evento` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) DEFAULT NULL,
  `descricao` text,
  `data` date DEFAULT NULL,
  `horario` time DEFAULT NULL,
  `id_endereco` int NOT NULL,
  `id_empresa` int NOT NULL,
  PRIMARY KEY (`id_evento`,`id_endereco`,`id_empresa`),
  KEY `fk_eventos_enderecos1_idx` (`id_endereco`),
  KEY `fk_eventos_empresa1_idx` (`id_empresa`),
  CONSTRAINT `fk_eventos_empresa1` FOREIGN KEY (`id_empresa`) REFERENCES `empresa` (`id_empresa`),
  CONSTRAINT `fk_eventos_enderecos1` FOREIGN KEY (`id_endereco`) REFERENCES `enderecos` (`id_endereco`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `eventos`
--

LOCK TABLES `eventos` WRITE;
/*!40000 ALTER TABLE `eventos` DISABLE KEYS */;
/*!40000 ALTER TABLE `eventos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `figurinhas`
--

DROP TABLE IF EXISTS `figurinhas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `figurinhas` (
  `id_figurinhas` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) NOT NULL,
  `descricao` text NOT NULL,
  `data_cadastro` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `valor_figurinhas` int NOT NULL,
  PRIMARY KEY (`id_figurinhas`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `figurinhas`
--

LOCK TABLES `figurinhas` WRITE;
/*!40000 ALTER TABLE `figurinhas` DISABLE KEYS */;
INSERT INTO `figurinhas` VALUES (1,'Igreja Matriz dos Santos Cosme e Damião','Igreja',NULL,100),(2,'Convento do Sagrado Coração de Jesus','Igreja',NULL,100),(3,'Convento Franciscano e Museu Pinacoteca de Igarassu','Igreja',NULL,100),(4,'Sobrado do Imperador','Museu',NULL,100),(5,'Câmara Municipal de Igarassu','Outros',NULL,100),(6,'Museu Histórico de Igarassu','Museu',NULL,100),(7,'Casa do Artesão e Centro de informações turísticas','Outros',NULL,100);
/*!40000 ALTER TABLE `figurinhas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pontos_turisticos`
--

DROP TABLE IF EXISTS `pontos_turisticos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pontos_turisticos` (
  `id_ponto` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(150) NOT NULL,
  `descricao` text NOT NULL,
  `horario_funcionamento` varchar(150) DEFAULT NULL,
  `preco_entrada` decimal(10,2) DEFAULT NULL,
  `tipo` enum('Histórico','Natural','cultural','outro') DEFAULT 'Histórico',
  `id_figurinhas` int NOT NULL DEFAULT '1',
  `id_endereco` int NOT NULL DEFAULT '1',
  PRIMARY KEY (`id_ponto`,`id_figurinhas`,`id_endereco`),
  KEY `fk_pontos_turisticos_figurinhas1_idx` (`id_figurinhas`),
  KEY `fk_pontos_turisticos_enderecos1_idx` (`id_endereco`),
  CONSTRAINT `fk_pontos_turisticos_enderecos1` FOREIGN KEY (`id_endereco`) REFERENCES `enderecos` (`id_endereco`),
  CONSTRAINT `fk_pontos_turisticos_figurinhas1` FOREIGN KEY (`id_figurinhas`) REFERENCES `figurinhas` (`id_figurinhas`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pontos_turisticos`
--

LOCK TABLES `pontos_turisticos` WRITE;
/*!40000 ALTER TABLE `pontos_turisticos` DISABLE KEYS */;
INSERT INTO `pontos_turisticos` VALUES (1,'Igreja Matriz dos Santos Cosme e Damião','Considerada a igreja mais antiga em funcionamento do Brasil, construída em 1535. Um marco da fé e da história pernambucana, com arquitetura colonial e forte valor religioso.','segunda-quarta: 09h às 15h, quinta: 09h às 20h, sábado: 09h às 13h, domingo: 06h às 13h',0.00,'Histórico',1,1),(2,'Convento do Sagrado Coração de Jesus','Fundado no século XVIII como recolhimento feminino, o convento impressiona pela arquitetura barroca e pela história religiosa ligada à devoção e à educação de mulheres em Igarassu.','segunda-sexta: 09h às 15h, sábado-domingo: 09h às 13h',0.00,'Histórico',1,2),(3,'Convento Franciscano e Museu Pinacoteca de Igarassu','Datado do século XVI, reúne obras sacras e pinturas de valor histórico. Seu museu preserva parte importante da arte e religiosidade do período colonial.','segunda-sexta: 09h às 17h, sábado: 09h às 12h, domingo: fechado',5.00,'Histórico',1,3),(4,'Sobrado do Imperador','Construído entre os séculos XVII e XVIII, este imponente casarão do Centro Histórico de Igarassu abrigou funções como Casa de Câmara e Cadeia. Em 1859 recebeu Dom Pedro II, o que lhe conferiu o nome “Sobrado do Imperador”.','segunda-sexta: 08h às 16h55, sábado-domingo: fechado',0.00,'Histórico',1,4),(5,'Biblioteca publica de Igarassu','Instalada em um prédio histórico, representa a continuidade do poder público desde os tempos coloniais, preservando documentos e tradições políticas da cidade.','segunda-sexta: 07h às 17h, sábado-domingo: fechado',0.00,'Histórico',1,5),(6,'Museu Histórico de Igarassu','A Biblioteca Pública de Igarassu teve origem em iniciativas do século XIX, com o antigo Gabinete de Leitura. A primeira biblioteca oficial foi criada em 1942, mas sem registros de funcionamento. A biblioteca atual foi fundada em 1969, renomeada em 1970 e passou por vários endereços ao longo dos anos. Após um período desativada, foi reaberta em 2 de dezembro de 2005 na Rua Frei Caneca, com acervo renovado e foco em leitura, pesquisa e cultura','segunda-sexta: 08h às 17h, Sábado-Domingo: fechado',0.00,'Histórico',1,6),(7,'Casa do Artesão e Centro de informações turísticas','Espaço dedicado à arte local, onde visitantes encontram artesanato regional e informações sobre os atrativos culturais e turísticos da cidade.','segunda-sexta: 09h às 15h, sábado-domingo: 09h às 12h',0.00,'Histórico',1,7);
/*!40000 ALTER TABLE `pontos_turisticos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `recompensas`
--

DROP TABLE IF EXISTS `recompensas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `recompensas` (
  `id_recompensas` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) DEFAULT NULL,
  `descricao` text,
  `quantidade_disponivel` int DEFAULT NULL,
  `preco_moedas` int DEFAULT NULL,
  `id_empresa` int NOT NULL,
  PRIMARY KEY (`id_recompensas`,`id_empresa`),
  KEY `fk_recompensas_empresa1_idx` (`id_empresa`),
  CONSTRAINT `fk_recompensas_empresa1` FOREIGN KEY (`id_empresa`) REFERENCES `empresa` (`id_empresa`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `recompensas`
--

LOCK TABLES `recompensas` WRITE;
/*!40000 ALTER TABLE `recompensas` DISABLE KEYS */;
/*!40000 ALTER TABLE `recompensas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `resgates`
--

DROP TABLE IF EXISTS `resgates`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `resgates` (
  `id_resgates` int NOT NULL AUTO_INCREMENT,
  `data_resgate` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `valor_resgatado` int DEFAULT NULL,
  `id_recompensas` int NOT NULL,
  `id_usuario` int NOT NULL,
  PRIMARY KEY (`id_resgates`,`id_recompensas`,`id_usuario`),
  KEY `fk_resgates_recompensas1_idx` (`id_recompensas`),
  KEY `fk_resgates_usuarios1_idx` (`id_usuario`),
  CONSTRAINT `fk_resgates_recompensas1` FOREIGN KEY (`id_recompensas`) REFERENCES `recompensas` (`id_recompensas`),
  CONSTRAINT `fk_resgates_usuarios1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `resgates`
--

LOCK TABLES `resgates` WRITE;
/*!40000 ALTER TABLE `resgates` DISABLE KEYS */;
/*!40000 ALTER TABLE `resgates` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario_figurinhas`
--

DROP TABLE IF EXISTS `usuario_figurinhas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuario_figurinhas` (
  `id_usuario_figurinha` int NOT NULL AUTO_INCREMENT,
  `conquistada_em` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `id_figurinhas` int NOT NULL,
  `id_usuario` int NOT NULL,
  PRIMARY KEY (`id_usuario_figurinha`,`id_figurinhas`,`id_usuario`),
  KEY `fk_usuario_figurinhas_figurinhas1_idx` (`id_figurinhas`),
  KEY `fk_usuario_figurinhas_usuarios1_idx` (`id_usuario`),
  CONSTRAINT `fk_usuario_figurinhas_figurinhas1` FOREIGN KEY (`id_figurinhas`) REFERENCES `figurinhas` (`id_figurinhas`),
  CONSTRAINT `fk_usuario_figurinhas_usuarios1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario_figurinhas`
--

LOCK TABLES `usuario_figurinhas` WRITE;
/*!40000 ALTER TABLE `usuario_figurinhas` DISABLE KEYS */;
/*!40000 ALTER TABLE `usuario_figurinhas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `id_usuario` int NOT NULL AUTO_INCREMENT,
  `nome completo` varchar(150) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `senha` varchar(100) DEFAULT NULL,
  `preferencia` enum('eventos culturais','trilhas históricas','gastronomia','artesanato','educativo') DEFAULT NULL,
  `data_cadastro` datetime DEFAULT CURRENT_TIMESTAMP,
  `saldo_moedas` int DEFAULT NULL,
  `role` enum('comum','adm','empreendedor') DEFAULT NULL,
  PRIMARY KEY (`id_usuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-11-15 21:19:06
