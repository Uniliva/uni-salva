---
title: "Compute & Load Balancing"
sidebar_position: 3
---

![image-20230212210211474](assets/image-20230212210211474.png)

---

## EC2 - Elastic Compute Cloud 

- **Elastic Compute Cloud** (EC2).
- Máquinas na nuvem que podem ser utilizadas sob demanda.
- O armazenamento pode ser feito de duas formas:
  - **Network-attached:**
    - EBS (Elastic Block Storage).
  - **Hardware (EC2 Instance Store):**
    - Armazenamento físico diretamente na instância.
- A instância precisa estar conectada a uma rede.
- Deve possuir um firewall (**Security Group**).
- Quando a instância é parada, os dados da memória são perdidos, mas os dados armazenados no **EBS** são mantidos até a próxima inicialização.
- Caso queira preservar os dados em memória ao parar a instância, use a opção **Hibernate** (hibernar), que mantém os dados na RAM.
- Quando a instância é encerrada:
  - Os dados da memória e do **EBS** principal são perdidos.
  - É possível adicionar um segundo EBS ou marcar a opção para preservar o volume principal.
  
:::tip EC2 Nitro
**EC2 Nitro** é uma tecnologia de virtualização da AWS que:
- Melhora o desempenho da rede.
- Aumenta a eficiência de **IOPS** (operações de entrada/saída por segundo) no armazenamento **EBS**.
:::

:::info EC2 Graviton
- Proporciona melhor desempenho em relação ao custo, sendo **46% mais eficiente** que a 5ª geração.
- Suporta vários sistemas operacionais, como Linux e Amazon Linux 2 (AML 2).
- **Não é compatível com Windows.**
:::

---

> **EC2 vCPU**
- Uma **CPU física** pode ter múltiplos núcleos (**cores**), cada um com múltiplas **threads**.
- Uma **vCPU** representa uma dessas threads.
- É possível configurar a quantidade de vCPUs conforme a necessidade da aplicação.
  - Exemplo: uma aplicação Node.js que é **single-threaded** pode utilizar apenas **1 vCPU**.

---

> **Placement Groups (Grupos de Posicionamento)**
- Define a estratégia de posicionamento das instâncias EC2:
  - **Cluster:**
    - Todas as instâncias ficam juntas.
    - Baixa latência, mas ficam em uma única **AZ (Availability Zone)**.
    - Alta performance, porém com maior risco de falha.
    - Ideal para **processamento de Big Data** e **aplicações com baixa latência de rede**.
  - **Spread:**
    - Instâncias espalhadas em servidores diferentes, até **7 por AZ**.
    - Reduz riscos de indisponibilidade.
    - Indicado para **aplicações críticas**.
  - **Partition:**
    - Similar ao Spread, mas as instâncias são distribuídas em **diferentes partições (racks)** dentro de uma AZ.
    - Pode ter até **7 partições por AZ** e centenas de instâncias.
    - **Partições não compartilham o mesmo rack**.
    - Se uma partição falhar, todas as instâncias dentro dela serão perdidas.
    - Instâncias podem compartilhar dados da partição via **EC2 Metadata**.

:::warning
**Mover uma instância entre Placement Groups:**
- É necessário **parar a instância**.
- Utilizar **CLI** para alterar o Placement Group.
- Reiniciar a instância após a mudança.
:::

---

> Auto Scaling Group

- Permite ajustar automaticamente a quantidade de instâncias **EC2** com base na demanda.
- O ajuste pode ser feito com **CloudWatch** através de métricas ou eventos.
- Não há cobrança pelo **Auto Scaling Group**, apenas pelos recursos utilizados.
**Características principais:**
- **Escalabilidade:** capacidade de aumentar ou reduzir instâncias.
- **Elasticidade:** ajuste dinâmico com base na necessidade.
- **Agilidade:** provisionamento rápido de infraestrutura.
**Políticas de escalabilidade:**
- **Dynamic Scaling Policy:**
  - Baseia-se em métricas do **CloudWatch**, como **CPUUtilization** e **RequestCountPerTarget**.
- **Scheduled Scaling Policy:**
  - Agendamento para um período específico (ex: horário comercial).
