---
title: "Datamesh com AWS"
sidebar_position: 1
---

## O que é um Data Mesh?

Data Mesh é uma abordagem de arquitetura de dados em que a responsabilidade sobre os dados deixa de ser centralizada em um time único de engenharia ou BI e passa a ser distribuída entre os domínios de negócio. A ideia é tratar os dados como produtos, com dono, contrato, qualidade e formas de consumo bem definidas.

Em vez de um único time central controlar tudo, cada domínio produz e cuida dos seus dados, enquanto uma plataforma compartilhada fornece governança, descoberta e acesso seguro.

## Exemplo prático com AWS

Um modelo simples de Data Mesh em AWS pode ser organizado assim:

- Uma conta central de plataforma, responsável por governança e catálogo.
- Contas produtoras, que armazenam os dados em Amazon S3.
- Contas consumidoras, que consultam os dados com Amazon Athena.

### Arquitetura proposta

1. A conta central possui:
   - AWS Lake Formation para definir permissões e governança.
   - AWS Glue Data Catalog para registrar os metadados das tabelas.

2. As contas produtoras possuem:
   - dados armazenados em S3;
   - responsabilidade de publicar esses dados de forma estruturada e com qualidade mínima;
   - possibilidade de registrar os datasets no Glue Catalog.

3. As contas consumidoras possuem:
   - Amazon Athena para executar consultas SQL diretamente sobre os dados.
   - acesso ao Glue Catalog para localizar os datasets e suas definições.

Nesse modelo, o consumidor não precisa copiar os dados para outra conta. Ele consulta os dados onde eles estão, com permissões controladas pela governança central.

## Como isso funciona na prática

A ideia é que o dado seja descoberto e consumido de forma padronizada:

- o produtor publica os dados em S3;
- o catálogo de metadados no Glue passa a conhecer esses dados;
- o consumidor usa Athena para consultar os dados sem precisar gerenciar infraestrutura complexa;
- o Lake Formation controla quem pode ler, escrever ou transformar cada conjunto de dados.

Essa abordagem ajuda a reduzir duplicação, melhora a governança e deixa o acesso mais seguro.

## SOR, SOT e SPEC

Esses conceitos costumam aparecer no contexto de Data Mesh porque ajudam a separar o dado bruto, o dado curado e o contrato de uso.

### SOR — Source of Record

É a fonte original de verdade, ou seja, o sistema onde o dado nasce.

Exemplo:
- um sistema operacional;
- um banco transacional;
- um log de aplicação;
- um arquivo gerado por um processo externo.

O SOR representa o lugar onde o dado é criado ou atualizado pela primeira vez. Ele costuma ser o ponto mais operacional e, muitas vezes, não é ideal para análise direta.

### SOT — System of Truth

É a representação organizada e confiável do dado, preparada para consumo.

Em outras palavras, o SOT é uma versão dos dados que já passou por limpeza, padronização, particionamento e modelagem mínima para facilitar análise.

Exemplo:
- um dataset consolidado em S3;
- uma tabela curada no Glue Catalog;
- uma visão preparada para consumo por BI ou analytics.

O SOT costuma ser mais estável e mais fácil de consultar do que o SOR.

### SPEC — Specification

É o contrato de uso do dado. A SPEC descreve como o dataset deve ser interpretado, quais campos existem, quais regras de negócio valem, qual o significado de cada atributo, quando o dado é atualizado e quais limites de qualidade devem ser respeitados.

A SPEC é importante porque deixa claro para o consumidor o que ele pode esperar do dado.

Em resumo:
- SOR = onde o dado nasce;
- SOT = onde o dado é transformado e disponibilizado para consumo;
- SPEC = o contrato que define como esse dado deve ser entendido e usado.

## Como o Glue entra nesse fluxo

O AWS Glue é uma ferramenta muito útil para transformar dados entre essas camadas.

### 1. Descoberta e catalogação

O Glue Crawler pode analisar arquivos em S3 e inferir o schema das tabelas. Isso ajuda a registrar os dados no Glue Catalog de forma automática.

### 2. Transformação dos dados

Com Glue ETL, é possível transformar os dados brutos em versões mais organizadas:

- limpar valores inválidos;
- padronizar colunas;
- aplicar joins;
- particionar por data;
- converter formatos;
- criar tabelas prontas para análise.

### 3. Publicação para consumo

Depois da transformação, o resultado pode ser salvo novamente em S3 e registrado no Glue Catalog. A partir daí, as contas consumidoras podem usar Athena para consultar esses datasets.

## Exemplo de fluxo

Um fluxo típico seria:

1. O produtor armazena dados brutos em S3.
2. O Glue Crawler lê esses arquivos e cria ou atualiza o schema no Glue Catalog.
3. Um job de Glue ETL transforma esses dados em uma versão curada, por exemplo:
   - removendo valores nulos;
   - aplicando tipos corretos;
   - particionando por data;
   - organizando o dataset para análise.
4. O resultado é salvo em S3 como SOT.
5. Uma SPEC é definida para esse dataset, descrevendo regras de negócio, schema esperado e políticas de acesso.
6. O consumidor usa Athena para consultar os dados através do Glue Catalog.

## Resumo

Um Data Mesh com AWS funciona bem quando há:

- domínio responsável pelo dado;
- catálogo compartilhado de metadados;
- governança centralizada com Lake Formation;
- acesso seguro e escalável via Athena;
- transformação dos dados com Glue para passar de uma versão bruta para uma versão curada e consumível.

Essa abordagem deixa a arquitetura mais distribuída, mas ainda com controle centralizado sobre segurança e padronização.
