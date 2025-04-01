---
title: "Provisionamento de recursos"
sidebar_position: 10
--- 


## AWS Elastic Beanstalk  

> Visão Geral

O **AWS Elastic Beanstalk** é um serviço **PaaS (Platform as a Service)** que facilita a implantação e o gerenciamento de aplicações na AWS, sem que o desenvolvedor precise se preocupar com a infraestrutura subjacente. Ele cria e gerencia automaticamente os recursos necessários, como instâncias **EC2**, **Load Balancers**, **Auto Scaling**, **RDS** e **S3**, permitindo que os desenvolvedores foquem apenas no código.  

> Características Principais:

- **Facilidade para desenvolvedores**: Permite gerenciar aplicações e visualizar o ambiente de implantação de forma centralizada.  
- **Suporte a diversas tecnologias**: Suporta aplicações em **Java, .NET, PHP, Node.js, Python, Ruby, Go e Docker**.  
- **Infraestrutura gerenciada**: Cria automaticamente toda a infraestrutura necessária, bastando fornecer o código da aplicação (exemplo: um **arquivo WAR** para o Tomcat).  
- **Uso de componentes da AWS**: O **Beanstalk** usa serviços como **EC2, S3, RDS, CloudWatch, IAM, Auto Scaling e ELB** para operar.  
- **Modelo de PaaS**: Funciona de maneira semelhante ao **Heroku**, permitindo implantar aplicações sem gerenciar diretamente servidores.  
- **Custo do serviço**: O uso do **Elastic Beanstalk** é gratuito, sendo cobrados apenas os recursos subjacentes consumidos (EC2, S3, etc.).  
- **Ideal para migração**: Permite **migrar aplicações** para a AWS sem necessidade de gerenciar manualmente a infraestrutura.  
- **Infraestrutura como código**: Baseia-se no **AWS CloudFormation** para provisionar os recursos.  

![AWS Elastic Beanstalk](assets/image-20230312103936578.png)  

---

> Componentes do Elastic Beanstalk

- **Aplicação**: Representa o código-fonte e a configuração do ambiente.  
- **Versão da Aplicação**: Define uma versão específica do código a ser implantado.  
- **Ambiente**: Local onde a aplicação é executada.  

> Tipos de Tier no Elastic Beanstalk

- **Web Tier**: Projetado para aplicações **web**, utiliza um **Load Balancer** para distribuir o tráfego entre as instâncias EC2.  
- **Worker Tier**: Projetado para **processamento assíncrono**, usa **Amazon SQS** para filas de mensagens e **workers** para processar tarefas em segundo plano.  

![Tipos de Tier no Beanstalk](assets/image-20230807075302611.png)  

---

> Modos de Deploy no Elastic Beanstalk

- **Single Instance**:  
  - Usa **apenas uma instância EC2**, sem redundância.  
  - Recomendado para **ambientes de desenvolvimento e teste**.  

- **High Availability (HA)**:  
  - Usa múltiplas instâncias com **Load Balancer** e **Auto Scaling**.  
  - Ideal para **ambientes de produção**, pois garante alta disponibilidade e escalabilidade.  

![Modos de Deploy no Beanstalk](assets/image-20230807075325181.png)  

---

> Exemplo de Arquitetura do Elastic Beanstalk

Nesta arquitetura, o Beanstalk gerencia automaticamente a aplicação distribuindo o tráfego por meio de um **Load Balancer** e garantindo escalabilidade com **Auto Scaling**. O **CloudWatch** pode ser usado para monitorar métricas de desempenho, enquanto um banco de dados **RDS** pode ser integrado para persistência de dados.  

![Arquitetura Elastic Beanstalk](assets/image-20230222062858389.png)  

---

:::note 📌 **Detalhamento Técnico**  

- O **Elastic Beanstalk** suporta **rolling updates**, permitindo atualizar a aplicação sem tempo de inatividade.  
- Permite configurar **ambientes Blue/Green Deployment**, facilitando a transição segura entre versões.  
- É possível definir **perfis IAM** para controlar o acesso dos recursos usados pelo Beanstalk.  
- Pode ser integrado ao **CodePipeline** para **CI/CD**, permitindo deploys automáticos sempre que há mudanças no código.  
- Suporta **Custom Platforms**, permitindo criar imagens personalizadas do ambiente de execução.  

:::

---


## AWS CodeDeploy  

> Visão Geral

