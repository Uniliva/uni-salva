---
title: "Visao Geral - Respostas aos Temas da Prova"
sidebar_position: 19
---

# Visao Geral - Respostas aos Temas da Prova SAP-C02

Este documento responde diretamente a cada topico listado no arquivo "O que cai na prova", com explicacoes objetivas e praticas para revisao.

---

## Compute

### Quando usar NLB versus ALB

- **ALB (Application Load Balancer)** - Layer 7 (HTTP/HTTPS/WebSocket):
  - Roteamento avancado por path (`/api/*`), hostname (`api.example.com`), query string, headers
  - Target groups: EC2, ECS/Fargate, Lambda, IP addresses
  - Autenticacao integrada com Cognito ou OIDC
  - Sticky sessions com cookies (AWSALB ou custom)
  - Ideal para: aplicacoes web, microservicos, APIs REST, roteamento baseado em conteudo
  - **Nao tem IP estatico** (usa DNS name)

- **NLB (Network Load Balancer)** - Layer 4 (TCP/UDP/TLS):
  - Ultra baixa latencia (~100ms vs ~400ms do ALB)
  - **IP estatico por AZ** (Elastic IP) - essencial para whitelisting de IP
  - Preserva source IP do cliente
  - Target groups: EC2, IP, ALB (pode colocar ALB atras de NLB)
  - Ideal para: gaming, IoT, protocolos nao-HTTP, whitelisting de IP, alta performance

- **Regra para prova**: Se a questao menciona **"whitelisting de IP"**, **"IP estatico"** ou **"TCP/UDP puro"** -> **NLB**. Se menciona **"roteamento por path/header"**, **"HTTP"** ou **"autenticacao"** -> **ALB**.

---

### Modelos de precos de computacao

| Modelo | Desconto | Compromisso | Melhor para |
|--------|----------|-------------|-------------|
| **On-Demand** | 0% | Nenhum | Cargas imprevisiveis, testes, desenvolvimento |
| **Reserved Instances** | Ate 72% | 1 ou 3 anos | Cargas estaveis e previsiveis (bancos de dados, servidores 24/7) |
| **Savings Plans (Compute)** | Ate 66% | 1 ou 3 anos | Flexibilidade entre EC2, Fargate, Lambda |
| **Savings Plans (EC2 Instance)** | Ate 72% | 1 ou 3 anos | Familia/regiao fixa, maior desconto |
| **Spot Instances** | Ate 90% | Nenhum | Cargas tolerantes a interrupcao (batch, CI/CD, big data, ML training) |
| **Dedicated Hosts** | Variavel | Opcional | BYOL (licenciamento por socket/core), compliance |
| **Dedicated Instances** | Variavel | Nenhum | Isolamento de hardware sem controle de placement |

- **Regra para prova**: Carga **previsivel e constante** -> Reserved ou Savings Plan. Carga **flexivel e tolerante a falha** -> Spot. **Licenciamento BYOL** -> Dedicated Host.

---

### Dimensionamento para desempenho - EC2, Lambda, ECS

- **EC2**: melhor para cargas que precisam de controle total sobre SO, GPU, alta CPU/memoria, ou cargas longas (>15 min)
  - Placement Groups: Cluster (HPC, baixa latencia), Spread (HA critica), Partition (big data)
  - Instance Store para IOPS extremo (efemero)
  - Auto Scaling Groups com Target Tracking (CPU, Network, Custom metrics)

- **Lambda**: melhor para cargas event-driven, curtas (ate 15 min), sem estado
  - Memoria: 128 MB a 10 GB (CPU escala proporcionalmente)
  - Concurrency: 1000 simultaneas por padrao (Reserved e Provisioned Concurrency para controle)
  - Cold start: mitigado com Provisioned Concurrency
  - Nao precisa gerenciar infra, paga por execucao

- **ECS/Fargate**: melhor para containers
  - **EC2 Launch Type**: controle total, mais barato para cargas estaveis, pode usar Spot/Reserved
  - **Fargate**: serverless para containers, sem gerenciar EC2, paga por vCPU/memoria
  - Auto Scaling: target tracking (CPU, RAM, ALB request count)
  - **ECS Anywhere**: containers em servidores on-premises

- **EKS**: Kubernetes gerenciado, melhor quando ja tem ecossistema Kubernetes

---

### Opcoes de implantacao e escalonamento automatico

- **EC2 Auto Scaling**: Target Tracking, Step Scaling, Scheduled, Predictive (ML)
  - Warm Pools: instancias pre-inicializadas
  - Instance Refresh: rolling update de instancias

- **ECS Auto Scaling**: Service Auto Scaling com target tracking
  - Fargate: escala automaticamente tasks
  - EC2: tambem precisa escalar o cluster (Capacity Provider)

- **Lambda**: escala automaticamente (ate 1000 concurrent, pode aumentar)
  - Reserved Concurrency garante capacidade
  - Provisioned Concurrency elimina cold starts

- **Refatoracao para microservicos/serverless**:
  - Monolito -> Microservicos: usar ECS/EKS com ALB, cada servico em container separado
  - Monolito -> Serverless: Lambda + API Gateway + DynamoDB + Step Functions
  - Migration Hub Refactor Spaces: facilita migracao gradual monolito -> microservicos
  - Strangler Fig Pattern: roteia trafego gradualmente do monolito para novos microservicos

---

## Storage

### Arquitetura de armazenamento por caso de uso

