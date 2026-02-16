---
title: "Resumo Completo - AWS SAP-C02"
sidebar_position: 18
---

# Resumo Completo - AWS Solutions Architect Professional (SAP-C02)

---

## 1. Identidade, Federacao e Organizacoes

### IAM (Identity and Access Management)
- Servico global (sem escopo de regiao)
- **Users**: identidades individuais com credenciais
- **Groups**: agrupamentos de users (nao podem conter outros groups)
- **Roles**: identidades temporarias para servicos AWS, contas externas ou federacao
- **Policies**: documentos JSON que definem permissoes (Allow/Deny)
  - **AWS Managed Policies**: criadas e mantidas pela AWS
  - **Customer Managed Policies**: criadas pelo usuario, reutilizaveis
  - **Inline Policies**: acopladas diretamente a um user/group/role
- **Permission Boundaries**: limite maximo de permissoes para um user ou role (nao se aplica a groups)
  - Usado para delegar criacao de roles sem escalar privilegios
- **IAM Conditions**: restringem quando uma policy se aplica (ex: aws:SourceIp, aws:RequestedRegion, aws:MultiFactorAuthPresent)
- **IAM Access Analyzer**: identifica recursos compartilhados externamente (S3, SQS, IAM Roles, KMS, Lambda, Secrets Manager)
- **STS (Security Token Service)**: gera credenciais temporarias (AssumeRole, AssumeRoleWithSAML, AssumeRoleWithWebIdentity, GetSessionToken)

### Identity Federation
- **SAML 2.0**: integracao com Active Directory/ADFS para SSO no Console/CLI
- **Custom Identity Broker**: quando IdP nao suporta SAML 2.0, usa STS diretamente
- **Web Identity Federation**: login via Google, Facebook, Amazon (sem Cognito - nao recomendado)
- **Web Identity Federation com Cognito**: abordagem recomendada pela AWS para apps mobile/web
- **AWS IAM Identity Center (antigo SSO)**:
  - Login unico para multiplas contas AWS e apps
  - Integra com AWS Organizations, AD, SAML 2.0
  - **Permission Sets**: define permissoes atribuidas a users/groups em contas especificas
  - Suporta ABAC (Attribute-Based Access Control)

### Amazon Cognito
- **User Pools**: diretorio de usuarios, autenticacao, MFA, login social
  - Retorna JWT tokens
  - Integra com API Gateway e ALB
- **Identity Pools (Federated Identities)**: troca tokens por credenciais AWS temporarias
  - Permite acesso direto a recursos AWS (S3, DynamoDB)
  - Suporta guest access
  - Mapeamento de roles via regras ou default

### AWS Directory Services
- **AWS Managed Microsoft AD**: AD gerenciado na AWS, trust bidirecional com on-premises AD
- **AD Connector**: proxy para AD on-premises (sem cache local)
- **Simple AD**: AD standalone simples (nao conecta com on-premises)

### AWS Organizations
- **Management Account**: conta principal (payer), nao afetada por SCPs
- **Organizational Units (OUs)**: hierarquia para agrupar contas
- **Service Control Policies (SCPs)**:
  - Limitam permissoes MAXIMAS de contas (nao concedem permissoes)
  - Nao afetam a Management Account
  - Modelo: FullAWSAccess por padrao, depois deny especificos
  - Heranca hierarquica (OU pai -> OU filha -> conta)
- **Consolidated Billing**: fatura unica, descontos por volume agregado
- **Tag Policies**: padronizam tags em toda a organizacao
- **Backup Policies**: centralizam politicas de backup

### AWS Control Tower
- Configura ambiente multi-account seguindo best practices
- **Landing Zone**: ambiente multi-account configurado automaticamente
- **Guardrails**: regras de governanca
  - **Preventive**: usam SCPs para bloquear acoes
  - **Detective**: usam AWS Config Rules para detectar nao-conformidade
  - **Proactive**: usam CloudFormation hooks
- **Account Factory**: criacao automatizada de contas padronizadas
- **Customizations for Control Tower (CfCT)**: templates CloudFormation customizados aplicados automaticamente a novas contas
- **Account Factory for Terraform (AFT)**: provisionamento de contas via Terraform

### AWS RAM (Resource Access Manager)
- Compartilha recursos entre contas (subnets, Transit Gateway, Route 53 Resolver Rules, License Manager, Aurora DB Clusters)
- Evita duplicacao de recursos

### Estrategia Multi-Account
- **Padrao recomendado**: OU por ambiente (Dev, Staging, Prod) ou por funcao (Security, Log Archive, Shared Services)
- **Log Archive Account**: centraliza CloudTrail, Config, VPC Flow Logs
- **Security/Audit Account**: acessa todas as contas para auditoria (GuardDuty delegated admin, Security Hub)
- **Shared Services Account**: recursos compartilhados (AD, DNS, CI/CD)
- **Network Account**: Transit Gateway, Direct Connect, DNS centralizado
- Cross-account access: IAM Roles com AssumeRole (nunca compartilhar credenciais)

---

## 2. Seguranca

### AWS CloudTrail
- Registra todas as chamadas de API feitas na conta AWS
- **Management Events**: operacoes em recursos (criar EC2, configurar IAM) - habilitado por padrao
- **Data Events**: operacoes em dados (GetObject S3, Invoke Lambda) - nao habilitado por padrao
- **Insights Events**: detecta atividade incomum (picos de API calls)
- Logs armazenados no S3 (criptografia SSE-S3 padrao, pode usar SSE-KMS)
- Retencao: 90 dias no console, ilimitado no S3
- **Organization Trail**: aplica a todas as contas da organizacao
- Integracao: CloudWatch Logs, EventBridge, Athena (para consultas SQL nos logs)

### AWS KMS (Key Management Service)
- Servico gerenciado de criptografia
- **Tipos de chaves**:
  - **AWS Managed Keys**: criadas/gerenciadas pela AWS (aws/s3, aws/ebs)
  - **Customer Managed Keys (CMK)**: criadas pelo usuario, rotacao anual opcional
  - **AWS Owned Keys**: usadas internamente pela AWS
- **Tipos de criptografia**:
  - **Symmetric (AES-256)**: chave unica para encrypt/decrypt - padrao
  - **Asymmetric (RSA, ECC)**: par de chaves publica/privada
- **Key Policies**: controlam acesso as chaves (similar a S3 bucket policies)
- **Envelope Encryption**: GenerateDataKey API, criptografa dados localmente
- **Multi-Region Keys**: mesma chave replicada em varias regioes (mesmo key ID)
  - Casos de uso: DynamoDB Global Tables encryption, Aurora Global Database encryption
- **Limites**: 5500-30000 requests/segundo dependendo da regiao e tipo de operacao

### AWS CloudHSM
- Hardware dedicado para criptografia (FIPS 140-2 Level 3)
- Voce gerencia as chaves (AWS nao tem acesso)
- Suporta criptografia simetrica e assimetrica
- Integra com KMS via Custom Key Store
- Multi-AZ para HA (cluster de HSMs)
- Caso de uso: compliance que exige HSM dedicado

### AWS Secrets Manager
- Armazena e rotaciona secrets (senhas de banco, API keys)
- Rotacao automatica com Lambda (a cada X dias)
- Integracao nativa com RDS, Redshift, DocumentDB
- Criptografia com KMS
- Replicacao cross-region para DR

### SSM Parameter Store
- Armazena configuracoes e secrets
- **Standard**: ate 10.000 parametros, 4 KB, gratuito
- **Advanced**: ate 100.000, 8 KB, pago, suporta policies (TTL, notificacao)
- Hierarquia: /app/dev/db-password
- Criptografia com KMS (SecureString)
- Sem rotacao automatica nativa (pode usar EventBridge + Lambda)
- **vs Secrets Manager**: Parameter Store e mais barato e simples; Secrets Manager tem rotacao nativa, integracao direta com RDS, e custa $0.40/secret/mes