O **AWS CodeDeploy** é um serviço gerenciado que automatiza implantações de código em ambientes **EC2, ECS e Lambda**, garantindo alta disponibilidade e reduzindo o risco de downtime durante os deploys. Ele permite a implementação de diferentes **estratégias de implantação**, como **In-Place** e **Blue/Green**, facilitando a adoção de práticas de **Continuous Deployment (CD)**.  

---

> Estratégias de Deploy no AWS CodeDeploy

O **CodeDeploy** oferece duas abordagens principais para implantação:  

- **In-Place (Rolling Update)**  
  - Substitui a versão antiga da aplicação pela nova na mesma instância.  
  - Disponível **somente para EC2 e Auto Scaling Groups (ASG)**.  

- **Blue/Green Deployment**  
  - Cria um novo conjunto de recursos e **migra gradualmente o tráfego** para a nova versão.  
  - Permite **rollback rápido**, pois mantém o ambiente anterior até a conclusão do deploy.  
  - Utiliza o **Traffic Shifting** para redirecionamento do tráfego, podendo ser:  
    - **Canary** – Direciona uma pequena porcentagem do tráfego para a nova versão e aumenta progressivamente.  
    - **Linear** – Distribui o tráfego igualmente entre as versões até atingir 100%.  
    - **All-at-once** – Direciona 100% do tráfego para a nova versão de uma vez.  

---

> CodeDeploy com EC2

- O deploy é configurado utilizando o arquivo **AppSpec.yml**, que define a estrutura da aplicação e os estágios da implantação.  
- O **CodeDeploy** aplica as atualizações nas instâncias EC2 **de acordo com a estratégia de deploy escolhida**.  
- Pode-se configurar **hooks** para validar o processo de deploy antes e depois da atualização.  

![Deploy EC2](assets/image-20230312110435714.png)  

---

> CodeDeploy com Auto Scaling Groups (ASG)

- O deploy pode ser feito de duas maneiras:  
  - **In-Place** – Substitui parte das instâncias de acordo com a estratégia definida.  
  - **Blue/Green** – Cria um **novo Auto Scaling Group (ASG)** com instâncias atualizadas e usa um **ELB** para rotear o tráfego. Após validação, o ASG antigo é removido.  

---

> CodeDeploy com AWS Lambda

- O **CodeDeploy** cria **automaticamente uma nova versão da função Lambda**.  
- Para garantir uma transição segura, o CodeDeploy executa uma **Lambda de teste (Pre-Traffic)** para validar a nova versão antes do redirecionamento total do tráfego.  
- O **Traffic Shifting** controla o fluxo de tráfego entre as versões até a conclusão do deploy.  
- **CloudWatch Alarms** podem ser configurados para ativar um **rollback automático** caso ocorram falhas.  
- Após a validação, o tráfego é **completamente redirecionado** para a nova versão, e uma nova **Lambda de teste (Post-Traffic)** é executada para validação final.  

![CodeDeploy com Lambda](assets/image-20230222065311164.png)  
![Processo de Deploy Lambda](assets/image-20230312110533059.png)  

:::note 📌 **SAM Framework e CodeDeploy**  

O **AWS Serverless Application Model (SAM)** já possui **suporte nativo ao AWS CodeDeploy**, permitindo deploys automatizados em **funções Lambda** sem necessidade de configurações adicionais.  

:::

---

> CodeDeploy com Amazon ECS

- O CodeDeploy pode ser utilizado para **atualizar tarefas do ECS** sem interromper o serviço.  
- Utiliza **Traffic Shifting** para redirecionar solicitações entre a versão antiga e a nova.  
- Após a conclusão do deploy, as **tarefas da versão anterior são encerradas automaticamente**.  

![Deploy no ECS](assets/image-20230222065605029.png)  
![Finalização do Deploy ECS](assets/image-20230312110703556.png)  
![ECS - Traffic Shifting](assets/image-20230312110804503.png)  

---

:::note 📌 **Detalhamento Técnico**  

- O **CodeDeploy** pode ser integrado ao **AWS CodePipeline** para automação completa do CI/CD.  
- Suporta deploys em **on-premises**, permitindo atualizar aplicações em servidores físicos.  
- Pode ser configurado para executar **scripts personalizados** antes e depois do deploy usando o **AppSpec.yml**.  
- Em deploys Blue/Green no ECS, o CodeDeploy gerencia automaticamente **tarefas no Fargate ou no EC2**.  
- **Recomenda-se** usar o **CloudWatch Logs** para monitorar o processo de deploy e identificar falhas rapidamente.  