| Caso de Uso | Servico | Por que |
|-------------|---------|---------|
| Disco de instancia EC2 | **EBS** (gp3/gp2 geral, io2 alta IOPS) | Block storage, 1 instancia (exceto Multi-Attach io2) |
| IOPS extremo, temporario | **Instance Store** | Milhoes de IOPS, dados efemeros |
| Compartilhamento de arquivos Linux | **EFS** | NFS gerenciado, multi-AZ, auto-scaling |
| Compartilhamento Windows (SMB/NTFS) | **FSx for Windows** | SMB, AD integration, Multi-AZ |
| HPC, ML (alto throughput) | **FSx for Lustre** | 100s GB/s, integra com S3 |
| Multi-protocolo (NFS+SMB+iSCSI) | **FSx for NetApp ONTAP** | Snapshots, compressao, dedup |
| Objetos (arquivos, backups, data lake) | **S3** | Ilimitado, classes de custo, lifecycle |
| Acesso hibrido on-premises | **Storage Gateway** | Ponte on-premises ↔ AWS |
| Cache local + FSx | **FSx File Gateway** | Baixa latencia local para FSx |

### Classes e tipos de volume - Performance

**EBS**:
| Tipo | IOPS Max | Throughput Max | Caso de Uso |
|------|----------|----------------|-------------|
| gp3 | 16.000 | 1.000 MB/s | Uso geral, boot volumes |
| gp2 | 16.000 | 250 MB/s | Uso geral (burst) |
| io2 Block Express | 256.000 | 4.000 MB/s | Bancos criticos, alta IOPS |
| io1/io2 | 64.000 | 1.000 MB/s | Bancos que precisam de IOPS previsivel |
| st1 | 500 | 500 MB/s | Big data, data warehouse (sequencial) |
| sc1 | 250 | 250 MB/s | Cold storage, arquivo (menor custo) |

**S3 Classes** (custo de armazenamento decrescente):
1. S3 Standard -> acesso frequente
2. S3 Intelligent-Tiering -> padrao de acesso desconhecido
3. S3 Standard-IA -> acesso infrequente, recuperacao rapida
4. S3 One Zone-IA -> infrequente, dados replicaveis
5. S3 Glacier Instant Retrieval -> arquivo com acesso em milissegundos
6. S3 Glacier Flexible Retrieval -> arquivo (1 min a 12h)
7. S3 Glacier Deep Archive -> arquivo de longo prazo (12-48h)

- **Lifecycle Policies**: move objetos automaticamente entre classes
- **S3 Analytics**: recomenda transicoes baseado em padroes de acesso

---

## Database

### Relacional vs Nao Relacional

| Criterio | Relacional (RDS/Aurora) | Nao Relacional (DynamoDB) |
|----------|------------------------|--------------------------|
| Dados | Estruturados, schema fixo | Flexiveis, schema-less |
| Consultas | SQL complexo, JOINs | Key-value, queries simples |
| Transacoes | ACID completo | Transacoes limitadas (TransactWriteItems) |
| Escala | Vertical (+ read replicas) | Horizontal automatica |
| Latencia | Milissegundos | Milissegundos (microsegundos com DAX) |
| Custo | Paga por instancia | Paga por requisicao ou capacidade |

**Quando usar Aurora em vez de RDS**:
- Performance 5x MySQL, 3x PostgreSQL
- Ate 15 read replicas (vs 5 no RDS)
- Failover < 30s (vs 60-120s no RDS)
- Storage auto-scaling ate 128 TB
- Multi-Master para escrita em multiplos nos
- Global Database para replicacao < 1s entre regioes
- Serverless para cargas intermitentes

**Quando usar RDS em vez de Aurora**:
- Oracle, SQL Server, MariaDB (Aurora so suporta MySQL/PostgreSQL compativel)
- Orcamento mais restrito para cargas leves

### Refatoracao de bancos para servicos gerenciados

- **Oracle/SQL Server on-premises -> RDS**: Replatforming, sem mudanca de engine
- **Oracle -> Aurora PostgreSQL**: Refactoring, usa DMS + SCT para converter schema
- **MongoDB -> DocumentDB**: compativel com MongoDB, multi-AZ, auto-scaling
- **Cassandra -> Keyspaces**: servico gerenciado compativel
- **MySQL/PostgreSQL -> Aurora**: Replatforming, compativel, mais performatico
- **Qualquer banco -> DynamoDB**: Refactoring completo, usa DMS + SCT

### Cache para desempenho

| Servico | Caso de Uso | Latencia |
|---------|-------------|----------|
| **DAX** | Cache de queries DynamoDB (por chave primaria) | Microsegundos |
| **ElastiCache Redis** | Sessoes, leaderboards, pub/sub, dados com HA | Milissegundos |
| **ElastiCache Memcached** | Cache simples sem HA, sharding | Milissegundos |
| **API Gateway Cache** | Cache de respostas de API | 0-3600s TTL |

- **DAX vs ElastiCache**: DAX para queries diretas ao DynamoDB; ElastiCache para resultados de calculos/agregacoes
- **DAX nao suporta strongly consistent reads**

### Escalando leitura e multi-regiao

- **RDS Read Replicas**: ate 5, cross-region, assincrono
- **Aurora Read Replicas**: ate 15, failover automatico, auto-scaling
- **Aurora Global Database**: replicacao < 1s, failover < 1 min entre regioes
- **DynamoDB Global Tables**: active-active multi-region (requer Streams)
- **Multi-AZ (RDS)**: HA (failover), nao para leitura
- **Multi-AZ (Aurora)**: 6 copias em 3 AZs automaticamente

### Data warehouse e Graph

- **Redshift**: data warehouse colunar (OLAP), MPP, ate 16 PB
  - **Redshift Spectrum**: query dados no S3 sem carregar
  - Nao e Multi-AZ (usar snapshots cross-region para DR)
  - **Enhanced VPC Routing**: forca trafego pela VPC

- **Neptune**: graph database
  - Relacionamentos complexos (redes sociais, fraud detection, knowledge graphs)
  - Suporta Apache TinkerPop Gremlin e SPARQL