### AWS WAF (Web Application Firewall)
- Protege contra ataques web (SQL injection, XSS)
- Aplica-se a: ALB, API Gateway, CloudFront, AppSync, Cognito User Pool
- **Web ACL Rules**: baseadas em IP, HTTP headers, body, URI, geo, rate-based
- **Managed Rules**: regras prontas da AWS ou Marketplace
- **Rate-based Rules**: bloqueia IPs com muitas requisicoes (DDoS Layer 7)

### AWS Shield
- **Shield Standard**: protecao DDoS gratuita (Layer 3/4) para todos os clientes
- **Shield Advanced**: protecao DDoS avancada ($3000/mes)
  - Protege EC2, ELB, CloudFront, Global Accelerator, Route 53
  - Acesso ao DRT (DDoS Response Team) 24/7
  - Protecao contra custos de scaling durante ataques

### AWS Firewall Manager
- Gerencia regras de seguranca centralizadamente em toda a organizacao
- Gerencia WAF rules, Shield Advanced, Security Groups, Network Firewall, Route 53 Resolver DNS Firewall
- Requer AWS Organizations

### Amazon GuardDuty
- Deteccao inteligente de ameacas com ML
- Analisa: CloudTrail Events, VPC Flow Logs, DNS Logs, EKS Audit Logs
- Detecta: crypto mining, acesso nao autorizado, comportamento anomalo
- Integracao com EventBridge para automacao

### Amazon Inspector
- Analise automatizada de vulnerabilidades
- Escopo: EC2 (via SSM Agent), Container Images (ECR), Lambda Functions
- Gera findings com severidade e integracao com Security Hub

### AWS Config
- Audita e registra conformidade de recursos AWS
- **Config Rules**: avalia configuracoes (managed rules ou custom com Lambda)
- **Remediation**: acoes automaticas via SSM Automation Documents
- **Aggregator**: visualizacao multi-account/multi-region
- Nao previne acoes, apenas detecta e notifica

### AWS Security Hub
- Dashboard centralizado de seguranca
- Agrega findings de: GuardDuty, Inspector, Macie, Firewall Manager, IAM Access Analyzer, Systems Manager
- Verifica compliance automaticamente (CIS, PCI DSS, AWS Foundational)

### AWS ACM (Certificate Manager)
- Provisiona e gerencia certificados SSL/TLS gratuitos
- Integra com: ELB, CloudFront, API Gateway
- Renovacao automatica
- Certificados publicos sao gratuitos, privados sao pagos

### Bloqueio de IP
- **NACL**: bloqueio direto de IP no nivel de subnet
- **Security Group**: so permite ALLOW (nao bloqueia IP diretamente)
- **WAF**: regras de IP no ALB/CloudFront
- **CloudFront + WAF**: protecao na borda com geo-restriction

### Criptografia - Resumo de Padroes
- **Em repouso**: KMS (maioria dos servicos), CloudHSM (compliance FIPS 140-2 Level 3), SSE-S3 (padrao S3)
- **Em transito**: TLS/SSL (ACM para certificados), VPN (IPSec para rede)
- **Client-side**: SDK de criptografia do cliente, S3 Encryption Client
- **Chave cross-region**: KMS Multi-Region Keys (mesmo key ID replicado)
- **Chave cross-account**: Key Policy permite acesso + IAM Policy na conta destino

---

## 3. Compute e Load Balancing

### Amazon EC2
- **Instance Types**: General Purpose (T, M), Compute Optimized (C), Memory Optimized (R, X, z), Storage Optimized (I, D, H), Accelerated Computing (P, G, Inf, Trn)
- **Placement Groups**:
  - **Cluster**: mesma AZ, mesma rack, baixa latencia (HPC)
  - **Spread**: instancias em racks diferentes, max 7 por AZ (HA critico)
  - **Partition**: partitions em racks diferentes, ate 100s instancias (Big Data - Hadoop, Kafka, Cassandra)
- **EC2 Hibernate**: salva RAM em EBS, boot rapido
- **Spot Instances**: ate 90% desconto, pode ser interrompido
  - **Spot Fleet**: colecao de Spot + On-Demand
  - **Spot Block**: reserva por 1-6 horas (descontinuado)
- **Dedicated Hosts**: servidor fisico dedicado, licenciamento BYOL
- **Dedicated Instances**: instancias em hardware dedicado (sem controle de placement)

### Auto Scaling Group (ASG)
- **Scaling Policies**:
  - **Target Tracking**: mantem metrica em valor-alvo (ex: CPU 50%)
  - **Step Scaling**: adiciona/remove capacidade em degraus
  - **Scheduled Scaling**: escala em horarios predefinidos
  - **Predictive Scaling**: usa ML para prever demanda
- **Cooldown Period**: tempo de espera apos scaling (default 300s)
- **Lifecycle Hooks**: executam acoes durante launch/terminate
- **Instance Refresh**: atualiza instancias gradualmente (rolling update)
- **Warm Pools**: instancias pre-inicializadas para scaling rapido
- **Health Checks**: EC2 (default) ou ELB

### Elastic Load Balancing (ELB)
- **ALB (Application Load Balancer)**: Layer 7 (HTTP/HTTPS/WebSocket)
  - Roteamento por: path, hostname, query string, headers
  - Target Groups: EC2, ECS, Lambda, IP addresses
  - Sticky Sessions (cookies: AWSALB, AWSALBAPP, custom)
  - Cross-zone load balancing habilitado por padrao
  - Suporta autenticacao com Cognito ou OIDC
- **NLB (Network Load Balancer)**: Layer 4 (TCP/UDP/TLS)
  - Ultra baixa latencia (~100ms vs ~400ms ALB)
  - IP estatico por AZ (Elastic IP)
  - Target Groups: EC2, IP, ALB
  - Preserva source IP do cliente
  - Cross-zone desabilitado por padrao
- **GWLB (Gateway Load Balancer)**: Layer 3 (Network)
  - Para appliances de seguranca (firewalls, IDS/IPS)
  - Protocolo GENEVE na porta 6081
  - Transparent Network Gateway + Load Balancer
- **CLB (Classic Load Balancer)**: Layer 4/7 (legado)

### Amazon ECS (Elastic Container Service)
- **Launch Types**:
  - **EC2 Launch Type**: voce gerencia as EC2 instances
  - **Fargate Launch Type**: serverless, sem gerenciar infra
- **Task Definition**: define containers, imagens, CPU/memoria, portas, volumes
- **Service**: mantem N tasks rodando, integra com ELB
- **Auto Scaling**: target tracking (CPU, RAM, ALB request count)
- **ECS Anywhere**: roda ECS em servidores on-premises

### Amazon EKS (Elastic Kubernetes Service)
- Kubernetes gerenciado na AWS
- **Node Types**: Managed Node Groups, Self-Managed Nodes, Fargate
- **EKS Anywhere**: Kubernetes on-premises
- **EKS Distro**: distribuicao open-source do EKS

### AWS Lambda
- Serverless, ate 15 minutos de execucao
- Memoria: 128 MB a 10 GB
- **Concurrency**: ate 1000 execucoes simultaneas (default, pode aumentar)
- **Reserved Concurrency**: garante capacidade para funcao especifica
- **Provisioned Concurrency**: inicializa instancias previamente (sem cold start)
- **Lambda@Edge**: executa no CloudFront (Node.js, Python)
- **Lambda in VPC**: acessa recursos na VPC (RDS, ElastiCache)
- Integracao com: API Gateway, S3, DynamoDB Streams, Kinesis, SQS, SNS, EventBridge

### AWS App Runner
- Deploy automatico de containers ou codigo-fonte
- Auto scaling, load balancing, HTTPS - tudo gerenciado
- Ideal para apps web e APIs simples
- **vs Fargate**: App Runner e mais simples (zero config), Fargate da mais controle (VPC, task definitions, IAM roles granulares)