:::

---


## AWS CloudFormation  

> Visão Geral

O **AWS CloudFormation** é um serviço de **Infraestrutura como Código (IaC)** que permite criar, gerenciar e provisionar recursos da AWS usando arquivos no formato **YAML ou JSON**. Ele automatiza a criação e configuração de infraestrutura, garantindo consistência e escalabilidade.  

![CloudFormation](assets/image-20210911100149772.png)  

---

> Principais Características

- Permite **criar e gerenciar quase todos os recursos da AWS (95%)** de forma automatizada.  
- Usa **arquivos declarativos (YAML ou JSON)** para descrever a infraestrutura.  
- **Gerencia automaticamente a ordem de criação dos recursos**, garantindo que dependências sejam respeitadas.  
- Aplica **tags uniformes** nos recursos criados, facilitando o gerenciamento e a governança.  
- Permite **estimar custos** da infraestrutura antes da criação.  
- **Suporte a múltiplas contas e regiões** através de **StackSets**, permitindo criar infraestrutura globalmente.  
- Possui **suporte a recursos personalizados**, onde o CloudFormation chama uma função **AWS Lambda** para criar, atualizar ou excluir recursos que ele não suporta nativamente (ex: limpar buckets S3 ou criar infraestrutura on-premises).  
- **É a base para diversos serviços AWS**, como:  
  - **AWS Elastic Beanstalk**  
  - **AWS Service Catalog**  
  - **AWS Serverless Application Model (SAM)**  

---

> Políticas de Retenção e Exclusão de Recursos

O **AWS CloudFormation** permite definir **políticas de exclusão** para evitar a perda acidental de recursos importantes. Os principais tipos são:  

- **DeletionPolicy=Retain**  
  - Preserva recursos específicos ao excluir um stack.  
  - Útil para garantir que dados críticos não sejam apagados acidentalmente.  

- **DeletionPolicy=Snapshot**  
  - Cria um snapshot do recurso antes da exclusão.  
  - Aplicável a serviços como:  
    - **Amazon EBS** (volumes)  
    - **Amazon ElastiCache Cluster e Replication Group**  
    - **Amazon RDS** (instâncias e clusters)  
    - **Amazon Redshift**  

- **DeletionPolicy=Delete (padrão)**  
  - Remove completamente os recursos ao excluir o stack.  
  - **Exceção:** No caso de **RDS Clusters**, o comportamento padrão é `DeletionPolicy=Snapshot`, evitando perda de dados acidental.  

- Para remover um **Amazon S3 Bucket**, ele deve estar **vazio** antes da exclusão.  

---

:::note 📌 **Detalhamento Técnico**  

- O CloudFormation permite **atualizar stacks sem downtime** usando a estratégia **Change Sets**, que simula as mudanças antes da aplicação.  
- Ele pode ser integrado ao **AWS CodePipeline** para automação do CI/CD.  
- **StackSets** permitem replicar infraestrutura em várias contas e regiões, garantindo padronização e conformidade.  
- **Drift Detection** possibilita verificar se há alterações manuais feitas nos recursos que podem afetar a infraestrutura gerenciada pelo CloudFormation.  
- É possível utilizar **Transformações (Transforms)** para reutilizar templates e aplicar extensões como **AWS::Serverless-2016-10-31** (SAM).  

:::

---

## AWS SAM - Serverless Application Model  

> Visão Geral

O **AWS Serverless Application Model (SAM)** é um framework que facilita o desenvolvimento, teste e deploy de aplicações **serverless** na AWS. Ele simplifica a configuração de recursos como **AWS Lambda, API Gateway e DynamoDB**, usando um modelo **YAML** que é transformado em **CloudFormation**.  

---

> Principais Características

- **Modelo declarativo em YAML**, simplificando a definição da infraestrutura serverless.  
- **Execução local**: Permite testar **Lambda, API Gateway e DynamoDB** sem precisar implantar na AWS.  
- **Deploy com Traffic Shifting** via **AWS CodeDeploy**, reduzindo riscos em atualizações.  
- **Baseado no AWS CloudFormation**, garantindo escalabilidade e reutilização de infraestrutura.  

---

:::tip 💡 **Dica Importante**  