---

## Migration and Transfer

### Application Discovery Service

- Planeja migracoes coletando dados do datacenter on-premises
- **Agentless Discovery (Connector)**: OVA em VMware, inventario de VMs (CPU, RAM, disco)
- **Agent-based Discovery**: agente instalado, coleta performance, processos, dependencias de rede
- Dados exportados para CSV, S3 (analise com Athena), Migration Hub

### Migrando servidores fisicos, Hyper-V e VMware

- **AWS MGN (Application Migration Service)**: lift-and-shift automatizado
  - Suporta: fisico, VMware, Hyper-V, EC2, outras clouds -> EC2
  - Replicacao continua em nivel de bloco
  - Cutover com minimo downtime

- **VMware Cloud on AWS**: para manter stack VMware
  - vMotion (migracao sem downtime)
  - HCX para facilitar migracao
  - VMs acessam servicos AWS nativos (S3, RDS, Lambda)

### Migration Hub

- Dashboard centralizado que rastreia progresso de todas as migracoes
- Integra com MGN, DMS, Application Discovery Service
- **Refactor Spaces**: migracao gradual monolito -> microservicos (API Gateway + Lambda)
- **Orchestrator**: automatiza migracoes com templates pre-definidos

### DMS, SMS, SCT e DataSync

- **AWS DMS (Database Migration Service)**:
  - Migra bancos com minimo downtime (Full Load + CDC)
  - **Homogenea** (MySQL -> RDS MySQL): sem SCT
  - **Heterogenea** (Oracle -> Aurora PostgreSQL): com SCT
  - Suporta replicacao continua (CDC)
  - Fontes: Oracle, SQL Server, MySQL, PostgreSQL, MongoDB, S3
  - Destinos: RDS, Aurora, Redshift, DynamoDB, S3, Kinesis, Kafka

- **AWS SCT (Schema Conversion Tool)**:
  - Converte schemas entre engines diferentes
  - Identifica codigo que nao pode ser convertido automaticamente
  - **Oracle -> DynamoDB**: usa SCT para converter schema + DMS para dados
  - **Data Extraction Agents**: extrai dados de data warehouses para S3

- **AWS DataSync**:
  - Transferencia de dados online (on-premises -> AWS ou AWS -> AWS)
  - Ate 10x mais rapido que ferramentas open-source
  - Suporta NFS, SMB, HDFS -> S3, EFS, FSx
  - Agendamento e controle de banda
  - **vs Storage Gateway**: DataSync = migracao/sync; Gateway = acesso hibrido continuo

- **AWS SMS (Server Migration Service)**: **descontinuado**, substituido pelo MGN

### Quando usar Snow Family vs migracao online

**Regra pratica**: Se a transferencia pela rede levaria mais de **1 semana**, use Snow Family.

**Formula**: `Dados(TB) x 8 x 1024 / Bandwidth(Mbps) / 86400 = dias`

| Volume | Conexao | Tempo estimado | Recomendacao |
|--------|---------|----------------|--------------|
| 10 TB | 1 Gbps | ~1 dia | DataSync |
| 80 TB | 100 Mbps | ~74 dias | **Snowball Edge** |
| 500 TB | 1 Gbps | ~46 dias | **Snowball Edge** (multiplos) |
| 10+ PB | Qualquer | Meses | **Snowmobile** |

| Dispositivo | Capacidade | Uso |
|-------------|------------|-----|
| **Snowcone** | 8-14 TB | Locais remotos, leve (2.1 kg), bateria |
| **Snowball Edge Storage** | 80 TB | Migracao de dados |
| **Snowball Edge Compute** | 42 TB + 52 vCPU + GPU | Processamento local + migracao |
| **Snowmobile** | 100 PB | Datacenters inteiros |

- Snowball **nao importa direto para Glacier** (primeiro S3, depois lifecycle)
- Snowball pode rodar **EC2 e Lambda localmente** (edge computing)
- Pode combinar Snowball + DMS para grandes migracoes de banco

---

## Networking and Content Delivery

### VPC - CIDR, Subnets, Route Tables

- **VPC**: rede privada, escopo regional, ate 5 por regiao (soft limit)
- **CIDR**: ate 5 blocos por VPC, /28 (16 IPs) a /16 (65536 IPs)
  - Ranges privados: 10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16
- **Subnets**: escopo de AZ, AWS reserva 5 IPs (primeiros 4 + ultimo)
  - Publica = Route Table com rota 0.0.0.0/0 -> IGW
  - Privada = sem rota para IGW
- **Route Tables**: direcionam trafego, boa pratica ter pelo menos 2 (publica + privada)

### NAT Gateway vs NAT Instance

| Caracteristica | NAT Gateway | NAT Instance |
|----------------|-------------|--------------|
| Gerenciamento | AWS gerencia | Voce gerencia |
| Disponibilidade | HA dentro da AZ | Precisa configurar HA |
| Bandwidth | Ate 45 Gbps (auto-scale) | Depende do tipo de instancia |
| Custo | Paga por hora + dados | Mais barato (EC2 pequena) |
| Security Group | Nao se aplica | Configuravel |
| Source/Dest Check | N/A | Deve desabilitar |
| Elastic IP | Sim (obrigatorio) | Sim (obrigatorio) |

- **Regra para prova**: **NAT Gateway** e a resposta padrao (gerenciado, escalavel). NAT Instance so quando custo e prioridade absoluta.
- Crie **1 NAT Gateway por AZ** para HA
- NAT Gateway fica em **subnet publica**, subnets privadas apontam rota 0.0.0.0/0 -> NAT GW

### VPC Endpoints