- **Predictive Scaling Policy:**
  - Utiliza **Machine Learning** para prever e ajustar a escalabilidade com base em dados históricos.

:::note
**Para certificação:**
- O **Auto Scaling Group** encerra instâncias seguindo estas etapas:
  1. Encontra a AZ com maior número de instâncias.
  2. Remove a instância com a configuração mais antiga.
- **Diferença entre Launch Configuration e Launch Template:**
  - **Launch Configuration:** legado, precisa ser recriado para cada alteração.
  - **Launch Template:** moderno, com suporte a versionamento e configuração flexível.
:::


Para informações detalhadas sobre tipos de instâncias, acesse:
- [AWS EC2 Instance Types](https://aws.amazon.com/pt/ec2/instance-types/)
- [Vantage - AWS Instances](https://instances.vantage.sh/)

---

## ECS - Elastic Container Service

- **Elastic Container Service (ECS)** - Serviço de container proprietário da AWS.
- Você deve prover e manter a infraestrutura (instâncias EC2) ou utilizar o **Fargate**, que abstrai esse gerenciamento.
- O ECS em si não tem custo, você paga apenas pelos recursos utilizados (EC2, EBS, etc.).
- Para subir um container, primeiro é necessário configurar uma **ECS Task**, que descreve como o container será construído. A Task é semelhante a um arquivo **docker-compose** e define:
  - Políticas de acesso a recursos utilizados pela aplicação.
  - Configurações de rede e grupos de segurança.
- As Tasks podem ser disparadas pelo **EventBridge**, que aciona a execução do ECS.
- Integração direta com o **Application Load Balancer** e **Network Load Balancer**.

:::info
A **ECS Task** é um conceito essencial para a certificação AWS. Você deve entender como configurá-la e como ela se relaciona com a execução dos containers.
:::

> Conceitos

- **Execução em EC2 vs. Fargate:**
  - EC2: Requer provisionamento e gerenciamento das instâncias.
  - Fargate: AWS gerencia automaticamente a infraestrutura.
  
  ![image-20230214061221428](assets/image-20230214061221428.png)
  ![image-20230214061618805](assets/image-20230214061618805.png)
  ![ecs](assets/image-20210903065745303.png)
  ![ecs-ec2](assets/image-20210903070040856.png)
  ![ecs-fargate](assets/image-20210903070257948.png)
  ![fagate_ec2](assets/image-20210903074403137.png)
  ![ec2-fargate](assets/image-20210903074442934.png)

---

## EKS - Elastic Kubernetes Service

- **Amazon Elastic Kubernetes Service (EKS)** - Serviço de Kubernetes totalmente gerenciado pela AWS.
- Custo de **$0,1 por hora por cluster** Kubernetes (~$75/mês) mais os recursos utilizados (EC2, EBS, etc.).
- **Deploy complexo**, requer conhecimento especializado.
- **Open source**, facilitando a migração entre nuvens.
- Utiliza o **ECR** para armazenar as imagens.

> Tipos de Nodes

- **Gerenciados pela AWS**
- **Gerenciados pelo cliente**
- **AWS Fargate**

> Volumes

- Ao criar um node, é necessário especificar a classe de armazenamento.
- Utiliza **CSI (Container Storage Interface)**.
- Suporte a:
  - **EBS**
  - **EFS (quando usando Fargate)**
  - **FSx for Lustre**
  - **FSx for NetApp ONTAP**

:::tip
Para certificação, saiba como EKS gerencia volumes e a diferença entre EBS, EFS e FSx.
:::

> EKS On-Premises (EKS Anywhere)

- Permite rodar o **EKS no ambiente on-premises**.
- Pode-se utilizar uma **AMI customizada da Amazon para Kubernetes** localmente.
- Conexão do **EKS on-premises à AWS** via **EKS Connector**.
- Útil para casos onde:
  - É necessário **reduzir latência**.
  - Existem **regras regulatórias** exigindo armazenamento local de dados (exemplo: dados governamentais do Chile).

  ![eks](assets/image-20210903074736202.png)

:::warning
O EKS Anywhere é um tema relevante para certificações, pois permite rodar Kubernetes em ambientes híbridos.
:::

---

## ECR - Elastic Container Registry

- **AWS Elastic Container Registry (ECR)** - Repositório de imagens de containers.
- Pode conter **repositórios públicos e privados**.
- **Alta integração com ECS e EKS**.
- Acessos controlados via **IAM**.
- **Suporte à replicação** em múltiplas regiões e contas AWS.

> Segurança e Scans de Imagens

- Possui scanner de segurança integrado:
  - **Base scanning (CVE)** - Notifica vulnerabilidades via **EventBridge**.
  - **Scan profundo** - Utiliza o **Amazon Inspector** para análises mais detalhadas.

:::danger
A segurança das imagens de containers é frequentemente abordada em certificações AWS. Certifique-se de entender como funcionam os scans e as notificações de vulnerabilidades.
:::

---

## AWS Lambda

- Trabalha com eventos.
- Possui de **128 MB** até **10 GB** de memória disponível.
- Tem escopo regional.
- Pagamento baseado no **milissegundo** de execução.
- **Serverless** (não há necessidade de gerenciar servidores).
- Foco no código da aplicação, sem preocupações com infraestrutura.
- É necessário monitoramento adequado, pois a infraestrutura é liberada após o uso.
- Provisiona servidores automaticamente conforme a demanda.
- **Altamente disponível** e **tolerante a falhas**.
- Tempo máximo de execução: **15 minutos**.
- Cobrança a cada **100 milissegundos de uso**.
- Faz escalonamento horizontal e pode ter **até 999 execuções simultâneas**.

---

> Triggers

- API Gateway, 
- Kinesis, 
- DynamoDB Data Streams, 
- S3 events, 
- CloudFront, 
- EventBridge, 
- SNS, SQS, 
- CloudWatch Logs, 
- AWS Cognito, 

:::info
É essencial entender os diferentes gatilhos (triggers) do AWS Lambda para a certificação AWS.
:::

---

> Limitações

- **Execução**
  - **Alocação de memória:** 128MB - 10GB.
  - **CPU:** Vinculada à memória RAM (não é possível alterar diretamente).
    - 2vCPU - 1,719 MB de RAM.
    - 6vCPU - 10,240 MB de RAM.
  - **Tempo máximo de execução:** 15 minutos.
  - **Variáveis de ambiente:** até 4KB.
  - **Espaço em disco no container do Lambda (/tmp):** 10 MB.
  - **Execuções simultâneas da mesma Lambda:** 1000 (pode ser alterado mediante solicitação).
  - **Tamanho do payload:**
    - 6MB (síncrono).
    - 256 KB (assíncrono).

- **Deploy**
  - Tamanho máximo do pacote compactado (zip): 50MB.
  - Tamanho máximo do pacote descompactado: 250MB.
  - Tamanho máximo da imagem do container: 10 GB.

:::warning
As limitações de execução e deploy do AWS Lambda são frequentemente cobradas em exames de certificação.
:::

> Lambdas@Edge

- Permite executar Lambdas em pontos de presença (PoPs), auxiliando serviços como **CDN** e **Route 53**.
- Reduz latência ao executar código próximo ao usuário final.

  ![lambda@edge](assets/image-20210903204606738.png)

> CloudFront Functions

- Saiba mais em [Edge Functions](https://docs.uniii.com.br/02-cloud-notes/01-aws/03-aws-cloud-architect-professional/02-conteudo.html#edge-function).

---

## AWS App Runner

- Serviço **gerenciado pela AWS** que facilita o deploy de aplicações web ou APIs em escala.
- **Não requer conhecimento de infraestrutura** para ser utilizado.
- Pode ser iniciado a partir do **código-fonte** ou de uma **imagem de container**.
- **Compila e faz deploy automaticamente** da aplicação.
- **Escala automaticamente**, garantindo alta disponibilidade, load balancing e criptografia.
- Suporte a **acesso a VPC**.
- Permite integração com **banco de dados, cache e mensageria**.
- Semelhante ao conceito do **Heroku**.

  ![image-20230214194005966](assets/image-20230214194005966.png)

:::tip
O AWS App Runner é uma opção para quem busca simplicidade na implementação de aplicações sem gerenciar infraestrutura, algo que pode ser cobrado na certificação AWS.
:::


---
