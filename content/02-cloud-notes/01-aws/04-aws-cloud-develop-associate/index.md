
---
title: "Develop Associate"
weight: 4

---

---

{{% notice style="info" %}}
Leia sobre a [AWS Certified Developer - Associate. (DVA-C02)](https://aws.amazon.com/pt/certification/certified-developer-associate)
{{% /notice %}}

---

| Dominio | % do exame |
| ------- | ---------- |  
|Domínio 1: Desenvolvimento com os serviços da AWS |32%|
|Domínio 2: Segurança |26%|
|Domínio 3: Implantação |24%|
|Domínio 4: Solução de problemas e otimização |18%|


Recursos e produtos da AWS no escopo
{{% expand  title="veja a lista completa" %}}
Análise:
- [ ] Amazon Athena
- [ ] Amazon OpenSearch Service

Integração de aplicativos:
- [ ] AWS AppSync
- [x] Amazon EventBridge (Amazon CloudWatch Events)
- [x] Amazon SNS
- [x] Amazon SQS
- [x] Amazon Kinesis
- [ ] AWS Step Functions

Computação:
- [x] Amazon EC2
- [x] AWS Elastic Beanstalk
- [ ] AWS Lambda
- [ ] AWS Serverless Application Model (AWS SAM)

Contêineres:
- [x] AWS Copilot
- [x] Amazon ECR
- [x] Amazon ECS
- [x] Amazon EKS

Banco de dados:
- [x] Amazon Aurora
- [x] Amazon DynamoDB
- [x] Amazon ElastiCache
- [x] Amazon MemoryDB para Redis
- [x] Amazon RDS

Ferramentas do desenvolvedor:
- [ ] AWS Amplify
- [ ] AWS Cloud9
- [ ] AWS CloudShell
- [ ] AWS CodeArtifact
- [ ] AWS CodeBuild
- [ ] AWS CodeCommit
- [ ] AWS CodeDeploy
- [ ] Amazon CodeGuru
- [ ] AWS CodePipeline
- [ ] AWS CodeStar
- [ ] AWS X-Ray

Gerenciamento e governança:
- [ ] AWS AppConfig
- [ ] AWS Cloud Development Kit (AWS CDK)
- [X] AWS CloudFormation
- [x] AWS CloudTrail
- [x] Amazon CloudWatch
- [x] Amazon CloudWatch Logs
- [x] AWS CLI
- [ ] AWS Systems Manager

Redes e entrega de conteúdo:
- [ ] Amazon API Gateway
- [ ] Amazon CloudFront
- [ ] Elastic Load Balancing
- [x] Amazon Route 53
- [ ] Amazon VPC

Segurança, identidade e conformidade:
- [ ] AWS Certificate Manager (ACM)
- [ ] AWS Certificate Manager Private Certificate Authority
- [ ] Amazon Cognito
- [x] AWS IAM
- [ ] AWS KMS
- [ ] AWS Secrets Manager
- [ ] AWS Security Token Service (AWS STS)
- [ ] AWS WAF

Armazenamento:
- [x] Amazon EBS
- [x] Amazon EFS
- [x] Amazon S3
- [x] Amazon S3 Glacier
{{% /expand %}}

---

## Integração de aplicativos:

{{% notice style="tip" %}}

Tempos os seguintes serviços AWS usados para integração de aplicações:
- SQS -> para um modelo de filas.
- SNS -> para um modelo de pub/sub.
- Kinesis -> para um modelo de processamento em tempo real.
 {{% /notice %}}

---

### Amazon SQS

{{% notice style="note" %}}
Contextualização:
 - O que é [SQS](https://docs.uniii.com.br/02-cloud-notes/01-aws/03-aws-cloud-architect-professional/02-conteudo.html#amazon-sqs)
 {{% /notice %}}

#### Visão extra - desenvolvedor
- Usado para desacoplar aplicações.
- Tem baixa latência (<10 ms)
- Permite mensagem duplicadas (ou seja, não valida o conteúdo da mensagem).
- Para o processamento de mensagem duplicados, usa se o **Message visibility timeout** para tornar a mensagem invisível aos demais consumer.
- Para produzir mensagem usa se o SDK com a API (sendMessage).
- Há dois tipos de filas SQS
  - **Standard**
    - Tem Throughput ilimitado, e quantidade de mensagem na fila ilimitado.
    - Entrega a mensagem ao menos uma vez para os consumers
    - Ordenas as mensagens buscando o melhor esforço.
  - **FIFO** 
    - Tem throughput de 300 msg/s  e 3000 msg/s usando batch.
    - Não tem mensagens duplicadas. Pois tem uma funcionalidade que permite remove-las.
    - Ordena por ordem de chegada.
    - Entrega apenas uma vez a mensagem.
- Conceitos para desenvolvedores:
  - **Long Polling** - Capacidade opcional de ficar esperando, caso não haja mensagens na fila, ate uma mensagem chegar.
    - Reduz a quantidade de chamadas de API a fila, aumentado a eficiência e latência da aplicação.
    - Pode se configurar de 1 segundo a 20 (ideal) segundos de tempo.
    - É recomendado o uso ao invés do polling normal (short polling).
    - Pode ser configurado Queue level ou via API level usando **(ReceiveMessageWaitTimeSeconds)**.
  - **Extended Cliente** - Capacidade de enviar mensagem acima de 256kb usando o S3 para salvar a mensagem e se posta apenas os metadados na fila.
    - Usados para enviar videos para processamento,
  - Nomes das APIs
    - **CreateQueue** com (MessageRetentionPeriod), DeleteQueue
    - **PurgeQueue** - permite deletar todas as mensagens de uma fila.
    - **SendMessage** com (DelaySeconds), ReceiveMessage, DeleteMessage.
    - **MaxNumberOfMessages** - Permite definir a quantidade de mensagem que podem ser consumida por vez. (default 1 , max 10).
    - **ReceiveMessageWaitTimeSeconds** - Permite configurar o Long Polling.
    - **ChangeMessageVisibility** - Permite mudar o tempo de visibilidade da mensagem.
  - Há também API batch para enviar, deletar e mudar a visibilidade, o que reduz o custo diminuindo a quantidade de chamada ao SQS.
  - **FIFO** conceitos avançados
    - **de-duplication** - funcionalidade que permite recusar mensagens que estão duplicadas.
      - O tempo em que ignora uma nova mensagem com o mesmo id e de 5 minutos. A partir desse período não considera a nova mensagem como duplicata. 
      - Há dois métodos de de-duplication:
        - Baseado no conteúdo: Gerar um hash sha-256 do body para comparação.
          - Ao se criar a fila, pode setar se ele vai considerar esse método. Caso seleciona o método via ID sera opcional.
        - Baseado no ID: Se passa um id de de-duplication ao postar a mensagem.
    - **Message group** - permite agrupar mensagem por um MessageGroupId.
      - Utils quando se que usar a fila para mais de um processo, assim pode se configurar um consumer para considerar apenas as mensagens do grupo.
      - Porém a ordem só é garantida dentro do grupo.      
      ![image-20230812090743500](assets/image-20230812090743500.png)



---

### SNS 

{{% notice style="note" %}}
Contextualização:
 - O que é [SNS](https://docs.uniii.com.br/02-cloud-notes/01-aws/03-aws-cloud-architect-professional/02-conteudo.html#amazon-sns)
 {{% /notice %}}

#### Visão extra - desenvolvedor
- Há dois tipos de tópicos SNS:
  - **Standard**
    - Notifica a mensagem apenas uma vez para os subscritos. Depois a mensagem e deletada automaticamente.
    - Ordenas as mensagens buscando o melhor esforço.
  - **FIFO** 
    - Tem throughput de 300 msg/s  e 3000 msg/s usando batch.
    - Não tem mensagens duplicadas. Pois tem uma funcionalidade que permite remove-las.
    - Ordena por ordem de chegada.
    - Notifica apenas uma vez a mensagem.
    - Notifica apenas para **SQS FIFO**.


---

### Kinesis

{{% notice style="tip" %}}
- Usado para coletar, processar, analisar e distribuir dados em tempo real.
- Composto pelas aplicações
  - **Kinesis Data streams** - Captura, processa e armazena fluxos de dados.
  - **Kinesis Data Firehose** - Carrega dados para armazenamentos no AWS.
  - **Kinesis Data Analytics** - Analisa fluxos de dados com SQL e Apache Flink.
  - **Kinesis vídeo streams** - Capture, processa e guardar fluxo de dados de vídeos.
   {{% /notice %}}

{{% notice style="note" %}}
Contextualização:

 - O que é [Kinesis](https://docs.uniii.com.br/02-cloud-notes/01-aws/03-aws-cloud-architect-professional/02-conteudo.html#aws-kinesis)
 {{% /notice %}}

#### Visão extra - desenvolvedor

- Usado para ingestão de log, métricas, website ClickStreams, telemetria IOT.

- Kinesis Producer
  - Record é composto por:
    - chave de partição (gerada ao enviar para o kinesis), Blob data (ate 1MB).
    - Usa um hash chave de partição para definir em que shard vai armazenar.
    - Por isso que deve se definir uma boa chave de partição, de forma a espalhar os dado nos shards evitando sub utilização.
  - Pode ser produzidos por SDK (low level), KPL (high level por oferecer compressão e batch) e kinesis agent para logs de aplicação.
  - Usa a API **PutRecord**.
  - Recomenda usar KPL com Batch, para diminuir custos e aumentar o throughput.
  - Pode lançar a exception **ProvisionedThroughputExceeded** caso envie mais do que é capaz de aceitar. exemplo se tem apenas um shard (pois usou um PK bem restrita) e tenta enviar 2 MB/s sabendo que so aceita 1 MB/s.
    - Soluções:
      - Usar chaves de partições que seja bem distribuídas.
      - Implementar exponential backoff.
      - Aumentar a quantidade de shards.
  
- Kinesis Consumer
  - há dois modos de uso:
    - **Shared (Classic) Fan-out**
      - 2 MB/s considerando todos os consumers.
      - Usa a API **GetRecords**.
      - O consumer busca os dados (pull mode).
      - Tem limite de 5 chamadas de APIs por shard por segundos.
    - **Enhanced Fan-out**
      - 2 MB/s por consumer por shard.
      - Usa a API **SubscribeToShard**.
      - O shard envia os dados para o consumer (push mode).
      - Latência e muito baixa 70 ms.

- KCL - Kinesis client library
![image-20230812124931088](assets/image-20230812124931088.png)
  - Facilita o consumo dos dados. É uma lib java.
  - Cada shard pode ser lido apenas por uma instância KCL. 
    - exemplo: 4 shards -> pode se ter no máximo 4 instancias do KCL
    - Isso significa que o auto scale esta relacionado a quantidade de shard que se tem provisionados.
  - Usa o DynamoDB para guardar o progresso, por isso precisa configurar acessos no IAM. Isso porque pode haver mais de um KCL executando e para que não haja colisão o track é feito usando o DynamoDB.

- Kineses Operations
  - **Shard Splitting  **
    ![image-20230812125436219](assets/image-20230812125436219.png)
    - ​	Usado para aumentar a capacidade de stream, ou seja usado para quebrar um shard e outro novos, a fim de aliviar a carga.
    - o shard antigo vai ser deletado quando os dados expirarem e os dados novos serão divididos entre os novos.
  - **Shard Merging**
    ![image-20230812125719941](assets/image-20230812125719941.png)
    - O contrario do splitting
    - o shard antigo vai ser deletado quando os dados expirarem e os dados novos serão enviados para o novo.


---
## Computação:


----

### AWS Budget

> {{% notice style="note" %}}
Veja aqui tudo que vc precisa saber sobre [Budgets](https://docs.uniii.com.br/02-cloud-notes/01-aws/03-aws-cloud-architect-professional/02-conteudo.html#aws-budget)
{{% /notice %}}



---

### EC2

> {{% notice style="note" %}}
Contextualização:
 - O que é [EC2](https://docs.uniii.com.br/02-cloud-notes/01-aws/03-aws-cloud-architect-professional/02-conteudo.html#ec2)
 - O que é [Security Group](https://docs.uniii.com.br/02-cloud-notes/01-aws/03-aws-cloud-architect-professional/02-conteudo.html#security-group)
 {{% /notice %}}

 - Key pair
> {{% notice style="info" %}}
Ao gerar o key pair atente-se ao:
- Tipo da chave:
  -	RSA:  Usado em linux e Windows.
  -	ED25519: Não suportado pelo Windows.
- Formato
  - .pem - formato aberto usado pelo openssh.
  - .ppk - formato do putty (windows 7 e 8).
  {{% /notice %}}

- Security Group




#### Use data

Usado para pre configurar um instancia Ec2. O exemplo abaixo instala o apache na instância.

```shell
## Considerando que AMI seja RedHat Based.

#!/bin/bash
yum update -y
yum install httpd -y
systemctl start httpd
systemctl enable httpd
echo “Hello World from $(hostname -f)” > /var/www/html/index.html
```

#### IMDS - EC2 instance metadata

- Informações sobre a instância.
- Permite que instancias vejam informações sobre elas mesmas, sem a necessidade de ter um IAM Role.
- Pode ser acessado via **URL**: http://169.254.169.254/latest/meta-data.
  - Permite acessar tanto o user data (script de inicialização) quanto o meta data.
- Ha duas versões
  - **IMDSv1** 
    - Acessa diretamente a **URL**: http://169.254.169.254/latest/meta-data.
  - **IMDSv2** -
    - Mais seguro pois agora o acesso é feito em dois passos
    - Recuperar o token de sessão.
    - ```shell
      TOKEN=`curl -X PUT "http://169.254.169.154/latest/api/token" -H "X-aws-ec2-metadata-token-ttl-secondas:21060"`
      ```
    - Recuperar os dados passando o token via heardes:
    - ```shell
      curl http://169.254.169.254/latest/metadata -H "X-aws-ec2-metadata-token: $TOKEN" 
      ```
- Quando se configura credencias para a instancia ela usa o **IMDS** para recuperar-las usando a chamada
```shell
  curl  -H "X-aws-ec2-metadata-token: $TOKEN" http://169.254.169.254/latest/metadata/identity-credentials/ec2/security-credentials/ec2-instance
```

  


---

#### ELB / ASG

> {{% notice style="note" %}}
Contextualização:
 - O que é [ELB](https://docs.uniii.com.br/02-cloud-notes/01-aws/03-aws-cloud-architect-professional/02-conteudo.html#elastic-load-balancing)
 - O que é um [ALG](https://docs.uniii.com.br/02-cloud-notes/01-aws/03-aws-cloud-architect-professional/02-conteudo.html#auto-scaling-group-alg)
 {{% /notice %}}



---

### Beanstalk

> {{% notice style="note" %}}
Contextualização:
 - O que é [Beanstalk](https://docs.uniii.com.br/02-cloud-notes/01-aws/03-aws-cloud-architect-professional/02-conteudo.html#aws-elastic-beanstalk
)
 {{% /notice %}}

#### Beanstalk - Avançado

- Usa o **CloudFormation** para provisionar qualquer recursos na AWS.

- Dentre os formas de deploy (sigle instance e high availability) há a opção de usar instâncias spot.
- Os passos para usar o beanstalk são:
  - Configure a ambiente (plataforma (java, node ..) e recursos usados).
  - Configure os acesso do serviços (roles iam).
  - Configure rede, e banco de dados e tags. Opcional.
  - Configure trafego e politica de escalabilidade. Opcional.
  - Configure updates e monitoramento. Opcional.
- Tem uma funcionalidade de **swap envoriment** onde se pode redirecionar o DNS de um ambiente para outro.
  - O uso disso se faz numa implantação em prod, onde se cria um clone do ambiente atual e atualiza e testa no clone e após isso se troca esse pelo o de prod.
- Tem também um CLI chamado de **eb cli** que facilita o uso de CLI para automatizar pipelines.
- Dentro da aplicação que devemos deployar pode haver uma pasta **.ebextensions** na raiz e :
  - Tem o formato yml/json e a extensão do arquivo deve ser **.config**.
  - Permite altera configurações padrões usando **option_settings**
  - Permite adicionar recursos com RDS, ElastiCache, DynamoDb ....
  - Todos os recursos adicionado via **ebextensions** são deletado quando o ambiente é deletado.
- As opções de deploys para updates são:
  ![image-20230807090025037](assets/image-20230807090025037.png)
  - **All at once** - Tudo de uma vez.
    - É mais rápido, mas a instancia fica indisponível por algum tempo.
    - Bom para ambientes de dev e hom.  
    ![image-20230807084407578](assets/image-20230807084407578.png)
  - **Rolling** - Cria uma nova versão (chamada de **bucket**)  derrubando parte das instancias já existentes e redireciona o trafego quando a nova versão estiver de pé.

    - Não ha custo adicional.
    - Demora mais tempo para deployar.
  ![image-20230807084505741](assets/image-20230807084505741.png)
  - **Rolling com batches adicionais** - Igual ao anterior, mas faz o redirecionamento em partes, mantendo a convivência entre a nova e a versão antigo por algum tempo.
    - Diferente o anterior que seleciona parte das aplicações e derruba pra subir novas essa cria novas e convive com elas por um tempo.
    - Tem um custo adicional. Pois adiciona novas instância
    - Bom para ambientes produtivos. Pois se mantém a capacidade da aplicação sem comprometer o uso.
    ![image-20230807084827320](assets/image-20230807084827320.png)
  - **Immutable** - realiza o deploy das instâncias em novo ASG, e quanto esse estiver disponível, se move as instâncias para o ASG antigo e termina as instâncias anteriores.
    - Tem Zero Downtime. Pois cria um ASG temporário.
    - Tem um custo alto pois duplica a quantidade de instância.
    - Mas rápido que o **Rolling**.
    - Bom para produção
    ![image-20230807085227077](assets/image-20230807085227077.png)
  - **Blue/green** - Cria se um novo ambiente, e redireciona (Route 53) quando estiver tudo ok.
    - Tem Zero Downtime.
    - Não é uma feature do **beanstalk** é mais um conceito que pode aplicado. Pois o redirect tem que ser feito manualmente.
    ![image-20230807085546086](assets/image-20230807085546086.png)
  - **Traffic Splitting**  envia uma porcentagem de trafego para grupo de instâncias.
  - Usado para teste canário.
    - Duplica a quantidade de instâncias,
    - Tem um custo extra.
    - Facilita rollback e teste.
    ![image-20230807085801497](assets/image-20230807085801497.png)

---

#### Ciclo de vida (lifecycle police)

- Pode armazenar mais de 1000 versões de aplicações. Deve se remover de tempos em tempos versões antiga. 
- Para isso uso o Ciclo de vida que pode ser:
  - Baseado em tempo (versões antiga)
  - Baseado em espaço usado (quando se esta ocupando muito espaço com versões antigas)
- Oferece a opção de armazenar as versões no S3 para não haver perda de dados.

---

#### Beanstalk clonning

- Permite clonar um ambiente, mantendo as mesmas configurações.
- Útil para testar uma nova versão da aplicação. Ou atualização de versão da plataforma.
- Todos os recursos da nova versão são preservados.
  - Apenas no caso de Banco de dados que os dados não são clonados apenas as configurações.
- Usado em conjunto a a funcionalidade de **swap**, onde se cria um clone, implanta a nova versão e depois dela ok, se troca o DNS para apontar para a nova versão.



---

#### Migrations

- Após criar um ambiente, não se pode mudar o tipo do **load balancer** apenas as configurações, caso precise mudar sera necessário realizar uma migração.
  - Para isso:
    - Crie um novo ambiente com as mesmas configurações, exceto o ELB. (ou seja não pode ser um clone).
    - Deploy a aplicação no novo ambiente.
    - Use o Swap ou o Route 53 para redirecionar o trafego da aplicação.
    - Mate o ambiente anterior.
- Apesar de poder provisionar o RDS via Beanstalk, não é recomendado para ambiente produtivo. Nesse caso o ideal é ter o banco separado.

![image-20230808083912269](assets/image-20230808083912269.png)

---
## Contêineres:

### AWS CoPilot

![image-20230804061517407](assets/image-20230804061517407.png)

- CLI para build, release and operate aplicações conteinerizadas.
- Veja aqui o [Getting started](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/getting-started-aws-copilot-cli.html).
- Usa se Yaml para descrever a arquitetura da aplicação.
- Roda as aplicações no AppRunner, ECS e Fargate.
- Abstrai a complicações de infraestrutura, provisionando automaticamente, permitindo que se foque a criação da aplicação.
- Permite automatizar deploys com um comando usando CodePipeline.
- Permite deployar em vários ambientes, além de acesso a logs, troubleshooting e health checks.


### Amazon ECS

> {{% notice style="note" %}}
Contextualização:
 - O que é [ECS](https://docs.uniii.com.br/02-cloud-notes/01-aws/03-aws-cloud-architect-professional/02-conteudo.html#amazon-ecs)
   {{% /notice %}}



- Usa o **EFS** como volumes (ele é serverless), funciona tanto para EC2 e Fargate.
- Como soluções de arquitetura há:
  - Capacidade de ser acionada pelo EventBridge para executar um processamento de imagem por exemplo
    ![image-20230801070232324](assets/image-20230801070232324.png)
  - Possibilidade de usar o EventBridge para executar a cada hora (agendado).
  - Possibilidade de usar uma fila SQS com entrada de dados



##### IAM Roles for ECS

Há dois tipos:
- EC2 instance profile
- ECS Tasks Role

![image-20230801060747822](assets/image-20230801060747822.png)



### ECS Service Auto Scaling (tasks scaling)

Pode escalar usando 3 métricas:
- Via média uso de CPU.
- Via média de uso de memória.
- Via quantidade de requisição por target (métrica do ALB)

Pode escalar por
- **Target Tracking** - escala baseado numa métrica do CloudWatch.
- **Step Scaling** - escala baseado em um alarme do CloudWatch.
- **Scheduled Scaling** - escala usando um data e hora especifica.


#### ECS Tasks definitions
- Semelhante ao docker compose ou deployment (EKS), ou seja serve para definir como vai ser ciado o contêiner.
- Tasks rodando na mesma AZ compartilham o mesmo sistema de arquivo EFS.
- Numa Tasks é possível adicionar vários containers, como aqueles sidecars
- Caso esteja rodando com o Launch type EC2, pode se definir uma **task placement strategy** e uma **task placement constraints** para definir onde o **ECS** deve alocar os novos containers (tasks) criados. Funciona assim:
  - Se identifica a instância que atenda os requisitos de memoria e CPU e Portas definidos na **task definitions**.
  - Valida se a instância esta aderente as restrições de alocamento definidas na **task placement constraints**.
  - Valida se a instancia esta aderente as estrategias de alocamento definidas na **task placement strategy**.
  - Aloca na instância selecionada.
- As **task placement strategy** são
  - **BinPack** 
    - Alocará de acordo com memoria ou CPU.
    - Priorizando minimizar os custos.
    ![image-20230804055238263](assets/image-20230804055238263.png)
  - **Random**
    - Seleciona o instância para aloca randomicamente.
    ![image-20230804055224374](assets/image-20230804055224374.png)
  - **Spread**
    - Espalha de acordo com o valor passado, como instanceID, attribute:ec2.availability-zone
    - Esse prioriza a disponibilidade.
    ![image-20230804055118989](assets/image-20230804055118989.png)
- Pode se combinar as **task placement strategy**
![image-20230804055506695](assets/image-20230804055506695.png)
- Já as **task placement constraints** pode ser definidas para limitar o alocamento. Podendo ser:
  - **distinctInstance** - Obriga que o alocamento seja feito é instâncias deferentes.
  - **memberOf** - Obriga que se atenda a expressão que pode ser uma **cluster query language**
  ![image-20230804055847335](assets/image-20230804055847335.png)


#### EC2 Launch type - Auto Scaling (server scaling)

![image-20230801064002809](assets/image-20230801064002809.png)

- Serve para escalar o servidor que roda as instancias
- Pode usar o Auto Scaling group baseando-se em:
  - Uso do CPU
  - Adição programada, por eventos tipo horário comercial e noite.
- Pode usar o **ECS Cluster Capacity Provider**
  - Provisiona novas instâncias automaticamente para atender a demanda de tasks ECS.
  - Usa um Auto Scaling Group e adiciona novas instâncias quando considerando RAM e CPU usados.



#### Rolling Updates

- Define-se o **minimum  healthy porcent** e o **maximum percent** que são a quantidade de tasks da versão anterior que se quer manter e a quantidade de tasks que se pode haver.
![image-20230801065950959](assets/image-20230801065950959.png)
![image-20230801070008268](assets/image-20230801070008268.png)
![image-20230801070042188](assets/image-20230801070042188.png)

Tasks definitions
- Define como sera o contêiner docker.
- As informações primordiais são:
  - Imagem do contêiner.
  - Mapeamento de porta (contêiner e host).
  - Variáveis de ambiente.
    - Pode sem **hardcode**, ou referencias de **parameter** stores os **secrets**.
    - Pode ser carregadas em **bulk** do S3 (arquivos de configurações completos)
  - CPU e Memórias.
  - Configuração de rede
  - IAM Role
    - Se adiciona na **task definition** para dar acessos aos recursos
  - Configurações de Logs
- Como funciona no load balancer:
  - Para **EC2 launch types**
    - Cria se uma porta randômica para cada contêiner através da opção **Dynamic Host Port Mapping** na definição da task.
    - O ALB procura as portas na instância.
    - Deve se permitir trafego no **Security Group do EC2** de qualquer porta vindo do **Security Group do ALB.**
  - Para **Fargate**
    - Cada contêiner vai ganhar seu próprio IP (ENI), assim pode se manter a mesma porta para todos.
    - Na **task** só se define qual vai ser a porta do contêiner.
    - No **Security Group da ENI EC2** se permite a porta definida vinda do **Security Group do ALB**.
    - No **Security Group do ALB** se permite a porta definida da WEB,



---


### Amazon EKS

> {{% notice style="note" %}}
Contextualização:
 - O que é [EKS](https://docs.uniii.com.br/02-cloud-notes/01-aws/03-aws-cloud-architect-professional/02-conteudo.html#amazon-eks)
   {{% /notice %}}


### Amazon ECR

> {{% notice style="note" %}}
Contextualização:
 - O que é [ECR](https://docs.uniii.com.br/02-cloud-notes/01-aws/03-aws-cloud-architect-professional/02-conteudo.html#aws-ecr)
   {{% /notice %}}




---
## Banco de dados:

### RDS

> {{% notice style="note" %}}
Contextualização:
 - O que é [RDS](http://localhost:1313/02-cloud-notes/01-aws/03-aws-cloud-architect-professional/02-conteudo.html#rds)

- Veja também:
  - [Backups](http://localhost:1313/02-cloud-notes/01-aws/03-aws-cloud-architect-professional/02-conteudo.html#backups)
  - [Replicas de leituras](http://localhost:1313/02-cloud-notes/01-aws/03-aws-cloud-architect-professional/02-conteudo.html#read-replicas)
   - [Multi AZ disastre recover](http://localhost:1313/02-cloud-notes/01-aws/03-aws-cloud-architect-professional/02-conteudo.html#multi-az-disastre-recover)
   {{% /notice %}}

- Para converte um instancia do **RDS** de Sigle AZ para **Multi AZ**, só é necessario alterar o banco e mudar nas configuraçõa. E isso não gera disponibilidade.

---

### Aurora

> {{% notice style="note" %}}
Contextualização:
 - O que é [Aurora](http://localhost:1313/02-cloud-notes/01-aws/03-aws-cloud-architect-professional/02-conteudo.html#aurora)
 {{% /notice %}}

---

### ElastiCache

> {{% notice style="note" %}}
Contextualização:
 - O que é [ElastiCache](http://localhost:1313/02-cloud-notes/01-aws/03-aws-cloud-architect-professional/02-conteudo.html#elasticache)
 {{% /notice %}}

 - Estrategias de cache
   - **Lazy loading / Cache aside / Lazy population**
     - Tenta recuperar do cache, se não encontrar consulta no banco e salva no cache.
     - Vantagens:
       - Os dados em cache serão apenas os usados o que reduz armazenamento em cache.
     - Desvantagens
       - Os dados em cache pode esta desatualizados, pois só serão consultados com não estiverem mais em cache.
       - Demora mais para responder pois precisa buscar no banco (Read Penalty).
   - **Write Through**
     - Adiciona ou  atualiza o cache ao se atualizar o banco de dados.
     - Vantagens:
       - Os dados em cache estarão sempre atualizados.
       - Não há demora na busca do cache pois todo dados sera adicionado ao cache (write Penalty).
     - Desvantagens
       - Caso os dados do cache seja perdido, perde as vantagem disso, sendo necessário implementar o **lazy load**.
       - Todos os itens estarão em cache, sendo que talvez não seja necessário.
   - **TTL**
     - Termite setar um tempo de expiração do dado em cache.
     - Util para limpar dados antigos não usado, ou para força o **lazy load**.

---

### MemoryDB

- Serviço de banco de dados em memória.
- Compatível com o REDIS.
- Ultra performático com mais de 160 milhões de request por segundo.
- Tem dados gravados via logs de transação em Multi AZ.
- Pode escalar de 10 GBs ate 100 TBs de armazenamento.
- Usado em Web e mobile apps, gaming online e streaming de mídia.


---
## Ferramentas do desenvolvedor:

### X-Ray

- Permite analisar a aplicação visualmente, serviço de tracing distribuído da AWS.
- Facilita troubleshooting de performance.
- Ajuda a entender as dependências de serviços da aplicação (desenha o fluxo).
- Mostra quais serviços estão com erros e o percentual das requisições que estão sendo afetadas.
- Integra se com:
  - EC2 (on-premises), ECS, Lambda, BeanStalk, API Gateway, ELB.
  - Como configurar no beanStalk:
    - Pode se habilita através da extensões ou ao criar habilitando a flag em serviços.
    - Precisa que a role atribuída tenha acesso ao X-Ray.
  - Como configurar no ECS: 
    - Usa porta 2000 e protocolo UDP, 
    - Usa a variável de ambiente AWS_XRAY_DAEMON_ADDRESS para inciar o url do daemon.
    - Há 2 formas de se fazer:
      - Habilitando o daemon na instância do cluster.
      - Habilitando um contêiner que será um **side car** com o daemon.
      - Caso Fargate, usa o modelo **side car**.      
      ![image-20230813080418098](assets/image-20230813080418098.png)
- **Tracer**
  - Pode se habilitar para cada request ou por um percentual delas.
  - Fornecem informações extras do caminho do request.
- **Security**
  - Usa IAM para autorização.
  - Guarda os dados em repouso encriptado.

- Conceitos 
  - **Segment** - Representa uma aplicação, cada uma tem um.
  - **SubSegments** - Pode se querer granularizar uma aplicação, caso a api tenha dois endpoint pode se criar uma para cada.
  - **Trace** - Segmentos coletados junto do começo ao fim em um request por exemplo.
  - **Sampling** - Em vez de coletar todas a interações se coleta apenas algumas amostras (reduz os custos).
    - Por padrão envia a primeira requisição a cada segundo e 5% das demais requisições naquele segundo.
      - **reservoir** - é como chamada a o percentual de dados coletados na primeira interação.
      - **rate** - é como é chamado a requisições adicionais.
    - Pode se definir os valores do  **reservoir** e **rate** em uma **regra se sampling** para coletar mais ou menos dados. (Não precisa reiniciar a aplicação para isso)    
    ![image-20230813074728747](assets/image-20230813074728747.png)
  - **Annotations** - Mapa de chave e valor usados para indexar os traces e para realizar filtros.
  - **Metadata** - Informações adicionais, que não são indexadas e não são usadas para filtros.

- **API**
  - APIs que o daemon precisa para escrever os traces.  
  ![image-20230813075251286](assets/image-20230813075251286.png)  
  - APIs que o daemon precisa para ler os traces.  
  ![image-20230813075450709](assets/image-20230813075450709.png)


- **Como usar**
![image-20230813071856713](assets/image-20230813071856713.png)
  - Em aplicações: (Importa o SDK).
    - Se ajusta o código da aplicação para usar o SDK X-Ray.
    - Após isso o SDK ira capturar as interações (request https, para o banco de dados, para filas ...).
  - Em instâncias: (Habilita a integração via daemon).
    - Se instala o daemon do X-Ray (EC2 / Lambda), ele trabalha em baixo nível coletando pacotes UDP (Linux/ Mac/ Windows).
    - Cada aplicação deve ter permissões IAM para escrever no X-Ray.
    - Pode enviar traces cross account, para isso a IAM Role deve ser configurada.

- Problemas com X-Ray
  - Não funciona o EC2
    - Valide as IAM Roles, se est~ao com as permissões corretas.
    - Valide se o daemon esta rodando na instância.
  - Não funciona no Lambda
    - Valide se a IAM Execution Role esta com a permissão (AWSX-RayWriteOnlyAccess).
    - Valide se o X_Ray foi adicionado ao código lambda.
    - Valide se esta habilitado o **Lambda X-Ray Active Trancing**.

#### Distro for Open Telemetry
![image-20230813081055810](assets/image-20230813081055810.png)
![image-20230813081129324](assets/image-20230813081129324.png)

---
## Gerenciamento e governança:

### CloudFormation

{{% notice style="note" %}}
> Contextualização:

 - O que é [CloudFormation](https://docs.uniii.com.br/02-cloud-notes/01-aws/03-aws-cloud-architect-professional/02-conteudo.html#aws-cloudformation)
{{% /notice %}}

#### Extra

- Pode se usar o AWS CLI para deployar um template do CloudFormation.
- O CF trabalha com templates é composto por:
  - **Format version**: A versão do formato define a capacidade de um modelo
  - **Description**: Quaisquer comentários sobre o seu modelo podem ser especificados na descrição.
  - **Resources**: Recursos (AWS) que se quer criar. - Mandatório
    - Há mais de 224 tipos de recursos diferentes. [Veja todos ](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-template-resource-type-ref.html)
  - **Parameters**: São inputs dinâmicos que pode se passar para o template.
    - São usados para permitir o reuso dos templates.
    - Usa se a função **fn::Ref** para referenciar um parâmetro em qualquer lugar no template.
    - Em **YML** usa se o **!Ref** para representar a função **fn::Ref**.
    ![image-20230810194424083](assets/image-20230810194424083.png)
    - há também os Pseudos Parâmetros que são oferecido pela AWS.
    ![image-20230810195039529](assets/image-20230810195039529.png)
  - **Mappings**: Permite fazer o mapeamento de variáveis estáticas no template.
    - São valores hardcoded usados delimitar as escolhas. Ex: ambiente: dev, hml. prod.
    ![image-20230810195353883](assets/image-20230810195353883.png)
    - Para acessar usa se a função **fn::FindInMap** que no YML é **!FindInMap[MapName, TopLevelKey, SecondLevelKey]**.
    ![image-20230810195742359](assets/image-20230810195742359.png)
  - **Outputs**: Referencias de recursos que serão criados.
    - Permite exporta valores para serem usados em outras stack. Por exemplo, tem um stack do CF que cria uma VPC, pode se exportar o VPC ID e Subnets IDs para que possam ser usando em outra stack que cria os security groups.
    - Não é possível deletar uma stack, quem tem o output usado em outra stack. Ou seja não pode deletar pois há uma dependência.
    ![image-20230810200306843](assets/image-20230810200306843.png)
    - O campo export é opcional, e usado para renomear o item exportado, pois o nome deve ser único na região.
    - Para importar use a função **fn::ImportValue** que no YML é **!ImportValue**.    
    ![image-20230810200607679](assets/image-20230810200607679.png)
  - **Conditions**: Lista de condições para criação de recursos.
    - Usado para limitar a criação de recursos seja por ambiente (dev. hml, prod), por região (us-east-1) , ou parâmetro, etc.
    ![image-20230810200933533](assets/image-20230810200933533.png)
    - Pode ser aplicadas a recursos , outputs etc..
    ![image-20230810201241352](assets/image-20230810201241352.png)
    - Pode se usar as funções logicas:
      - **fn::And** -> YML **!And**
      - **fn::Equals** -> YML **!Equals**
      - **fn::If** -> YML **!If**
      - **fn::Not** -> YML **!Not**
      - **fn::Or** -> YML **!Or**
  - **Metadata**: Os metadados podem ser usados ​​no modelo para fornecer mais informações usando objetos JSON ou YAML.
- Há também as Funções intrisicas
    - **fn::GetAtt** (**!GetAtt** no YML) - usada para recuperar o valor de um atributo de um recurso criado. Uso:  !GetAtt [nome recurso].[nome atributo]
    - **fn::Ref** (**!Ref** no YML) - usada para referenciar o valor de parâmetros ou o id do recursos no template.
    - **fn::FindInMap** (**!FindInMap** no YML) - usada para acessar valores num mapa.
    - **fn::ImportValue** (**!ImportValue** no YML) - usada para importar outputs de outras stacks.
    - **fn::Join** (**!Join** no YML) - usada para juntar com um delimitador. Uso !Join [ delimitador, [valores separados por virgula]].
    - **fn::Sub** (**!Join** no YML) - usada para substituir variáveis por por texto. Uso !Sub 'nome variável'.
    - Condicionais - usada para avaliar condições.
      - **fn::And** -> YML **!And**
      - **fn::Equals** -> YML **!Equals**
      - **fn::If** -> YML **!If**
      - **fn::Not** -> YML **!Not**
      - **fn::Or** -> YML **!Or**
- Processo de rollback
  - A Criação da stack falhou:
    - Será feito o rollback automático o ela será deletada.
    - É possível desabilitar o delete no rollback para realização de troubleshoot.
  - A Atualização da stack falhou:
    - Será feito o rollback automático, mas da pra ser ver os eventos do ocorrido.
    - Pode se habilitar os logs pra saber mais detalhes.
  - Na criação da stack tem as duas opções, realizar o rollback ou manter os recursos problemáticos.
   ![image-20230810203106959](assets/image-20230810203106959.png)


- É possível habilitar a notificação das ações da stack via tópico SNS.
![image-20230810203717530](assets/image-20230810203717530.png)

- Tem o **CF Drift** que mostra qual foi a alteração que o recurso criado pela Stack sofreu.
  - Para usa-lo vá até a Stack e em opções use o **detect Drift**

- A Stack police serve para limitar as ações que uma Stack pode fazer, como por exemplos, quais recursos que pode criar ou atualizar.
  - Pode ser usada por organizações para evitar a criação de recurso ou atualização de recursos.
  - Ou para evitar atualizações acidentais, como por exemplo remoção de recurso do banco de dados de produção.

---

#### Tópicos avançados

- **StackSets**
  - Permite criar, deletar, atualizar stacks em múltiplas contas e regiões com uma única operação.
  - Administradores de contas podem criar StackSets.
  - Contas de confiança (Trusted accounts) também podem criar, atualizar e atualizar stacks de um StackSet.
  - Se atualizar um StackSet todas as contas sera atualizado.

- **ChangeSets**
  - Usados para verificar qual alterações serão aplicadas.
  - Não diz se a atualização será um sucesso, apenas mostra quais são as alterações.
  ![image-20230810204031080](assets/image-20230810204031080.png)

- **Nested Stacks**
  - Permite criar stack usando outras stack (stack aninhadas).
  - Usado quando se que aproveitar uma stack já pronta. 
  - Exemplo a stack que cria ALB, pode ser usada em vários lugares, só alterando os parâmetros. Ela pode usar uma stack que cria o Security Groups.
  ![](assets/cfn-console-nested-stacks.png)
  - Qual a diferença entre **cross** e **Nested Stacks**
    - Cross Stack
      - Usada para stack com diferente ciclos de vida.
      - Usa **Output** export e a **fn::ImportValues**.
      - Exemplo se cria uma VPC numa stack e o VPC ID sera usado por varias outras Stacks.
    - Nested Stack
      - Usado para componentes que sera reutilizados.
      - Exemplo: Stack de configurações de um ALB.
      - Não é uma stack compartilhada, as stack compõem um stack maior.
    
    ![image-20230810205136667](assets/image-20230810205136667.png)

---

###  AWS CloudTrail


{{% notice style="note" %}}
> Contextualização:

 - O que é [CloudTrail](https://docs.uniii.com.br/02-cloud-notes/01-aws/03-aws-cloud-architect-professional/02-conteudo.html#aws-cloudtrail)
{{% /notice %}}


---

### SDK

- O AWS CLI usa a SDK do Python (boto3).
- Caso não sete uma região de default é a us-east-1.

---

### Amazon CloudWatch


{{% notice style="note" %}}
Contextualização:
 - O que é [CloudWatch](https://docs.uniii.com.br/02-cloud-notes/01-aws/03-aws-cloud-architect-professional/02-conteudo.html#aws-cloudwatch)
 {{% /notice %}}

#### Visão extra - desenvolvedor
- métricas
  - Métricas pertencem a un **namespaces** e contem **dimensões** (atributos, exemplo: ambiente, id da instancia ...).
    - Pode se ter ate 30 dimensões diferente para cada métrica.
  - Para criar uma métrica customizadas use a API **PutMetricData** passando os atribuídos (dimensões).
  - Para configurar o tempo de resolução (período de coleta) usa a API **StorageResolution** podendo ser:
    - Standard -> 1 Minutos.
    - High Resolution -> 1|5|10|30 segundos - tem um alto custo.
  - Pode se enviar métricas de ate 2 semanas atrás ou 2 horas no futuro. Sem que haja rejeição do cloudWatch.
- Logs
  - Tem o **CloudWatch Logs Insights** - que permite realizar queries nos logs.
    - Pode se realizar filtros baseados em condições, calcular e realizar agregações estáticas, ordenar por eventos, limitar números de linhas retornadas.
    - Permite buscar em múltiplos logs grupos.
  - Pode se criar **métricas** customizadas em cima dos filtros do logs (Metric Filter).
    - Podem ser usadas para disparar alarmes.
    - Só geram dados com logs gerados a partir da hora que foi configurada.    
    ![image-20230812201334076](assets/image-20230812201334076.png)
- Alarmes
  - Permite criar alarmes compostos, que são agrupamentos de mais de um alarmes usando as condições AND ou OR.
  - Pode se testar se um alarme esta funcionado usando CLI.
- EventBridge
  - Para da acesso aos event buses é necessário ter um police.  
  ![image-20230812205210746](assets/image-20230812205210746.png)  
  - É possível definir uma estrutura para o evento (schema , tipo Avro), ou usar algum que já existe, com ele é possível definir o formato do evento que vai ser disparado por um SDK.
  - Fluxo
    - Se cria o event Bus que vai receber os eventos e vai encaminhar para um recurso ou um event Role.
    - Se cria um event role que vai configurar como vai funcionar a entrada de dados de um event bus.

---


### AWS CLI

{{% notice style="info" %}}
Pré requisitos:
- Instalar o [AWS CLI install](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html).
- Criar um **Access keys** para o usuário em IAM\Users\NOME_USER.
  - vá até a aba security credentials e depois **Access keys**.
  {{% /notice %}}
- Para configurar o **awscli** use o comando:
```shell
aws configure
# preencha os itens com os dados do access key.

# serve para configurar novos profiles (outra conta)
aws configure --profile <nome_novo_profile>

```
- Após isso o **awscli** já estará configurado.
```shell
# use o comando para testa e listar o usuários
aws iam list-user

# use o comando para testa e listar o usuários pra um profile e
aws iam list-user --profile <nome_profile>
```


#### MFA com CLI

- Primeiro é necessário ter o um dispositivo configurado no usuário que se deseja usar.
- Para usar MFA é necessário criar uma sessão temporária, usando a API **STS GetSessionToken**.
```shell
aws sts get-session-token --serial-number <arn-do-dispositivo-mfa> --token-code <codigo-mfa> --duration-seconds 3600
```
- Isso vai retornar credenciais temporárias.
- Após isso é necessário configurar um profile com esses dados.
  - Necessário adicionar o token de sessão manualmente no arquivo de configuração.
  - Recomendo criar um script que recebe o token e atualiza o profile.

---

### AWS Limits (Quotas)

- **API Rate Limits**
  - Descreve quantas chamadas se pode fazer nas APIs.
  - exemplos: 
    - a API describeInstances do ec2 é de 100 chamadas por segundo. 
    - a API getObjects do s3  é de 55000 por segundo por prefix.
  - Para erros intermitentes é recomendado implementar o **exponential backoff**.
  - Para erros consistente (limite ultrapassado sempre) recomenda-se solicitar um aumento no limite no **throttling**.

- **Service Quotas** - Limites de serviços
  - Descreve os limites dos serviços.
  - Pode se usar a API de contas para aumentar os limites ou abir um abir um ticket junto a AWS.


#### Exponential Backoff
- Aplica-se a todos o serviços AWS.
- Se estiver recebendo o erro **ThrottlingException** de forma intermitente.
- É um mecanismo de retry que já vem configurado nas chamadas de API via SDK.
- Mas caso use CLI, deve implementar caso necessário.
- Quais tipo de erros deve se usar o retry? apenas com erros **5xx** e **throttling**.

![image-20230725064736484](assets/image-20230725064736484.png)


---

### Credentials Provider chain

Descreve a sequencia que se usa para recuperar os acessos ao recursos da AWS.

- CLI
![image-20230725065043214](assets/image-20230725065043214.png)

- SDK
![image-20230725065206292](assets/image-20230725065206292.png)


---
## Redes e entrega de conteúdo:

### CloudFront

{{% notice style="note" %}}
> Contextualização:

 - O que é [CloudFront](https://docs.uniii.com.br/02-cloud-notes/01-aws/03-aws-cloud-architect-professional/02-conteudo.html#amazon-cloudfront)
{{% /notice %}}



Para que o CloudFront possa armazenar o cache ele gera a **cache key** que:

- Por default é formada o hostname + path do recurso.
- Mas é possível adicionar outros itens na formação dessa chave, sendo:
  - **HTTP Headers** - nome, whitelist
  - **Cookies** -   nome, whitelist, include all except , all
  - **Queries strings** -   nome, whitelist, include all except , all

- Todos os itens adicionado a chave são enviados automaticamente para a origem caso não encontre no cache.
- Mas é possível adicionar esses itens apenas na origem.
  - Cache policy vs Origin Request policy
  ![image-20230731061417341](assets/image-20230731061417341.png)

- Tem uma tela que permite invalidar o cache.

**Classes de cobrança**

- **all - all regions** - engloba todas as edge locations e tem melhor performance.
- **200 - most regions** - exclui as regiões mas caras
- **100** - as regiões mais baratas 



![image-20230731064707171](assets/image-20230731064707171.png)



**Logs em tempo real**

![image-20230731065011189](assets/image-20230731065011189.png)

---

### Route 53

{{% notice style="note" %}}
> Contextualização:

 - O que é [Route 53](https://docs.uniii.com.br/02-cloud-notes/01-aws/03-aws-cloud-architect-professional/02-conteudo.html#amazon-route-53)
   {{% /notice %}}



- Terminologia

![image-20230724061118595](assets/image-20230724061118595.png)



---

### VPC

{{% notice style="note" %}}
Não cai muitas coisas sobre isso na prova da certificação develop, mas é importante conhecer os conceitos.

![image-20230724075905032](assets/image-20230724075905032.png)

> Leitura recomendada:

 - [VPC para arquitetos](https://docs.uniii.com.br/02-cloud-notes/01-aws/03-aws-cloud-architect-professional/02-conteudo.html#aws-vpc)
   {{% /notice %}}


---
## Segurança, identidade e conformidade:


### IAM

- Escopo global, controle de acessos.
- Tem como base o mínimo privilegio possível.
- Criação de usuário e grupos de usuários, grupos não podem conter outros grupos.
- Se atribui políticas de acesso (IAM Police) ao grupo, que vão dar acesso a todos os usuário daquele grupo.
- Políticas de acesso (permissões).
  ![image-20230704063959224](assets/image-20230704063959224.png)
  - Escrita em json.
  - Seguir regra de menor privilégio.
  - A validação de acesso e feito a cada acesso, de forma automática.
  - Podem ser do tipo:
    - **identity-based** - Política que são destinados a usuário / grupos e rules
    - **resource-based** - Políticas que são atribuídas a recursos, para da acesso a outro recursos.
- Access keys - usadas para dar acesso ao AWS CLI e ao AWS SDK.
  - É possível usar um serviço de shell na nuvem (**cloud shell**) que gera um CLI sem a necessidade de configurar access key.
- Roles (funções)
  - Usadas para dar acessos de recursos a recurso (acesso ao S3 por um EC2)
  - Criação de roles de dão acesso a recurso sem ser necessário atribuir ao um usuário ou grupo
  - Podem ser assumidas por recursos ou usuários federados ou usuário de outras contas AWS.
- Dentro do **IAM** temos:
  - **iam user** - Usuário comum.
  - **federated user** - usuário de fora da organização, usuário do **Facebook** por exemplo.
  - **iam role** - permissões que são dadas a recurso, tipo EC2 para acessa um S3.
  - **identity provider (idp)** - Permite customizado acesso provider de terceiros e liberara acesso via token de acesso do STS.
- **IAM Conditions**
  - Permite adicionar condições nas políticas de acessos AWS.
    [![conditions](https://docs.uniii.com.br/02-cloud-notes/01-aws/01-aws-cloud-architect-associate/assets/image-20210907124841446.png)](https://docs.uniii.com.br/02-cloud-notes/01-aws/01-aws-cloud-architect-associate.html#image-167ee62909f74073da7853a674734374)
- **IAM Permission Boundaries** (limite de permissões)
  - Quando se criar usuário ou **Roles** e possível dar **permissão genéricas,** tipo de administrador , e setar um **limite** para essas permissões, exemplo o cara é administrado apenas nos recursos do S3.
  - SCP (Service control policies ).
    [![limite](https://docs.uniii.com.br/02-cloud-notes/01-aws/01-aws-cloud-architect-associate/assets/image-20210907130021397.png)](https://docs.uniii.com.br/02-cloud-notes/01-aws/01-aws-cloud-architect-associate.html#image-de03a6f085724008f9923afa31e24703)
- **Lógica da avaliação de política**
[![Lógica da avaliação de política - AWS Identity and Access Management](https://docs.uniii.com.br/02-cloud-notes/01-aws/01-aws-cloud-architect-associate/assets/PolicyEvaluationHorizontal.png)](https://docs.uniii.com.br/02-cloud-notes/01-aws/01-aws-cloud-architect-associate.html#image-bb88ec8672b017a01d1b1d9da984a184)

#### MFA (multi factory atutenticator)

- combinação de uma senha que você conhece com um dispositivo que é seu
```shell
- Há dois via sofware (dispositivo MFA virtual, Chave de chegurança U2F (ex: YUbiKey))
- Há uma opção de Hardware (ex: token Gemalto)
```

#### IAM Security Tools

- **IAM Credencial Report (Account level)** -> Lista todas as contas de usuário e o status de cada uma.
- **IAM Access Advisor** -> Mostras os serviços que o usuário tem acesso e a ultima vez que o mesmo acessou.

#### Responsabilidade compartilhada

> a segurança na cloud é compartilhada e a AWS e nós temos responsabilidades para garantir a conformidade e segurança
![image-20230705054643236](assets/image-20230705054643236.png)


---
## Armazenamento:

> {{% notice style="note" %}}
Contextualização:
 - Armazenamento [guia completo AWS](https://docs.uniii.com.br/02-cloud-notes/01-aws/03-aws-cloud-architect-professional/02-conteudo.html#storage)

 Veja direto o que é:
 - [EBS](https://docs.uniii.com.br/02-cloud-notes/01-aws/03-aws-cloud-architect-professional/02-conteudo.html#ebs---elastic-block-storage)
 - [Instance store](https://docs.uniii.com.br/02-cloud-notes/01-aws/03-aws-cloud-architect-professional/02-conteudo.html#instance-store)
 - [EFS](https://docs.uniii.com.br/02-cloud-notes/01-aws/03-aws-cloud-architect-professional/02-conteudo.html#efs---elastic-file-system)
{{% /notice %}}


### S3 

> {{% notice style="note" %}}
Contextualização:
 - [S3](https://docs.uniii.com.br/02-cloud-notes/01-aws/03-aws-cloud-architect-professional/02-conteudo.html#amazon-s3)

Uma questão comum quanto ao S3 é como melhorar o tempo de busca de arquivos, a arquitetura que melhora resolve esse problema seria criar um index no DynamoDB com os metadados e tags do arquivos e realizar as busca no DynamoDB e apenas recuperar os arquivos no S3.
{{% /notice %}}


 S3 - Encryption para prova

- **SSE-S3** - Criptografa os objetos do S3 usando chave gerenciada pela AWS (AES-256).
  - Usa o header "**X-amz-server-side-encryption**": "**AES256**".
- SSE-KMS - Criptografa os objetos do S3 usando chaves criadas no KMS.
  - As chamadas de uso do KMS é logado no cloudtrail.
  - Usa o header "**X-amz-server-side-encryption**": "**aws:kms**".
  - Usa a api **GenerateDataKey** para criptografar.
  - Tem limitação (quotas), pode não ser uma boa ideia usar se tiver muitas requisições, pois a cada chamada será consumido parte da cota, aumentando assim o custo, sendo melhor usar a **SSE-S3**
  - **Caso esteja usando essa criptografia, se o bucket for publico, o usuário não vai conseguir ver os objetos**, pois ele não vai ter acesso a chave.
  - Para conseguir realizar uploads no bucket, precisa ter acesso a permissão (**kms:GenerateDataKey**) caso contrario não vai conseguir.
- SSE-C - Criptografa os objetos do S3 usando a chave gerenciada pelo usuário, quando se usa por exemplo o Cloud HSM.
- Criptografia Client-Side - Quando o usuário criptografa os dados antes de enviar ao S3.
- É possível criar uma bucket police para forçar o uso do SSL nas requisições com a condição **aws:secureTransport**.
- também é possível criar polices para bloquear uploads de arquivos que não tenha um tipo de criptografia, usando uma police que bloqueia com as condições **s3:x-amz-server-side-encryption** ou **s3:x-amz-server-side-encryption-customer-algorithm**.

![image-20230728061932567](assets/image-20230728061932567.png)

