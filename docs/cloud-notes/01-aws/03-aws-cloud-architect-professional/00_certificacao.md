---
title: "Certificação"
sidebar_position: 0
---

---

## Prova de certificação

- Domínios

| Domínio                                                              | percentual |
| -------------------------------------------------------------------- | ---------- |
| Domínio 1: Soluções de design de complexidade organizacional         | 26%        |
| Domínio 2: Design de novas soluções                                  | 29%        |
| Domínio 3: Melhoria contínua de soluções existentes                  | 25%        |
| Domínio 4: Acelerar a migração e a modernização da carga de trabalho | 20%        |

- Tecnologias aws que podem vão cair na prova
  - Computação
  - Gerenciamento de custos
  - Banco de dados
  - Recuperação de desastres
  - Alta disponibilidade
  - Gerenciamento e governança
  - Microsserviços e desacoplamento de componentes
  - Migração e transferência de dados
  - Redes, conectividade e entrega de conteúdo
  - Segurança
  - Princípios de design sem servidor
  - Armazenamento

- Serviços abordados

<details>
  <summary> title="veja a lista completa" </summary>
- Análise:
  - Amazon Athena
  - AWS Data Exchange
  - AWS Data Pipeline
  - Amazon EMR
  - AWS Glue
  - Amazon Kinesis Data Analytics
  - Amazon Kinesis Data Firehose
  - Amazon Kinesis Data Streams
  - AWS Lake Formation
  - Amazon Managed Streaming for Apache Kafka (Amazon MSK)
  - Amazon OpenSearch Service
  - Amazon QuickSight
- Integração de aplicativos:
  - Amazon AppFlow
  - AWS AppSync
  - Amazon EventBridge (Amazon CloudWatch Events)
  - Amazon MQ
  - Amazon Simple Notification Service (Amazon SNS)
  - Amazon Simple Queue Service (Amazon SQS)
  - AWS Step Functions
- Aplicativos empresariais:
  - Alexa for Business
  - Amazon Simple Email Service (Amazon SES)
- Blockchain:
  - Amazon Managed Blockchain
- Cloud Financial Management:
  - AWS Budgets
  - AWS Cost and Usage Report
  - AWS Cost Explorer
  - Savings Plans
- Computação:
  - AWS App Runner
  - AWS Auto Scaling
  - AWS Batch
  - Amazon EC2
  - Amazon EC2 Auto Scaling
  - AWS Elastic Beanstalk
  - Amazon Elastic Kubernetes Service (Amazon EKS)
  - Elastic Load Balancing
  - AWS Fargate
  - AWS Lambda
  - Amazon Lightsail
  - AWS Outposts
  - AWS Wavelength
- Contêineres:
  - Amazon Elastic Container Registry (Amazon ECR)
  - Amazon Elastic Container Service (Amazon ECS)
  - Amazon ECS Anywhere
  - Amazon Elastic Kubernetes Service (Amazon EKS)
  - Amazon EKS Anywhere
  - Amazon EKS Distro
- Banco de dados:
  - Amazon Aurora
  - Amazon Aurora sem servidor
  - Amazon DocumentDB (compatível com o MongoDB)
  - Amazon DynamoDB
  - Amazon ElastiCache
  - Amazon Keyspaces (for Apache Cassandra)
  - Amazon Neptune
  - Amazon RDS
  - Amazon Redshift
  - Amazon Timestream
- Ferramentas do desenvolvedor:
  - AWS Cloud9
  - AWS CodeArtifact
  - AWS CodeBuild
  - AWS CodeCommit
  - AWS CodeDeploy
  - Amazon CodeGuru
  - AWS CodePipeline
  - AWS CodeStar
  - AWS X-Ray
- Computação de usuário final:
  - Amazon AppStream 2.0
  - Amazon WorkSpaces
- Web e dispositivos móveis de front-end:
  - AWS Amplify
  - Amazon API Gateway
  - AWS Device Farm
  - Amazon Pinpoint
- Internet das Coisas:
  - AWS IoT Analytics
  - AWS IoT Core
  - AWS IoT Device Defender
  - AWS IoT Device Management
  - AWS IoT Events
  - AWS IoT Greengrass
  - AWS IoT SiteWise
  - AWS IoT Things Graph
  - AWS IoT 1-Click
- Machine learning:
  - Amazon Comprehend
  - Amazon Forecast
  - Amazon Fraud Detector
  - Amazon Kendra
  - Amazon Lex
  - Amazon Personalize
  - Amazon Polly
  - Amazon Rekognition
  - Amazon SageMaker
  - Amazon Textract
  - Amazon Transcribe
  - Amazon Translate
- Gerenciamento e governança:
  - AWS CloudFormation
  - AWS CloudTrail
  - Amazon CloudWatch
  - Amazon CloudWatch Logs
  - AWS Command Line Interface (AWS CLI)
  - AWS Compute Optimizer
  - AWS Config
  - AWS Control Tower
  - AWS License Manager
  - Amazon Managed Grafana
  - Amazon Managed Service for Prometheus
  - Console de Gerenciamento da AWS
  - AWS Organizations
  - AWS Personal Health Dashboard
  - AWS Proton
  - AWS Service Catalog
  - Service Quotas
  - AWS Systems Manager
  - AWS Trusted Advisor
  - AWS Well-Architected Tool
- Serviços de mídia:
  - Amazon Elastic Transcoder
  - Amazon Kinesis Video Streams
- Migração e transferência:
  - AWS Application Discovery Service
  - AWS Application Migration Service (CloudEndure Migration)
  - AWS Database Migration Service (AWS DMS)
  - AWS DataSync
  - AWS Migration Hub
  - AWS Schema Conversion Tool (AWS SCT)
  - AWS Snow Family
  - AWS Transfer Family
- Redes e entrega de conteúdo:
  - Amazon CloudFront
  - AWS Direct Connect
  - Elastic Load Balancing (ELB)
  - AWS Global Accelerator
  - AWS PrivateLink
  - Amazon Route 53
  - Transit gateway da AWS
  - Amazon VPC
  - AWS VPN
- Segurança, identidade e compatibilidade:
  - AWS Artifact
  - AWS Audit Manager
  - AWS Certificate Manager (ACM)
  - AWS CloudHSM
  - Amazon Cognito
  - Amazon Detective
  - AWS Directory Service
  - AWS Firewall Manager
  - Amazon GuardDuty
  - AWS Identity and Access Management (IAM)
  - Amazon Inspector
  - AWS Key Management Service (AWS KMS)
  - Amazon Macie
  - AWS Network Firewall
  - AWS Resource Access Manager (AWS RAM)
  - AWS Secrets Manager
  - AWS Security Hub
  - AWS Security Token Service (AWS STS)
  - AWS Shield
  - AWS Single Sign-On
  - AWS WAF
- Armazenamento:
  - AWS Backup
  - Amazon Elastic Block Store (Amazon EBS)
  - AWS Elastic Disaster Recovery (CloudEndure Disaster Recovery)
  - Amazon Elastic File System (Amazon EFS)
  - Amazon FSx (para todos os tipos)
  - Amazon S3
  - Amazon S3 Glacier
  - AWS Storage Gateway

</details>

---

## Data Engineering

### AWS Kinesis

![Amazon Kinesis ](assets/product-page-diagram_Amazon-Kinesis_Evolve-from-batch-to-real-time-Analytics.d7ed76be304a30be5720fd159469f157e7c09ede.png)

- Facilita coletar e processar e analisar fluxos (**steams**) de dados em tempo real.
- Opção ao **kafka** da AWS. Ou seja serviço de stream de dados em tempo real.
- Bom para Logs, metricas e IOT. Bom para projetos de tempo real com bigdata (uso com SPARK, NiFi).
- **Dados são sincronizados em 3 AZ.**
- Tem um produtor > enviar um **record** > **kinesis data stream** > repassa o **record** > ao consumidores.
- A ordenação dos dados pode ser feita passando a mesma chave de partição, pois assim os dados serão enviado para o mesmo **shard**.
  ![chave-partição](assets/image-20210903061639616.png)
- Tipo de aplicação
  - **Kinesis Data streams** - Captura, processa e armazena fluxos de dados.
  - **Kinesis Data Firehose** - Carrega dados para armazenamentos no AWS.
  - **Kiness Data Analytics** - Analisa fluxos de dados com SQL e Apache Flink.
  - **Kinesis vídeo streams** - Capture, processa e guardar fluxo de dados de vídeos.

#### Kinesis Data streams

- Captura, processa e armazena fluxos de dados.
- Usado para ingestão de grande quantidade de dados com baixa latência.
  ![data-streams](assets/image-20210903054120413.png)
- É cobrado por **shard** provisionados.
- Cada fragmento (**shard** semelhante as partições do kafka) permite entrada de 1 MB/s e saída de dados de 2 MB/s.
- Tem um período de retenção de 1 (padrão) a **365** dia.
- Multipos consumers pode ler do mesmo **Shard**.
- Os dados não podem ser deletados (são imutáveis).
- **Consumers**
  - Kinesis client library (KCL, usado para leitura em paralelo, checkpoint e leitura coordenada)
  - AWS SDK. Lambda
- **Producer**
  - Lambda, Kinesis data firehose, kinesis data analytics.
  - **AWS SDK , Kinesis Producer Libary (KPL - permite usar batch, compressão, retry)**
  - Kinesis Agent - Usado para monitorar logs, e enviá-los ao Kinesis Data Streams ou Kinesis Firehose.
- Pode ser usado como **Streaming ETL** que permitem que você limpe, aprimore, organize e transforme dados brutos antes de carregar seu data lake ou data warehouse em tempo real.
- Modos de operação
  - **Sobe demanda** - Não é necessário planejar. o Kinesis escala de acordo com a demanda.
    - Se pagar shard provisionado por hora.
  - **Provisionado** - Se define a quantidade de shards e gerencia para atender a demanda.
    - Nesse se paga por hora de stream e por I/O por GB.
- O **Shards** podem ser consumidos em modo **batch** ou **mensagem por mensagem**.
- Limites
  - ![image-20230221064945510](assets/image-20230221064945510.png)

---

#### Kinesis Data Firehose

- Carrega dados para armazenamentos no AWS (Como S3, ReadShift, OpenSearch e Splunk).
  ![image-20230812130828759](assets/image-20230812130828759.png)
- Serviço totalmente gerenciado pela AWS (Auto Scale, Serveless).
- Pague apenas pelos dados processados.
- Serviço próximo do **tempo real.**
  - Próximo devido a uma escolha de uso de buffer para melhorar o processo de armazenamento.
  - Pois os dados são acumulados num buffer e são inserido via batch.
  - O tamanho do buffer varia em tempo ou tamanho.
    - **Caso seja tamanho ao alcançar o tamanho ou tempo limpa o buffer e ele insere,e aguarda um novo preenchimento.**
    - Ele automaticamente aumenta o tamanho do buffer ou o tempo de acordo com a demanda.
  - **Caso precise de algo em tempo real use o Lambda para realizar a operação.**
- Exemplo do processo de entrega
  ![image-20230221065515012](assets/image-20230221065515012.png)