### API Gateway
- **Tipos de API**:
  - **REST API**: mais features (caching, API keys, usage plans, WAF)
  - **HTTP API**: mais barato, mais simples, suporta OIDC/OAuth 2.0
  - **WebSocket API**: comunicacao bidirecional em tempo real
- **Limites**: timeout de 29 segundos, payload max 10 MB
- **Caching**: 0.5 GB a 237 GB, TTL 0-3600s
- **Autenticacao**: IAM, Cognito User Pools, Lambda Authorizer
- **Throttling**: 10.000 req/s (account level), 5.000 burst
- **Stages**: dev, staging, prod com variaveis de stage
- **Canary Deployment**: direciona % do trafego para nova versao

### Amazon Route 53
- DNS gerenciado pela AWS
- **Routing Policies**:
  - **Simple**: um registro, sem health check
  - **Weighted**: distribui trafego por peso (ex: 70%/30%)
  - **Latency-based**: roteia para regiao com menor latencia
  - **Failover**: active-passive com health check
  - **Geolocation**: baseado na localizacao geografica do usuario
  - **Geoproximity**: baseado em proximidade geografica com bias
  - **Multi-value Answer**: ate 8 registros com health check (nao e LB)
  - **IP-based**: baseado no CIDR do cliente
- **Health Checks**: HTTP, HTTPS, TCP (intervalo 30s ou 10s fast)
  - Calculated Health Checks: combina multiplos health checks
- **Hosted Zones**: Public (internet) ou Private (VPC)
- **DNSSEC**: protege contra DNS spoofing
- **Route 53 Resolver**: DNS hibrido (Inbound/Outbound endpoints)

### AWS Global Accelerator
- Rede global da AWS para melhorar performance
- 2 IPs Anycast estaticos
- Trafego passa pela AWS backbone (menor latencia)
- Health checks e failover automatico entre regioes
- **vs CloudFront**: CloudFront para conteudo cacheavel, Global Accelerator para TCP/UDP e IPs estaticos

### AWS Outposts, Wavelength, Local Zones
- **Outposts**: hardware AWS no seu datacenter (EC2, EBS, S3, ECS, EKS, RDS)
- **Wavelength**: computa nas redes 5G para ultra baixa latencia mobile
- **Local Zones**: extensao de regiao em cidades especificas

---

## 4. Storage

### Amazon EBS (Elastic Block Store)
- Volume de disco atacado a EC2 (1 instancia por vez, exceto io1/io2 Multi-Attach)
- **Tipos**:
  - **gp3/gp2**: SSD uso geral (ate 16.000 IOPS)
  - **io2/io1**: SSD alta performance (ate 64.000 IOPS, 256.000 io2 Block Express)
  - **st1**: HDD throughput otimizado (Big Data, data warehouse)
  - **sc1**: HDD cold storage (menor custo)
- **Snapshots**: backup incremental, pode copiar cross-region
  - **Fast Snapshot Restore (FSR)**: restauracao rapida sem pre-warming
  - **EBS Snapshot Archive**: 75% mais barato, 24-72h para restaurar
  - **Recycle Bin**: protege contra delecao acidental (retencao configuravel)
- **Encryption**: AES-256 com KMS, snapshots de volumes criptografados sao criptografados
- **Multi-Attach (io1/io2)**: ate 16 instancias no mesmo AZ

### Instance Store
- Disco fisico conectado ao host EC2 (efemero)
- Altissimo IOPS (milhoes)
- Dados perdidos se instancia para
- Caso de uso: cache, buffer, dados temporarios

### Amazon EFS (Elastic File System)
- NFS gerenciado, multi-AZ
- Escala automaticamente (ate petabytes)
- **Performance Modes**: General Purpose (baixa latencia) vs Max I/O (alto throughput)
- **Throughput Modes**: Bursting, Provisioned, Elastic
- **Storage Classes**: Standard, Infrequent Access (EFS-IA)
- **Lifecycle Policies**: move arquivos para IA automaticamente
- Compativel com Linux (POSIX), nao Windows

### Amazon FSx
- **FSx for Windows File Server**: SMB, NTFS, AD integration, Multi-AZ
- **FSx for Lustre**: HPC, ML, ate 100s GB/s throughput
  - Integra com S3 (lazy loading e auto-export)
  - Tipos: Scratch (temporario, sem replicacao) vs Persistent (replicado na mesma AZ)
- **FSx for NetApp ONTAP**: NFS, SMB, iSCSI, multi-protocolo, snapshots, compressao, dedup
- **FSx for OpenZFS**: NFS, snapshots, compressao, ate 1M IOPS

### Amazon S3
- Object storage, ate 5 TB por objeto, buckets ilimitados
- **Classes de armazenamento**:
  - **S3 Standard**: alta disponibilidade, acesso frequente
  - **S3 Intelligent-Tiering**: move automaticamente entre tiers
  - **S3 Standard-IA**: acesso infrequente, cobranca por retrieval
  - **S3 One Zone-IA**: mesma AZ, menor custo
  - **S3 Glacier Instant Retrieval**: milliseconds retrieval, min 90 dias
  - **S3 Glacier Flexible Retrieval**: Expedited (1-5 min), Standard (3-5h), Bulk (5-12h), min 90 dias
  - **S3 Glacier Deep Archive**: Standard (12h), Bulk (48h), min 180 dias
- **Lifecycle Rules**: transicao entre classes e expiracao de objetos
- **Versioning**: mantem versoes de objetos, protege contra delecao acidental
- **MFA Delete**: requer MFA para deletar versoes (apenas bucket owner, via CLI)
- **Encryption**:
  - **SSE-S3**: chave gerenciada pela AWS (AES-256) - padrao
  - **SSE-KMS**: chave gerenciada pelo KMS (audit trail, controle granular)
  - **SSE-C**: chave fornecida pelo cliente
  - **Client-side encryption**: criptografa antes de enviar
- **Replication**:
  - **CRR (Cross-Region Replication)**: replicacao entre regioes (DR, compliance)
  - **SRR (Same-Region Replication)**: replicacao na mesma regiao (logs aggregation)
  - Requer versioning habilitado em ambos os buckets
  - Replicacao nao e transitiva (A->B, B->C nao implica A->C)
- **S3 Access Points**: simplificam gerenciamento de acesso a prefixos
- **S3 Object Lambda**: transforma objetos no momento da leitura
- **S3 Transfer Acceleration**: upload rapido via edge locations
- **S3 Select / Glacier Select**: consulta SQL em objetos (filtra server-side)
- **Presigned URLs**: acesso temporario a objetos privados
- **S3 Event Notifications**: trigger para Lambda, SQS, SNS, EventBridge
- **S3 Batch Operations**: executa operacoes em massa (copiar, tag, ACL, invoke Lambda) em milhoes de objetos
  - Usa S3 Inventory para listar objetos alvo
- **S3 Inventory**: gera relatorio periodico de objetos (CSV/ORC/Parquet)
- **Object Lock (WORM)**: protege objetos contra delecao/modificacao
  - Governance Mode: somente users com permissao especial podem modificar
  - Compliance Mode: ninguem pode deletar, nem root
  - Legal Hold: bloqueio indefinido, independente de retention period

### AWS DataSync
- Transferencia de dados online (on-premises -> AWS ou AWS -> AWS)
- Ate 10x mais rapido que ferramentas open-source
- Suporta NFS, SMB, HDFS, S3, EFS, FSx
- Agendamento e limitacao de banda
- Criptografia em transito (TLS)

### AWS Transfer Family
- SFTP, FTPS, FTP, AS2 para S3 ou EFS
- Integra com AD, LDAP ou IdP customizado
- Caso de uso: substituir servidores FTP legados

---

## 5. Caching