- **Gateway Endpoint**: S3 e DynamoDB
  - Gratuito, configurado na Route Table
  - NAO pode ser compartilhado fora da VPC (VPN, DX, TGW, Peering)
  - Um por VPC

- **Interface Endpoint**: todos os outros servicos (SNS, SQS, KMS, SSM, ECR, etc.)
  - Pago (por hora + dados), cria ENI com IP privado
  - Pode ser compartilhado via Direct Connect e VPN
  - Requer enableDnsSupport e enableDnsHostname na VPC

- **VPC Endpoint Policy**: controla QUAIS recursos podem ser acessados pelo endpoint
  - Ex: restringir endpoint S3 a um bucket especifico
  - Nao substitui IAM policies ou bucket policies, e uma camada adicional

### Security Groups e NACLs - Melhores praticas

**Security Groups (Stateful)**:
- Aplica-se a instancias (ENI), so ALLOW, todas as regras avaliadas
- Referencia cruzada entre SGs (ex: SG do app referencia SG do DB)
- Nunca abrir 0.0.0.0/0 desnecessariamente
- Portas importantes: 22 (SSH), 80 (HTTP), 443 (HTTPS), 3306 (MySQL), 5432 (PostgreSQL), 3389 (RDP)

**NACLs (Stateless)**:
- Aplica-se a subnets, ALLOW + DENY, avaliacao por ordem de prioridade
- Default NACL permite tudo, Custom NACL nega tudo
- Deve permitir **ephemeral ports** (1024-65535) para respostas
- Ideal para **bloquear faixas de IP** inteiras

**Defesa em profundidade**: WAF (Layer 7) -> CloudFront/ALB -> NACL (subnet) -> Security Group (instancia)

### Route 53 - Opcoes de roteamento

| Politica | Caso de Uso |
|----------|-------------|
| **Simple** | Um registro, sem health check |
| **Weighted** | Distribuir trafego por peso (70/30) - A/B testing, migracao gradual |
| **Latency** | Direcionar para regiao com menor latencia |
| **Failover** | Active-passive DR com health check |
| **Geolocation** | Direcionar por localizacao do usuario (pais/continente) |
| **Geoproximity** | Direcionar por proximidade geografica com bias ajustavel |
| **Multi-value** | Ate 8 registros com health check (nao e LB real) |
| **IP-based** | Direcionar por CIDR do cliente |

- **Health Checks**: HTTP, HTTPS, TCP (30s ou 10s fast)
- **Calculated Health Checks**: combina multiplos HCs com AND/OR/NOT
- **Private Hosted Zones**: DNS dentro da VPC (nao acessivel pela internet)
- **Resolver Endpoints**: DNS hibrido (Inbound = on-prem resolve AWS, Outbound = AWS resolve on-prem)

### Direct Connect

- **Conexao dedicada (fibra)** entre datacenter e AWS
- **Tipos**:
  - Dedicated: 1, 10, 100 Gbps (lead time: semanas/meses)
  - Hosted: 50 Mbps a 10 Gbps (via parceiro, mais rapido)
- **Dados NAO criptografados** por padrao -> usar **VPN over Direct Connect** (Site-to-Site VPN sobre DX) para criptografia
- **Redundancia**:
  - Maximum Resiliency: multiplas conexoes em multiplos locais (99.99% SLA)
  - High Resiliency: multiplas conexoes em um local
  - Backup com VPN: Site-to-Site VPN como failover

- **Direct Connect Gateway**: conecta DX a multiplas regioes
- **Virtual Interfaces (VIFs)**:
  - Public VIF: servicos publicos AWS (S3)
  - Private VIF: recursos na VPC (EC2, RDS)
  - Transit VIF: Transit Gateway

### VPN, Transit Gateway e Direct Connect Gateway

- **Site-to-Site VPN**:
  - Conecta on-premises a AWS via internet (IPSec)
  - Setup em minutos, ate 1.25 Gbps
  - 2 tuneis automaticos para HA
  - Precisa de VGW (AWS) + CGW (on-premises)
  - **Accelerated VPN**: usa Global Accelerator para menor latencia

- **Transit Gateway (TGW)**:
  - Hub central para conectar milhares de VPCs + VPN + DX
  - **Transitivo** (diferente de VPC Peering)
  - Suporta IP Multicast (unico servico AWS)
  - Compartilhavel via RAM entre contas
  - Route Tables para controlar comunicacao entre VPCs
  - **ECMP**: multiplas VPNs para aumentar throughput
  - Peering inter-region para conectar TGWs

- **Direct Connect Gateway**: conecta uma unica conexao DX a VPCs em multiplas regioes

**Quando usar cada um**:
| Necessidade | Servico |
|-------------|---------|
| Setup rapido, criptografado | Site-to-Site VPN |
| Alta banda, baixa latencia | Direct Connect |
| Conectar muitas VPCs | Transit Gateway |
| DX para multiplas regioes | DX Gateway |
| Backup do DX | VPN como failover |
| Criptografia no DX | VPN over DX |

### API Gateway - Opcoes e otimizacoes

- **REST API**: caching (0.5-237 GB), API keys, usage plans, WAF integration, request validation
- **HTTP API**: mais barato, suporta OIDC/OAuth 2.0, menos features
- **WebSocket API**: comunicacao bidirecional em tempo real
- **Limites**: 29s timeout, 10 MB payload, 10.000 req/s (account), 5.000 burst
- **Otimizacoes**: caching (TTL 0-3600s), throttling, Lambda Provisioned Concurrency para backend

### Global Accelerator vs CloudFront