O **AWS SAM** adiciona transformações ao **CloudFormation**, permitindo que aplicações serverless sejam definidas com **menos código** e mais abstração. Isso torna a configuração de recursos como **Lambda e API Gateway** mais rápida e eficiente.  

:::

---

> Arquitetura com AWS SAM

A arquitetura do SAM permite que desenvolvedores modelem e implantem **infraestrutura e código** de maneira unificada.  

![AWS SAM Arquitetura](assets/image-20230222104901039.png)  

---

:::info **Dica**   

- **SAM CLI** permite testar funções **Lambda** localmente antes do deploy.  
- **SAM Build** compila o código das funções **Lambda** antes da implantação.  
- **SAM Package & Deploy** automatiza a criação e atualização de stacks no **CloudFormation**.  
- **SAM Policy Templates** facilita a atribuição de permissões aos recursos AWS.  
- **SAM Pipelines** pode ser integrado ao **AWS CodePipeline** para CI/CD de aplicações serverless.  

:::

---

:::caution **Atenção na Prova**  

Questões da certificação AWS podem perguntar sobre **como implantar aplicações serverless** com **menor tempo de inatividade**. O **SAM + CodeDeploy (Traffic Shifting)** é uma solução recomendada, pois permite implantações com **Canary, Linear e All-at-once** para reduzir riscos.  

:::

---


## AWS CDK (Cloud Development Kit)  

> Visão Geral

O **AWS Cloud Development Kit (CDK)** é um framework de infraestrutura como código (**IaC**) que permite definir e implantar recursos AWS usando **linguagens de programação familiares**, como **TypeScript, Python, Java, C# e Go**. Diferente do **CloudFormation**, que usa **YAML/JSON**, o **CDK permite escrever código imperativo**, tornando a definição da infraestrutura mais flexível e reutilizável.  

---

> Principais Características

- **Infraestrutura como código (IaC)** utilizando linguagens de programação.  
- **Gera automaticamente templates do CloudFormation** para provisionamento de recursos.  
- **Componentes reutilizáveis** chamados de **"constructs"**, que permitem abstrações poderosas.  
- **Suporte a múltiplas linguagens**: TypeScript, Python, Java, C# e Go.  
- **Melhor integração com práticas de CI/CD**, como **AWS CodePipeline**.  

---

:::tip 💡 **Dica Importante**  

Se você já trabalha com desenvolvimento de software, o **AWS CDK** permite definir a infraestrutura com **o mesmo paradigma de programação**, evitando a necessidade de aprender **YAML ou JSON** do CloudFormation.  

:::

---

> Componentes do AWS CDK

O CDK organiza a infraestrutura em **três principais componentes**:  

- **Constructs**: Blocos básicos de construção que representam um ou mais recursos AWS.  
- **Stacks**: Unidades de provisionamento que correspondem a stacks do CloudFormation.  
- **Apps**: Contêiner principal que contém uma ou mais stacks.  

![AWS CDK Arquitetura](assets/image-20230222120307732.png)  

---

> Exemplo de Código

Aqui está um exemplo simples de código em **TypeScript** que cria uma **função Lambda** e uma **tabela DynamoDB** usando o **AWS CDK**:  

```typescript
import * as cdk from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';

class MyStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Criando uma função Lambda
    const myLambda = new lambda.Function(this, 'MyFunction', {
      runtime: lambda.Runtime.NODEJS_18_X,
      handler: 'index.handler',
      code: lambda.Code.fromAsset('lambda'),
    });

    // Criando uma tabela DynamoDB
    new dynamodb.Table(this, 'MyTable', {
      partitionKey: { name: 'id', type: dynamodb.AttributeType.STRING },
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
    });
  }
}

const app = new cdk.App();
new MyStack(app, 'MyCDKStack');
```

---

:::info **Dica**   

- O **CDK synth** converte o código em **CloudFormation templates** automaticamente.  
- O **CDK deploy** aplica as mudanças diretamente na AWS.  
- O **CDK diff** compara a infraestrutura atual com as alterações planejadas.  
- **Constructs personalizados** podem ser criados para reutilizar código entre projetos.  

:::

---

:::caution **Atenção na Prova**  

Na certificação AWS, pode haver questões comparando **CloudFormation e CDK**. Lembre-se:  
- O **CloudFormation** é **declarativo** (YAML/JSON).  
- O **CDK** é **imperativo** e usa linguagens de programação.  
- Ambos geram **stacks do CloudFormation**, mas o **CDK adiciona camadas de abstração**.  

