---
title: "Monitoramento"
sidebar_position: 9
--- 

## AWS CloudWatch  

> O **Amazon CloudWatch** é um serviço de monitoramento e observabilidade que coleta **logs, métricas e eventos** de serviços AWS e aplicações. Ele permite visualizar dados, criar alarmes e acionar ações automáticas com base em métricas.

---

> Logs

- O **CloudWatch Logs** coleta métricas e logs de serviços AWS e aplicações personalizadas.
- Os logs podem ser enviados de diversas fontes, incluindo:
  - **SDK, CloudWatch Logs Agent e CloudWatch Unified Agent**.
  - **Serviços AWS** como Elastic Beanstalk, ECS, Lambda, VPC Flow Logs, API Gateway e CloudTrail.
  - **Route 53** (logs de consultas DNS).
- Logs podem ser **exportados para o Amazon S3** ou enviados via stream para o **Amazon OpenSearch** para análises avançadas.
- **Estrutura dos logs no CloudWatch:**
  - **LogGroup** → Agrupamento de logs de uma aplicação ou sistema.
  - **LogStream** → Fluxo contínuo de logs de um recurso específico.
- Possibilidade de **definir retenção** e configurar **exportação periódica** para o Amazon S3.
- Suporte a **criptografia KMS** nos logs.
- Permite visualizar logs em tempo real através do **CloudWatch Logs Insights** ou via **CLI**.

**Destinos suportados para envio de logs:**  
- **Amazon Kinesis Data Streams**  
- **Amazon Kinesis Firehose**  
- **AWS Lambda**  
- **Amazon OpenSearch**  
- **Amazon S3** (Exportação)  
 - Suporta apenas criptografia **AES-256 (SSE-S3), não suporta SSE-KMS**.  
 - Pode levar até **12 horas** para exportar.  
 - Exportação não é automática, exige configuração manual ou uso da API **CreateExportTask**.  

**Exemplo de arquitetura de logs:**  

![Subscrição de logs](assets/image-20230222054249909.png)  

**Agregação de logs multi-região:**  

![Agregação de logs](assets/image-20230222054341446.png)  

:::info 🚀 **Importante**  
A maioria dos problemas no CloudWatch Logs ocorre por **permissões configuradas incorretamente** no IAM.  
:::

- O CloudWatch permite **filtrar logs** usando expressões regulares, identificando padrões e acionando **alarmes** com base em eventos críticos.
- Por padrão, **instâncias EC2 não enviam logs** automaticamente. Para capturar logs, é necessário configurar o **CloudWatch Agent**.
  - O **CloudWatch Unified Agent** deve ser instalado manualmente nas instâncias EC2 para envio de logs.
  - É necessário configurar uma **IAM Policy** com permissões adequadas.

**Arquitetura do CloudWatch Unified Agent:**  

![Unified Agent](assets/image-20210906093405257.png)  

---

> Métricas

- O CloudWatch coleta métricas automaticamente dos serviços AWS, permitindo monitoramento e automação.
- Modelo de funcionamento:
  - **Métricas** → Thresholds (limites definidos) → Ações
- Alarmes podem ser criados com base nas métricas e acionam ações, como:
  - **Publicação em um tópico SNS** para notificações.
  - **Disparo de um Auto Scaling Policy** para ajuste de recursos.

**Tipos de métricas no CloudWatch:**  
- **Métricas padrão** (coletadas a cada **5 minutos**).  
- **Métricas detalhadas** (opcional, com custo adicional, permite granularidade de até **1 segundo**).  

:::info 💰 **Free Tier**  
O plano gratuito do CloudWatch inclui **10 métricas detalhadas**.  
:::


![Monitoramento de métricas](assets/image-20210906081300936.png)  

- **Criação de métricas personalizadas** pode ser feita via API **putMetricData** no SDK/CLI.
- **Resolução da métrica:**
  - **Standard** → Coleta a cada **1 minuto**.
  - **High Resolution** → Permite granularidade de **1, 5, 10 ou 30 segundos** (custo adicional).
