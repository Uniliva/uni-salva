---
title: "Caching"
sidebar_position: 5
---

## Amazon CloudFront

Amazon CloudFront é um serviço de **CDN** (*Content Delivery Network*) da AWS que permite distribuir conteúdo globalmente com baixa latência e alto desempenho. Ele armazena em cache conteúdos estáticos em **Edge Locations** (pontos de presença) e oferece recursos avançados de segurança e personalização.

```mermaid
flowchart TB
    subgraph Users["Usuários Globais"]
        U1[Brasil]
        U2[EUA]
        U3[Europa]
    end

    subgraph Edge["Edge Locations (216+ PoPs)"]
        E1[São Paulo PoP]
        E2[Virginia PoP]
        E3[Frankfurt PoP]
    end

    subgraph Origin["Origem"]
        S3[S3 Bucket]
        ALB[ALB/EC2]
        Custom[Custom Origin]
    end

    U1 --> E1
    U2 --> E2
    U3 --> E3

    E1 -->|Cache Miss| Origin
    E2 -->|Cache Miss| Origin
    E3 -->|Cache Miss| Origin

    subgraph Security["Segurança"]
        Shield[AWS Shield<br/>DDoS Protection]
        WAF[AWS WAF<br/>Web Firewall]
        OAC[OAC/OAI<br/>S3 Access Control]
        SSL[ACM<br/>SSL/TLS]
    end

    Edge --> Security

    style Edge fill:#FF6347,color:#fff
    style Security fill:#4169E1,color:#fff
```

---

> Recursos e Benefícios

- **Redução de latência**: O CloudFront armazena conteúdos estáticos em *Edge Locations* próximas aos usuários finais, acelerando a entrega de arquivos.
- **Suporte a múltiplos protocolos**: Compatível com HTTP, HTTPS e WebSocket.
- **Alta disponibilidade**: Com mais de 216 pontos de presença globais, garante resiliência e baixa latência.
- **Proteção contra ataques DDoS**: Integrado ao AWS Shield para mitigar ataques de negação de serviço.
- **Geo Restriction** (*Restrições geográficas*): Permite bloquear o acesso de determinados países ao conteúdo usando o cabeçalho `CloudFront-Viewer-Country`.
- **Preços baseados no uso**: Cobrança por volume de dados trafegados, sendo mais barato conforme o uso aumenta.
- **Personalização de erros**: Permite criar páginas de erro personalizadas e armazená-las em cache para evitar chamadas recorrentes ao servidor de origem.