### Amazon CloudFront
- CDN global com 216+ edge locations
- Origens: S3, ALB, EC2, Custom HTTP
- **OAC (Origin Access Control)**: evolucao do OAI, restringe acesso ao S3 apenas via CloudFront
- **Signed URL**: acesso privado a um unico arquivo
- **Signed Cookies**: acesso privado a multiplos arquivos
- **Geo Restriction**: bloqueia/permite acesso por pais
- **Origin Groups**: failover automatico entre origens
- **Field Level Encryption**: criptografa campos especificos na edge
- **Price Classes**: All (todas as edge locations), 200 (exclui as mais caras), 100 (apenas as mais baratas)
- **Cache Policy**: controla o que entra na cache key (headers, cookies, query strings)
- **Origin Request Policy**: controla o que e enviado para a origem

### Edge Functions
- **CloudFront Functions**:
  - JavaScript only
  - Executa no PoP (ponto de presenca)
  - Viewer Request/Response apenas
  - Muito rapido (sub-millisecond)
  - Nao acessa body, nao chama servicos externos
  - Uso: manipulacao de headers, URL rewrites, cache key normalization, A/B testing
- **Lambda@Edge**:
  - Node.js e Python
  - Executa no Regional Edge Cache
  - Viewer Request/Response + Origin Request/Response
  - Pode chamar servicos externos, acessar body
  - Uso: autenticacao com API externa, conteudo dinamico, manipulacao de imagens

### Amazon ElastiCache
- **Redis**:
  - Multi-AZ com failover automatico
  - Read Replicas
  - Persistencia de dados, backup/restore
  - Pub/Sub, Streams, Sorted Sets
  - Criptografia: KMS (repouso) + Redis AUTH + SSL (transito)
  - Cluster Mode: sharding para escalar horizontalmente
- **Memcached**:
  - Multi-thread, sharding nativo
  - SEM replicacao, SEM persistencia, SEM backup
  - Autenticacao SASL
  - Mais simples, ideal para cache puro sem HA
- **Seguranca**: ElastiCache NAO suporta IAM auth para dados (apenas API level)
- **DAX vs ElastiCache**: DAX para cache de queries DynamoDB, ElastiCache para agregacoes e sessoes

---

## 6. Bancos de Dados

### Amazon DynamoDB
- NoSQL key-value, ate 1 milhao req/s
- Item max: 400 KB
- Multi-AZ automatico (3 AZs)
- Latencia de milissegundos
- **Modos de capacidade**:
  - **Provisioned**: define RCU/WCU, mais barato para carga previsivel
    - 1 RCU = 1 leitura strongly consistent de 4 KB/s OU 2 eventually consistent
    - 1 WCU = 1 escrita de 1 KB/s
  - **On-Demand**: auto-scale, 2.5x mais caro
- **Indices**:
  - **LSI (Local Secondary Index)**: mesma PK, nova SK, criado na criacao da tabela
  - **GSI (Global Secondary Index)**: nova PK/SK, criado a qualquer momento, tem RCU/WCU proprios
- **DAX (DynamoDB Accelerator)**: cache em memoria, microsegundos, ate 11 nos
  - Apenas leitura eventual (nao suporta strongly consistent)
  - Resolve Hot Key problem
- **DynamoDB Streams**: CDC (Change Data Capture)
  - Trigger Lambda, Kinesis Data Streams
  - Necessario para Global Tables
- **Global Tables**: replicacao multi-region active-active
  - Requer DynamoDB Streams habilitado
- **TTL (Time To Live)**: deleta itens automaticamente sem consumir WCU
- **S3 Export/Import**: exporta tabela para S3 (formato DynamoDB JSON ou ION) sem afetar RCU

### Amazon RDS
- Banco relacional gerenciado: MySQL, PostgreSQL, MariaDB, Oracle, SQL Server
- Storage: EBS (gp2/gp3/io1), auto-scaling
- **Multi-AZ**: replica sincrona em outra AZ, failover automatico (60-120s)
  - Apenas para HA, nao para leitura
- **Read Replicas**: ate 5, replicacao assincrona
  - Mesma AZ, cross-AZ (sem custo extra), cross-Region (custo de transferencia)
  - Podem ser promovidas a DB standalone
- **RDS Proxy**: gerencia pool de conexoes, resolve TooManyConnections com Lambda
  - Failover mais rapido, integracao com IAM e Secrets Manager
- **Backups**: automaticos (7-35 dias retencao), snapshots manuais (retencao indefinida)
- **Encryption**: KMS em repouso, SSL/TLS em transito
- **IAM Authentication**: PostgreSQL, MySQL (token-based, sem senha)

### Amazon Aurora
- Compativel com MySQL e PostgreSQL
- 5x mais rapido que MySQL, 3x que PostgreSQL
- Storage: 6 copias em 3 AZs, auto-scaling ate 128 TB
- Ate 15 Read Replicas, failover < 30s
- **Aurora Serverless**: escala automaticamente, cobranca por segundo
  - Ideal para cargas intermitentes e imprevisiveis
- **Aurora Multi-Master**: todos os nos aceitam escrita (failover instantaneo)
- **Aurora Global Database**:
  - 1 regiao primaria + ate 5 secundarias
  - Replicacao < 1 segundo
  - Failover para outra regiao < 1 minuto
  - Ate 16 replicas por regiao secundaria
- **Custom Endpoints**: direciona trafego para subconjuntos de replicas
- **Aurora ML Integration**: SageMaker e Comprehend direto no banco
- **Write Forwarding**: replica de leitura encaminha writes para primario

### Amazon DocumentDB
- Compativel com MongoDB
- Multi-AZ (3 AZs), auto-scaling storage (10 GB em 10 GB, ate 64 TB)
- Ate 15 Read Replicas
- Criptografia KMS, IAM auth, SSL/TLS

### AWS OpenSearch
- Fork do ElasticSearch gerenciado pela AWS
- Full-text search, analytics, logs
- Integra com: Kinesis Firehose, CloudWatch Logs, IoT, S3
- **OpenSearch Dashboards**: equivalente ao Kibana
- **Serverless**: sem provisionamento de instancias
- Nao e banco primario - e para search/analytics

### Outros bancos
- **Neptune**: graph database
- **QLDB**: ledger database (blockchain imutavel)
- **Timestream**: time-series database
- **Keyspaces**: compativel com Apache Cassandra

---

## 7. Comunicacao entre Servicos

### AWS Step Functions
- Orquestracao de workflows com maquina de estados visual
- **Standard**: ate 1 ano de execucao, ate 25.000 execucoes
  - Exatamente uma vez (exactly-once)
- **Express**: ate 5 minutos, ate 100.000 execucoes/s
  - Synchronous: espera resultado
  - Asynchronous: fire-and-forget
  - At-least-once
- Estados: Task, Choice, Parallel, Map, Wait, Pass, Succeed, Fail
- **Error Handling**: Retry (com backoff exponencial) e Catch
- Integracao com: Lambda, ECS, DynamoDB, SQS, SNS, Batch, Glue, SageMaker

### Amazon SQS (Simple Queue Service)
- **Standard Queue**:
  - Throughput ilimitado
  - At-least-once delivery
  - Best-effort ordering
  - Retencao: 4-14 dias (padrao 4)
  - Mensagem max: 256 KB
- **FIFO Queue**:
  - Exatamente uma vez (exactly-once)
  - Ordem garantida
  - 300 msg/s (sem batching) ou 3000 msg/s (com batching)
  - Nome deve terminar em .fifo
  - **Deduplication**: Content-based ou MessageDeduplicationId
  - **Message Group ID**: processamento em ordem por grupo
- **Visibility Timeout**: tempo que mensagem fica invisivel apos consumo (default 30s)
- **Dead Letter Queue (DLQ)**: mensagens que falharam apos MaxReceiveCount
  - **Redrive to Source**: reprocessa mensagens da DLQ
- **Long Polling**: reduz API calls, espera ate 20s por mensagens (WaitTimeSeconds)
- **Delay Queue**: atrasa entrega de mensagens (0-15 min)
- **Temporary Queue**: filas temporarias para request-response pattern