- O CloudWatch permite envio de métricas **retroativas** (até 2 semanas) e métricas futuras (até 2 horas).

:::warning ❗ **Monitoramento de Uso de Memória**  
Por padrão, **o uso de memória não é monitorado** no CloudWatch. Para capturar essa métrica, é necessário configurar métricas customizadas.  
:::

---

> Alarmes

- Alarmes no CloudWatch permitem definir **gatilhos automáticos** com base nas métricas coletadas.
- Três estados possíveis:
  - ✅ **OK** → Condição dentro dos parâmetros.
  - ⚠️ **INSUFFICIENT_DATA** → Dados insuficientes para avaliação.
  - 🚨 **ALARM** → Condição atingiu um valor crítico.
- Alarmes podem ser acionados por métricas e filtros.
- São amplamente utilizados para:
  - **Auto Scaling de instâncias EC2**.
  - **Monitoramento de saúde de aplicações e infraestrutura**.
  - **Acionamento de eventos via SNS**.
- Suporte a integração com **Amazon EventBridge** para automação e integração com outros serviços AWS.

---

> Dashboards

- O CloudWatch permite a criação de **Dashboards personalizados** para visualização e monitoramento de métricas.
- Os dashboards são **globais**, permitindo visualizar métricas de diferentes **contas AWS e regiões**.
- É possível compartilhar dashboards com terceiros usando **Amazon Cognito**.
- **Custo dos dashboards:**
  - 🚀 **Até 3 dashboards são gratuitos** no Free Tier.
  - 💰 **Dashboards adicionais custam $3/mês por dashboard**.

---

:::tip **Dica para a prova 🎯**  

> Questões frequentemente testam **CloudWatch Logs e a integração com outros serviços da AWS**, pedindo para identificar a melhor abordagem para monitoramento, retenção de logs e exportação de dados.  

📌 Uma equipe de segurança precisa armazenar logs do **CloudWatch Logs** a longo prazo para fins de auditoria. Esses logs devem ser criptografados e exportados automaticamente para o **Amazon S3**. Qual das seguintes afirmações é verdadeira?  
- ✅ Os logs podem ser exportados para o S3, mas apenas com criptografia **AES-256 (SSE-S3)**, pois o **S3-KMS não é compatível**.  

📌 Um arquiteto de soluções deseja configurar um fluxo contínuo de logs do **CloudWatch Logs** para análise em tempo real em um cluster do **Amazon OpenSearch**. Qual solução ele deve utilizar?  
- ✅ Criar uma **subscription filter** para direcionar os logs ao **Amazon OpenSearch**.  

---

> O **CloudWatch Metrics** é um serviço essencial para monitoramento na AWS, mas métricas detalhadas e personalizadas têm um custo adicional.  

📌 Uma aplicação em **EC2** requer métricas de **uso de memória** para análise de performance. Qual é a melhor abordagem para coletar essas métricas?  
- ✅ Usar o **CloudWatch Unified Agent**, pois métricas de memória não são coletadas por padrão.  

📌 Um arquiteto precisa configurar um **alarme** que interrompa uma instância EC2 caso o uso da CPU fique abaixo de 10% por mais de 30 minutos. Qual serviço pode ser utilizado para automatizar essa ação?  
- ✅ Criar um **CloudWatch Alarm** acionando uma ação de **EC2 Auto Scaling** para interromper a instância.  

---

> O **CloudWatch Dashboards** permite visualizar métricas de diferentes regiões e contas AWS em um único painel, sendo uma solução eficiente para monitoramento centralizado.  

📌 Uma equipe quer compartilhar um **Dashboard** do CloudWatch com um parceiro externo, mas sem conceder acesso direto à conta AWS. Qual abordagem pode ser utilizada?  
- ✅ Configurar o **Amazon Cognito** para autenticação e compartilhamento seguro do painel.  

:::

----


## AWS Synthetics Canary  

> Visão Geral