- Diferença entre Data Stream e o Firehose.
  ![image-20230221070204566](assets/image-20230221070204566.png)

---

#### Kinesis Data Analytics

- Analisa fluxos de dados com SQL e Apache Flink.
  ![data-analytics](assets/image-20210903055735875.png)
- Executa os processos em tempo real.
- Totalmente gerenciado pela AWS.
- Pagos por **volume** de dados consumidos.
- Permite criar fluxo consulta em tempo real.
- Permite usar Lambda para pre-processar os dados.
- Tem um Schema discovery.
- Usa o IAM para acessar o origem e o destino dos dados processado.
- Uso:
  - Analise de período de tempo.
  - Dashboard em tempo real.
  - Métricas em tempo real.

---

#### Arquiteturas com Streams (Kinesis)

- Pipeline em tempo real
  ![image-20230221071407686](assets/image-20230221071407686.png)
- Soluções em tempo real com melhor custo
  ![image-20230221071638191](assets/image-20230221071638191.png)
- Comparação com outras soluções
  ![image-20230221072024210](assets/image-20230221072024210.png)

---

### MSK

![image-20230221072716148](assets/image-20230221072716148.png)

- Kafka manager service, serviço de kafka da AWS.
- Alternativa ao Kineses.
- Dados são armazenados nos EBS, por quanto tempo o cliente quiser.
- Permite implantar o cluster nas VPC ou em **Multi AZs (3 para HPA)**
- Tem a opção de ser serveless, não sendo necessário provisionar um cluster.
- Os consumer podem ser:
  - Aplicação que lê do topico.
  - Kinesis Data Analytics.
  - AWS Glue.
  - Lambdas.
- Diferença entre MSK e Kinesis
  ![image-20230221072810544](assets/image-20230221072810544.png)

---

### AWS Batch

- **Permite batch job como imagens docker.**
- **Paga pelos recursos usados** (Ec2, Fargate, Spot).
- Há duas opções:
  - Rodar usando o fargate (Não há necessidade de um cluster).
  - Rodar usando um instância provisionada (EC2 e Spot) na VPC.
    ![image-20230221174406433](assets/image-20230221174406433.png)
- Caso de usos:
  - **Processamento de imagens em lote, Execução de jobs concorrents.**
- **Pode se usar o EventBrigde para agendar a execução.**
- Pode ser acionado usando **Step Funtions.**
- Caso precise executar com alta performance (HPA) pode se usar o modo Multi Node
  - Disponibiliza várias instâncias para execução dos Jobs.
  - **Não é possível usar instâncias spot.**
  - Trabalha bem com Placement Group.
- Diferença entre Batch e Lambda
  ![image-20230221174255199](assets/image-20230221174255199.png)
- Soluções de arquitetura
  - Criação de Tumbmails
    ![image-20230221173936781](assets/image-20230221173936781.png)

---

### EMR

- Elastic MapReduce.
- Ajuda a criar clusters **Hadoop (Big data), para analise de grande quantidade de dados.**
- Pode ser construido em cima de centenas de instâncias EC2.
- **Suporta Apache Spark, HBase, Presto, Flink.**
- Usa **Spot Instances** para **Auto Scale** (que reduz os custos).
- Uso: Big Data, Marchine Learning e Web Indexing.
- **Usando em Single AZ.**
  - **Para se ter a melhor performance, devido não ter transferência de dados entre AZ.**
- Usa EBS do tipo **HDFS (Hadoop FileSystem)** para arquivos temporários.
- Caso precise de armazenamento de longo prazo, **pode se usar o S3 (EMRFS)** que tem uma integração nativa.
- Integrações:
  - **S3**
  - **DynamoDB**
- Tipos de nodes e preços
  ![image-20230221175637124](assets/image-20230221175637124.png)
- Configuração das instâncias
  - **Uniforme Instance Group**
    - Seleciona um único tipo de instância (ou on demand ou spot) para rodar os tipos de nodes.
    - Tem Auto Scale
  - **Instance Fleet**
    - Se define a quantidade e tipo de cada node, podendo distribuir entre on-demand ou instância Spot.
    - Não tem Auto Scale

---

### Executando Jobs na AWS

- As soluções são várias de variam de acordo com a demanda.
  - 1 - Bom para longas execuções, mas não escala, há necessidade de gerenciamento de infraestrutura.
  - 2 - Escala bem, porém tem as limitações do Lambda (tempo de execução).
  - 3 - Reativo a diversos tipos de eventos, porém tem as limitações do Lambda (tempo de execução).
  - 4 - Bom para jobs longos um custo maior e é mais complexo de implementar.
  - 5 - Bom para jobs longos, não há necessidade de gerenciamento de infraestrutura.
  - 6 - Bom para execução de dados para BigData.
    ![image-20230221180929791](assets/image-20230221180929791.png)

---

### AWS Glue

- Serviço gerenciado de **ETL** (extract, tranform, and Load).
- Serviço **Serverless**, possui 3 serviços:
  - **AWS Crawler** - Os rastreadores (Crawler) e classificadores examinam dados de fontes diferentes, classificam dados, detectam informações de esquema e armazenam meta-dados automaticamente no **AWS Glue Data Catalog.**
  - **AWS ETL ** - O núcleo do programa ETL fornece geração de código Python ou Scala para limpeza, enriquecimento, remoção de duplicatas e outras tarefas complexas de transformação de dados.
  - **AWS Glue Data Catalog** - fornece armazenamento centralizado e uniforme de meta-dados para rastreamento, consulta e transformação de dados usando meta-dados salvos.
- Permite extrair dados do **S3** ou **RBDMS** e transformar e enviar para o **RedShift**.
  ![glue](assets/image-20210905124633707.png)
- Pode ser usado com **Athena**, **Redshift**, **EMR** para se criar um catalogo de dados
  (dataSet) reutilizável (GLUE Data catalog).
  ![glue-catalog](assets/image-20210905124749244.png)

---

### Redshift

- Banco para Data warehouse.
- Baseado no **Postgres**, mas não e usado para OLTP (online transation processing) e sim para OLAP (online analytical processing).
- Envia-se os dados em escala (de hora em hora) para data **warehouse**.
- **10x** melhor que outros **OLAP**, e escala para PBs (Penta bytes) de dados.
- Baseado em colunas e permite **execução massiva de consultas paralelas (MPP).**
- Pague pelo que usa, baseado em instâncias provisionadas.
- Tem uma interface SQL pra escrita de querys.
- Pode se integra com o **AWS Quicksight** or **Tableau** para tarefas de BI.
- **Redshit Workload Management (WLM)**
  - Permite criar múltiplas filas para tratar as execuções de carga de trabalho (fila super usuário, fila de trabalho curtos, fila de trabalhos longos).
  - Isso garante que um trabalho rápido não fique preso a um trabalho longo.
  - Pode ser feito de forma manual, ou automática pelo RedShift
- Como é um cluster provisionado para executar a carga de trabalho, caso tenha consulta apenas exporadicas, o ideial seria usar o **Athena**. Pois esse é usando para consultas massivas e em grandes quantidades.
- Os dados podem ser carregados do S3, Do **DynamoDB** ou de qualquer banco via **DMS** (data migration service) ou via **Kinesis firehose**.
  ![data-importe](assets/image-20210905122049485.png)
- Pode escalar de **1 nó até 128** nós com cada nó tendo até **16 TB** de espaço.
- Há dois tipos de nós:
  - **Nó líder** - usado para o planejamento da queries e agregação dos resultados.
  - **Nó de computação** - Responsável por executar as queries e enviar o resultado ao líder.
- Tem uma funcionado chamada **Sprectrum** que permite executar a queries direto no **S3**, sem precisar carregar os dados para o **RedShift**.
  ![sprectrum](assets/image-20210905122151802.png)
- **Redshift Enhanced VPC Routing** - permite copiar e carregar dados através de uma VPC sem passar pela internet.
- Não é multi **AZ**, cada nó fica numa **AZ**, por isso para ter recuperação de desastres é feito **Snapshots**. incrementais que são internamente armazenados no S3.
  - Permite usar múltiplos Nodes com Multi-AZ mas para alguns tipos de Cluster apenas.
- Os Snapshots são feitos automaticamente de a cada **8 horas** ou a cada **5GB** ou podem ser agendados. Mas é possível realizar manualmente.
  ![redshit](assets/image-20210905121920707.png)
- Caso o snapshot seja cripografado, é necessário copiar a chave KMS para o novo cluster.
  ![image-20230221182853451](assets/image-20230221182853451.png)

#### Well architected

![well-arch-redshift](assets/image-20210905122323552.png)

---

### DocumentDB

- Implementação da AWS para o MongoDB.
- Conceitos de deploy similar ao Aurora.
- Totalmente gerenciado pela AWS e Replicado em 3 AZs.
- Armazenamento cresce de 10 GB em 10 GB.
- Escala automaticamente para milhões de requisições por segundo.
- Preço
  ![image-20230221184504405](assets/image-20230221184504405.png)

---

### Amazon Timestream

- Serviço de banco de dados **de Time Series (serie temporais).**
- Totalmente gerenciado pela AWS, rápido, escalavel e serveless.
- Permite armazenar e analisar trilhões de dados por dia.
- **1000 vezes mais rapido e 1/10 mas baratos que banco relacionais.**
- Tem compatibilidade com o SQL.
- Dados recentes são armazenados em memória e depois enviado para armazenamento permanente em um armazenamento mais barato.
- Permite criar funções de analise de series temporais.
- Tem criptografia em transito e em repouso.
- Uso:
  - Dados de IOT,
  - Analise em tempo real.
    ![image-20230221185322425](assets/image-20230221185322425.png)

---

### AWS Athena

![image-20230221185621707](assets/image-20230221185621707.png)

- Serviço **Serverless**, que permite realizar analises em arquivos no S3.
- Usa **SQL** para fazer queries nos arquivos.
- Tem conetores **JDBC** e **ODBC** para conectar aplicativos de BI.
- Suportar CVS, JSON, ORC, Avro, Parquet...
- **Cobrado por uso, queries executadas e mede de dados escaneados.**
  - **5$ por TB de dados escaneados.**