### Amazon SNS (Simple Notification Service)
- Pub/Sub: 1 topico para N subscribers
- Subscribers: SQS, Lambda, HTTP/S, Email, SMS, Kinesis Data Firehose
- Ate 12.500.000 subscriptions por topico
- **Message Filtering**: filtra mensagens por atributos (JSON policy)
- **FIFO Topics**: ordenacao e deduplicacao (so envia para SQS FIFO)
- **Fan-out Pattern**: SNS -> multiplas SQS queues
  - Garante que todos os consumers recebam a mensagem
  - Permite processing paralelo
- **DLQ**: para mensagens que nao puderam ser entregues

### Amazon MQ
- Broker gerenciado para ActiveMQ e RabbitMQ
- Suporta protocolos: MQTT, AMQP, STOMP, OpenWire, WSS
- Caso de uso: migrar aplicacoes que ja usam esses protocolos
- Multi-AZ com failover (EFS para storage)
- Nao escala como SQS/SNS

---

## 8. Data Engineering

### Amazon Kinesis
- **Kinesis Data Streams**:
  - Ingestao de dados em tempo real
  - Shards: 1 MB/s entrada, 2 MB/s saida por shard
  - Retencao: 1-365 dias
  - Consumers: Lambda, KCL apps, Kinesis Data Analytics, Firehose
  - **Enhanced Fan-out**: 2 MB/s por consumer por shard (push model)
  - **On-demand mode**: auto-scaling de shards
  - Replay de dados possivel
- **Kinesis Data Firehose**:
  - Entrega de dados near real-time (buffer 60s-900s ou 1MB-128MB)
  - Destinos: S3, Redshift (via S3 COPY), OpenSearch, Splunk, HTTP endpoint
  - Transformacao com Lambda
  - Sem replay (nao armazena)
  - Totalmente gerenciado, auto-scaling
- **Kinesis Data Analytics**:
  - SQL ou Apache Flink sobre streams Kinesis/Firehose
  - Deteccao de anomalias, agregacoes em tempo real

### Amazon MSK (Managed Streaming for Apache Kafka)
- Kafka gerenciado na AWS
- Multi-AZ (ate 3), auto-recovery
- **MSK Serverless**: sem gerenciar capacidade
- Armazena dados em EBS ilimitadamente
- Consumers: Kinesis Data Analytics, Glue, Lambda, EC2/ECS/EKS

### AWS Batch
- Processamento em lote gerenciado
- Roda jobs em EC2 ou Fargate
- Auto-scaling de compute
- Jobs definidos como Docker containers
- **Multi-node**: jobs paralelos em multiplas instancias
- vs Lambda: Lambda tem limite de 15 min e disco limitado; Batch nao tem limites de tempo

### Amazon EMR (Elastic MapReduce)
- Hadoop/Spark gerenciado
- Clusters de EC2 (Master, Core, Task nodes)
- **Node Types**:
  - **Master**: gerencia o cluster
  - **Core**: armazena dados (HDFS) e processa
  - **Task**: apenas processa (pode usar Spot)
- Caso de uso: big data processing, ML, ETL

### AWS Glue
- ETL serverless gerenciado
- **Glue Data Catalog**: metadados centralizados (schema, tabelas)
  - Usado por Athena, Redshift Spectrum, EMR
- **Glue Crawlers**: descobre schemas automaticamente
- **Glue ETL**: jobs em Python/Scala para transformacao de dados
- **Glue Studio**: interface visual para criar jobs ETL
- **Glue DataBrew**: limpeza e normalizacao visual de dados

### Amazon Redshift
- Data warehouse baseado em PostgreSQL (OLAP)
- Armazenamento colunar, compressao, MPP (Massively Parallel Processing)
- Ate 16 PB por cluster
- **Redshift Spectrum**: consulta dados no S3 sem carregar no Redshift
- **Redshift Serverless**: sem gerenciar clusters
- **Snapshots**: automaticos e manuais, pode copiar cross-region
- **Enhanced VPC Routing**: forca trafego pela VPC (nao pela internet)
- Nao e Multi-AZ (single AZ), mas snapshots para DR

### Amazon Athena
- Query SQL serverless sobre dados no S3
- Paga por dados scaneados ($5/TB)
- Suporta: CSV, JSON, Parquet, ORC, Avro
- **Federated Query**: consulta outras fontes (RDS, DynamoDB, on-premises) via Lambda
- Otimizacao: usar Parquet/ORC, particionar dados, comprimir

### Amazon QuickSight
- BI serverless para dashboards e visualizacoes
- Integra com: Athena, RDS, Redshift, S3, OpenSearch
- **SPICE**: engine in-memory para fast analysis
- Row-Level Security (RLS) e Column-Level Security (CLS)

### Amazon Timestream
- Time-series database serverless
- Ate 1000x mais rapido e 1/10 do custo vs bancos relacionais
- Caso de uso: IoT, metricas operacionais, DevOps

---

## 9. Monitoramento

### Amazon CloudWatch
- **Logs**:
  - Coleta de LogGroups e LogStreams
  - Fontes: SDK, Agent, Beanstalk, ECS, Lambda, VPC Flow Logs, API Gateway, CloudTrail, Route 53
  - Destinos: S3, Kinesis Data Streams, Kinesis Firehose, Lambda, OpenSearch
  - Exportacao para S3: apenas SSE-S3 (nao SSE-KMS), pode levar ate 12h
  - **Subscription Filters**: stream em tempo real para destinos
  - **Logs Insights**: consultas SQL-like em logs
  - **Unified Agent**: coleta metricas customizadas (memoria, disco) e logs
- **Metricas**:
  - Padrao: coleta a cada 5 minutos
  - Detalhada: ate 1 segundo (custo adicional)
  - **Custom Metrics**: via API PutMetricData
  - Memoria e disco NAO sao coletados por padrao (precisa de agent)
- **Alarmes**:
  - Estados: OK, INSUFFICIENT_DATA, ALARM
  - Acoes: SNS, Auto Scaling, EC2 actions (stop, terminate, reboot)
  - **Composite Alarms**: combina multiplos alarmes com AND/OR
- **Dashboards**: globais, multi-account/multi-region, compartilhaveis via Cognito

### AWS Synthetics Canary
- Monitora APIs e websites simulando comportamento de usuario
- Scripts em Node.js ou Python
- Capturas de tela, metricas e logs
- Integra com CloudWatch para alarmes
- Caso de uso: monitorar disponibilidade, latencia, funcionalidade

### Amazon EventBridge
- Evolucao do CloudWatch Events
- **Event Bus**: recebe eventos de AWS, SaaS (Datadog, Zendesk), e aplicacoes custom
- **Rules**: filtros avancados baseados em atributos JSON
- **Targets**: Lambda, SQS, SNS, Step Functions, Kinesis, ECS, CodePipeline
- **Schema Registry**: define formatos de eventos
- **Archive & Replay**: armazena eventos e reproduz para reprocessamento
- Suporta multiplas contas via Resource-based policies

### AWS X-Ray
- Rastreamento distribuido (distributed tracing)
- Mapeia visualmente o fluxo de requisicoes entre servicos
- Identifica gargalos, latencia e erros
- Integracao: EC2, ECS, Lambda, Elastic Beanstalk, API Gateway
- **Service Map**: visualizacao de dependencias
- **Traces**: registros end-to-end de requisicoes

### Personal Health Dashboard
- Eventos de manutencao e falhas que afetam SEUS recursos
- Integra com EventBridge para automacao
- Acoes de remediacao recomendadas
- Agregacao via AWS Organizations

---

## 10. Deployment e Provisionamento