O **AWS Synthetics Canary** é um serviço que permite monitorar a saúde de APIs e aplicações web, simulando o comportamento de usuários para detectar problemas antes que eles afetem clientes reais. Ele executa **scripts automatizados** que testam APIs, URLs e sites, verificando latência, disponibilidade e funcionalidade.  

> Funcionalidades principais:  

- Funciona como um **robô de monitoramento** que detecta problemas e pode acionar correções automáticas, como ajustes em **Application Load Balancers (ALB)** ou **DNS** para redirecionamento de tráfego.  
- Suporta **scripts personalizados** em **Node.js** e **Python** para validar respostas de APIs, status HTTP e até capturar screenshots da interface.  
- Pode ser **agendado** para execução única ou em intervalos regulares.  
- Integração com o navegador **Google Chrome**, permitindo testes em páginas da web.  
- **Armazena logs, métricas e capturas de tela** no Amazon S3 para análise posterior.  

![Monitoramento com AWS Synthetics Canary](assets/image-20230222053053925.png)  

---

> Casos de Uso

> 1️⃣ Teste de APIs
- Verifica a **latência e a resposta** das APIs antes que falhas impactem os usuários finais.  
- Pode ser integrado ao **CloudWatch** para geração de métricas e alarmes.  

> 2️⃣ Monitoramento de Websites
- Testa **tempo de carregamento**, componentes visuais e funcionalidade de botões e formulários.  
- Suporte a captura de **screenshots** e registro de logs detalhados.  

> 3️⃣ Automação de Diagnóstico
- Caso um erro seja detectado, pode disparar eventos para **AWS Lambda** ou **Route 53** para redirecionar o tráfego para um endpoint saudável.  

---

:::info **Dica**  

- O Canary pode acessar **headers, cookies e tokens** para autenticação em APIs protegidas.  
- Pode ser configurado para armazenar os **resultados de cada execução** em **Amazon CloudWatch Logs** e **Amazon S3**.  
- Suporte para execução em diferentes **regiões da AWS**, garantindo monitoramento global.  
- Permite definir **timeouts**, garantindo que APIs lentas ou indisponíveis sejam detectadas rapidamente.  

:::

---

:::tip **Dica para a prova 🎯**  

> Questões podem abordar **como o AWS Synthetics Canary detecta falhas em APIs e websites**, além de sua integração com outros serviços para automação de respostas a incidentes.  

📌 Uma empresa quer monitorar uma **API crítica** para garantir que ela responda corretamente e dentro do tempo esperado. Caso a API falhe, o tráfego deve ser redirecionado automaticamente para uma versão secundária hospedada em outra região. Qual solução AWS pode ser utilizada?  
- ✅ **AWS Synthetics Canary para monitoramento** + **Amazon Route 53 Failover Routing** para redirecionamento automático.  

📌 Uma empresa precisa testar automaticamente a **latência e disponibilidade** de um website e gerar **relatórios de tempo de resposta**. Os logs e capturas de tela devem ser armazenados para auditoria. Qual abordagem AWS é recomendada?  
- ✅ **AWS Synthetics Canary** armazenando logs e capturas no **Amazon S3** e **CloudWatch Logs**.  

---

> O **AWS Synthetics Canary** pode ser configurado para testar autenticação em APIs e sites protegidos, garantindo que tokens e credenciais sejam processados corretamente.  

📌 Um time de segurança deseja monitorar uma API protegida que exige **autenticação com token JWT**. Como o Canary pode ser configurado para isso?  
- ✅ Configurando o Canary para incluir **headers de autenticação** e tokens JWT nos testes.  

📌 Uma aplicação global deseja monitorar **disponibilidade em várias regiões** e gerar alertas caso ocorra degradação de serviço. Qual estratégia AWS deve ser usada?  
- ✅ Criar **Canaries distribuídos** em múltiplas regiões e integrar com **Amazon CloudWatch Alarms** para notificações.  

:::

---

## AWS Events e AWS EventBridge  