| Caracteristica | Global Accelerator | CloudFront |
|----------------|-------------------|------------|
| Camada | Layer 4 (TCP/UDP) | Layer 7 (HTTP/HTTPS) |
| Cache | Nao | Sim (CDN) |
| IPs | 2 IPs Anycast estaticos | DNS name |
| Melhor para | Apps TCP/UDP, gaming, IoT, VoIP | Conteudo web, video, APIs HTTP |
| Health check | Sim, failover entre regioes | Via origin groups |
| Trafego | Pela backbone AWS | Cache na edge + origin |

- **Regra para prova**: Precisa de **IP estatico** ou **TCP/UDP nao-HTTP** -> Global Accelerator. Precisa **cachear conteudo** -> CloudFront.

---

## Developer Tools

### Pipeline CI/CD

```
CodeCommit (ou GitHub) -> CodeBuild (CI) -> CodeDeploy (CD)
              |                                    |
              +------------ CodePipeline ----------+
                        (Orquestracao)
```

- **CodeCommit**: repositorios Git gerenciados (similar ao GitHub)
- **CodeBuild**: compila, testa, gera artefatos (container Docker sob demanda, sem servidores)
- **CodeDeploy**: deploy automatizado para EC2, Lambda, ECS
- **CodePipeline**: orquestra todo o pipeline CI/CD
  - Integra com: CodeCommit, GitHub (webhooks), Jenkins, S3, CodeBuild, CodeDeploy, ECS, Beanstalk, CloudFormation
  - Cada stage pode ter actions sequenciais ou paralelas
  - **GitHub + CodePipeline**: configura webhook no GitHub que dispara o pipeline a cada push

### AWS X-Ray

- Rastreamento distribuido (distributed tracing)
- Mapeia visualmente o fluxo de requisicoes entre servicos
- Identifica gargalos de latencia, erros, e dependencias
- **Service Map**: visualizacao de todos os servicos e suas conexoes
- **Traces**: registros end-to-end de cada requisicao
- Integracao: EC2, ECS, Lambda, Beanstalk, API Gateway
- Integra com CloudWatch para metricas e alarmes
- Necessario: SDK do X-Ray no codigo + IAM permissions

### Estrategias de implantacao

| Estrategia | Descricao | Downtime | Rollback | Uso |
|------------|-----------|----------|----------|-----|
| **All-at-once** | Atualiza todos de uma vez | Sim | Manual (redeploy) | Dev/test |
| **In-place (Rolling)** | Atualiza em lotes | Minimo | Manual | Producao (custo menor) |
| **Rolling + Extra Batch** | Cria instancias extras, depois atualiza | Nao | Manual | Producao (manter capacidade) |
| **Immutable** | Cria novo ASG, valida, swapa | Nao | Rapido (deleta novo ASG) | Producao |
| **Blue/Green** | Novo ambiente completo, swapa DNS/LB | Nao | Rapido (volta pro blue) | Producao (zero downtime) |
| **Canary** | % pequena para nova versao, aumenta gradualmente | Nao | Rapido | Lambda, ECS |
| **Linear** | Trafego dividido igualmente, incrementa | Nao | Rapido | Lambda, ECS |

- **CodeDeploy + Lambda**: traffic shifting (Canary, Linear, All-at-once) com CloudWatch Alarms para rollback automatico
- **CodeDeploy + ECS**: Blue/Green com traffic shifting
- **CodeDeploy + EC2**: In-place ou Blue/Green

---

## Management and Governance

### AWS Organizations SCPs

- **SCPs limitam permissoes MAXIMAS** de contas na organizacao (nao concedem permissoes)
- **NAO afetam a Management Account** (conta payer)
- **Heranca hierarquica**: Root -> OU -> Sub-OU -> Conta
  - Permissao efetiva = **interseccao** de todas as SCPs na cadeia hierarquica + IAM policies
  - Se qualquer nivel na cadeia tem Deny, o acesso e negado
- **FullAWSAccess** aplicado por padrao no Root
- **Estrategia recomendada**: Deny list (manter FullAWSAccess + adicionar Denys especificos)
- **Deny list vs Allow list**:
  - Deny list: comeca com tudo permitido, vai bloqueando servicos/regioes
  - Allow list: remove FullAWSAccess, permite apenas servicos especificos (mais restritivo)
- Afetam todos os users/roles na conta (incluindo root da conta membro)

### CloudFormation - StackSets e Change Sets

- **StackSets**: deploy de stacks em multiplas contas e regioes simultaneamente
  - Usa AWS Organizations para deploy automatico em novas contas
  - Permissoes: self-managed (IAM roles) ou service-managed (Organizations)
  - Caso de uso: guardrails, baseline de seguranca, compliance em todas as contas

- **Change Sets**: preview de mudancas antes de aplicar
  - Mostra quais recursos serao adicionados, modificados ou deletados
  - Nao faz mudancas ate voce executar
  - Essencial para producao (evita surpresas)

- **Drift Detection**: detecta mudancas manuais feitas fora do CloudFormation
- **DeletionPolicy**: Retain (preserva), Snapshot (cria snapshot antes de deletar), Delete (padrao)
- **Custom Resources**: Lambda para recursos nao suportados nativamente

### CloudWatch - Metricas padrao vs custom

**Metricas padrao (automaticas)**:
- CPU Utilization, Network In/Out, Disk Read/Write (EC2)
- StatusCheckFailed (EC2)
- Metricas de ELB, RDS, Lambda, DynamoDB, etc.
- Granularidade: 5 minutos (padrao), 1 minuto (detailed monitoring - custo adicional)

**Metricas que NAO sao coletadas por padrao** (precisam de agent):
- **Memoria** (RAM utilization)
- **Espaco em disco**
- **Processos**
- Swap utilization
- -> Usar **CloudWatch Unified Agent** para coletar

**Metricas custom**: via API PutMetricData
- Resolucao: Standard (1 min) ou High Resolution (1, 5, 10, 30 seg)