- Pode ser usado em BI, Analitics, relatórios e analises de VPC Flow Logs, ELB Log ..
- Ideal para queries rápidas ad hoc e se integrar com o AWS **QuickSight** para facilidade de visualização, ele também consegue lidar com análise complexa, inclusive grandes junções, funções de janela e arrays.
- **Usa o [Presto](https://aws.amazon.com/pt/big-data/what-is-presto/) com suporte completo a SQL padrão.**
- Permite executar querys em outros serviços de armazenamento (DBs) usando as Queries federadas através de uma lambda, depois pode se armazenar os dados no S3.
  ![image-20230221190102755](assets/image-20230221190102755.png)
- **well architected**
  ![athena-well-arch](assets/image-20210905115942523.png)
- Melhorando a performance
  ![image-20230221185907561](assets/image-20230221185907561.png)

---

### AWS QuickSight

![Como o Amazon Quicksight funciona](assets/How QuickSight Works_without Q_final.026e51297c1fa18b850ce2ffc1575a9124bbad16.png)

- Serviço de inteligência comercial (BI) promovido por **machine learning, escalável, sem servidor, incorporável, construído para a nuvem.**
- Permite que você crie e publique facilmente painéis interativos que incluem o **Insights de Machine Learning.**
- **Pago por Sessão.**
- Acesso pode ser feito via Usuários ou Grupos, que não precisam existir no IAM.
- **É baseado no “SPICE”, um mecanismo de cálculo super-rápido e paralelo na memória.**
- **Permite configura o CLS (Column-level security) que bloqueia certa colunas para certos usuarios.**
- Conecta se a :
  - Aurora, RDS, Athena, S3.
    ![image-20230221191125886](assets/image-20230221191125886.png)

---

### Pipelines para trabalhar com dados

- Analise de dados
  ![image-20230221191437913](assets/image-20230221191437913.png)
- Ingestão de dados Big Data
  ![image-20230221191554977](assets/image-20230221191554977.png)
- Comparação de tecnologias
  ![image-20230221191808657](assets/image-20230221191808657.png)

---

## Monitoring

### AWS CloudWatch

#### Logs
- Coleta métricas e **logs** de tudo no AWS. Também é possível enviar logs através do:
  - SDK, Cloud Watch Logs Agent, Cloud Watch Unified Agent.
  - Elastick Beanstalk, ECS, Lambda, VPC Flow Logs, API Gateway, CloudTrail
  - Cloud Watch Logs Agent só pode ser instalado no EC2
  - Route53 - Logs de queries DNS
- Pode ser **exportado** para o S3 ou feito um stream para o **OpenSearch** para analises futuras.
- **LogGroup** - Agrupamento de logs, pode ser por exemplo, todos os logs de uma aplicação.
- **LogStream** - Fluxo de logs de um recurso.
- Pode ser definido um período de retenção de logs, e configurado um batch de exportação para o S3.
- Permite usar criptografia KMS nos logs.
- Pode-se ter um **tail** dos logs do **Cloud Watch** via CLI.
- Pode enviar os logs para:
  - Kinesis Data Streams
  - Kinesis firehose
  - Lambda
  - OpenSearch
  - S3 (export)
    - Só pode criptografar os logs com **AES-256 (SSE-S3), não pode SS3-KMS.**
    - Pode levar até 12 horas para exportar.
    - Não é automático, precisa configurar ou usar a API call **CreatExportTask**.
- Subscrição de logs:
  ![image-20230222054249909](assets/image-20230222054249909.png)
- A possibilidade de agregar logs de várias regiões.
  ![image-20230222054341446](assets/image-20230222054341446.png)
- A maioria dos problema que se da aqui e por causa de permissões configuradas errado.
- Permite aplicar filtros através de expressões regulares ou métricas ou IPs. E com isso dispara alarmes.
- Por padrão nenhum log e enviado das instâncias EC2, caso queira ter os logs é necessária habilitar o **CloudWatch Agent** e isso fará que o **CloudWatch unified Agent** nas instâncias envie os logs.
  - Para isso precisa ter uma police que der permissão para enviar logs.
  ![unified-agente](assets/image-20210906093405257.png)

---

#### Metricas

- São coletadas de todos os serviços da AWS, São úteis para automatizar ações de acordo com status da métrica.
  - **Métricas** ->> thresholds ->> actions.
- Criar alarmes de acordo com as métricas.
- E com esses alarmes criar ações (posta numa fila do **SNS** ou acionar o **Auto Scale**)
- Existem métricas **default com tempos pré definidos (a cada 5 minutos)**, mas se necessário e por um custo adicional é possível adicionar novas métricas detalhadas e alterar o tempo de coleta.
- o Free Tier disponibiliza até **10 métricas detalhadas.**
  ![cloud-metrics](assets/image-20210906081300936.png)
- Para criar uma métrica customizada, e só usar a API **putMetricaData** no sdk/cli.
  - Também é possível definir a resolução da métrica ( "tempo de coleta") sendo:
    - **Standard** - 1 minuto.
    - **High Resolution** - 1|5|10|30 segundos - mas tem um alto custo.
  - Permite enviar métrica antigas (ate duas semanas) e métricas futuras até 2 horas sem que o **Cloud Watch** reclame.
- O uso de memória não é monitorada por default, caso queira e preciso usar métricas customizada.

---

#### Alarmes

- Permite definir alarmes para qualquer métrica.
- tem 3 status:
  - OK , INSUFICIENTE_DATA, ALARM.
- Os alarmes podem ser disparados através de métricas e filtros.
- Muito usado em conjunto com Ec2, para auto scale e monitorar saúde.
- Tem os 3 targets **EC2, EC2 Auto Scaling**, SNS (permite enviar para os outros).
- Pode enviar dados para o **eventBrigde** para conectar ao outros serviços.

---

#### Dashboards

- Com as métricas é possível criar Dashboards, para facilitar a visualização.
- Os Dashboards são **globais**.
- Neles é possível incluir gráficos de diferentes **contas AWS e regiões.**
- É possível compartilhar um Dashboard com um terceiro via **cognito**.
- até 3 Dashboards são de graça, e demais se paga $3 dólares por mês por Dashboard.  

### Synthetics Canary
  - Robo que fica verificando a saúde de API e caso encontre problema pode ajustar o ALB ou DNS para redirecionar o tráfego.
  - Permite configurar scripts (nodeJs e Python) para monitorar APIs e URLs, WebSites.
    - Pode agendar a execução da de única vez ou de tempos em tempos.
    - Permite acessos a recursos do Google Chrome.
  - Serve para achar problemas antes de os clientes achem (teste de API).
  - Checa a latência e saúde, da para fazer teste armazenando dados e prints da UI.
  ![image-20230222053053925](assets/image-20230222053053925.png)

---

#### Eventos

Permite criar eventos, ous seja ações predefinidas ou agendadas que podem disparar alguns serviços AWS (regras que define ações).

- Padrão de evento - intercepta eventos dos serviços AWS, tipo quando o status estiver pendente.
  - EC2 start, codeBuild Failure, S3
- Permite criar crons e eventos agendados.
- Gera json de evento, que pode ser enviado para um target **SNS**, **SQS** ...

---

#### **EventBridge** - (ponte de eventos)

![image-20230222055737522](assets/image-20230222055737522.png)

- Permite criar uma canal que vai receber eventos (**event bus**) e criar regras para tratar esse eventos postados nesse canal.
- Permite agendar eventos.
- É possivel definir uma **estrutura para o evento** (schema , tipo avro), ou usar algum que já existe, com ele é possivel definir o formato do evento que vai ser diparado por um SDK.
- A mesma coisa que o **Eventos** com adicional de que :
  - Permite criar um **event bus (Partner)** para algums **SAAS** envie eventos a **AWS** (Datadog, zendesk).
  - Permite criar um event bus (Custom) para receber eventos da sua aplicação.
  - Permite arquivar os eventos para futuras analises.
- Para acessar esse **Buses precisar ter uma política baseada em recurso.**
  - Permitindo até a agregação desses eventos em uma **única conta.**
- Vai substituir os eventos.

---

### X-Ray

- Permite analisar a aplicação visualmente, serviço de tracing distribuido da AWS.
- integra se com:
  - EC2, ECS, Lambda, BeanStalk, Api Gateway.

---

### Personal Health Dashboard

- Serviço global que mostras os eventos de manutenção da AWS.
- Pode mostrar os eventos que podem impactar a sua operação.
- Lista conjunto de ações para remediação caso tenha algum item fora ou em manutenção.
- Pode ser acessada via API.
- Pode se agregar os eventos caso tenha uma organização.
- Pode se usar o EventBridge para reagir aos eventos de manutenção, para notificação ou para tomar alguma ação.
  ![image-20230222061145138](assets/image-20230222061145138.png)

---

## Deployment and Instance Management

### AWS Elastic Beanstalk

![image-20230312103936578](assets/image-20230312103936578.png)

- Feito para o desenvolvedor, permite ter uma visão centralizada do ambiente de deployado.
- Usados para aplicações web, ex: cria toda infraestrutura e só precisa passar o pacote que será usando. ex. (war para o tomcat) .
- Usa todos os componentes do AWS (ec2, S3 ..).
- Seria uma PAAS (semelhante ao Heroku).
- O serviço do Beanstalk é gratis, o uso dele não é cobrado, apenas os **componentes usados serão cobrados.**
- Solução para migrar aplicações, sem se preocupar com a infraestrutura.
- É totalmente gerenciado pela AWS.
- Usa como base o CouldFormation para criar os recursos.
- **Componetes**
  - **Aplicação** - Aplicação em si.
  - **Versão da aplicação** - define a versão da aplicação.
  - **Ambiente** - Ambiente onde a aplicação pode ser disponibiliza.
    - Há dois tier de aplicações
      - **Web tier** - usa uma balanciador de cargas.
      - **Worker tier** - usa filas, e workes para processar a carga de trabalho.
    - Há duas formas de deploy
      - **Single instânce** - Boa para ambiente em dev
      - **hige Availibity** - Boa para ambientes de produção
      ![beanstalk](assets/image-20210823060717977.png)
- Tipos de tier
![image-20230807075302611](assets/image-20230807075302611.png)
- Forma de deploy
![image-20230807075325181](assets/image-20230807075325181.png)
- Exemplo de arquitetura
  ![image-20230222062858389](assets/image-20230222062858389.png)

---

### Code Deploy

- Usado para realizar deploy de EC2, ECS, Lambda.
- Pode deployar segundo as estratégias
  - **in-place** -> mata o antigo e coloca o novo (somente disponível para EC2).
  - **blue / green** -> criar um novo recurso e roteia os dados em parte.
    - Este por usa vez usa o **Traffic Shifted** podendo ser:
      - **Canary** - divide o tráfego entre as duas versões em percentagem até chegar os 100% da novar versão.
      - **Linear** - divide o tráfego entre as duas versões igualmente.
      - **All-at-once** - envia todo o tráfego um para uma ou para outra.
- EC2
  - Usa o **AppSpec.yml** (definição da aplicação) + estratégia de deploy.
  - O Code deploy atualiza (in place) as instâncias de acordo com a estratégia de deploy.
  - Pode se configurar **Hooks para validade como foi o processo de deploy**
    ![image-20230312110435714](assets/image-20230312110435714.png)
- ASG
  - há dois tipos de deploy
    - **in place** - Substitui parte dos das instância de acordo estratégia de deploy.
    - **blue - greem** - Criar um novo scale group com as novas instância e usa o ELB para controlar o tráfego. Após um tempo o antigo ASG é removido.
- Lambda
  - Code deploy criar uma nova versão do lambda.
  - Executa uma Lambda de teste (**Pre-Traffic)** para validar a nova versão.
  - Usa o **Traffic Shifting** para distribuir o tráfego entre as versões deployadas.
  - Usa o Cloud Watch Alarms para fazer rollback caso necessário.
  - Caso esteja OK, redireciona todo o tráfego para a nova versão e executa uma Lambda de teste **(Post Traffic)** para validar se o tráfego esta OK.
    ![image-20230222065311164](assets/image-20230222065311164.png)
    ![image-20230312110533059](assets/image-20230312110533059.png)
  - **SAM Framework usa nativamente o code deploy.**
- ECS
  ![image-20230222065605029](assets/image-20230222065605029.png)
- Após o traffic shifting dinalizado e estando OK, o tasks da versão anteriores são encerradas.
  ![image-20230312110703556](assets/image-20230312110703556.png)
  ![image-20230312110804503](assets/image-20230312110804503.png)

---

### AWS CloudFormation

![cloud-formation](assets/image-20210911100149772.png)
- Permite criar qualquer recurso da AWS via código (95%).
- Usado para criar infraestrutura como código (IAAC).
- Usa Yaml ou json para declarar os recursos.
- Ele mesmo se resolve sob a ordem de criação dos recursos.
- Taggea de forma uniforme os recursos criados.
- Usando é possível ter uma estimativa de custo da estrutura que se vai criar.
- Habilidade de se **criar infraestrutura em muitos contas, regiões,** ambientes com o arquivos do template (StackSets). Permite criar infraestrutura globalmente.
- Permite criar **Recursos customizados usando Lambda**, o CF chama a Lambda e ele cria/ deleta/ atualiza. **Usado para criar recurso que a CF não da suporte** (criar infra no on-premises, limpar buckets).
- É a base para:
  - **BeanStalk**
  - **Service Catalog**
  - SAM (Service application Model) Framework
- Permite configura uma política de preservar alguns recurso, quando deletado. sendo dos tipos:
  - **DeletionPolice=Retain**
    - Permite especificar recursos para preservar / realizar backups em caso de delete.
  - **DeletePolice=snapshot**
    - Permite configurar parar criar um snapshot quando deletar.
    - usado com **EBS, ElasticCach cluster, ElasticCache ReplicationGroup,**
    - RDS (instância, cluster )
    - **RedShift**
  - DeletePolice=delete (default)
    - Para custer **RDS o default é a police DeletePolice=snapshot.**
    - Para deletar o **S3, ele precisa esta vazio.**

---

### AWS Service Catalog

- Crie e gerencie catálogos de serviços de TI aprovados para uso na AWS.
- Na pratica permite que numa organização se controle quais serviços da AWS, possam ser usados pelas contas.
- Ajuda na governança e compliance.
- Os administradores define os templates dos produtos utilizando CloudFormation e montam um portfólio de produtos que são controlados via Policy IAM.
- Os usuários usam esses templates (produtos) e provisionam

---

### SAM - Serveless aplication model

- Framework para desenvolvimento e deploy de aplicações serveless.
- Configurações são escritas em YAML.
- Com ele pode se criar:
  - Lambdas, DynamoDB Tables, Api Gateway.
- Permite roda os itens acima localmente, o que facilita durante a fase de desenvolvimento.
- Permite via **CodeDeploy** realizar o deploy de Lambdas usando **Traffic Shifting.**
- Usa o **CloudFormation** por debaixo dos panos.
- Arquitetura com SAM.
  ![image-20230222104901039](assets/image-20230222104901039.png)

---

### CDK

![image-20230222120307732](assets/image-20230222120307732.png)

---

### AWS Systems Manager

![ssm](assets/image-20210907151452111.png)

- Permite criar grupos de recursos para facilitar a visualização de dados operacionais.
  - Pode se executar comandos (scripts nesse grupos).
- Permite gerenciar **EC2 e on-premises em escala.**
- Permite detectar problemas de infraestrutura
- Permite automatizar **patchs de atualizações.**
- Permite conectar as maquinas vias **SSM Session Manager.**
  - Nesse caso não é necessário **SSH, Bastion Hosts e Chaves SSH.**
  - É Usado para conectar instâncias via **console AWS.**
  - Envia para o **CloudTrail dados das sessões.**
    ![image-20230223053512425](assets/image-20230223053512425.png)
- Trabalha com mac, Windows e Linux e não precisa de SSH.
- Integrado com Cloud Watch metricas e dashboards. IAM e CloudTrail.
- É de graça
- Para usar é só instalar o **agente SSM na instância, ou VM.**
  - Necessário **criar uma role para que o agente tem acesso ao SSM.**
- Patchs
  ![image-20230223053242769](assets/image-20230223053242769.png)

---

### Cloud Map

![image-20230223054719268](assets/image-20230223054719268.png)

- Serviço gerenciado pela AWS de **descoberta de serviços.**
- Cria se um **map de serviços e recursos e se conecta o front end ao Cloud Map.**
- Tem **healhcheck e é integrado com o Route53.**
- Pode se usar SDK, API or DNS para realizar querys no Cloud Map

---

## Cost Control

### TAGs

![image-20230223061135313](assets/image-20230223061135313.png)

#### Cost Allocation Tags

- Com tags podemos realizar o **tracking** dos recursos.
- Com **Cost Allocation Tags** podemos habilidar relatorios detalhados de custo.
- As tags podem ser adicionadas como colunas nos relatorios.
- há dois tipos de tags
  - **AWS Generated**
    - Adicionada aos recursos automaticamente uma vez que esteja habilitada.
    - Inicia com o prefixo AWS: (ex AWS:CreateBy)
  - **User Tags**
    - Definidas pelo usuario
    - Inicia com o prefixo user: .
- Esses tags aparecem apenas no **Billing Console.**
- Após criada uma nova tags e adicionado ao recurso leva **24 horas** para aparecer no console.

---

#### Tag Editor

- Serve para gerenciar as tags de multipos recursos em um só lugar.
- Permite **adicionar , remover e atualizar tags.**
- Permite procurar **recursos taggeados e não taggeados** em **todas a regiões.**

---

### Calculadora de preços da AWS

- É uma ferramenta online gratuita que ajuda a estimar o custo mensal dos serviços da AWS.
- Ela permite que os usuários calculem o custo de diferentes combinações de serviços da AWS com base em suas necessidades específicas.
- útil para ajudar as empresas a planejar e gerenciar seus orçamentos de TI, bem como para avaliar diferentes cenários de implantação para seus aplicativos e serviços na nuvem da AWS.

---

### AWS Trusted Advisor

- Traz uma análise em **tempo real dos serviços** baseados nas boas práticas AWS.
- Fornece orientação que ajuda a **reduzir custos e aumentar o desempenho e melhorar a**
  **segurança.**
- Analisa e gera recomendações sobre:
  - **Custo**.
  - Performance.
  - Segurança.
  - Tolerança a falha.
  - **Limites de serviços.**
- Permite a configuração de email semanal com notificações.
- Há dois tipos de planos
  - **Comum** - Faz checagem e recomendações comuns
  - **Completo** - Disponivel para planos de suportes Bussiness & Enteprise.
    - Da acesso programático via APIs
    - Permite seta alarmes quando encontrar limites de serviços.
- Suports
  ![image-20230223061608471](assets/image-20230223061608471.png)
- Bom saber
  - Pode checar se o bucket S3 é publico. Mas não checa se os objetos dentro são publicos.
  - Pode checar os limites de serviços, porém para aumenta-los precisa abrir solicitação no AWS Suport center ou usar AWS Service Quotas.

---

### Service Quotas

- Permite definir **threshold** para os serviços.
- Envia notificações quando o serviço esta **próximo ao limite de contas.**
- Para isso cria se **CloudWatch Alarmes no console do Service Cotas.**

---

### EC2 Launch Types & Savings Plan

- Ver Compute & Load Balancing > EC2 > Precificação

---

### S3 Storage Classes

- Ver Storage > Amazon S3 > Classes de S3

---

### AWS Budget

- Pode definir um **orçamento** que o alerte quando você exceder (ou estiver previsto para exceder) seu custo orçado ou valor de uso.
- Usado para **gerenciamento de custo antes de uma demanda**, ou seja definir orçamento para determinada demanda.
- Pode ser usado para **saber quanto se usou** daquele planejamento inicial.
- Através das **tags** permite ver onde se está gastando seu dinheiro.
- Pode gerar alarmes de gastos, enviar email, postar em tópicos **SNS** (até 5 topicos) e configurar ações (Lambdas).
- Pode criar até **20.000 orçamentos. (soft Limit)**
- **O 2 são de graça**, mas os demais se paga **0.02 $ por dia por Budget.**
- Há 4 Tipos de Budget que podem ser criados:
  - **Usage**
  - Cost
  - **Reservation**
  - Savings Plan

#### Budget Actions

- Permite **configurar ações para quando o budget atingir um certo custo** ou uso de um determinado threshold.
- Suporta 3 tipos de ações:
  - **Aplicar IAM Policy a Users, Groups e Roles**. - Permite restringir nova criações de recurso
  - **Aplicar SCP a OUs.** - Permite restringir nova criações de recurso
  - **Parar Instâncias do EC2 ou RDS.**
- Podem ser executadas automaticamente, ou pode se ter um workflow de aprovação para execução.

#### Centralized Budget Management

- Permite gerenciar os **Budget em um conta centralizada.**
- Para cada conta que existir na organização deve haver um **Budget para ela e depois esse budget** pode se gerenciado pela conta centralizada.
- Pode se ter dois tipos de OU, uma mais restritiva e outra não.
- Caso uma conta dessa não restritiva **exceda o limites** definidos no Budget, pode se **mover-la para a OU mas restritiva** e pode-se enviar um e-mail para notificar os administradores da conta.
  ![image-20230223071637464](assets/image-20230223071637464.png)

#### Cost Explorer

![cost-explorer](assets/image-20210911104942473.png)

- Serviço usado para **ver, entender e gerenciar os gastos** (com várias granularidade mês, ano , dia).
- Permite que você explore **seus custos e uso da AWS** em um nível alto e detalhado de análise, e permite que você mergulhe mais fundo usando uma série de dimensões de filtragem (por exemplo, serviço da AWS, região, conta de membro, etc.)
- Contem vários relatórios para analisar os gastos, e permite criar outros customizado.
- Tem um recurso que prever o uso com base nos últimos 12 meses.
- **Quando devo usar o AWS Compute Optimizer e quando devo usar o AWS Cost Explorer**?
  - **AWS Cost Explorer** se quiser identificar instâncias do **EC2 subutilizadas** e quiser entender o impacto potencial em sua fatura.
  - **AWS Compute Optimizer** se quiser ver as recomendações de tipo de instância além do **downsizing**. Faz o uso de aprendizado de máquina para identificar tipos de carga de trabalho e escolher automaticamente a metodologia de recomendação específica de carga de trabalho para eles.

---

#### Compute Optimizer

- Usa **Machine Learning** para analisar os **recurso e prever recomendações para os mesmos.**
- Ajuda a **reduzir custos** recomendando os recursos ideias para as cargas de trabalhos executadas.
- Ajuda na configuração desses recursos de forma a **reduzir o desperdício e o custo.**
- Suporta **EC2, ASG, EBS, Lambdas.**
- Reduz até **25 % dos custos** e as recomendações podem ser enviadas para o S3.
- Uso:
  - Analisa uso de RAM, e faz recomendações

---

## Migration

### Cloud Migrations - The 6R

![image-20230223203920041](assets/image-20230223203920041.png)

- [6 estratégia para migra para a cloud.](https://aws.amazon.com/pt/blogs/enterprise-strategy/6-strategies-for-migrating-applications-to-the-cloud/)
  - **Rehosting** - “lift-and-shift.”
    - Apenas mova do on-premises para AWS (a aplicação inteiramente).
  - **Replatforming**  - “lift-tinker-and-shift.”
    - Migra por exemplo de um banco on-premises para o RDS.
    - Ou seja migra a plataforma, estava Weblogic muda para Tomcat.
    - Não muda o core da aplicação.
  - **Repurchasing** — "drop and shop"
    - Muda para um nova solução, ex muda de CRM para Salesforce.
  - **Refactoring / Re-architecting**
    - Reescreve a aplicação em uma nova arquitetura.
    - Mas demorado, e mais caro, porém pode se tirar o máximo da cloud.
    - Facilita novas features.
  - **Retire**   - Livrar-se
    - Livra se do que não se usa, ou que usa muito pouco.
  - **Retain**
    - Deixa no on-premises e se conecta aos AWS.
    - Se mantém, pois é muito complexo a migração o não vale o esforço.

---

### AWS Storage Gateway

- Usado e **cloud híbrida.** Permite fazer uma **ponte entre os dados da nuvem e o ambiente local** (on-premises).
- Conecta um dispositivo de software local a um armazenamento em nuvem para oferecer uma
  integração perfeita e segura entre um ambiente de TI local e a infraestrutura de armazenamento da AWS.
- Você pode usar esse serviço para armazenar dados no AWS para
  armazenamento escalável e econômico que ajuda a manter a segurança dos dados.
- Oferece **Gateways** de arquivo baseados em **arquivo (S3, EFS, FSx )**, volumes
  (armazenados em cache e armazenados) e soluções de armazenamento em fita.
- Tipos de armazenamento que é possivel configurar:
  - **S3 File Gateway** - Usado para armazenar arquivos.
    ![image-20230223205533718](assets/image-20230223205533718.png)
  - **FSx File Gateway** - Bom para cache de dados de arquivos muitos acessados.
    ![image-20230223205704041](assets/image-20230223205704041.png)
  - **Volumes Gateway (EBS)** - Usados para armazenar dados de backups, ou volumes.
    ![image-20230223205806554](assets/image-20230223205806554.png)
  - **Fitas (TAPE) Gateway (S3 Glacier) -** Usado onde há processos semelhantes fitas.
    ![image-20230223205915002](assets/image-20230223205915002.png)
- Pode se usar autenticação integrada com o Active directory.
- AWS, também oferecer **hardware** para disponibilizar essas funcionalidade. Onde não há própria estrutura de virtualização para implementar o **AWS Gateway Storage.**
- Uso:
  - Recuperação de desastre.
  - Backup e Restauração.
  - Armazenamento.
  - Redução de latência e cache no ambiente on-premises.
    Arquitetura com Storage Gateway
- Usado para migrar dados do on-premises para AWS, ou para conectar aplicação migrada no modo Rehosting.
  ![image-20230223210344227](assets/image-20230223210344227.png)
- Usado como replica de leitura entre ambientes de on-premises
  ![image-20230223210608224](assets/image-20230223210608224.png)
- Para processo de backup, para economia
  ![image-20230223210652331](assets/image-20230223210652331.png)

---

### AWS Snow Family

- Dispositivo **offline** que permite realizar **migração de grande quantidade de dados**. Muito usado para levar dados para AWS sem usar a rede.
- Podem **rodar instâncias EC2 ou lambdas**, para processamentos de dados em **áreas remotas**, onde não se tem acesso ao recursos da AWS.
  - Pode se contratar por um log período de **1 a 3 anos** o que gera desconto.
- Há um software chamado **OpsHub** que fornece uma interface gráfica para os dispositivos.
- Há 3 tipos:
  - **Snowball edge** - Usado para transportar **TBs e PBs** de dados, semelhante a uma maleta.
    - **Storage otimized**
      - (**40vCpu 80Gb Memória**) - com 80 TBs compatível com S3.
    - **Compute otimized**
      - (**52vCpu 208Gb Memória**) com 42 TBs compatível com S3.
      - Caso necessário pode vir com **placa de vídeo.**
  - **SnowCone** - Dispositivo menor espaço, pesa cerca de 2,1 kg, com bateria opcional.
    - HDD - **2 vCPUS, 4 Gb de memória, 8TBs de espaço,** USB tipo c.
    - SSD - **2 vCPUS, 4 Gb de memória, 14 TB of SSD**
  - **SnowMobile** - Caminhão, usado para transporta dados acima de **10 PBs para AWS.**
    ![snow-family](assets/image-20210902060123753.png)
- Não é possível importar os dado do **Snowball** diretamente para o **Glacier**, primeiro se importaria para o S3 e com uma política de ciclo de vida se moveria para o **Glacier**.
- Melhorando a transferência para os dispositivos.

---

### AWS DMS

![aws-dms](assets/image-20210909064002076.png)

- Serviço de **migração** de dados para a AWS.
- Permite migrar dados para o **RDS** (a nuvem) de um **banco relacional on-primeses.**
- Permite que o **banco fique ativo** durante a migração, pois usa os **logs para a migração**.
- Utiliza o **CDC (Change Data Capture)** para **Continous Data Replacation.**
- Roda numa instância **EC2**.
- Permite migrações:
  - **homogéneas** - de um de um tipo (oracle) para um bando do mesmo tipo (oracle) na nuvem.
  - **heterogéneas** - de um banco de um tipo (oracle) para outro de outro tipo (mysql)
    - Usa o **SCT (Schema conversion tool)** para migrar DB diferentes
- Origem e destino
  ![image-20230224054253994](assets/image-20230224054253994.png)
- É bom saber sobre DMS
  - Trabalha com **VPC Peering, VPN, Direct Connect.**
  - modos:
    - **Full Load** - Carrega tudo e pronto.
    - **CDC only** - migração continua
    - **Full Load + CDC** - Carga Inicial mais integração continua de novos registos.
  - Oracle
    - Suporta **TDE** na Origem usando "**BinaryReader**"
    - Suporta TDE, **BLOBs in tables** que tenha PK no destino
  - Possível combinar SnowBall com o DMS.
    - Pega os dados so **banco** e usa o **SCT** para extrair os dados e mover para o **SnowBall**
    - Pega o **SnowBall** e move os dados para o S3.
    - Usa se o **DMS** com o **CDC** para colocar os dado no banco.

---

### Disaster Recovery in AWS

- DR é um modelo de arquitetura que visa prevenir **desastres** que possam afetar sua operação.
- A ideia e **"ter uma copia de sua solução"** em uma região afastada, que seria "acionada" quando sua região principal ficasse fora.
- Na **AWS** a ideia e semelhante, mas propõe que seus serviços e recurso sejam **distribuído** / **replicados** em mais de uma **região**.
- **Tipos**
  - **on-primeses -> on-primeses** -> tem um datacenter em SP e outro em Fortaleza. -> Solução bem cara de manter.
  - **on-primeses -> AWS** - uma estrutura Híbrida.
  - **AWS Região A -> AWS Região B** - Replica ou distribui os serviços e recurso em mais de uma região
- **Termos importante**
  - RPO - Recover point objective - está relacionado com a frequência de backup.
  - RTO - Recover time objective - está relacionado a tempo de recuperação de desastre.
    ![rpo-rto](assets/image-20210909060015823.png)

#### Estratégias de DR

![dr-estrategias](assets/image-20210909061054824.png)

- **Backup e Restore**
  ​ ![bkp-restore](assets/image-20210909061455821.png)
  - A ideia aqui e realizar backups com uma certa frequência (RPO) e quando dá um problema se recuperar os dados do backup (RTO).
  - Tem uma alta tempo de recuperação (alto RTO).
  - Muito barato comparado as outras.
- **Pilot Light**
  ​ ![dr-pilot](assets/image-20210909062035023.png)
  - A ideia aqui é usar versões pequenas das aplicação (apenas para Apps Core) em outra regiões, e continuamente, sincronizar os dados entre elas. Caso ocorra um desastre seria só redirecionar os tráfego para nova região e escalar a aplicação.
- **Warm standby**
  ​ ![dr-warm-standby](assets/image-20210909062340297.png)
  - A ideia aqui seria ter toda a infraestrutura replicada só que em escala menor, caso haja um desastre, se redirecionaria o tráfego e escalava as aplicações.
- **hot site / multi site approach**
  ![hot-site](assets/image-20210909062732217.png)
  ![DR-muilt-site](assets/image-20210909062821953.png)
- A ideia aqui e se ter as aplicações e recurso distribuídos entres as regiões, e os dados sincronizados assim se ocorrer um desastre o tráfego seria redirecionado quase que instantaneamente.
- Tem o menor tempo de recuperação (RTO), porém é uma solução mas cara.

#### Dicas

![dicas](assets/image-20210909063130084.png)

---

### AWS FIS - Fault Injection Simulator

![image-20230224062326078](assets/image-20230224062326078.png)

- Permite **Injetar falhas** nas cargas de trabalho na AWS a fim de **validar a capacidade de resiliência** das soluções.
- Baseado na engenharia do chaos, stressa as aplicações criando eventos disruptivos, permitindo que eles sejam **observados** e que se crie soluções para responde-los.
- Ajuda descobrir novos **bugs e lacunas de performance.**
- Suportas os serviços: **EC2, RDs, EKS, ECS ....**

---

### VM Migration Service

![image-20230224064834394](assets/image-20230224064834394.png)

#### Application Discovery service

- Permite **planejar migração** dos projetos com base nas **informações coletadas** de data centers.
- Utilização do **servidor e e dependências** são mapeados como itens importantes para migração.
- **Agentless discovery** (Connector)
  - **OVA** (open virtual Applieance) que pode ser deployada numa VM.
  - Realiza o **inventário das VMS**, (CPU, Memory, Uso de disco).
  - Funciona em todos os sistemas
- **Agent Based Discovery**
  - Agente que pode ser instalado e que recuperar informações sobre a **configuração dos sistemas**, **performance, processo em execução e detalhes de rede.**
  - Pode ser instalado em:
    - **Microsoft Server, Amazon Linux, Ubuntu, RedHat, CentOs, Suse....**
  - Os dados podem ser exportados via CSV, ou podem ser enviados para o Migration HUB ou para um S3 para ser analizado no Athena

---

#### MGN - Aplication Migration Service

- Evolução do **SMS (Server Migration Service) e do CLoudEndure Migration**.
- Usado para aplicação de **rehosting** (lift and Shift) - mover do on-premises para AWS.
- Converter **recursos fisicos** ou virtuais em recursos da **cloud AWS.**
- Pode migrar suas aplicações da infraestrutura física, do **VMware vSphere**, do **Microsoft Hyper-V**, do EC2, da VPC e de outras nuvens para a AWS.
  ![image-20230224064237505](assets/image-20230224064237505.png)

---

#### DRS Elastic Disaster Recover

- Chamado anteriormente de **CloudEndure Disaster Recovery.**
- Permite recuperar recursos físicos ou virtuais e servidores na cloud.
  ![image-20230224064703416](assets/image-20230224064703416.png)

---

#### Migration Evaluator

![image-20230224065000166](assets/image-20230224065000166.png)

---

### AWS Backup

![image-20230224065258211](assets/image-20230224065258211.png)

- **Serviço de backup gerenciado pela AWS.**
- Permite **centralizar** as **configurações** de backups.
- Suporta **cross-regions e cross-accounts backups.**
- Pode ter **backups agendados** ou **sob demanda.**
- Permite aplicar uma política de **tagueamento do backups.**
- Permite criar uma **política de backup (período) e tempo de retenção de um backup.**
- **Backup Vault Lock**
  - Permite que os dados salvos não possam ser deletados implementa o **WORM(Write Once Read Many)**
  - Garante que não seja deletado por engano o por software mal.

---

## AWS VPC

![vpc](assets/image-20210907200230003.png)

- Virtual private cloud (rede privada na nuvem).
- Tem escopo **regional**.
- Toda região tem um VPC default, configurada com **subnets** publicas, ou seja tem acesso via Internet.
- Pode haver até **5 VPCs por região (soft Limit).**
- Cada **VPC** pode ter até **5 CIDRs sendo:**
  - No mínimo /28 com **16 IPs.**
  - No máximo /16 com **65536 IPS.**
- Como VPC é privado só são permitidos os ranges:
  - 10.0.0.0/8
  - 172.16.0.0/12
  - 192.168.0.0/16
- Resolução de DNS, há duas configurações possíveis
  - **enableDnsSuport** (configuração de resolução de DNS)
    - O padrão para VPC é **true**, serve para habilitar o suporte a resolução de DNS na VPC .
    - Private Dns
  - **enableDnsHostname**
    - **true** na VPC default mas **false** para novas VPCs.
    - Habilita o DNS para instâncias e a criação de **hostname** para instâncias.
    - Public Dns
      ![dns](assets/image-20210907212451775.png)

### CIDR

![cidr](assets/1By1Z1u0xilCm5OAtOqm3pg.png)

- Classless inter-Domain Routing (Roteamento entre domínios sem classe).
- Usado para repartir os endereços IPs e definir ranges de ips.
  - x.x.x.x/32 -> tem 1 IP
  - 0.0.0.0/0 -> todos os IPs
    ![mask](assets/image-20210907165104378.png)

### Subnets

- Bloco de rede dentro de uma VPC.
- Tem escopo de **AZ.**
- Quando se criar ele é privado por padrão.
- Para se fazer ela publica, deve se atachar um **Internet Gateway**.
- E adicionar uma tabela de rota de comunicação com o **Gateway**.
- AWS reserva **5 IPs (os 4 primeiros e o ultimo)** em cada **subnet** ex: o bloco CIDR 10.0.0.0/24:
  - 10.0.0.0 - Endereço de rede.
  - 10.0.0.1 - Reservado para o VPC Router.
  - 10.0.0.2 - Reservado para mapear DNS.
  - 10.0.0.3 - Reservado para uso futuro.
  - 10.0.0.255 - Endereço de broadcast.

### Internet Gateway

![image-20210907203053110](assets/image-20210907203053110.png)

- Permite que uma **VPC** tenha acesso ao Internet.
- Escala horizontalmente e tem alta disponibilidade.
- Deve haver um **Internet Gateway** para uma **VPC**.
- Também fazem **NAT** para instâncias EC2 que tem IP publico.
- Lembrando que quem permite acesso ou não a Internet e a **tabela de Rotas.**

### Route table

![AWS VPC - Internet Gateway, Route Tables, NACLs | 4sysops](assets/Public-and-private-route-table-diagram.png)

- Serve para **direcionar** o tráfego de rede para as **subnets**, permitindo assim que se tenha acesso a Internet ou não.
- É boa pratica criar no mínimo duas tabelas de rotas por VPC:
  - Uma tabela de rotas publica que ter as **subnets** publicas, esta se liberar o tráfego de qualquer lugar colocando como target o **Internet Gateway.**
  - Uma privada onde vai estar as **subnetes** privadas.

### NAT Gateway

![AWS — Difference between Internet Gateway and NAT Gateway | by Ashish Patel  | Awesome Cloud | Medium](assets/1gftv4LSqU_12kRqNwYISJw.png)

- As instâncias das **subnets** privadas precisam acesso a Internet para atualizações, é com usa de NAT que fazemos isso.
- Totalmente gerenciado pela AWS.
- Pague por hora e banda usada.
- São criado em uma **AZ** especifica e **Usam Elastic IP.** caso queira alta disponibilidade é recomendado criar e mais de uma **AZ**.
- Não pode ser usado por instâncias da mesma sub-rede, apenas por outras.
- Se criar um **NAT Gateway** numa **subnet** publica e apronta o tráfego das subnets privadas para o NAT, que por sua vez via **route table** repassa ao **Internet Gateway**, como nas **subnets** privadas só que pode acessar e que esta na mesma **VPC** se mantém a segurança.
- Há uma opção de usar uma i**nstancia EC2 como NAT Instance.**
  - Mas barato que o Nat Gateway, porém não é resiliente e toda manutenção deve ser feita por nós.
  - Deve se usar um **IP Elastico** junto a instância.
  - Para que funcione deve ser **desabilitado a Checagem de Sorce/Destination (EC2 settings).**

### Security Group

![sg](assets/image-20210907213210726.png)

- **(Regras de acessos)** por padrão vem negando tudo.
- Só permite acesso, não preciso negar.
- É a primeira camada de segurança
- Está no nível de instâncias. Pode ser entendido como firewall das instâncias EC2.
- Eles têm estado (**statefull**), o que significa que todas as alterações aplicadas a uma regra de entrada são automaticamente aplicadas a uma regra de saída.



> Porta que vc deve conhecer :
> - 22 -> SSH
> - 21 -> FTP
> - 22 -> SFTP
> - 80 -> HTTP — access unsecured websites
> - 443 -> HTTPS — access secured websites
> - 3389 ->  RDP (Remote Desktop Protocol for Windows instance) 





### NACL

![Learn AWS Network ACL and Security Groups in under 5 minutes | by João  Marcelo Souza | Medium](assets/1K-Se2-uV-Y91vkGW3K0-8w.png)

- Network access control list, deve haver uma por **subnet**.
- Deve dizer o que **é permitido e o que é negado**. Seguindo a ideia de procedência indo de **1 - 32766, sendo quanto menor no numero maior a procedência.**
- É a segunda camada de segurança.
- Esta no nível de Subnets. Pode ser entendido como firewall de **subnet**.
- Eles não têm estado (stateless), o que significa que qualquer alteração aplicada a uma regra de entrada não é aplicada automaticamente a uma regra de saída.

### VPC Peering

- Permite conectar 2 VPCs, mas para isso não pode haver sob posição de **CIDRs**.
- Não são transitivas, ou seja no exemplo abaixo a VPC A não esta conectada a VPC C.
  ![vpc-peering](assets/image-20210908191617520.png)
- Caso precise que elas se "vejam" e necessário criar um **VPC Peering** com as duas.
  ![vpc-peering](assets/image-20210908191928744.png)
- Para cada conjunto (A - B , B - C, A - C) é necessário atualizar as tabelas de rotas, para que as instâncias possam se ver.
- Serviço **cross account** e **inter-regions**, ou seja é possível conectar VPCs de contas diferentes e em regiões diferentes.
- Possível configurar **Security Groups** que considerem VPCs pareadas.
- Caso haja um cenario onde haja 2 VPC com a mesma CIDR conectadas com a uma outra VPC **usa se Prefix para definir como vai ser o roteamento.**
  ![image-20230224201705981](assets/image-20230224201705981.png)
- **Não suporta roteamento de borda, para NAT devices**
  ![image-20230224202108774](assets/image-20230224202108774.png)
  ![image-20230224202133515](assets/image-20230224202133515.png)

---

### VPC Endpoints

![image-20230227060707205](assets/image-20230227060707205.png)

- Permite criar **endpoints para acesso de serviços internos da AWS.**
- Escala **Horizontalmente** e tem **redundância**.
- Usado quando queremos que uma rede privada tenha acesso a recursos AWS, mas sem que esse tráfego saia para a internet.
- Ele remove a necessidade de se ter uma **NAT Gateway** para acessar serviços da AWS.
- Usado **para subnets privadas.**
- Tipos:
  - **Interface** - cria uma interface de rede (**ENI**) que fornece um IP para os serviços devem ser configurado o acesso **no Security Group.**
    - Quando criado cria se um **URL que será atachada ao ENI.**
    - Precisa habilidar as configurações na VPC **"Enable DNS Hostnames" e "Enable DNS Support"**, pois Serviço de DNS irá resolver o **Private Endpoint para rede privada.**
    - Para todos exceto o DynamoDB.
    - As interfaces podem ser compartilhadas via **DX e VPN.**
  - **Gateway** - usa um Gateway para provisionar um destino e deve ser configurado na tabela de rotas (**Route Table**)
    - Somente para **S3 e Dynamo DB**.
    - Não tem custo. **Tem maior flexibilidade de acessos.**
    - Não pode ser expandido para fora da VPC. Ous seja não pode ser compartilhado usando **(VPN, DX, TGW, Peering)** só funciona **dentro da VPC.**
    - Se deve criar um único por VPC. O DNS deve esta habilitado e com isso pode se usar hostname para o S3 ou DynamoDB
    - Criado em nivel de VPC, por isso que é necessário definir a entrada de acesso no rout table
      ![image-20230227061041750](assets/image-20230227061041750.png)
- Caso use **VPC Endpoints** deve se atentar a usar as configurações de DNS, Outra coisa que pode gerar confusão e que a partir da hora que se usa o **VPC Endpoints** e necessário informar as região ao usar comandos do CLI, pois o **VPC Endpoints** tem escopo regional.
- **VPC Endpoint Police**
  - Permite controlar os acesso a **serviços AWS.**
  - Não sobrescreve **política do S3 ou só IAM**, apenas adiciona a endpoint a definição de quem pode acessa-lo.
  - Caso queria restringir o acesso de algum recurso a apenas ao VPC Endpoint é necessário ir no recurso e definir uma política de acesso que indique que o acesso a aquele recurso deve ter origem do VPC Endpoint com a condição "aws:sourceVpce" onde se passa os endpoints que podem acessar o recurso.

---

### AWS PrivateLink - VPC Endpoint Services

![AWS PrivateLink - VPC Endpoint Services](assets/image-20210908203529744.png)

- Permite compartilhar um **serviço de uma VPC com outra VPC** sem precisar que aquele serviço publico, ou sem precisar ligar as VPC com **VPC Peering.**
- Forma mais segura e escalável de se **expor mais de 1000 serviços AWS.**
- Sem a necessidade de **Peering, DX e VPN, NAT ou RouteTables.**
- Faz uso do **VPC endpoints, por isso muitas vezes pode ser considerado o mesmo serviço.**
- Usando com S3 e Direct Connect
  ![image-20230227065519211](assets/image-20230227065519211.png)
- Usando com VPC Peering
  ![image-20230227065551394](assets/image-20230227065551394.png)

---

### VPC Flow Logs

![image-20230228061439898](assets/image-20230228061439898.png)

- Permite capturar o tráfego **IP dentro de uma VPC.**
- Esta em **nivel de VPCs.**
- Tipos:
  - **VPC Flow Logs** - se aplica a tudo dentro da VPC.
  - **Subnet Flow Logs** - se aplica as subnets dentro de uma VPC.
  - **ENI Flow Log** - Se aplica a uma interface de rede.
- Podem ajudar a monitorar tráfegos de rede dentro da VPC, ajuda na **troubleshooting**.
- Pode se usar o **Athena** ou **Cloud Watch Insights** para identificar anomalias.
  ![image-20230228061544920](assets/image-20230228061544920.png)
- Arquiteturas com FPC Flow Logs
  ![image-20230228061742844](assets/image-20230228061742844.png)

---

### Bastion Hosts

![Bastion Hosts](assets/image-20210908200020997.png)

- Maquina numa rede publica da onde é possível conectar a instâncias em uma rede privada via SSH.
- Se conectar ao **Bastion Hosts** via SSH e a partir dele se conecta as instâncias na rede privada.
- Outra solução é a **Session Manager** que permite acesso na WEB sem necessidade de SSH.

---

### Virtual Private Gateway

![Virtual Private Gateway](assets/image-20210908200507774.png)

- Permite ligar uma rede on-primise a AWS via VPN, para isso é necessario configurar um **Virtual** **Customer Gateway** do lado do on-primese e do lado da AWS cria se uma **Virtual Private Gateway**.

### AWS Direct Connect

![dx](assets/image-20210908201934794.png)

- C**onexão dedicada, fibra** que vai do seu **datacenter** até a AWS.
- Demora cerca de **1 Mês** para ser implementado toda a infraestrutura.
- Por padrão os dados em transito não são cartografados, pois já se esta numa rede privada, mas caso queira pode se usar **um solução de IPSec com VPN.**
- O **Direct Connect (DX)** é um recurso que permite a conexão dedicada (vai de fibra até o datacenter) e direta com a AWS, fora da infraestrutura da Internet.
- Exemplo de uso, o Itaú deseja ter a melhor conexão possível entre seus datacenter e a AWS, ele contrata um **DX que vai ligar uma fibra do datacenter do Itaú até a AWS (Um parceiro).**
- Caso se queira conectar mais de uma região deve se usar um **Direct Conect Gateway**
  ![DX-GW](assets/image-20210908202014628.png)
- Alta disponibilidade
  ![DX](assets/image-20210908202426476.png)
- Direct Connect Gateway - Site Link
  ![image-20230228061217204](assets/image-20230228061217204.png)
- Tipos de DX
  ![image-20230228060449937](assets/image-20230228060449937.png)

#### Virtual Interface VIF

- **Public VIF** - Permite conectar serviços publicos da AWS (S3, EC2).
- **Private VIF** - Permite conectar aos recursos na sua VPC (EC2, ALB).
- **Transit Virtual Interface** - Conecta aos recursos usando um TGW (Transit Gateway).
- Endpoints privados não precisam de interfaces (Private VIF) para conexão, pois podem ser acessados diretamente.

---

### Egress Only Internet Gateway

- Um **gateway** da Internet somente de saída é um componente da VPC horizontalmente escalado, redundante e altamente disponível que permite a comunicação de saída pela **IPv6** das instâncias na VPC para a Internet e impede a Internet de iniciar uma conexão **IPv6** com suas instâncias.

---

### Transit Gateway

![AWS — Transit Gateway](assets/1ghrEMYcgoEfzawAHq54v_A.png)

- **O AWS Transit Gateway** conecta VPCs e suas redes locais por meio de um **hub central**. Isso simplifica a rede e elimina os complexos relacionamentos de emparelhamento. Ele atua como um roteador de nuvem e cada nova conexão só é feita uma vez.
- Permite instâncias na VPC acesse a NAT Gateway, NLBs, PrivateLink, e EFS e outras VPC conectadas ao **AWS Transit Gateway**.
- Permite usar o **Direct Conect ao premises ou VPN.**
- Transit Gateway é um recurso **regional e pode conectar milhares de VPCs na mesma região da AWS.**
- Pode ser compartilhado com outras contas da AWS usando **RAM**.
- Permite restringir quais VPC tem acesso a quais VPC usado Route Tables.
- Suporta **IP Multicast** (Não suportado por nenhum outro serviço da AWS.)
- **Casos de Uso**
  - Para implementar a topologia **Hub e Spoke (star).**
  - Para conectar vários Amazon VPCs entre regiões (usando **peering do Transit Gateway**).
  - Forneça aplicativos em todo o mundo - **o Transit Gateway** ajuda a criar aplicativos que abrangem milhares de Amazon VPCs. Tudo é mais fácil de implantar, gerenciar e solucionar problemas.
- **Limitações**
  - Você pode se conectar a no máximo três **Transit Gateways** em uma única Conexão **Direct Connect** para conectividade híbrida.
  - **O Transit Gateway** não oferece suporte ao roteamento entre VPCs com CIDRs sobrepostos.
- **Inter e Intra Region Peering**
  - Dentro de uma região é possivel ter dois **TGW** ( Transit Gateway) com finalidades diferentes e conecta-los usando i**ntra-Refion Peering Mesh.**
  - Mas caso queira conectar a outra região com um estrutura semelhante seria necessário criar um novo TGW e realizar o inter-Region Peeering Mesh.
    ![image-20230227055738521](assets/image-20230227055738521.png)

---

### Custo de rede

![net-cost](assets/image-20210908205716392.png)
![image-20210908210015556](assets/image-20210908210015556.png)
![image-20210908210158231](assets/image-20210908210158231.png)
![image-20210908210357597](assets/image-20210908210357597.png)

---

### AWS VPN

- Permite conectar o **on-premises a AWS** via internet publica, com segurança.
- AWS Recomenda a criação de uma **VPN diferente para cada VPC.** porém isso pode ser complicado, por isso é recomendado o uso de **DX (Direct Conect).**
- para se criar precisa:
  - Do lado on-premises:
    - Disponibilizar um estrutura com com IP publico.
    - Criar um **Customer Gateway (CGW)**
  - Do lado da AWS
    - Configurar um **Virtual Private Gateway** e atachar a VPC
    - Conectar a**o Customer Gateway ao Virtual Private Gateway (VGW)**
- Para alta disponibilidade se recomenda a existência no mínimos duas VPN configuradas.
- Pode se usar o **Global Acelerator** para melhorar a velocidade.
  ![image-20230228053747985](assets/image-20230228053747985.png)
- Configuração da tabela de rotas
  - **Static Routing** - Insere manualmente as rotas em cada uma das tabelas de rotas.
  - **Dynamic Routing** - Usa se o protocolo **BGP** para realizar a configuração da tabela de rotas automaticamente compartilhando os IP Entre as tabelas de rotas.
    - Necessário especificar um **ASN** para cada **Gateway criado**
- **Link Aggregation Group**
  - O **LAG no AWS Direct Connect** permite que você agregue várias conexões de rede físicas em uma única conexão lógica de alta capacidade. Isso pode ajudar a aumentar a largura de banda, melhorar a redundância e simplificar a configuração da rede. Com o **LAG**, você pode criar um único link de conexão lógica que pode fornecer uma largura de banda de até 10 Gbps.
  - Além disso, o **LAG** pode ser usado para criar conexões redundantes para garantir a alta disponibilidade da sua rede. Se uma das conexões físicas falhar, o tráfego pode ser automaticamente roteado para outra conexão sem interrupções de serviço.
  - ![Link Aggregation Group (LAG) - AWS Direct Connect](assets/LAG_description.png)
- Acessando a Internet **via cloud do on-premises**
  - **Nat Gateway** - não funciona pois ele não pode ser acessado de origem vinda de DX, VPN ou Peering.
    ![image-20230228054209397](assets/image-20230228054209397.png)
    ![image-20230228054410767](assets/image-20230228054410767.png)
    **Client VPN** - Permite configurar uma VPN para que os **usuários possam conectar via por exemplo (OpenVPN)**

#### CloudHub

- Permite conectar mais de **10 Customer Gateway a cada Virtual Private Gateway.**
  ![image-20230228054727767](assets/image-20230228054727767.png)

---

### AWS Network Firewall

- Protege a VPC inteira
  ![image-20230228062209390](assets/image-20230228062209390.png)
  ![image-20230228062313794](assets/image-20230228062313794.png)
  ![image-20230228062545252](assets/image-20230228062545252.png)

---

## Machine Learning

![image-20230303060442789](assets/image-20230303060442789.png)

---

### Rekognition (reconhecimento)

![image-20230302070726050](assets/image-20230302070726050.png)

- Permite buscar **pessoas, objetos, textos e cenas em imagens e videos usando ML.**
- Pode se realizar reconhecimento e busca facial para verificação de usuário, e contagem de pessoas.
- Posse criar um **banco de faces familiares ou usar de celebridades.**
- Caso de usos:
  - **Moderação de conteudo**
  - Detecção de texto.
  - Deteção de analise de faces (género, range de idade, emoções)
  - Reconhecimento de celebridades
  - Caminhos (Para analise de futebol)
  - Usado e medias sociais, e-commerce
- As imagens ou vídeos são analisadas e e validado junto a um threshold de **nível de confiança** e pode se adicionar um passo opcional que seria a validação por humanos via **Augmented AI (A2I).**

---

### Transcribe

- Serviço de conversão de **áudio em texto.**
- Usa processos de aprendizados profundo de maquina chamados de **Automatic Spreech Recognition (ASR)** para converter o discurso (áudio) em texto rapidamente.
- Permite remover automaticamente as **PII (Personal Identifiable Information) usando Redaction**.
- Suporta automaticamente linguagens diferentes em áudio com multi-línguas e consegue identifica-las.

---

### Polly

- Serviço de conversão de **texto em áudio**. (oposto de Transcribe).
- Permite criar **aplicação que falam.**
- Permite usar Lexicon e SSML
  - **Pronunciation Lexicon** - permite customizar a pronúncia de palavras. Assim quando aparecer
    - AWS -> Amazon Web Service
    - Uniliva -> Uniliva, aquele mineiro bunito dimais
  - **SSML - Speech Synthesis Markup Language** - gera áudio através de textos e documentos. Permite customizar para :
    - Da ênfase em palavras especificas ou frases.
    - Usar pronuncia fonética.
    - **Incluir quebra de som ou sussurros.**

---

### Translate

- Serviço de tradução de línguas da AWS.
- Permite traduzir grandes volumes de **textos rapidamente, permite localizar o conteúdo e traduzi lo de acordo com a preferência do usuário.**

---

### Lex + Connect

![image-20230302074306978](assets/image-20230302074306978.png)

- Lex
  - Mesma tecnologia usada pela **Alexa**. Utiliza o **ASR (Automatic Spreech Recognition)** para converte o áudio em texto.
  - Entende **linguagem natural e converte-la em texto.**
  - Usado para criar **chatbots e call center bots.**
- Connect
  - Permite receber chamadas, criar contatos baseados na nuvem, ou seja contatos virtuais (Virtual contact center).
  - **Solução de centro de contato,** pode ser integrados com outros CRM ou AWS. De forma que receba um chamada e crie um chamado ou redirecione para um atendente (semelhante a URA).
  - Não tem pagamento UPfront **e 80% mais econômico que concorrentes.**

---

### Comprehend

- Usado para processamento de linguagem natural (**NLP**).
- Totalmente gerenciado pela AWS.
- Usado para:
  - **Entender a linguagem de um texto.**
  - **Se ele é positiva ou negativa.**
  - **Extrair frases, lugares, pessoas , marcas ou eventos.**
  - Permite usar **tokenization** nos textos.
- Exemplos de uso
  - **Analizar dezenas de e-mail,** buscando mensagem positivas ou negativas ou oportunidade.
  - Criar e agrupar artigos de mesmo contexto.

---

### Comprehend Medical

- Usado para interpretar **textos clínicos** (receita do medico).
- Pode se usar o **PHI (Protected Health Information)** usando NLP
- Permite ler receitas e anotações medicas e armazenar esses dados no S3 **e usando outras tecnologias converter essa anotações em documentos ou até mesmo áudio.**

---

### SageMaker

- Serviço gerenciado pela AWS, para criação de modelos de Machine Learning.
- Nele há a possibilidade de se criar um modelo **,treina-lo e aplica-lo e novos conjuntos de dados para predizer coisas.**

---

### Forecast

![image-20230303055156926](assets/image-20230303055156926.png)

- Serviço gerenciado pela AWS, que usa ML para realizar **previsões.**
- Exemplos: **Prever vendas futuras** de carros e outros itens.
- **50% mais acurado** quando olhando datas por si só.
- Reduz o **tempo de previsão de meses para horas.**
- Use cases: **Planejamento de demanda de produtos, planejamento de Financeiro e de recurso**.

---

### Kendra

![image-20230303055457981](assets/image-20230303055457981.png)

- Serviço gerenciado pela AWS, para **busca em documentos usando ML. (Document Search service)**
- Permite extrair resposta de documentos (text, pdf, HTML, PowerPoint, Word, FAQs).
- Pense que é um **buscador igual ao Google.**

---

### Personalize

![image-20230303060020714](assets/image-20230303060020714.png)

- Serviço gerenciado pela AWS, para criação de APP com **recomendações personalizadas** em tempo real.
- Exemplo:
  - **Recomendações personalizadas de produtos,**
  - Re/Ranking de produtos.
  - **Email de marketing direcionados e personalizados**.
- Usado na Amazon para recomendar produtos de acordo com histórico de pesquisa e compras.

---

### Textracs

![image-20230303060223380](assets/image-20230303060223380.png)

- Automaticamente **extrai textos, escritos a mão de documentos ou de arquivos escaneados usando IA e ML.**
- Extrai de tabelas, PDF, imagens.

---

## Outros Serviços

- **CodeCommit**: armazene o código em repositórios controlados por versão. O código pode existir em múltiplos branches (ramificações).
- **CodeBuild**: construa e teste o código sob demanda em suas pipelines de CICD.
- **CodeDeploy**: faça o deploy do código em EC2, Lambda ou ECS.
- **CodePipeline**: orquestre pipelines de CICD. Se usar o **CodeCommit** como fonte, ele se conectará a apenas um branch.
- **CloudSearch**: solução de busca **gerenciada** para realizar pesquisas de texto completo, auto completar em suas aplicações.
- **Alexa for Business**: use a Alexa para ajudar os funcionários a serem mais produtivos em salas de reunião e suas mesas.
- **Lex**: Reconhecimento automático de fala **(ASR)** para converter fala em texto. Útil para construir chatbots.
- **Connect**: receba chamadas, crie fluxos de contato, centro de contato virtual baseado em nuvem.
- **Rekognition**: encontre objetos, pessoas, textos, cenas em imagens e vídeos usando Machine Learning.
- **Kinesis Video Stream**: um fluxo por dispositivo de vídeo, análise usando instâncias do EC2 ou Rekognition.
- **WorkSpaces**: estações de trabalho Windows sob demanda. WAM é usado para gerenciar aplicativos.
- **AppStream 2.0**: transmita aplicativos de desktop para navegadores da web.
- **Mechanical Turk**: marketplace de **crowdsourcing** para realizar tarefas simples para humanos, integração com SWF.
- **Device Farm**: serviço de teste de aplicativos para seus aplicativos móveis e web em dispositivos reais.

### CodeGuru

![image-20230303062953533](assets/image-20230303062953533.png)

- Serviço de ML para automatizar code reviews de realizar recomendações de performance no código.
- provém duas funcionalidades:
  - **CodeGuru Review** - Realiza o review (analise) de conteúdo estático.
  - **CodeGuru Profiler** - Realiza recomendações sobre a performance das aplicação durante o tempo de execução.

---

### Alexa for Business, Lex e Connect

- **Alexa for Business**
  - Ajuda os empregados a serem mais produtivos.
  - Permite mensurar e incrementar a utilização de salas de reuniões.

---

### Kinesis Video Streams

- Um stream de **vídeo por dispositivo** (producer).
  - Cameras de segurança, smatphones
  - Pode se usar a biblioteca do Kinesis video strems.
- Dados são armazenados no S3 (Nós não temos acesso direto aos dados)
- **Não** pode enviar os dados de fluxo diretamente para o S3. (precisa criar um solução customizada)
- **Consumers**
  - EC2 para processamento em **tempo real.**
  - **Rekognition** para identificação de pessoas
    ![image-20230304054215911](assets/image-20230304054215911.png)

---

### WorkSpaces

- Ambientes de trabalhos seguros e gerenciados na nuvem(como fosse uma **VDI** na nuvem).
- Bom para eliminar o gerencimento de VDI (Virtual Desktop Infrastructure).
- **Paga-se por hora** ou pode se fazer uma assinatura mensal.
- **IP Access Control Groups**
  - Similar security group para os WorkSpace, permite configurar um range de IPs que podem acessar.
- Integrado com o AD da Microsoft.
  ![image-20230304054644456](assets/image-20230304054644456.png)
  ![image-20230304054812788](assets/image-20230304054812788.png)
  ![image-20230304055058906](assets/image-20230304055058906.png)

---

### AppStream 2.0

- Serviço de Stream de **aplicações desktop.**
- Entrega para qualquer computador se a necessidade de provisionar infraestrutura.
- As aplicação são entregues em **browsers web.**
- Ou seja, em vez de se o uma aplicação em 10 maquinas, pode se ter em uma única maquina e realizar stream dessa aplicação em vários computadores permitindo acessa-las via browser.
  ![image-20230307053059477](assets/image-20230307053059477.png)

---

### Device Farm

- Device Farm é um serviço de **testes de aplicativos móveis** na nuvem oferecido pela Amazon Web Services (AWS).
- Ele permite que desenvolvedores de aplicativos testem suas aplicações em uma ampla variedade de dispositivos móveis reais, como smartphones e tablets, sem precisar possuir cada um desses dispositivos fisicamente.
- O Device Farm automatiza testes em dispositivos móveis em paralelo, ajudando a detectar erros e problemas de desempenho em seus aplicativos antes de serem lançados no mercado.
- Além disso, o Device Farm também oferece **recursos de relatórios detalhados** que ajudam os desenvolvedores a entender melhor como suas aplicações estão sendo executadas em diferentes dispositivos.

---

### Macie

![macie](assets/image-20210907161308569.png)

- Usa **machine learning,** para detectar dados sensíveis (**PII - Personally identifiable information**).
- Totalmente **serveless**.
- Analisa os dados e notifica o **CloudWatch EventBridge** que notica via **SQS**, **SNS** ou
  **Lambda**.

---

### SES

![image-20230307054458395](assets/image-20230307054458395.png)

- Amazon **Simple Email Service**. É um serviço de e-mail em nuvem.
- Permite que empresas **enviem e-mail**s em grande escala para seus clientes ou usuários finais de forma rápida, confiável e escalável.
- Podem enviar e-mails transacionais, como confirmações de pedidos, notificações de transações financeiras, lembretes de senha e outros e-mails importantes relacionados ao serviço.
- Inclui recursos de monitoramento e relatórios detalhados, permitindo que as empresas avaliem a eficácia de suas campanhas de e-mail e monitorem a entrega de seus e-mails.
  - Conjunto de configuração. Permite customizar o envio e a analise do processo.
    - **Event Destinations** - permite configurar para onde será enviados os dados de envio e resposta do e-mail.
    - **Ip Pool Management** - Use para enviar e-mail específicos e **particulares**.
- Suporta **DKIM (DomainKeys Identified Mail) e SPF (Sender Policy Framework)**
- Pode ser acessado via API e SMTP.

---

### EC2 Imagem Builder

![image-20230307055200810](assets/image-20230307055200810.png)

- Serviço de **criação e gerenciamento de imagens de máquinas virtuais (VMs - AMIs) ou Container image.**
- Serviço gratuito (Pague apenas pelos recursos usados).
- Permite que os usuários criem, **atualizem e gerenciem imagens personalizadas de VMs para uso em ambientes de nuvem.**
- Permite automatizar o processo de criação de imagens, **incluindo a instalação de software, a aplicação de patches de segurança e a configuração de configurações personalizadas.**
  - Criação semanal com atualizações de segurança, ou atualização de pacotes.
- Pode ser integrado a outros serviços como o **S3 e o Systems Manager.**
- Permite publicar as AMsI em **Múltipla** regiões e contas
- Oferece recursos de versionamento e controle de acesso.

---

### IoT Core

![image-20230307060251713](assets/image-20230307060251713.png)

- Serviço de **gerenciamento de dispositivos IoT (Internet das Coisas)** . Serviço **serveless**.
- Fornece uma plataforma para **conectar, gerenciar e controlar dispositivos IoT**, permitindo que se colete e analisem dados de dispositivos em tempo real.
- Com o IoT Core, os dispositivos podem se comunicar de maneira segura e escalável, usando protocolos de comunicação padrão, como **MQTT e HTTPS.**
- Fornece recursos para gerenciamento dispositivos, como **registro de dispositivos, autenticação e autorização, gerenciamento de certificados, monitoramento de saúde do dispositivo e aplicação de atualizações de firmware.**
- Pode ser integrado com outros serviços como o **S3, o Amazon Kinesis e o AWS Lambda**, para realizar análises em tempo real e processamento de dados de dispositivos IoT.
  ![image-20230307060344190](assets/image-20230307060344190.png)
  ![image-20230307060408582](assets/image-20230307060408582.png)

---

Data Exchange
Data Pipeline
Lake Formation
AppFlow
Managed Blockchain
App Runner
Lightsail
Wavelength
EKS Distro
EKS Anywhere
Keyspaces (for Apache Cassandra)
Cloud9
CodeArtifact
CodeStar
Amplify
Pinpoint
Internet das Coisas:

- AWS IoT Analytics
- AWS IoT Core
- AWS IoT Device Defender
- AWS IoT Device Management
- AWS IoT Events
- AWS IoT Greengrass
- AWS IoT SiteWise
- AWS IoT Things Graph
- AWS IoT 1-Click
  Serviços de mídia:
- Amazon Elastic Transcoder
- Amazon Kinesis Video Streams