> Visão Geral

O **AWS Events** permite a criação de eventos para disparar ações automaticamente dentro da AWS, seja com base em eventos gerados por serviços da AWS ou em **agendamentos programados**. Já o **AWS EventBridge** é uma evolução do AWS Events, com recursos adicionais, incluindo suporte para **integração com serviços SaaS externos**, **arquivamento de eventos** e **filtros avançados**.  

---

> AWS Events

O **AWS Events** permite criar eventos e definir **regras** para disparar ações com base nesses eventos.  

> Funcionalidades
- **Intercepta eventos** gerados por serviços AWS, como:  
  - **EC2 Start** → Quando uma instância EC2 é iniciada.  
  - **CodeBuild Failure** → Quando uma compilação falha no AWS CodeBuild.  
  - **S3 Event** → Quando um objeto é criado ou excluído de um bucket S3.  
- Permite a **criação de eventos agendados** usando expressões **cron** para execuções periódicas.  
- Gera eventos no formato **JSON**, que podem ser enviados para diferentes destinos, como:  
  - **SNS (Simple Notification Service)**  
  - **SQS (Simple Queue Service)**  
  - **Lambda**  
  - **Step Functions**  

📌 **Nota:** O **AWS Events** é mais simples e se limita a eventos internos da AWS, não suportando eventos de fontes externas ou **integração entre contas**.  

---

> AWS EventBridge (Ponte de Eventos)

![EventBridge - Arquitetura](assets/image-20230222055737522.png)  

O **AWS EventBridge** é uma evolução do AWS Events, trazendo novas funcionalidades que o tornam mais flexível e poderoso para arquiteturas baseadas em eventos (**event-driven architecture**).  

> Principais Recursos
- **Event Bus (Canal de Eventos):**  
  - Recebe e processa eventos de diferentes fontes.  
  - Pode armazenar eventos para análises futuras.  
- **Regras avançadas:**  
  - Filtragem detalhada de eventos baseada em atributos do JSON.  
  - Integração com serviços como **Lambda, SQS, SNS e Step Functions**.  
- **Agendamento de Eventos:**  
  - Assim como o AWS Events, suporta expressões **cron** para execuções recorrentes.  
- **Schemas para eventos:**  
  - Permite definir formatos de eventos (como JSON ou Avro) para padronizar a comunicação.  

> Diferenciais do EventBridge
- **Integração com aplicações SaaS externas**, como **Datadog, Zendesk, Segment**.  
- **Event Bus personalizado**, permitindo que aplicações próprias postem eventos diretamente no EventBridge.  
- **Suporte a múltiplas contas AWS**, permitindo agregar eventos de diferentes contas.  

📌 **Nota:** Para acessar um **event bus**, é necessário configurar permissões baseadas em **políticas de recurso**.  

---

:::info **Dica**  

- O **AWS Events** é um serviço mais simples, focado em eventos internos da AWS.  
- O **EventBridge** amplia as capacidades do AWS Events, permitindo **integração com serviços externos** e **arquiteturas mais flexíveis**.  
- Diferente do **SNS**, o EventBridge permite **filtros mais avançados** baseados em atributos do evento.  
- O EventBridge será o **substituto do AWS Events** no futuro, mas, por enquanto, ambos coexistem.  

:::

---

:::tip **Dica para a prova 🎯**  

> Questões frequentemente abordam **serviços de monitoramento e eventos da AWS**, como o **EventBridge** e o **AWS Events**. Fique atento às diferenças entre eles, especialmente em relação às integrações externas e ao uso de **event buses**.

📌 Uma empresa precisa monitorar eventos gerados por seu sistema SaaS e disparar ações automáticas quando determinados eventos ocorrerem. Qual serviço da AWS deve ser utilizado?  
- ✅ AWS EventBridge  

📌 O **AWS EventBridge** pode ser utilizado para integrar com **aplicações SaaS**. Qual dos seguintes serviços pode enviar eventos para o **EventBridge**?  
- ✅ Datadog, Zendesk, Segment  