### CloudTrail + EventBridge/CloudWatch

- **CloudTrail** captura:
  - Management Events: acoes em recursos (CreateBucket, TerminateInstances)
  - Data Events: acoes em dados (GetObject S3, Invoke Lambda) - precisa habilitar
  - Insights: detecta atividade incomum

- **Reagir a eventos**:
  - **EventBridge**: captura eventos do CloudTrail e roteia para Lambda, SNS, SQS, Step Functions
    - Ex: "quando alguem deletar um security group, enviar alerta SNS"
    - Ex: "quando um root login acontecer, disparar Lambda de remediacao"
  - **CloudWatch Alarms**: baseados em metricas (nao eventos)
    - Ex: "quando CPU > 90% por 5 minutos, escalar ASG"
  - **CloudWatch Logs + Metric Filters**: criar metricas a partir de padroes em logs
    - Ex: "contar quantas vezes 'ERROR' aparece nos logs, criar alarme"

### Systems Manager - Parameter Store e Patching

- **Parameter Store**:
  - Armazena configuracoes e secrets (String, StringList, SecureString com KMS)
  - Hierarquia: /app/prod/db-url, /app/dev/db-url
  - Standard (gratuito, 4 KB) vs Advanced (pago, 8 KB, policies de TTL)
  - Diferenca do Secrets Manager: sem rotacao automatica, mais barato, integracao nativa com CloudFormation

- **Patch Manager**:
  - Automatiza patches de seguranca em EC2 e on-premises
  - **Patch Baselines**: define quais patches aplicar (ex: critical, security)
  - **Maintenance Windows**: agenda janelas para patching
  - **Run Command**: executa patches remotamente sem SSH

- **Session Manager**: acesso a instancias sem SSH, sem bastion host, logs no CloudTrail

### Service Catalog

- Catalogo de servicos aprovados baseados em templates CloudFormation
- **Portfolios**: agrupam produtos para equipes
- **Products**: recursos pre-configurados (EC2 padrao, banco padrao, etc.)
- Compartilhamento via AWS Organizations
- Garante que usuarios usem apenas configuracoes aprovadas (governanca)
- Diferente de Control Tower (que gerencia configuracao da conta) e Organizations (que gerencia SCPs)

---

## Machine Learning

### Servicos de ML - O que cada um faz

| Servico | Funcao | Caso de Uso |
|---------|--------|-------------|
| **Rekognition** | Analise de imagens/videos | Moderacao de conteudo, reconhecimento facial, deteccao de objetos |
| **Transcribe** | Audio -> Texto | Transcrever chamadas, legendas, PII redaction |
| **Polly** | Texto -> Fala | Apps que "falam", IVR |
| **Translate** | Traducao automatica | Localizacao de conteudo |
| **Lex** | Chatbots (ASR + NLU) | Chatbots, voicebots (mesma tecnologia Alexa) |
| **Connect** | Call center virtual | Central de atendimento com bots |
| **Comprehend** | NLP (sentimento, entidades) | Analise de feedback, deteccao de idioma |
| **Comprehend Medical** | NLP para dados medicos | Extrair PHI de documentos clinicos |
| **SageMaker** | Plataforma ML completa | Build/train/deploy modelos customizados |
| **Forecast** | Previsao de series temporais | Vendas, demanda, financas |
| **Kendra** | Busca semantica em docs | Busca inteligente em documentos internos |
| **Personalize** | Recomendacoes | Recomendacao de produtos, conteudo |
| **Textract** | OCR de documentos | Extrair texto de PDFs, formularios, tabelas |
| **Bedrock** | LLMs gerenciados | IA generativa, RAG, Agents |

---

## Analytics

### Analisar dados de datalakes e streams

**Arquitetura tipica de analytics**:
```
Fontes -> Ingestao -> Armazenamento -> Processamento -> Visualizacao
```

| Etapa | Servicos |
|-------|----------|
| **Ingestao em tempo real** | Kinesis Data Streams, MSK (Kafka), IoT Core |
| **Entrega near real-time** | Kinesis Data Firehose -> S3, Redshift, OpenSearch |
| **ETL** | AWS Glue (serverless), EMR (Hadoop/Spark) |
| **Data Catalog** | Glue Data Catalog (metadados centralizados) |
| **Data Lake** | S3 (com Lake Formation para governanca) |
| **Query ad-hoc** | Athena (SQL sobre S3, paga por scan) |
| **Data Warehouse** | Redshift (OLAP, MPP, Spectrum para S3) |
| **Search/Logs** | OpenSearch (full-text search, dashboards) |
| **Visualizacao** | QuickSight (BI, SPICE engine) |
| **ML em streaming** | Kinesis Data Analytics (SQL/Flink) |

**Kinesis Data Streams vs Kinesis Data Firehose**:
| | Data Streams | Data Firehose |
|---|---|---|
| Latencia | Tempo real (~200ms) | Near real-time (60s buffer) |
| Gerenciamento | Voce gerencia shards | Totalmente gerenciado |
| Replay | Sim (retencao 1-365 dias) | Nao |
| Consumers | Lambda, KCL, Firehose, Analytics | S3, Redshift, OpenSearch, Splunk, HTTP |
| Transformacao | Via consumer | Lambda inline |

---

## Security, Identity and Compliance

### Politicas IAM

- **Evaluation logic**: Deny explicito > Allow explicito > Deny implicito
- **Permission Boundaries**: limite maximo para user/role (interseccao com identity policies)
- **Resource-based policies**: em S3 buckets, SQS queues, KMS keys (cross-account sem AssumeRole)
- **Session policies**: limitam permissoes de sessoes temporarias (AssumeRole)
- **Identity policies + Resource policies + SCPs + Permission Boundaries** = permissao efetiva