:::

---

## AWS Service Catalog  

> Visão Geral

O **AWS Service Catalog** permite criar, gerenciar e distribuir catálogos de serviços de TI aprovados dentro de uma organização. Ele é usado para padronizar a infraestrutura e garantir que os recursos AWS utilizados sigam **políticas de governança, segurança e compliance** definidas pela empresa.  

---

> Principais Características

- **Controle centralizado** sobre os serviços AWS disponíveis para as contas da organização.  
- **Melhoria na governança e conformidade** ao restringir quais serviços podem ser utilizados.  
- **Criação de catálogos baseados em templates do CloudFormation**, facilitando a padronização da infraestrutura.  
- **Gerenciamento via IAM Policies**, garantindo que somente usuários autorizados possam provisionar recursos.  

---

:::tip 💡 **Dica Importante**  

O **AWS Service Catalog** é ideal para organizações que desejam fornecer **um conjunto de serviços padronizados** para desenvolvedores, evitando a criação manual de infraestrutura não aprovada.  

:::

---

> Funcionamento do AWS Service Catalog

1. **Administradores** criam templates de produtos utilizando **AWS CloudFormation**.  
2. Esses produtos são organizados em **portfólios**, que agrupam diferentes serviços disponíveis.  
3. As permissões de acesso são controladas via **AWS IAM Policies**, garantindo que apenas usuários autorizados possam provisionar recursos.  
4. **Usuários finais** acessam o catálogo e provisionam os produtos conforme necessário, sem precisar criar manualmente cada recurso na AWS.  

---

> Componentes do AWS Service Catalog

- **Produto**: Um recurso ou conjunto de recursos AWS definido via **CloudFormation**.  
- **Portfólio**: Um grupo de produtos organizados para um determinado conjunto de usuários ou equipes.  
- **Permissões de Acesso**: Controladas via **IAM Policies**, determinando quais usuários podem acessar e provisionar recursos.  
- **Versionamento**: Permite gerenciar diferentes versões dos produtos dentro do catálogo.  
- **Regras de Conformidade**: Definem restrições e configurações obrigatórias para os recursos provisionados.  

---

![AWS Service Catalog](assets/image-20230312103936578.png)  

---

:::info **Dica**   

- O **AWS Service Catalog** pode ser integrado ao **AWS Organizations** para aplicar padrões de governança em várias contas.  
- Os produtos podem ser **automatizados** usando **AWS Lambda e AWS Step Functions**.  
- Suporta **CloudFormation StackSets**, permitindo a criação de recursos em **múltiplas contas e regiões**.  

:::

---

:::caution **Atenção na Prova**  

Na certificação **AWS Certified Solutions Architect - Professional**, você pode encontrar questões comparando o **AWS Service Catalog** com **AWS Control Tower e AWS Organizations**. Lembre-se:  
- O **Service Catalog** **define e restringe os serviços disponíveis** para os usuários.  
- O **Control Tower** gerencia a **configuração inicial** e a **conformidade contínua** das contas AWS.  
- O **AWS Organizations** permite **gerenciamento centralizado** e **aplicação de políticas SCP** (Service Control Policies).  

:::

---

## AWS Systems Manager  

> Visão Geral

O **AWS Systems Manager (SSM)** é um serviço que facilita a **gerência de infraestrutura** em larga escala, abrangendo **instâncias EC2, máquinas on-premises e ambientes híbridos**. Ele permite **monitoramento, automação, aplicação de patches e execução remota de comandos**, sem a necessidade de acessar diretamente os servidores.  

---

> Principais Funcionalidades

- **Gerenciamento de grupos de recursos**, facilitando a visualização de dados operacionais.  
  - Permite **execução remota de comandos (scripts)** em grupos de instâncias.  
- **Suporte a EC2 e infraestrutura on-premises**, possibilitando uma administração unificada.  
- **Detecção de problemas de infraestrutura** com monitoramento automatizado.  
- **Automação de patches de atualização**, garantindo que sistemas estejam sempre protegidos.  
- **Conexão segura via SSM Session Manager**, eliminando a necessidade de **SSH, Bastion Hosts e chaves SSH**.  
  - Permite conexão via **AWS Console**.  
  - Registra logs detalhados no **AWS CloudTrail**.  