---

> Questões sobre **eventos e regras** com o **AWS Events** e o **AWS EventBridge** costumam destacar a criação de **regras baseadas em eventos** e **destinos** para esses eventos, como **SNS**, **SQS** ou **Lambda**.

📌 Você criou um evento para monitorar o status de uma instância EC2 e deseja que o evento dispare uma notificação sempre que a instância mudar para o estado "running". Qual serviço da AWS pode ser usado para esse tipo de configuração?  
- ✅ AWS Events  

📌 Para centralizar eventos em uma única conta AWS, qual recurso do **AWS EventBridge** você deve configurar?  
- ✅ Event Bus  

:::

---

## AWS X-Ray

> Visão Geral

O **AWS X-Ray** é um serviço de rastreamento distribuído que permite analisar e depurar aplicações em ambientes de nuvem. Ele oferece uma visualização detalhada do fluxo de solicitações e respostas, ajudando a identificar problemas de desempenho e falhas nas aplicações.

> Funcionalidades principais:  

- **Análise visual**: O AWS X-Ray permite mapear visualmente o comportamento das aplicações, mostrando como as solicitações fluem entre os diferentes componentes da aplicação.
- **Rastreamento distribuído**: Ele coleta dados detalhados sobre o tempo de resposta, erros e latência das solicitações, ajudando a detectar gargalos e falhas.
- **Integrações com vários serviços AWS**: O X-Ray se integra diretamente com serviços como **EC2**, **ECS**, **Lambda**, **Elastic Beanstalk** e **API Gateway**, permitindo rastrear aplicativos executados em diferentes tipos de infraestrutura.
- **Análise de erros e performance**: Oferece uma visão clara dos pontos de falha na aplicação, como falhas de código, problemas de desempenho e latência.
  
---

> Casos de Uso

- 1️⃣ **Rastreamento de Microservices**
    - O X-Ray é útil para monitorar arquiteturas baseadas em microservices, permitindo rastrear as interações entre diferentes serviços e identificar possíveis falhas.
- 2️⃣ **Análise de Latência**
    - Ideal para investigar problemas de latência e desempenho em tempo real, identificando quais partes da aplicação estão demorando mais para responder.
- 3️⃣ **Depuração de Aplicações**
    - Quando surgem falhas ou erros na aplicação, o AWS X-Ray ajuda a localizar a origem do problema, analisando as transações e identificando os serviços com falhas.
---

:::info **Dica**  

- O AWS X-Ray pode ser configurado para rastrear transações de ponta a ponta em tempo real, oferecendo visibilidade completa de todas as solicitações em sua aplicação.  
- O serviço gera **traces** que mostram como as requisições estão sendo processadas ao longo de todos os serviços envolvidos, como **Lambda**, **EC2** e **ECS**.  
- É possível aplicar **filtros personalizados** para identificar serviços e componentes específicos que podem estar afetando o desempenho da aplicação.  
- O X-Ray também pode ser integrado ao **CloudWatch** para gerar métricas de desempenho e configurar alarmes para problemas identificados.

:::


---

:::tip **Dica para a prova 🎯**  

> Questões frequentemente abordam **a integração do AWS X-Ray com outros serviços AWS**, como EC2, Lambda, ECS e API Gateway, para rastrear o comportamento de aplicativos distribuídos.  

📌 Uma aplicação composta por microservices que roda no **Amazon EC2** e **AWS Lambda** apresenta problemas de latência. Qual serviço pode ser utilizado para rastrear a performance e encontrar gargalos de forma detalhada?  
- ✅ AWS X-Ray  

---

> O **AWS X-Ray** permite a análise de **latência e erros** em aplicações distribuídas, proporcionando **visibilidade de ponta a ponta** sobre o tráfego de requisições.  

📌 Sua aplicação está enfrentando lentidão e você precisa identificar quais serviços estão causando problemas de latência. Qual serviço você deve utilizar para rastrear a execução das requisições de ponta a ponta?  
- ✅ AWS X-Ray  