### Acesso cross-account com roles + External ID

1. Conta B cria uma IAM Role com trust policy permitindo Conta A
2. Conta A faz `AssumeRole` para obter credenciais temporarias
3. **External ID**: previne problema do "confused deputy"
   - E um segredo compartilhado entre as contas
   - Garante que apenas o servico/parceiro correto assuma a role
   - Obrigatorio quando terceiros acessam sua conta

### Directory Service

- **AWS Managed Microsoft AD**: AD completo na AWS, trust bidirecional com on-premises
  - MFA, group policies, Kerberos, LDAP
  - Caso de uso: AD corporativo na nuvem com integracao on-premises
- **AD Connector**: proxy para AD on-premises (sem dados na AWS)
  - Caso de uso: autenticacao direcionada ao AD existente
- **Simple AD**: AD standalone simples (Samba)
  - Caso de uso: AD basico sem conexao on-premises

### Secrets Manager vs Parameter Store

| | Secrets Manager | Parameter Store |
|---|---|---|
| Rotacao automatica | Sim (Lambda nativa para RDS) | Nao (manual com Lambda) |
| Custo | $0.40/secret/mes | Gratuito (Standard) |
| Integracao RDS | Nativa | Manual |
| Replicacao cross-region | Sim | Nao |
| Tamanho | 64 KB | 4 KB (Standard), 8 KB (Advanced) |

### SSO e Cognito

- **IAM Identity Center (SSO)**: login unico para multiplas contas AWS e apps SAML
  - Integra com Organizations, AD, SAML 2.0
  - Permission Sets definem permissoes por conta
  - Caso de uso: funcionarios acessando multiplas contas AWS

- **Cognito User Pools**: autenticacao de usuarios (signup, login, MFA)
  - Retorna JWT tokens
  - Integra com API Gateway e ALB
  - Caso de uso: autenticacao de usuarios em apps web/mobile

- **Cognito Identity Pools**: troca tokens por credenciais AWS temporarias
  - Permite acesso direto a S3, DynamoDB, etc.
  - Caso de uso: app mobile que acessa S3 diretamente

### KMS, ACM e CloudHSM

- **KMS**: servico gerenciado de criptografia (symmetric AES-256, asymmetric RSA/ECC)
  - Key Policies controlam acesso
  - Multi-Region Keys para replicacao de chaves
  - Envelope Encryption para dados grandes (GenerateDataKey)

- **ACM (Certificate Manager)**: certificados SSL/TLS gratuitos
  - Renovacao automatica
  - Integra com ELB, CloudFront, API Gateway
  - Nao pode exportar certificados publicos (para EC2 use certificados de terceiros)

- **CloudHSM**: hardware dedicado (FIPS 140-2 Level 3)
  - Voce gerencia as chaves (AWS nao tem acesso)
  - Caso de uso: compliance que exige HSM dedicado

### WAF - Implementacao

- Aplica-se a: **ALB, API Gateway, CloudFront, AppSync, Cognito User Pool**
- **NAO se aplica** a: NLB, EC2 diretamente
- **Web ACL Rules**:
  - IP-based: bloquear/permitir IPs ou CIDRs
  - Rate-based: bloquear IPs com muitas requisicoes (anti-DDoS Layer 7)
  - String match: detectar SQL injection, XSS
  - Geo match: bloquear por pais
  - Size constraint: limitar tamanho de requisicoes
- **Managed Rules**: regras prontas (AWS, F5, Fortinet, etc.)
- **Para usar WAF com NLB**: colocar ALB na frente do NLB, ou usar CloudFront

### Defesa em profundidade

```
Internet -> CloudFront (WAF + Geo Restriction + Shield)
         -> ALB (WAF + Security Groups + SSL)
         -> NACL (Subnet level - DENY IPs)
         -> Security Group (Instance level - ALLOW only)
         -> Instancia (OS firewall, patching via SSM)
         -> Dados (KMS encryption, SSL/TLS)
```

### Shield e mitigacao DDoS

- **Shield Standard** (gratuito): protecao automatica contra DDoS Layer 3/4 (SYN flood, UDP reflection)
- **Shield Advanced** ($3000/mes):
  - Protege: EC2, ELB, CloudFront, Global Accelerator, Route 53
  - DRT (DDoS Response Team) 24/7
  - Protecao contra custos de scaling durante ataques
  - Metricas e relatorios avancados no CloudWatch
  - Requer WAF para protecao Layer 7

**Estrategia anti-DDoS completa**:
1. CloudFront + WAF (rate limiting, geo blocking)
2. Shield Advanced nos recursos expostos
3. Auto Scaling para absorver picos
4. Route 53 com health checks para failover

---

## Front-end Web and Mobile

### AWS AppSync

- Servico GraphQL gerenciado
- **Resolvers**: conectam GraphQL a DynamoDB, Lambda, HTTP, RDS, OpenSearch
- **Subscriptions**: dados em tempo real via WebSocket
- **Offline sync**: cache local com sincronizacao automatica (Amplify DataStore)
- **Cognito** para autenticacao, **IAM** ou **API Keys** para autorizacao
- Caso de uso: apps mobile/web com dados em tempo real, offline-first

---

## Application Integration

### Quando usar cada servico

| Servico | Caso de Uso | Tipo |
|---------|-------------|------|
| **SQS** | Desacoplar servicos, buffer de processamento | Fila (queue) |
| **SNS** | Notificar multiplos consumers | Pub/Sub |
| **Step Functions** | Orquestrar workflows complexos | Orquestracao |
| **EventBridge** | Reagir a eventos (AWS, SaaS, custom) | Event bus |
| **Amazon MQ** | Migrar apps que usam ActiveMQ/RabbitMQ | Message broker |
| **SWF** | Workflows com sinais humanos (legado) | Workflow |