:::tip **Dica para a prova 🎯**  
> O preço do **CloudFront** varia conforme a **região** e a **quantidade de dados transferidos**. Quanto maior o volume de tráfego, menor o custo por GB.  
[Documentação de preços do CloudFront](https://aws.amazon.com/cloudfront/pricing/)  
:::

---

> Distribuição de Conteúdo Privado

- **CloudFront Signed URL**: Usado para distribuir conteúdos privados com URLs assinadas individualmente.
- **CloudFront Signed Cookies**: Permite distribuir múltiplos conteúdos privados usando um único cookie assinado.

**Diferença entre CloudFront Signed URL e S3 Signed URL**

![image-20230219110601605](assets/image-20230219110601605.png)

---

> Configuração de Origem no CloudFront

CloudFront pode utilizar múltiplas origens para distribuir conteúdos, escolhendo a origem com base nos padrões de URL.

![multi-origin](assets/image-20210901201915548.png)

---

> Casos de Uso

**Amazon S3 como Origem**

- Ideal para distribuição de arquivos estáticos.
- Facilita o upload e gerenciamento de conteúdos.
- Protege contra ataques DDoS.
- Pode utilizar **Origin Access Identity (OAI)** para garantir que apenas o CloudFront acesse o bucket.
- O **Origin Access Control (OAC)** é a versão aprimorada do OAI, oferecendo mais controle sobre permissões de acesso.

![OAI](https://d2908q01vomqb2.cloudfront.net/5b384ce32d8cdef02bc3a139d4cac0a22bb029e8/2018/06/27/4-v-2.png)

:::tip **Dica para a prova 🎯**  
> O **OAC (Origin Access Control)** é a evolução do **OAI (Origin Access Identity)**, trazendo mais flexibilidade no controle de permissões de acesso ao **Amazon S3**.  
:::

**Origem Customizada**

- Pode ser um servidor HTTP hospedado em uma instância EC2.
- Ideal para sites dinâmicos e aplicações customizadas.
- Suporta entrega de vídeos sob demanda.

---

> CloudFront vs S3 Cross-Region Replication

| Característica | CloudFront | S3 Cross-Region Replication |
|--------------|------------|--------------------------|
| Tipo de replicação | Cache distribuído em pontos de presença | Cópia de objetos entre buckets em diferentes regiões |
| Melhor uso | Arquivos estáticos com cache configurável | Arquivos dinâmicos que precisam ser replicados |
| Configuração | Nenhuma replicação necessária | Deve configurar cada bucket manualmente |
| Custo | Cobrado por requisição e tráfego | Custo de armazenamento e transferência |

:::tip **Dica para a prova 🎯**  
> Use **CloudFront** para distribuição eficiente de arquivos **estáticos** e **S3 Cross-Region Replication** para sincronização de arquivos **dinâmicos** entre regiões.  
:::

---

> **Origin Groups**

CloudFront permite configurar **grupos de origem** para fornecer redundância e failover.

![origin-group](assets/image-20210901202346642.png)

---

> **Field Level Encryption**

O recurso de **Field Level Encryption** permite criptografar dados sensíveis diretamente no nível do edge location, garantindo maior segurança no transporte dos dados.

![field-level](assets/image-20210901202552403.png)

:::warning **Atenção**  
> O **Field Level Encryption** permite criptografar **apenas campos específicos** do payload HTTP. Isso é útil para proteger informações sensíveis antes que cheguem ao backend.  
[Saiba mais sobre Field Level Encryption](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/field-level-encryption.html)  
:::



:::tip **Dica para a prova 🎯**  
> Questões frequentemente abordam **CloudFront e restrições geográficas**, pedindo para identificar a melhor abordagem para bloquear acessos indesejados.  

📌 Uma empresa deseja impedir que usuários de um país específico acessem seu conteúdo distribuído via **CloudFront**. Qual recurso deve ser utilizado?  
✅ **Geo Restriction** com o cabeçalho `CloudFront-Viewer-Country`  

---

> Questões sobre **replicação de dados no S3** são comuns e podem testar conhecimentos sobre **S3 Cross-Region Replication** e **S3 Same-Region Replication**.  

📌 Uma organização precisa garantir a replicação automática de objetos entre dois **buckets do S3 em diferentes regiões**. Qual recurso deve ser utilizado?  
✅ **S3 Cross-Region Replication (CRR)**  

---

> Questões podem testar conhecimentos sobre **OAC (Origin Access Control)** e **OAI (Origin Access Identity)** no CloudFront para proteger buckets do S3.  

📌 Qual a melhor maneira de garantir que um bucket do **Amazon S3** seja acessível apenas pelo **CloudFront**, sem permitir acesso público direto?  
✅ **Usar Origin Access Control (OAC) no CloudFront**  

---

> Questões frequentemente abordam **Field-Level Encryption no CloudFront**, exigindo que o candidato entenda como proteger informações sensíveis.  

📌 Uma empresa precisa garantir que **números de cartão de crédito** sejam criptografados no nível da **Edge Location** antes de serem enviados ao servidor de backend. Qual recurso deve ser usado?  
✅ **Field-Level Encryption no CloudFront**  

---

> Questões podem abordar o uso de **Origin Groups** no CloudFront para fornecer **failover** entre diferentes origens.  

📌 Uma aplicação de streaming precisa garantir alta disponibilidade e quer configurar um **backup automático** caso a origem primária falhe. Qual funcionalidade do CloudFront deve ser utilizada?  
✅ **Origin Groups** no CloudFront  
:::

---

## Edge Function

![What is Cloudfront? | When to use CDN in AWS? - YouTube](https://i.ytimg.com/vi/namCH3nzU8k/maxresdefault.jpg)

Edge Functions permitem a execução de código nos pontos de presença (PoPs) da AWS, ajudando em tarefas relacionadas ao **CloudFront**, **Route 53**, entre outros serviços.

```mermaid
flowchart LR
    subgraph Request["Fluxo de Requisição"]
        Viewer[Viewer] --> VR[Viewer Request]
        VR --> Cache{Cache<br/>Hit?}
        Cache -->|Miss| OR[Origin Request]
        OR --> Origin[Origin]
        Origin --> OResp[Origin Response]
        OResp --> VResp[Viewer Response]
        VResp --> Viewer
        Cache -->|Hit| VResp
    end

    subgraph Functions["Onde executar código"]
        CF1["CloudFront Function<br/>Viewer Request/Response"]
        LE1["Lambda@Edge<br/>Todos os 4 pontos"]
    end

    VR -.-> CF1
    VResp -.-> CF1
    VR -.-> LE1
    OR -.-> LE1
    OResp -.-> LE1
    VResp -.-> LE1

    style CF1 fill:#32CD32,color:#fff
    style LE1 fill:#4169E1,color:#fff
```

```mermaid
flowchart TB
    subgraph Decision["CloudFront Function vs Lambda@Edge"]
        Q1{Precisa acessar<br/>body da request?}
        Q2{Precisa chamar<br/>serviços externos?}
        Q3{Execução<br/>demorada?}
    end

    Q1 -->|Sim| LE["Lambda@Edge"]
    Q1 -->|Não| Q2
    Q2 -->|Sim| LE
    Q2 -->|Não| Q3
    Q3 -->|Sim| LE
    Q3 -->|Não| CF[CloudFront Function]

    subgraph UseCases["Casos de Uso"]
        CF_Use["CloudFront Function<br/>• Header manipulation<br/>• URL rewrites/redirects<br/>• Cache key normalization<br/>• Simple A/B testing"]
        LE_Use["Lambda@Edge<br/>• Auth with external API<br/>• Dynamic content<br/>• Bot detection<br/>• Image manipulation"]
    end

    style CF fill:#32CD32,color:#fff
    style LE fill:#4169E1,color:#fff
```  

> **Principais usos:**  
> - Manipulação de requisições antes de chegarem ao servidor de origem.  
> - Implementação de filtros para segurança e controle de acesso.  
> - Adição de autenticação e autorização no nível da borda.  
> - Geração dinâmica de HTML nos pontos de presença.  
> - Testes A/B para personalização de conteúdo.  

> **Tipos de Edge Function**  

Atualmente, a AWS oferece duas formas principais de executar código na borda:  

![image-20230219113018202](assets/image-20230219113018202.png)  
![Introducing CloudFront Functions – Run Your Code at the Edge with Low Latency at Any Scale | AWS News Blog](https://d2908q01vomqb2.cloudfront.net/da4b9237bacccdf19c0760cab7aec4a8359010b0/2021/04/08/cloudfront-functions-only-lambda-egde.png)  
![image-20230219111932005](assets/image-20230219111932005.png)  

> **CloudFront Function**  
- Funções **leves**, escritas em **JavaScript**, otimizadas para **baixa latência** e **alta escalabilidade**.  
- Executadas **nos próprios pontos de presença** (PoPs) do CloudFront.  
- Indicadas para **modificações simples** em requests e responses.  
- 🚫 **Não têm acesso ao corpo (body) das requisições**.  
- 🚫 **Não devem chamar serviços externos**.  

---

**Lambda@Edge**  
- Suporta **Node.js e Python**.  
- Pode escalar até **1000 requisições por segundo**.  
- Executado nos **Regional Edge Caches**, em vez de diretamente no PoP.  
- Permite **chamar serviços externos** e acessar redes privadas.  
- Suportado para **execuções mais demoradas**.  
 
**Casos de uso:**  
- Modificação avançada de requisições e respostas.  
- Processamento dinâmico de conteúdo.  
- Autenticação avançada e chamadas para APIs externas.  

![image-20230219112800163](assets/image-20230219112800163.png)  

É possível usar **Lambda@Edge** e **CloudFront Functions** juntos ou separadamente, dependendo da necessidade.  

---

> **Comparação entre CloudFront Function e Lambda@Edge**  

| Característica          | CloudFront Function | Lambda@Edge |
|----------------------|------------------|-------------|
| Linguagem | JavaScript | Node.js, Python |
| Execução | No PoP (Ponto de Presença) | No Regional Edge Cache |
| Tempo de resposta | Muito rápido (ms) | Mais alto (até segundos) |
| Modificação de requisições/respostas | ✅ Sim | ✅ Sim |
| Chamada de serviços externos | 🚫 Não | ✅ Sim |
| Acesso ao corpo da requisição | 🚫 Não | ✅ Sim |
| Casos de uso | Pequenas mudanças, manipulação de headers | Processamento dinâmico, autenticação |

![image-20230219112844062](assets/image-20230219112844062.png)  

---

> **Melhorando a latência da primeira requisição**  
Para reduzir a latência da primeira requisição, a AWS recomenda a **precarga de cache** ou a **utilização de Lambda@Edge para pré-processar as respostas**.  

![image-20230219113750792](assets/image-20230219113750792.png)  

---

:::tip **Dica para a prova 🎯**  

> Questões frequentemente abordam **a diferença entre CloudFront Functions e Lambda@Edge**, testando qual deve ser utilizado em diferentes cenários.  

📌 Um cliente precisa modificar os **headers das requisições no ponto de presença do CloudFront**, garantindo **mínima latência** e **sem necessidade de chamadas externas**. Qual opção usar?  
- ✅ **CloudFront Functions**  

📌 Uma aplicação precisa modificar **respostas dinâmicas** com base em regras de negócio e realizar chamadas para APIs externas. Qual opção deve ser usada?  
- ✅ **Lambda@Edge**  

---

> O **CloudFront Functions** é uma opção mais eficiente para tarefas de manipulação de requests e responses, mas tem **limitações**, como a impossibilidade de acessar o corpo da requisição.  

📌 Qual das seguintes opções **não** pode ser feita com um **CloudFront Function**?  
1. Modificar cabeçalhos de requisição.  
2. Alterar parâmetros da URL antes de rotear a requisição.  
3. Fazer chamadas para um serviço externo via API.  
4. Aplicar regras de roteamento com base em cookies.  

✅ **Opção 3** – CloudFront Functions **não podem fazer chamadas para serviços externos**.  

---

> Questões podem testar o conhecimento sobre **como reduzir a latência da primeira requisição no CloudFront**.  

📌 Como um desenvolvedor pode reduzir a latência da **primeira requisição** ao usar o CloudFront?  
- ✅ **Pré-carregamento de cache** e **uso de Lambda@Edge para processar respostas dinamicamente**.  

📌 Qual solução pode ser usada para garantir que **objetos dinâmicos sejam entregues rapidamente** por meio do CloudFront?  
- ✅ **Lambda@Edge** para processamento na borda.  

---

> **Lambda@Edge** é frequentemente usado para **implementar autenticação** diretamente no CloudFront, evitando chamadas ao servidor de origem.  

📌 Uma empresa deseja autenticar usuários antes de permitir acesso a um conteúdo protegido no CloudFront. A lógica de autenticação envolve uma chamada para um banco de dados externo. Qual solução usar?  
- ✅ **Lambda@Edge**, pois permite chamadas externas.  

📌 Um cliente quer adicionar **autenticação JWT** diretamente nas requisições do CloudFront, sem precisar rotear as requisições para um backend. Qual serviço usar?  
- ✅ **Lambda@Edge**  

---

> O **CloudFront Functions** é recomendado para **testes A/B** e manipulação de respostas em alta escala, pois sua execução é extremamente rápida.  

📌 Uma empresa deseja realizar um **teste A/B** para modificar conteúdos entregues via CloudFront com **baixa latência**. Qual solução deve ser usada?  
- ✅ **CloudFront Functions**  

📌 Qual função da AWS é mais eficiente para **realizar redirecionamentos dinâmicos** de URLs no CloudFront?  
- ✅ **CloudFront Functions**  

:::

---

## ElastiCache

O **Amazon ElastiCache** é um serviço **gerenciado de cache em memória** que oferece suporte ao **Redis** e ao **Memcached**. Ele é projetado para fornecer **baixa latência** e **alto throughput**, reduzindo a carga em bancos de dados relacionais ou NoSQL.

```mermaid
flowchart TB
    subgraph Decision["Redis vs Memcached"]
        Q1{Precisa de<br/>persistência?}
        Q2{Precisa de<br/>Multi-AZ/HA?}
        Q3{Estruturas de<br/>dados avançadas?}
        Q4{Pub/Sub?}
    end

    Q1 -->|Sim| Redis[Redis]
    Q1 -->|Não| Q2
    Q2 -->|Sim| Redis
    Q2 -->|Não| Q3
    Q3 -->|Sim| Redis
    Q3 -->|Não| Q4
    Q4 -->|Sim| Redis
    Q4 -->|Não| Memcached[Memcached]

    subgraph RedisFeatures["Redis"]
        R1["✅ Multi-AZ com failover"]
        R2["✅ Read Replicas"]
        R3["✅ Persistência/Backup"]
        R4["✅ Pub/Sub, Streams"]
        R5["✅ Sorted Sets, Lists"]
        R6["✅ Criptografia (KMS + AUTH)"]
    end

    subgraph MemcachedFeatures["Memcached"]
        M1["✅ Multi-thread"]
        M2["✅ Sharding nativo"]
        M3["❌ Sem replicação"]
        M4["❌ Sem persistência"]
        M5["❌ Sem backup"]
        M6["✅ SASL auth"]
    end

    style Redis fill:#FF6347,color:#fff
    style Memcached fill:#4169E1,color:#fff
```

| Característica | Redis | Memcached |
|---------------|-------|-----------|
| **Multi-AZ** | Sim | Não |
| **Read Replicas** | Sim | Não |
| **Persistência** | Sim | Não |
| **Backup/Restore** | Sim | Não |
| **Pub/Sub** | Sim | Não |
| **Data Structures** | Avançadas | Key-Value simples |
| **Multi-thread** | Single-thread | Multi-thread |
| **Sharding** | Cluster mode | Nativo |
| **Auth** | Redis AUTH + SSL | SASL |  

> **Casos de uso:**  
 - **Cache de banco de dados:** Reduz acessos ao **RDS** ou **DynamoDB**, melhorando a performance.  
 - **Armazenamento de sessões:** Mantém dados de sessão na memória, permitindo aplicações **stateless**.  
 - **Fila de mensagens temporárias:** Permite armazenar mensagens temporárias que expiram automaticamente.  

![elastic-cache-well-arch](assets/image-20210905113428849.png)  

---

> **Redis**  
 - Suporta **deploy Multi-AZ** para alta disponibilidade.  
 - Oferece **réplicas de leitura** para escalabilidade.  
 - Persiste os dados, permitindo **restauração rápida (restore features)**.  
 - Permite criptografia de dados em:  
   - **Repouso** com **AWS KMS**.  
   - **Trânsito** com **Redis AUTH**.  

![redis](assets/image-20210820053524603.png)  

---

> **Memcached**  
 - Suporta **multi-nó** para **sharding** (particionamento dos dados).  
 - 🚫 **Não possui replicação** – ou seja, **não tem alta disponibilidade**.  
 - 🚫 **Não persiste dados** e **não tem backups**.  
 - Arquitetura baseada em **multi-thread**, permitindo melhor uso de CPU em comparação com o Redis.  

![memcached](assets/image-20210820053825076.png)  

---

> **Comparação entre Redis e Memcached**  

![comparação](assets/image-20210820054422264.png)  

---

:::note Segurança e Autenticação no ElastiCache  

> **Autenticação e Permissões**  
 - 🚫 **O ElastiCache não suporta autenticação via IAM**.  
 - Políticas do **IAM** servem apenas para controle de **API AWS**, mas não restringem acesso aos dados dentro do banco.  

> **Redis**  
 - Utiliza **Redis AUTH**, configurado no momento da criação do cluster.  
 - A **principal segurança** deve ser aplicada com **Security Groups**.  
 - Suporta **SSL/TLS** para criptografia dos dados em trânsito.  

![redis-access](assets/image-20210820055640021.png)  

> **Memcached**  
 - Suporta **autenticação SASL** (Simple Authentication and Security Layer).  
 - Permite ativar a **lazy load feature**, que carrega os dados no cache sob demanda.  

![lazy-load](assets/image-20210820055934511.png)  
:::

---

> Lidando com Taxas Extremas  

O ElastiCache possui **limites de throughput e conexões simultâneas**, dependendo do tipo de instância utilizada.  

![image-20230219115007181](assets/image-20230219115007181.png)  

---

:::tip **Dica para a prova 🎯**  

> Questões frequentemente abordam **a diferença entre Redis e Memcached no ElastiCache**, testando qual opção é mais adequada para diferentes casos de uso.  

📌 Uma aplicação exige **cache distribuído** para balancear a carga de leitura entre múltiplos nós, sem necessidade de persistência de dados. Qual serviço do ElastiCache é mais adequado?  
- ✅ **Memcached**, pois permite escalabilidade horizontal com sharding, sem a necessidade de replicação.  

📌 Uma aplicação de e-commerce precisa **armazenar sessões de usuários de forma persistente**, garantindo que os dados não sejam perdidos em caso de falha no nó primário. Qual serviço do ElastiCache deve ser utilizado?  
- ✅ **Redis**, pois suporta persistência de dados e failover automático em Multi-AZ.  

---

> A **segurança no ElastiCache** é um tema recorrente na prova, testando autenticação, criptografia e permissões de acesso.  

📌 Uma equipe quer garantir que apenas aplicações autorizadas possam se conectar ao cluster do ElastiCache. O que deve ser utilizado para restringir o acesso?  
- ✅ **Security Groups e VPC Subnets**, pois o ElastiCache **não suporta autenticação via IAM**.  

📌 O Redis pode criptografar dados em repouso e em trânsito. Qual mecanismo de criptografia deve ser utilizado para proteger **dados em trânsito**?  
- ✅ **Redis AUTH e SSL/TLS**, garantindo que somente clientes autorizados possam se conectar.  

---

> Questões sobre **otimização de desempenho no ElastiCache** podem aparecer, especialmente relacionadas a estratégias de cache e escalabilidade.  

📌 Um sistema de recomendação precisa garantir que apenas os **dados mais acessados** fiquem armazenados no cache, removendo os menos utilizados. Qual estratégia de expiração deve ser configurada?  
- ✅ **Least Recently Used (LRU)**, pois remove os itens menos acessados para liberar espaço no cache.  

📌 Como garantir que o Redis escale para **grandes volumes de leitura** sem comprometer a performance?
- ✅ **Utilizando réplicas de leitura**, distribuindo o tráfego entre múltiplos nós.

:::

---

## Resumo de Caching para o Exame

```mermaid
flowchart TB
    subgraph CDN["Content Delivery"]
        CF[CloudFront<br/>CDN Global]
        CFF[CloudFront Functions<br/>Viewer Request/Response]
        LE["Lambda@Edge<br/>Todos os pontos"]
    end

    subgraph InMemory["In-Memory Cache"]
        Redis[ElastiCache Redis<br/>HA, Persistência]
        Memcached[ElastiCache Memcached<br/>Sharding, Multi-thread]
    end

    subgraph APICache["API Caching"]
        APIG[API Gateway Cache<br/>0-3600s TTL]
        DAX[DynamoDB DAX<br/>Microseconds]
    end
```

### Tabela de Decisão Rápida

| Cenário | Serviço |
|---------|---------|
| Conteúdo estático global | CloudFront |
| Manipulação simples de headers | CloudFront Functions |
| Autenticação na edge com API externa | Lambda@Edge |
| Cache de sessões com HA | ElastiCache Redis |
| Cache simples sem HA | ElastiCache Memcached |
| Cache de queries DynamoDB | DAX |
| Cache de API REST | API Gateway Cache |

### Limites e Dicas Importantes

| Serviço | Limite/Info |
|---------|-------------|
| CloudFront TTL | 0 a 31536000 segundos (1 ano) |
| CloudFront Functions | JavaScript only, sem body access |
| Lambda@Edge | Node.js/Python, até 30s (origin) |
| API Gateway Cache | 0.5 GB a 237 GB, 0-3600s TTL |
| Redis AUTH | Obrigatório para encryption in-transit |
| ElastiCache | Não suporta IAM auth para dados |

### Dicas Finais para o Exame

1. **OAC vs OAI**: OAC é a versão mais nova, prefira OAC.
2. **Signed URL vs Signed Cookie**: URL para um arquivo, Cookie para múltiplos.
3. **CloudFront vs S3 Transfer Acceleration**: CloudFront para download, Transfer Acceleration para upload.
4. **Redis vs Memcached**: Redis para HA e persistência, Memcached para simplicidade e sharding.
5. **CloudFront Functions vs Lambda@Edge**: Functions para manipulações simples, Lambda@Edge para lógica complexa.
6. **Field Level Encryption**: Criptografa campos específicos na edge antes de enviar à origem.
7. **Origin Groups**: Failover automático entre origens primária e secundária.

---