### AWS Elastic Beanstalk
- PaaS: deploy de apps sem gerenciar infra
- Suporta: Java, .NET, PHP, Node.js, Python, Ruby, Go, Docker
- Cria: EC2, ELB, ASG, RDS, S3, CloudWatch
- **Tiers**: Web Tier (ELB) e Worker Tier (SQS)
- **Deploy Strategies**: All-at-once, Rolling, Rolling with additional batch, Immutable, Blue/Green
- Usa CloudFormation por baixo
- Custo: gratuito (paga apenas os recursos)

### AWS CodeDeploy
- Deploy automatizado para EC2, Lambda, ECS
- **In-Place (Rolling)**: substitui na mesma instancia (EC2/ASG apenas)
- **Blue/Green**: novo ambiente, migra trafego gradualmente
  - **Traffic Shifting**: Canary, Linear, All-at-once
  - Rollback rapido
- **AppSpec.yml**: define estrutura do deploy, hooks de validacao
- Integra com CodePipeline para CI/CD

### AWS CloudFormation
- IaC declarativa (YAML/JSON)
- Gerencia 95% dos recursos AWS
- **StackSets**: deploy em multiplas contas/regioes
- **Change Sets**: preview de mudancas antes de aplicar
- **Drift Detection**: detecta mudancas manuais
- **DeletionPolicy**: Retain, Snapshot, Delete
- **Custom Resources**: usa Lambda para recursos nao suportados
- **Transforms**: extensoes (ex: AWS::Serverless para SAM)
- Nao precisa deletar e recriar: atualiza stacks in-place

### AWS SAM (Serverless Application Model)
- Framework para apps serverless (Lambda, API Gateway, DynamoDB)
- YAML simplificado, gera CloudFormation
- **SAM CLI**: teste local de Lambda e API Gateway
- Deploy com Traffic Shifting via CodeDeploy
- Integra com CodePipeline para CI/CD