### SQS vs SNS vs EventBridge

| | SQS | SNS | EventBridge |
|---|---|---|---|
| Modelo | Pull (consumer busca) | Push (entrega) | Push (regras) |
| Consumers | 1 consumer por mensagem | N subscribers | N targets |
| Persistencia | Sim (4-14 dias) | Nao | Archive opcional |
| Filtering | Nao (process all) | Message filtering | Regras avancadas JSON |
| Retry | Visibility timeout + DLQ | DLQ | Retry policy + DLQ |
| Integracao SaaS | Nao | Nao | Sim (Datadog, Zendesk) |

### Amazon MQ

- Broker gerenciado para **ActiveMQ** e **RabbitMQ**
- Suporta: MQTT, AMQP, STOMP, OpenWire, WSS
- **Quando usar**: migrar aplicacoes on-premises que ja usam esses protocolos
- **Quando NAO usar**: aplicacoes novas (use SQS/SNS - mais escalavel e gerenciado)
- Multi-AZ com failover (EFS para storage)

### Scaling com ASG e SQS

- **Pattern**: SQS queue -> EC2 consumers (ASG)
- **Scaling policy**: baseada em `ApproximateNumberOfMessagesVisible` (CloudWatch metric)
- Quanto mais mensagens na fila, mais instancias o ASG cria
- **Target Tracking**: manter backlog por instancia em valor-alvo
- Funciona tambem com Lambda (event source mapping) - Lambda escala automaticamente

---

## Cost Management

### Organizations para faturamento centralizado

- **Consolidated Billing**: fatura unica na Management Account
- **Volume discounts**: uso agregado de todas as contas = maiores descontos
- **Reserved Instances e Savings Plans**: compartilhados entre contas da organizacao
- Pode desabilitar compartilhamento de RI/SP se necessario

### Tags de alocacao de custos

- **AWS Generated Tags**: prefixo `AWS:` (ex: AWS:CreatedBy), habilitadas no Billing
- **User Tags**: prefixo `user:`, definidas pelo usuario
- Aparecem no Billing Console apos 24h
- Permitem **relatórios por centro de custo**, projeto, ambiente, equipe
- **Tag Editor**: gerencia tags em massa, multi-region
- **Tag Policies** (Organizations): padronizam tags em toda a organizacao

### Relatar custos para centros de custo

1. Definir **tags de alocacao** (ex: `user:CostCenter`, `user:Project`, `user:Environment`)
2. Habilitar tags no **Billing Console**
3. Usar **Cost Explorer** para filtrar e agrupar por tag
4. Criar **AWS Budgets** por tag para alertas de gasto por centro de custo
5. **Cost & Usage Reports (CUR)**: relatorio detalhado exportado para S3, analisavel com Athena/QuickSight

### Savings Plans e Reserved Instances

| Tipo | Flexibilidade | Desconto | Compromisso |
|------|---------------|----------|-------------|
| **On-Demand** | Total | 0% | Nenhum |
| **EC2 Instance Savings Plan** | Familia + Regiao fixa | Ate 72% | 1-3 anos |
| **Compute Savings Plan** | Qualquer EC2 + Fargate + Lambda | Ate 66% | 1-3 anos |
| **Reserved Instance (Standard)** | Instancia + AZ + Regiao fixa | Ate 72% | 1-3 anos |
| **Reserved Instance (Convertible)** | Pode trocar tipo | Ate 54% | 1-3 anos |
| **Spot Instance** | Total (pode perder) | Ate 90% | Nenhum |

- **Compute Savings Plan** e mais flexivel que EC2 Instance SP (funciona com Fargate e Lambda)
- **RIs podem ser compartilhadas** entre contas da organizacao

---

## End-user Computing

### WorkSpaces e AppStream

- **WorkSpaces**: VDI (Virtual Desktop Infrastructure) gerenciado
  - Desktop Windows ou Linux completo na nuvem
  - Paga por hora ou mensal
  - Integra com AD para autenticacao
  - IP Access Control Groups para restringir acesso
  - Caso de uso: funcionarios remotos, BYOD, compliance

- **AppStream 2.0**: streaming de **aplicacoes** desktop via navegador
  - Nao e desktop completo, e uma unica aplicacao
  - Caso de uso: apps pesados (CAD, IDE), treinamento, demos
  - Nao requer instalacao no dispositivo do usuario

**Diferenca chave**: WorkSpaces = desktop completo; AppStream = app especifica via browser

---

## Internet of Things

### IoT Core

- Servico gerenciado para conectar e gerenciar dispositivos IoT
- **Protocolos**: MQTT (pub/sub, leve), HTTPS
- **Device Shadow**: representacao virtual do estado do dispositivo (mesmo offline)
- **Rules Engine**: processa mensagens e roteia para: Lambda, S3, DynamoDB, Kinesis, SNS, SQS
- **Device Gateway**: gerencia conexoes de milhoes de dispositivos
- **Security**: certificados X.509, IAM policies, autenticacao mutua TLS

**Servicos IoT adicionais**:
- **IoT Greengrass**: compute na borda (executa Lambda localmente no dispositivo)
- **IoT Analytics**: analise de dados IoT
- **IoT Device Defender**: auditoria e seguranca de dispositivos
- **IoT Events**: detecta e reage a eventos complexos
- **IoT SiteWise**: dados industriais (fabricas, minas)

**Caso de uso tipico**:
```
Dispositivos -> IoT Core (MQTT) -> Rules Engine -> Lambda/DynamoDB/S3
                    |                    |
              Device Shadow          Kinesis -> Analytics -> QuickSight
```