---

> O **AWS X-Ray** gera **traces** que ajudam a identificar problemas de desempenho ao mostrar as interações entre os componentes de uma aplicação.  

📌 Um time de desenvolvimento quer rastrear as transações de sua aplicação para diagnosticar falhas. Qual é a principal funcionalidade do AWS X-Ray que permite esse rastreamento detalhado?  
- ✅ Geração de **traces** para monitoramento de transações de ponta a ponta.  

---

> O **AWS X-Ray** pode ser configurado para **filtrar** transações e identificar problemas de forma mais eficiente.  

📌 Como você pode configurar o AWS X-Ray para rastrear transações específicas de sua aplicação?  
- ✅ Usando **filtros personalizados** no AWS X-Ray para rastrear apenas transações específicas.  

---

> O **AWS X-Ray** oferece integração com **CloudWatch** para geração de métricas e alarmes, permitindo monitoramento contínuo.  

📌 Para configurar alertas sobre problemas de desempenho em sua aplicação, qual serviço você pode integrar ao AWS X-Ray para gerar métricas e alarmes?  
- ✅ Amazon CloudWatch  

:::

---

## Personal Health Dashboard

> Visão Geral

O **Personal Health Dashboard** é um serviço da AWS que fornece visibilidade detalhada sobre eventos de manutenção e falhas nos serviços AWS que podem impactar sua operação. Ele ajuda a monitorar o estado dos recursos em uso, alertando sobre eventos que podem afetar a disponibilidade de sua infraestrutura.

> Funcionalidades principais:  

- **Visibilidade de eventos de manutenção**: Mostra eventos de manutenção planejada ou não planejada que podem afetar a operação dos serviços AWS que você está utilizando.
- **Ações de remediação**: Fornece uma lista de ações que você pode tomar para remediar problemas causados por eventos de manutenção, garantindo que sua operação não seja impactada.
- **Acesso via API**: É possível acessar o **Personal Health Dashboard** programaticamente por meio da AWS API, permitindo integrações automatizadas.
- **Integração com EventBridge**: Você pode usar o **Amazon EventBridge** para reagir aos eventos de manutenção, como enviar notificações ou realizar ações corretivas automaticamente.
- **Organizações AWS**: Se você utiliza a **AWS Organizations**, pode agregar e visualizar eventos de múltiplas contas em uma única visão, proporcionando maior controle e visibilidade em ambientes grandes.

![Monitoramento de eventos com Personal Health Dashboard](assets/image-20230222061145138.png)  

---

> Casos de Uso  

- 1️⃣ **Acompanhamento de Manutenção**
    - O Personal Health Dashboard permite que você acompanhe e visualize eventos de manutenção planejada e não planejada para todos os serviços AWS que sua organização utiliza.  
    - Através dessa visão, você pode tomar medidas para minimizar os impactos sobre sua operação.
- 2️⃣ **Ações Automatizadas com EventBridge**
    - Você pode configurar **EventBridge** para reagir automaticamente a eventos do **Personal Health Dashboard**, como notificações sobre falhas ou até a execução de tarefas automatizadas para mitigar problemas.
- 3️⃣ **Monitoramento em Ambientes Multicontas**
    - Em ambientes onde múltiplas contas AWS estão em uso, o **Personal Health Dashboard** pode ser integrado com a AWS Organizations, permitindo a agregação de eventos em uma única visão para um gerenciamento simplificado.

---

:::info **Dica**  

- O **Personal Health Dashboard** oferece uma visualização detalhada de problemas operacionais, incluindo a análise de falhas de rede, interrupções de serviço e manutenção programada.
- Utilizando a integração com o **EventBridge**, é possível enviar alertas e automatizar respostas para lidar com eventos de manutenção sem intervenção manual.
- A capacidade de acesso via **API** facilita a criação de integrações com outras ferramentas de monitoramento ou automação utilizadas em sua infraestrutura.  

:::

---