---

![AWS Systems Manager - Console](assets/image-20230223053512425.png)  

---

:::info 📌 **Integrações do AWS Systems Manager**  

- **CloudWatch** → Monitoramento de métricas e dashboards.  
- **IAM** → Controle de permissões para execução de comandos e acesso ao SSM.  
- **CloudTrail** → Registro de logs de auditoria das sessões SSM.  

:::

---

> Uso e Requisitos

1. **Instalar o Agente SSM** na instância EC2 ou máquina on-premises.  
2. **Criar uma Role IAM** para permitir que o agente tenha acesso ao **AWS Systems Manager**.  
3. **Configurar políticas de acesso**, garantindo que apenas usuários autorizados possam gerenciar as instâncias.  

:::caution **Importante!**  

O **AWS Systems Manager** suporta **Windows, macOS e Linux** e **não precisa de SSH** para funcionar. Isso reduz riscos de segurança, pois **elimina a exposição de portas SSH na internet**.  

:::

---

> Gerenciamento de Patches

O **AWS Systems Manager** possui um **Patch Manager**, que permite **automatizar e aplicar patches de segurança** em larga escala, garantindo que as instâncias estejam sempre protegidas.  

![Patch Manager](assets/image-20230223053242769.png)  

---

:::tip 💡 **Dica Prática**  

O **Session Manager** do **AWS Systems Manager** é ideal para ambientes corporativos onde é necessário **auditar acessos a servidores** e **evitar exposição de portas SSH**.  

:::

---

## AWS Cloud Map  

> Visão Geral

O **AWS Cloud Map** é um serviço totalmente gerenciado pela AWS, utilizado para a **descoberta de serviços e recursos** em sua infraestrutura, permitindo que as aplicações encontrem e se conectem a serviços de forma eficiente e escalável.  

---

> Principais Funcionalidades

- **Descoberta de Serviços**: O Cloud Map permite que você registre e descubra serviços e recursos dentro da sua rede. Ele fornece uma forma centralizada de mapear todos os serviços em sua infraestrutura.
- **Mapeamento de Recursos**: Com o Cloud Map, você cria um **mapa de serviços e recursos**, o que facilita a conexão entre o front-end e os serviços back-end, tornando mais eficiente o gerenciamento de comunicação entre diferentes partes da aplicação.  
- **Health Checks**: O Cloud Map possui **health checks** integrados, que permitem monitorar o estado de saúde dos serviços registrados. Isso é essencial para garantir que os serviços estão operando corretamente e de forma confiável.  
- **Integração com o Route 53**: O AWS Cloud Map é totalmente integrado com o **Amazon Route 53**, permitindo que você use DNS para resolver nomes de serviços e facilitar a comunicação entre eles.  
- **Query via SDK, API ou DNS**: Você pode realizar consultas ao Cloud Map utilizando diferentes métodos, como **SDK**, **API** ou **DNS**, oferecendo flexibilidade na integração com suas aplicações.  

---

![Cloud Map](assets/image-20230223054719268.png)  

---

:::info 📌 **Dica Importante**  

O **AWS Cloud Map** é essencial para ambientes em que a **descoberta dinâmica de serviços** é necessária, como em arquiteturas de microserviços. Ele facilita a comunicação entre serviços distribuídos e garante que a aplicação se conecte sempre aos serviços corretos, mesmo em um ambiente altamente dinâmico e escalável.

:::

---

> Principais Casos de Uso

1. **Microserviços**: Em uma arquitetura de microserviços, onde os serviços podem ser frequentemente escalados ou modificados, o **AWS Cloud Map** ajuda a garantir que os serviços se encontrem e se comuniquem corretamente.  
2. **Aplicações Distribuídas**: Para sistemas com múltiplos componentes distribuídos em diferentes regiões ou ambientes, o **Cloud Map** facilita a comunicação e descoberta de serviços entre essas partes.
3. **Alta Disponibilidade e Resiliência**: Com a integração de **health checks**, o **Cloud Map** pode ajudar a redirecionar o tráfego para serviços saudáveis, aumentando a **disponibilidade** e **resiliência** do sistema.

---

:::caution **Atenção**  

Certifique-se de que todos os **serviços registrados** no **AWS Cloud Map** possuam **health checks** adequados, para evitar que o sistema direcione o tráfego para instâncias ou serviços **não saudáveis**.  

:::

---