### AWS CDK (Cloud Development Kit)
- IaC com linguagens de programacao (TypeScript, Python, Java, C#, Go)
- Gera templates CloudFormation automaticamente
- **Constructs**: blocos reutilizaveis de infra
- `cdk synth` -> CloudFormation template
- `cdk deploy` -> aplica na AWS
- `cdk diff` -> compara com estado atual

### AWS Service Catalog
- Catalogo de servicos aprovados (templates CloudFormation)
- **Portfolios**: agrupam produtos para equipes
- **Products**: recursos pre-configurados
- Controle via IAM, versionamento
- Garante governanca e compliance

### AWS Systems Manager (SSM)
- Gerencia EC2 e servidores on-premises em escala
- **Session Manager**: acesso ao servidor sem SSH (via console/CLI)
  - Sem necessidade de bastion host ou chaves SSH
  - Logs no CloudTrail
- **Run Command**: executa scripts remotamente em multiplas instancias
- **Patch Manager**: automatiza patches de seguranca
- **Parameter Store**: armazena configuracoes e secrets
- **Automation**: runbooks para tarefas operacionais
- **State Manager**: mantem configuracao desejada
- **Inventory**: coleta metadata de instancias

### AWS Cloud Map
- Service discovery para microservicos
- Registra servicos com health checks
- Integra com Route 53 (DNS-based discovery)
- Query via SDK, API ou DNS

---

## 11. Controle de Custos

### Cost Allocation Tags
- **AWS Generated Tags**: automaticas (prefixo AWS:)
- **User Tags**: definidas pelo usuario (prefixo user:)
- Aparecem no Billing Console apos 24h
- **Tag Editor**: gerencia tags em massa, multi-region

### AWS Pricing Calculator
- Estima custos mensais de servicos AWS
- Simula diferentes cenarios de deploy

### AWS Trusted Advisor
- Recomendacoes baseadas em best practices
- **5 pilares**: Custo, Performance, Seguranca, Tolerancia a falhas, Service Limits
- **Plano basico**: checagens limitadas
- **Plano completo (Business/Enterprise)**: todas as checagens, API access, alarmes
- Verifica S3 publico (bucket level, nao object level)

### Service Quotas
- Define limites (thresholds) para servicos AWS
- Alarmes no CloudWatch quando proximo do limite
- Pode solicitar aumento de quotas

### EC2 Launch Types e Savings Plans
- **On-Demand**: sem compromisso, paga por uso
- **Reserved Instances**: 1-3 anos, ate 72% desconto
  - All Upfront, Partial Upfront, No Upfront
- **Spot Instances**: ate 90% desconto, pode ser interrompido
- **Savings Plans**:
  - **Compute Savings Plan**: flexivel (qualquer EC2, Fargate, Lambda)
  - **EC2 Instance Savings Plan**: mais desconto, familia/regiao fixas

### S3 Storage Classes
- Standard > Intelligent-Tiering > Standard-IA > One Zone-IA > Glacier Instant > Glacier Flexible > Glacier Deep Archive
- **Lifecycle Policies**: transicao automatica entre classes
- **S3 Analytics**: recomenda transicoes baseado em padroes de acesso

### AWS Budgets
- Define orcamento com alertas de gasto
- 4 tipos: Usage, Cost, Reservation, Savings Plan
- Alertas via email, SNS (ate 5 topicos)
- **Budget Actions**: acoes automaticas (aplicar IAM Policy, SCP, parar instancias)
- 2 primeiros orcamentos gratuitos

### AWS Cost Explorer
- Visualiza e analisa gastos
- Granularidade: diaria, mensal, anual
- Previsao de custos (forecast)
- Identifica instancias subutilizadas

### AWS Compute Optimizer
- ML para recomendar right-sizing
- Suporta EC2, ASG, EBS, Lambda
- Pode reduzir ate 25% dos custos

---

## 12. Migracao

### 7R - Estrategias de Migracao
- **Relocate**: VMware Cloud on AWS (hypervisor-level lift and shift)
- **Rehosting**: lift-and-shift (EC2)
- **Replatforming**: lift-tinker-and-shift (ex: banco local -> RDS)
- **Repurchasing**: troca por SaaS (ex: CRM -> Salesforce)
- **Refactoring**: reescrever para cloud-native (monolito -> microservicos)
- **Retire**: descomissionar sistemas nao necessarios
- **Retain**: manter on-premises

### AWS Storage Gateway
- Ponte entre on-premises e AWS
- **S3 File Gateway**: NFS/SMB -> S3
- **FSx File Gateway**: SMB -> FSx Windows (cache local)
- **Volume Gateway**: iSCSI -> EBS Snapshots
- **Tape Gateway**: VTL -> S3 Glacier
- Hardware dedicado disponivel

### AWS DataSync
- Transferencia online ate 10x mais rapida
- Suporta NFS, SMB, HDFS -> S3, EFS, FSx
- Agendamento e controle de banda
- Cross-region (S3->S3, EFS->EFS)
- **vs Storage Gateway**: DataSync para migracao/sync, Gateway para acesso hibrido continuo

### AWS Transfer Family
- SFTP (22), FTPS (990), FTP (21), AS2 para S3/EFS
- Integra com AD, LDAP, IdP customizado
- Caso de uso: substituir FTP legado

### AWS Snow Family
- **Snowcone**: 8-14 TB, 2.1 kg, bateria opcional
- **Snowball Edge Storage Optimized**: 80 TB, 40 vCPU
- **Snowball Edge Compute Optimized**: 42 TB, 52 vCPU + GPU
- **Snowmobile**: ate 100 PB (caminhao)
- Snowball nao importa direto para Glacier (primeiro S3, depois lifecycle)
- Pode rodar EC2 e Lambda localmente (edge computing)
- **Regra**: se transferencia pela rede > 1 semana, use Snowball
- **OpsHub**: interface grafica para gerenciar devices Snow

### AWS DMS (Database Migration Service)
- **Homogenea**: mesmo tipo de banco (sem SCT)
- **Heterogenea**: tipos diferentes, usa SCT (Schema Conversion Tool)
- **Modos**: Full Load, CDC (Change Data Capture), Full Load + CDC
- **Replication Instance**: EC2 gerenciada que executa a migracao
- Destinos: RDS, Aurora, Redshift, DynamoDB, S3, Kinesis, Kafka

### AWS MGN (Application Migration Service)
- Rehosting automatizado (lift-and-shift)
- Suporta: fisico, VMware, Hyper-V, outras clouds -> EC2
- Replicacao continua

### Application Discovery Service
- Descobre servidores e dependencias antes da migracao
- **Agentless (Connector)**: inventario de VMs
- **Agent-based**: dados detalhados (performance, processos, rede)

### AWS Migration Hub
- Dashboard centralizado de todas as migracoes
- **Refactor Spaces**: migracao gradual monolito -> microservicos
- **Orchestrator**: automatiza migracoes com templates

### Disaster Recovery
- **RPO**: frequencia de backup (quanto de dados pode perder)
- **RTO**: tempo de recuperacao (quanto tempo pode ficar fora)
- **Estrategias (custo crescente)**:
  - **Backup & Restore**: RPO/RTO de horas, menor custo. Usa S3 CRR, EBS/RDS snapshots cross-region
  - **Pilot Light**: DB replicado (Aurora Global, RDS CRR), compute desligado, RTO 10+ min. Ligue EC2/ASG no failover
  - **Warm Standby**: app rodando em escala reduzida na DR region, RTO minutos. Scale up no failover
  - **Multi-Site (Hot Site)**: infra completa active-active, RTO ~0. Route 53 failover routing
- **Servicos com DR nativo**: S3 CRR, DynamoDB Global Tables, Aurora Global Database, RDS Cross-Region Read Replicas, EFS Replication

### AWS DRS (Elastic Disaster Recovery)
- DR automatizado para servidores (fisico, VMware, Hyper-V, outras clouds)
- Replicacao continua em nivel de bloco (baixo RPO)
- Recovery em minutos (baixo RTO)
- Suporta failback para on-premises

### AWS Backup
- Backup centralizado para EC2, EBS, S3, RDS, Aurora, DynamoDB, EFS, FSx, DocumentDB, Neptune
- Cross-region e cross-account backup
- **Backup Vault Lock (WORM)**: protege contra delecao (compliance mode: nem root deleta)
- **Backup Audit Manager**: monitora conformidade de backups
- Suporta VMware on-premises

### AWS FIS (Fault Injection Simulator)
- Injecao de falhas controladas (engenharia do caos)
- Valida resiliencia de workloads

### VMware Cloud on AWS
- VMware vSphere rodando em bare-metal AWS
- Migracao via vMotion (sem downtime)
- HCX para facilitar migracao

---

## 13. Networking (VPC)

### VPC (Virtual Private Cloud)
- Rede privada na AWS, escopo regional
- Ate 5 VPCs por regiao (soft limit)
- Ate 5 CIDRs por VPC (/28 min = 16 IPs, /16 max = 65536 IPs)
- Ranges privados: 10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16
- **DNS**: enableDnsSupport (true por padrao), enableDnsHostname (false para novas VPCs)

### Subnets
- Escopo de AZ
- AWS reserva 5 IPs por subnet (primeiros 4 + ultimo)
- Publica: com Internet Gateway + Route Table apontando para IGW
- Privada: sem rota para IGW

### IPv6
- Dual-stack (IPv4 + IPv6)
- IPv6 e publico na AWS (nao existe privado)
- /56 para VPC, /64 para subnets
- **Egress-Only Internet Gateway**: equivalente ao NAT para IPv6 (saida sem entrada)

### Internet Gateway (IGW)
- Permite VPC acessar internet
- Um IGW por VPC
- Faz NAT para instancias com IP publico

### NAT Gateway
- Permite subnets privadas acessarem internet (saida apenas)
- Gerenciado pela AWS, ate 45 Gbps
- Criado em subnet publica, usa Elastic IP
- 1 por AZ para HA
- **NAT Instance**: alternativa mais barata, gerenciada manualmente

### Security Group vs NACL
| | Security Group | NACL |
|---|---|---|
| **Nivel** | Instancia (ENI) | Subnet |
| **Estado** | Stateful | Stateless |
| **Regras** | So ALLOW | ALLOW + DENY |
| **Avaliacao** | Todas as regras | Por ordem de prioridade |
| **Default** | Nega tudo | Permite tudo (default NACL) |
- Ephemeral Ports (1024-65535): necessario para NACL stateless

### VPC Peering
- Conecta 2 VPCs (mesmo ou diferente account/region)
- NAO e transitivo (A-B, B-C nao implica A-C)
- Sem sobreposicao de CIDR
- Atualizar Route Tables em ambos os lados
- Nao suporta roteamento de borda (NAT, IGW)

### VPC Endpoints
- Acessa servicos AWS sem sair para internet
- **Gateway Endpoint**: S3 e DynamoDB (gratuito, configurado na Route Table)
  - Nao pode ser compartilhado fora da VPC (VPN, DX, TGW, Peering)
- **Interface Endpoint**: todos os outros servicos (pago, cria ENI com IP privado)
  - Pode ser compartilhado via DX e VPN
  - Requer DNS habilitado na VPC
- **VPC Endpoint Policy**: controla acesso aos servicos via endpoint

### AWS PrivateLink
- Expoe servico de uma VPC para outra sem peering
- **Service Provider**: cria Endpoint Service (precisa de NLB ou GWLB)
- **Service Consumer**: cria Interface Endpoint
- Cross-account, sem exposicao de rede

### Transit Gateway (TGW)
- Hub central para conectar VPCs, VPN, Direct Connect
- **Transitivo**: todas as VPCs conectadas podem se comunicar
- Milhares de VPCs
- Suporta IP Multicast (unico servico AWS)
- Compartilhavel via RAM
- **Route Tables**: controla qual VPC ve qual
- **Peering**: inter-region e intra-region
- **ECMP**: multiplas VPNs para aumentar throughput
- Bandwidth: 50 Gbps por VPC attachment

### VPC Sharing (AWS RAM)
- Compartilha subnets entre contas na mesma organizacao
- Owner gerencia VPC/subnets/NACLs, participantes gerenciam seus SGs e recursos

### AWS VPN
- **Site-to-Site VPN**: conecta on-premises a AWS via internet (IPSec)
  - Virtual Private Gateway (AWS) + Customer Gateway (on-premises)
  - 2 tuneis IPSec automaticos para HA
  - Static ou Dynamic Routing (BGP)
  - **Accelerated VPN**: usa Global Accelerator para menor latencia
- **Client VPN**: VPN para usuarios individuais (OpenVPN)
- **CloudHub**: conecta multiplos Customer Gateways a um VGW

### AWS Direct Connect (DX)
- Conexao dedicada (fibra) entre datacenter e AWS
- 1, 10, 100 Gbps (Dedicated) ou 50 Mbps-10 Gbps (Hosted)
- Lead time: semanas/meses
- Dados NAO criptografados por padrao (usar VPN over DX para criptografia)
- **Direct Connect Gateway**: conecta DX a multiplas regioes
- **Virtual Interfaces (VIFs)**:
  - Public VIF: servicos publicos AWS
  - Private VIF: recursos na VPC
  - Transit VIF: Transit Gateway
- **Resiliencia**:
  - Maximum Resiliency: multiplas conexoes em multiplos locais (99.99% SLA)
  - High Resiliency: multiplas conexoes
  - Backup com VPN como failover

### Route 53 Resolver
- DNS hibrido entre on-premises e AWS
- **Inbound Endpoint**: on-premises resolve nomes AWS
- **Outbound Endpoint**: AWS resolve nomes on-premises
- **Resolver Rules**: encaminha queries para dominios especificos

### Gateway Load Balancer (GWLB)
- Para appliances de seguranca (firewall, IDS/IPS)
- Layer 3, protocolo GENEVE porta 6081
- Inspecao de trafego antes do destino

### AWS Network Firewall
- Protege VPC inteira (Layer 7)
- Complementa SG e NACL (nao substitui)

### VPC Flow Logs
- Captura trafego IP na VPC (VPC, Subnet ou ENI level)
- Destinos: CloudWatch Logs, S3, Kinesis Firehose
- Analise com Athena ou CloudWatch Insights
- NAO captura: trafego DNS AWS, DHCP, metadata (169.254.169.254)

### Traffic Mirroring
- Copia trafego de ENI para analise de seguranca
- Destino: ENI, NLB ou GWLB

### VPC Reachability Analyzer
- Troubleshooting de conectividade sem enviar pacotes
- Analisa Route Tables, NACLs, SGs

### Custos de Rede
- Trafego inbound: gratuito
- Mesma AZ (IP privado): gratuito
- Cross-AZ (IP privado): $0.01/GB
- Cross-Region: $0.02/GB
- **Dica de otimizacao**: manter recursos na mesma AZ quando possivel; usar VPC Endpoints para evitar trafego NAT Gateway (caro: $0.045/GB processado)

### Conectividade Hibrida - Arvore de Decisao
- **Rapido de configurar + Internet**: Site-to-Site VPN (minutos)
- **Alta performance + dedicado**: Direct Connect (semanas/meses de lead time)
- **DX com criptografia**: VPN over Direct Connect (IPSec sobre DX)
- **DX com failover**: DX primario + VPN backup (via BGP failover)
- **Multiplas VPCs + on-premises**: Transit Gateway + DX Gateway
- **Baixa latencia para muitos sites**: CloudHub (multiplos Customer Gateways via VGW)
- **Acesso a S3 de on-premises**: DX com Public VIF ou VPN + S3 Gateway Endpoint (este ultimo NAO funciona - Gateway Endpoint so funciona dentro da VPC; use Interface Endpoint ou Public VIF)

### Amazon VPC Lattice
- Service-to-service networking (Layer 7)
- Conecta servicos entre VPCs e contas sem peering ou Transit Gateway
- Suporta EC2, ECS, EKS, Lambda como targets
- Autenticacao e autorizacao integradas (IAM)

---

## 14. Machine Learning

### Amazon Rekognition
- Detecta objetos, rostos, textos, cenas em imagens/videos
- Reconhecimento facial, moderacao de conteudo
- Integra com A2I (Augmented AI) para validacao humana

### Amazon Transcribe
- Audio -> Texto (ASR)
- Deteccao automatica de idioma
- PII Redaction para dados sensiveis

### Amazon Polly
- Texto -> Fala (TTS)
- Lexicons para pronuncia customizada
- SSML para entonacao, pausas, enfases

### Amazon Translate
- Traducao automatica em tempo real

### Amazon Lex + Connect
- **Lex**: chatbots com ASR + NLU (mesma tecnologia da Alexa)
- **Connect**: call center virtual na nuvem

### Amazon Comprehend
- NLP: sentimento, entidades, idioma, topicos
- **Comprehend Medical**: NLP para dados medicos (PHI)

### Amazon SageMaker
- Plataforma completa para build/train/deploy de modelos ML
- Studio, Notebooks, AutoML, Pipelines, MLOps

### Amazon Forecast
- Previsao de series temporais com ML
- Vendas, demanda, financas

### Amazon Kendra
- Busca semantica em documentos (PDF, Word, HTML, FAQ)

### Amazon Personalize
- Recomendacoes em tempo real (produtos, conteudo)

### Amazon Textract
- OCR: extrai texto, tabelas, formularios de documentos

### Amazon Bedrock
- LLMs gerenciados de multiplos provedores (Anthropic, Meta, Mistral, Cohere, Amazon Nova)
- Fine-tuning, RAG, Agents, Guardrails, Knowledge Bases
- Sem gerenciar infraestrutura

### Amazon Q
- **Q Business**: assistente IA empresarial (conecta a dados corporativos)
- **Q Developer**: assistente de codigo em IDEs

---

## 15. Outros Servicos

### CI/CD (Code Suite)
- **CodeCommit**: repositorios Git gerenciados
- **CodeBuild**: build e teste (CI)
- **CodeDeploy**: deploy automatizado (CD)
- **CodePipeline**: orquestracao CI/CD

### End User Computing
- **WorkSpaces**: VDI gerenciado (Windows/Linux)
- **AppStream 2.0**: streaming de apps desktop via navegador

### IoT
- **IoT Core**: conecta dispositivos IoT (MQTT, HTTPS)
- **IoT Greengrass**: compute na borda (edge)
- **IoT Analytics, Device Defender, Device Management, Events, SiteWise**

### Outros
- **Amazon Macie**: detecta PII em S3 com ML
- **Amazon SES**: emails transacionais/marketing em escala
- **EC2 Image Builder**: cria e versiona AMIs
- **Device Farm**: testa apps em dispositivos reais
- **CloudSearch**: busca full-text gerenciada
- **CodeGuru**: review de codigo e profiling com ML
- **Kinesis Video Streams**: streaming de video
- **AppFlow**: integra SaaS com AWS (Salesforce, Slack)
- **Lake Formation**: criacao segura de data lakes
- **Managed Blockchain**: Hyperledger/Ethereum
- **Elastic Transcoder**: conversao de video

---

## Tabela de Decisao Rapida

| Cenario | Servico |
|---------|---------|
| Cache de conteudo estatico global | CloudFront |
| Cache in-memory com HA | ElastiCache Redis |
| Cache de queries DynamoDB | DAX |
| Banco relacional gerenciado | RDS |
| Banco relacional alta performance | Aurora |
| NoSQL key-value | DynamoDB |
| Document store (MongoDB) | DocumentDB |
| Full-text search e logs | OpenSearch |
| Graph database | Neptune |
| Time-series | Timestream |
| Data warehouse (OLAP) | Redshift |
| Query SQL sobre S3 | Athena |
| ETL serverless | Glue |
| Streaming em tempo real | Kinesis Data Streams |
| Entrega near real-time para S3/Redshift | Kinesis Firehose |
| Fila de mensagens desacoplada | SQS |
| Pub/Sub notificacoes | SNS |
| Orquestracao de workflows | Step Functions |
| Migracao de banco de dados | DMS |
| Migracao lift-and-shift | MGN |
| Transferencia de dados online | DataSync |
| Acesso hibrido a arquivos | Storage Gateway |
| Migracao offline (petabytes) | Snow Family |
| DR automatizado | DRS |
| Backup centralizado | AWS Backup |
| Conectar VPCs (hub) | Transit Gateway |
| Conectar 2 VPCs | VPC Peering |
| Acesso privado a servicos AWS | VPC Endpoints |
| Expor servico privado | PrivateLink (NLB) |
| Conexao dedicada on-premises | Direct Connect |
| VPN rapida on-premises | Site-to-Site VPN |
| DNS gerenciado | Route 53 |
| CDN + WAF | CloudFront + WAF |
| Protecao DDoS | Shield + WAF |
| Governanca multi-account | Organizations + Control Tower |
| SSO multi-account | IAM Identity Center |
| IaC declarativa | CloudFormation |
| IaC com linguagem de programacao | CDK |
| Serverless IaC | SAM |
| PaaS para apps web | Elastic Beanstalk |
| Deploy automatizado | CodeDeploy |
| CI/CD pipeline | CodePipeline |
| Monitoramento e metricas | CloudWatch |
| Tracing distribuido | X-Ray |
| Eventos e automacao | EventBridge |
| Deteccao de ameacas | GuardDuty |
| Auditoria de conformidade | AWS Config |
| Dashboard de seguranca | Security Hub |
| Controle de custos | Budgets + Cost Explorer |
| Right-sizing de recursos | Compute Optimizer |
| Chatbot/voicebot | Lex |
| Busca inteligente em docs | Kendra |
| Recomendacoes ML | Personalize |
| LLMs gerenciados | Bedrock |
