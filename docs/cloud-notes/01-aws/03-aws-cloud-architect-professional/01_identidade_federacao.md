---
title: "Identidade e Federação"
sidebar_position: 1
---


![image-20230131205355434](assets/image-20230131205355434.png)

> SSO agora é o AWS IAM Identity Center

---

## IAM

- Escopo global, controle de acessos.
- Tem como base o princípio do menor privilégio possível.
- Criação de usuários e grupos de usuários; grupos não podem conter outros grupos.
- Atribuem-se políticas de acesso (**IAM Policy**) aos grupos, que concedem acesso a todos os usuários daquele grupo.
- **Access keys** usadas para conceder acesso ao AWS CLI e ao AWS SDK.
  - É possível usar um serviço de Shell na nuvem (**Cloud Shell**) que gera um CLI sem a necessidade de configurar uma access key.
- **Roles (funções)**
  - Usadas para conceder acesso de recursos a recursos (exemplo: acesso ao S3 por um EC2).
  - Criação de roles que dão acesso a recursos sem necessidade de atribuí-las a um usuário ou grupo.
  - Podem ser assumidas por recursos, usuários federados ou usuários de outras contas AWS.
  - Quando se assume uma role, as permissões que o usuário tinha antes são sobrescritas, ou seja, ele só terá acesso às permissões da role.
- Dentro do **IAM**, temos:
  - **IAM User** - Usuário comum.
  - **Federated User** - Usuário de fora da organização, como um usuário do **Facebook**, por exemplo.
  - **IAM Role** - Permissões dadas a recursos, como um EC2 para acessar um S3.
  - **Identity Provider (IdP)** - Permite acesso customizado a provedores de terceiros e libera acesso via token do STS.
- **IAM Policies** - Políticas de acesso (permissões).
  - Seguem a regra do menor privilégio.
  - A validação de acesso é feita automaticamente a cada requisição.
  - Podem ser do tipo:
    - **Identity-based** - Políticas destinadas a usuários, grupos e roles.
    - **Resource-based** - Políticas atribuídas a recursos para conceder acesso a outros recursos. Ao usar esse modelo em vez de uma role, o usuário não perde os acessos que já possuía.
  - São escritas em JSON e contêm os campos: `Effect`, `Action`, `Resource`, `Condition`, `Policy Variables`.
  - **Access Advisor** - Permite visualizar as permissões e a última vez que foram utilizadas.
  - **Access Analyzer**
    - Permite analisar quais recursos são compartilhados com entidades externas, como buckets S3.
    - Permite definir uma **Zona de Confiança** com contas ou organizações. O que estiver fora dessa zona terá o acesso sinalizado.
    - Além disso, há um validador de policies:
      - Valida as melhores práticas de escrita de policies.
      - Dá sugestões sobre erros, alertas e segurança.
    - Também é possível gerar policies automaticamente.
      - O **AWS Access Analyzer** pode ler os logs do **CloudTrail** e gerar policies com permissões refinadas.
  - **Tags e variáveis**
    - Permitem criar policies com recursos genéricos.
- **IAM Policy Conditions**
  - Permitem adicionar condições nas políticas de acesso da AWS.
  - Operações que podem ser usadas nas condições:
    ![](assets/2023-01-27-06-34-18-image.png)
- **IAM Permission Boundaries** (limite de permissões)
  - Ao criar usuários ou **roles**, é possível conceder permissões genéricas (por exemplo, administrador) e definir um **limite** para essas permissões. Exemplo: um usuário pode ser administrador apenas em recursos do S3.
  - Suportado apenas por usuários e roles (não por grupos).
  - **SCP (Service Control Policies)**.
    ![](assets/2023-01-27-06-09-29-image.png)
    **Lógica da avaliação de política:**
    ![image-20230131195843146](assets/image-20230131195843146.png)

### MFA (Multi-Factor Authentication)

- Existem duas opções via ‘software’ (dispositivo MFA virtual, chave de segurança U2F, como **YubiKey**).
- Há uma opção de equipamento físico (exemplo: token **Gemalto**).

### IAM Security Tools

- **IAM Credential Report (nível da conta)** → Lista todas as contas de usuário e o status de cada uma.
- **IAM Access Advisor** → Mostra os serviços que o usuário tem acesso e a última vez que os utilizou.

### Recomendações básicas

![](assets/2023-01-27-06-10-24-image.png)

:::tip Dica para a prova

📌 Qual a diferença entre IAM Role e Resource-based Policy?
✅ **Role:** usuário perde permissões anteriores ao assumir
✅ **Resource-based:** usuário mantém suas permissões + ganha acesso ao recurso

📌 Como dar acesso cross-account a um bucket S3?
✅ **Resource-based policy** no bucket OU **IAM Role** para assumir

📌 O que é Permission Boundary?
✅ Define o **limite máximo** de permissões que um usuário/role pode ter

📌 SCP afeta a conta de gerenciamento (management account)?
✅ ❌ Não! SCPs não afetam a management account

📌 Explicit Deny sempre vence?
✅ Sim! **DENY explícito** sempre tem precedência sobre ALLOW

:::

### IAM Roles Anywhere

- Permite que workloads **fora da AWS** (on-premises, outras clouds) obtenham credenciais temporárias do IAM.
- Usa **certificados X.509** emitidos por uma CA confiável.
- Elimina a necessidade de long-term credentials em servidores externos.
- Integra com **AWS Private CA** ou CA on-premises.

---

## STS

### Assume Role

- Criamos as roles e definimos os **principais** que podem acessá-las.
- Geramos credenciais temporárias, que geram um token válido de 15 minutos a 12 horas.
- Onde usar **Assume Role**:
  - Para conceder acesso temporário a usuários ou recursos em uma conta onde eles não têm acesso.
  - Para conceder acesso a usuários externos à organização (usuários federados).
- Permite revogar o acesso à role adicionando um novo bloco `Statement` ou usando o **AWSRevokeOlderSessions**.
- Lembrando que, ao assumirmos uma role, perdemos nossos acessos anteriores.

### Session Tags

- Muito utilizadas para usuários federados.
- Session Tags no STS são tags temporárias passadas ao assumir uma role e usadas nas policies IAM para liberar ou negar acesso dinamicamente.

- Criação em uma resource policy

```json
{
  "Effect": "Allow",
  "Action": "s3:ListBucket",
  "Resource": "arn:aws:s3:::meu-bucket",
  "Condition": {
    "StringEquals": {
      "aws:PrincipalTag/department": "finance"
    }
  }
}
```

- Uso em chamadas

```shell
aws sts assume-role \
  --role-arn arn:aws:iam::123456789012:role/AppRole \
  --role-session-name sessao1 \
  --tags Key=department,Value=finance
```

- Quando Session Tags são muito úteis
  - Multi-tenant
  - Controle de acesso por time / cliente / ambiente
  - Integração com SSO / IdP
  - Lambdas ou apps que assumem roles dinamicamente


### APIs Importantes do STS

![image-20230819201623066](assets/image-20230819201623066.png)

#### Diagrama: Fluxo de Assume Role Cross-Account

```mermaid
sequenceDiagram
    participant User as 👤 Usuário (Conta A)
    participant STS as 🔐 AWS STS
    participant Role as 📋 Role (Conta B)
    participant S3 as 🗄️ S3 (Conta B)

    User->>STS: 1️⃣ AssumeRole (role-arn)
    STS->>Role: 2️⃣ Verifica Trust Policy
    Role-->>STS: 3️⃣ OK (Conta A é trusted)
    STS-->>User: 4️⃣ Credenciais temporárias<br/>(AccessKey, SecretKey, Token)
    User->>S3: 5️⃣ Acessa recurso com credenciais temp
    S3-->>User: 6️⃣ ✅ Acesso permitido
```

| API STS | Uso |
|---------|-----|
| **AssumeRole** | Cross-account ou same-account |
| **AssumeRoleWithSAML** | Federação SAML 2.0 |
| **AssumeRoleWithWebIdentity** | Federação Web (Cognito, Google, etc) |
| **GetSessionToken** | MFA para usuário IAM |
| **GetFederationToken** | Credenciais para federated user |

:::tip Dica para a prova

📌 Quanto tempo duram as credenciais do STS?
✅ **15 minutos a 12 horas** (default: 1 hora)

📌 AssumeRole pode usar MFA?
✅ Sim! Configure `Condition: aws:MultiFactorAuthPresent` na trust policy

📌 O que acontece com as permissões ao assumir uma role?
✅ **Perde as permissões anteriores**, assume apenas as da role

:::

---

## Identity Federation & Cognito

### Identity Federation

- Permite conceder acesso a usuários externos para recursos na sua conta AWS.
- Não é necessário criar um usuário para isso.
- Casos de uso:
  - A empresa usa seu próprio sistema de identificação (exemplo: **Active Directory da Microsoft**).
  - Uma aplicação web precisa acessar recursos da AWS.
- Métodos de implementação:
  - **SAML 2.0**
    - Sigla para **Security Assertion Markup Language 2.0**.
    - Padrão aberto, compatível com vários provedores como o **Active Directory**.
    - **Requer a criação de uma relação de confiança entre o provedor e a AWS.**
    - Utiliza a API **AssumeRoleWithSAML**.
    - Hoje em dia, o **SSO** é mais recomendado por ser mais simples.
  - **Custom Identity Broker**
    - **Não é compatível com o SAML 2.0**.
    - Método mais antigo e menos recomendado.
  - **Web Identity Federation com ou sem Cognito**.
    - **Sem Cognito:**
      - Não recomendado.
    - **Com Cognito:**
      - Método recomendado.
      - Cria uma role com o menor privilégio possível.
      - Estabelece uma relação de confiança entre o provedor de identidade e a AWS.
      - **Vantagens:**
        - **Suporta usuários anônimos.**
        - Suporta **MFA**.
        - **Sincronização de dados**.
      - Uma vez concedido o acesso, criam-se policies configuradas com variáveis que restringem o acesso ao usuário apenas ao que foi designado para ele.
  - **Single Sign-On (SSO)**
    - Single Sign-On (SSO) permite que o usuário se autentique uma única vez em um provedor de identidade (IdP) e utilize esse mesmo login para acessar múltiplos sistemas, incluindo a AWS, sem criar usuários IAM.
    - Na AWS, o SSO funciona por meio de Identity Federation, onde:
      - A autenticação ocorre no IdP (ex: Active Directory, Azure AD).
      - A AWS confia nesse IdP.
      - O acesso é concedido via credenciais temporárias do STS.
      - As permissões são definidas por roles e policies, podendo usar Session Tags e variáveis.
    - Hoje, o AWS IAM Identity Center (antigo AWS SSO) é o método mais recomendado, por ser mais simples de configurar, centralizar permissões e integrar com múltiplas contas.

#### Diagrama: Federação com SAML 2.0

```mermaid
sequenceDiagram
    participant User as 👤 Usuário
    participant IdP as 🏢 IdP (AD/Okta)
    participant AWS as ☁️ AWS
    participant STS as 🔐 STS
    participant Console as 🖥️ AWS Console

    User->>IdP: 1️⃣ Login (user/pass)
    IdP->>IdP: 2️⃣ Autentica usuário
    IdP-->>User: 3️⃣ SAML Assertion
    User->>AWS: 4️⃣ POST SAML Assertion
    AWS->>STS: 5️⃣ AssumeRoleWithSAML
    STS-->>AWS: 6️⃣ Credenciais temporárias
    AWS-->>User: 7️⃣ Redirect para Console
    User->>Console: 8️⃣ Acesso com credenciais temp
```

#### Diagrama: Web Identity Federation com Cognito

```mermaid
sequenceDiagram
    participant App as 📱 App Mobile
    participant IdP as 🌐 IdP (Google/Facebook)
    participant Cognito as 🧠 Cognito
    participant STS as 🔐 STS
    participant S3 as 🗄️ S3

    App->>IdP: 1️⃣ Login social
    IdP-->>App: 2️⃣ Token do IdP
    App->>Cognito: 3️⃣ Token do IdP
    Cognito->>Cognito: 4️⃣ Valida token
    Cognito->>STS: 5️⃣ GetCredentialsForIdentity
    STS-->>Cognito: 6️⃣ Credenciais temporárias
    Cognito-->>App: 7️⃣ AWS Credentials
    App->>S3: 8️⃣ Acessa recursos
```

:::tip Dica para a prova

📌 Qual API do STS usar para federação SAML?
✅ **AssumeRoleWithSAML**

📌 Qual API usar para Web Identity (Cognito)?
✅ **AssumeRoleWithWebIdentity** (ou Cognito faz via GetCredentialsForIdentity)

📌 Cognito User Pool vs Identity Pool?
✅ **User Pool:** autenticação (login/signup)
✅ **Identity Pool:** autorização (credenciais AWS temporárias)

📌 Qual vantagem do Cognito sobre Web Identity Federation direta?
✅ **Suporta usuários anônimos, MFA, sincronização de dados**

:::

---
### AWS Directory Service

Forma de usar o **Active Directory** na AWS.

![](assets/2023-01-31-05-52-47-image.png)

---

**AWS Managed Microsoft AD**
- É possível configurar o **Active Directory (AD) em mais de uma VPC.**
- **EC2 Windows**
  - Nele, podem ser executadas aplicações que utilizam o AD, como o **SharePoint**.
- **Integrações**
  - Pode ser integrado com **RDS para SQL Server, AWS Workspaces e QuickSight**.
  - Pode-se usar o **SSO** para fornecer acesso a aplicações de terceiros.
- Pode ser usado em conjunto com o **AD do ambiente on-premise**.
- Permite adicionar outros **Domain Controllers (DCs)** para escalabilidade.
- Possui **backups automáticos**.

![](assets/2023-01-31-06-02-26-image.png)

---

**Conectando ao AD no On-Premise**
- Deve-se estabelecer uma conexão via **Direct Connect ou VPN Connection**.
- A relação de confiança pode ser feita de três formas:
  - **One-Way Trust**  
    - AWS → On-Premise
  - **One-Way Trust**  
    - On-Premise → AWS
  - **Two-Way Forest Trust**  
    - AWS ⟷ On-Premise
- A relação de confiança **não envolve sincronização**. Ela apenas indica que o AD remoto é válido e confiável.
- **Replicação não é suportada.**

![](assets/2023-01-31-06-09-43-image.png)

**Criando um Processo de Replicação na Nuvem**
- Para criar um **processo de replicação** do AD na nuvem, deve-se:
  - Instalar uma **réplica do AD em uma instância EC2**.
  - Criar a **relação de confiança com o AWS Managed AD**.

![](assets/2023-01-31-06-12-50-image.png)

---

**AD Connector**
- Permite criar um **gateway para o AD no On-Premise**.

![](assets/2023-01-31-06-14-36-image.png)

---

**Simple AD**
- Serviço básico de Active Directory oferecido pela AWS.

![](assets/2023-01-31-06-17-06-image.png)

#### Diagrama: Comparação Directory Services

```mermaid
graph TB
    subgraph CHOICE["🤔 Qual Directory Service usar?"]
        Q1{"Tem AD<br/>on-premises?"}

        Q1 -->|Não| Q2{"Precisa de<br/>features avançados?"}
        Q2 -->|Sim| MANAGED["✅ AWS Managed<br/>Microsoft AD"]
        Q2 -->|Não| SIMPLE["✅ Simple AD<br/>(básico, barato)"]

        Q1 -->|Sim| Q3{"Quer AD<br/>na AWS?"}
        Q3 -->|Sim| Q4{"Precisa de<br/>trust relationship?"}
        Q4 -->|Sim| MANAGED2["✅ AWS Managed<br/>Microsoft AD<br/>+ Trust"]
        Q4 -->|Não| MANAGED3["✅ AWS Managed AD<br/>+ Replicação EC2"]

        Q3 -->|Não| CONNECTOR["✅ AD Connector<br/>(proxy para on-prem)"]
    end

    style MANAGED fill:#4CAF50,color:#fff
    style MANAGED2 fill:#4CAF50,color:#fff
    style MANAGED3 fill:#4CAF50,color:#fff
    style SIMPLE fill:#2196F3,color:#fff
    style CONNECTOR fill:#FF9800,color:#fff
```

| Serviço | Quando usar | Trust com on-prem? |
|---------|-------------|---------------------|
| **Managed Microsoft AD** | AD completo na AWS | ✅ Sim |
| **AD Connector** | Proxy para AD on-prem | N/A (é proxy) |
| **Simple AD** | AD básico, sem on-prem | ❌ Não |

:::tip Dica para a prova

📌 Qual Directory Service usar se já tem AD on-premises e quer apenas redirecionar?
✅ **AD Connector** (não armazena nada na AWS)

📌 Qual usar para ter AD completo na AWS com trust para on-premises?
✅ **AWS Managed Microsoft AD**

📌 Simple AD suporta trust relationship?
✅ ❌ Não! Use Managed AD para isso

📌 Como replicar AD on-premises para AWS?
✅ **Instalar réplica em EC2** + trust com Managed AD

:::

---

## AWS Organizations

![](assets/2023-01-31-06-18-39-image.png)

### Principais Recursos
- Consolida **múltiplas contas** em uma única estrutura organizacional.
- Permite **unificar a fatura** de pagamento e custos (**Consolidated Billing**).
- Centraliza **auditoria, monitoramento e segurança** em uma única conta.
- Há um **limite de 20 contas** por organização (esse limite pode ser aumentado via suporte AWS).
- Com **AWS Organizations**, é possível definir **políticas de acesso a recursos (SCPs)** aplicáveis às contas.  
  - **Exemplo:** se quiser que a conta de desenvolvimento não tenha acesso ao **Athena**, basta criar uma **SCP** restringindo esse serviço e aplicá-la na conta de desenvolvimento.
- Na AWS, quando falamos em permissões, o **DENY** sempre tem maior precedência que o **ALLOW**.  
  - **Exemplo:** se um recurso for negado na **OU Prod**, ele estará **negado** na **OU HR**, mesmo que uma política conceda acesso.

**Organização das Contas**
- As contas podem ser organizadas de diferentes formas:
  - **BU (Business Unit)** → Unidades de negócio (ex.: vendas, financeiro, cobrança).
  - **Ambientes** → Produção, desenvolvimento, homologação.
  - **Projetos** → Projetos específicos (ex.: Ultron, Mark 1, SpaceX).

**Role OrganizationAccountAccessRole**
- A role **OrganizationAccountAccessRole** permite que os usuários que a assumem tenham permissões administrativas dentro da conta.
  - Com ela, é possível criar novos usuários.
  - **Essa role é criada automaticamente ao criar uma conta dentro de uma OU.**  
    - **Porém, se a conta já existir e for adicionada à OU via convite, a role precisa ser criada manualmente.**

**Instâncias Reservadas e Economia**
- Se houver um plano de **instâncias reservadas**, ele pode ser utilizado por qualquer **conta dentro da organização**.
  - Isso permite uma grande economia, pois a instância reservada estará sempre em uso.
- Com **AWS Organizations**, é possível gerenciar **contratos de instâncias reservadas** e **Savings Plans** de todas as contas associadas.

**Migrando uma Conta para Outra Organização**
1. **Remova a conta** da organização antiga.
2. **Envie um convite** para a nova organização.
3. **Aceite o convite** na conta migrada.

![](assets/2023-01-31-06-44-23-image.png)

---

### Service Control Policies (SCP)

- Define **lista de ações permitidas ou bloqueadas** no IAM.
- Aplicável a **OUs e Contas**.
- **Não se aplica** à conta de gerenciamento.
- **Afeta todos os usuários e roles** de uma conta, incluindo o **usuário Root**.
- **Não se aplica a roles que interligam serviços** (ex.: roles que integram com **AWS Organizations**).
- Por padrão, **não permitem nada**, exigindo permissões explícitas.

**Casos de Uso**
- **Restringir acesso a serviços em uma conta ou OU.**  
  - Exemplo: bloquear o uso do **EMR**.  
  ![](assets/image-20230131195742445.png)

- **Exigir que os usuários adicionem tags nos recursos.**
  - **Exemplo:** Restringir o uso de certas tags por usuários.
    ![](assets/image-20230131200305779.png)
  - **Obrigar o uso de tags para criar recursos** (sem tags, a criação será bloqueada).
    ![](assets/image-20230131200756847.png)

#### Diagrama: Hierarquia de SCPs

```mermaid
graph TD
    ROOT["🏛️ Root<br/>FullAWSAccess"]

    ROOT --> OU_PROD["📁 OU: Prod<br/>SCP: Deny EMR"]
    ROOT --> OU_DEV["📁 OU: Dev<br/>SCP: Allow All"]

    OU_PROD --> ACC_PROD1["📦 Account: Prod-1<br/>Permissão efetiva:<br/>Tudo EXCETO EMR"]
    OU_PROD --> ACC_PROD2["📦 Account: Prod-2<br/>Permissão efetiva:<br/>Tudo EXCETO EMR"]

    OU_DEV --> ACC_DEV["📦 Account: Dev<br/>Permissão efetiva:<br/>Tudo"]

    style ROOT fill:#ff9900,color:#fff
    style OU_PROD fill:#FF6B6B,color:#fff
    style OU_DEV fill:#4CAF50,color:#fff
```

> **SCPs são herdadas!** Uma conta herda todas as SCPs da hierarquia acima dela.

:::tip Dica para a prova

📌 SCP pode dar permissões?
✅ ❌ Não! SCP apenas **limita** o que IAM policies podem permitir

📌 SCP afeta service-linked roles?
✅ ❌ Não! Roles usadas por serviços AWS não são afetadas

📌 SCP afeta a management account?
✅ ❌ Não! A conta de gerenciamento nunca é afetada

📌 Qual a permissão efetiva de um usuário?
✅ **Interseção de:** IAM Policy ∩ SCP ∩ Permission Boundary ∩ Resource Policy

📌 Como garantir que TODAS as contas tenham acesso apenas a S3?
✅ Remover `FullAWSAccess` do Root e adicionar SCP que permite apenas S3

:::

### Tag Policys

![image-20230131200944909](assets/image-20230131200944909.png)

### AI Services

- A AWS usa seus dados para Melhorar a IA, caso queira desabilitar essa funcionalidade deve se criar uma police.
  ![image-20230131201130472](assets/image-20230131201130472.png)

---

### Backup police

- Permite criar regras de backup
  ![image-20230131201536580](assets/image-20230131201536580.png)

---

## AWS IAM Identity Center

**Sucessor do AWS Single Sign-On (SSO).**  
  - **Um único login** para acessar **todas as contas** da sua organização na AWS.  
  - Permite acesso a **aplicações de terceiros**, como **Salesforce** e **Office 365**.  
  - Compatível com **aplicações que suportam SAML 2.0**.  
  - Pode ser utilizado para login em **instâncias EC2 com Windows**.  

**Integração com Provedores de Identidade (IdP)**  
  - Permite integração com **Active Directory (AD)** ou outros provedores de identidade.  
  - Possibilita a **gestão centralizada de usuários e grupos** dentro da AWS.  

**Arquitetura do AWS IAM Identity Center**
- O serviço permite criar uma **estrutura organizada de usuários e grupos** dentro da AWS.  
  - **Facilita o gerenciamento de permissões e acessos** em múltiplas contas.  

![image-20230131202516255](assets/image-20230131202516255.png)  
![image-20230131202644744](assets/image-20230131202644744.png)


---

## AWS Control Tower

![image-20230309193510226](assets/image-20230309193510226.png)  
![image-20230309192640760](assets/image-20230309192640760.png)  
![image-20230309192736039](assets/image-20230309192736039.png)  

**O que é o AWS Control Tower**
- É uma **maneira simplificada e eficiente** de configurar e governar um ambiente **seguro e compatível** para múltiplas contas AWS, seguindo as **melhores práticas recomendadas**.

**Landing Zone**
- **Conjunto de boas práticas recomendadas pela AWS.**  
- Permite configurar um ambiente seguro, escalável e segue padrões recomendados.  
- **Control Tower** é o serviço AWS que ajuda a implementar uma **Landing Zone** de forma automatizada.

**Benefícios**
- **Automação simplificada** → Configuração do ambiente em poucos cliques.  
- **Aplicação de políticas de governança** usando **guardrails** (regras pré-configuradas).  
  - **Aplicadas no nível de Organização (OU).**  
  - **Tipos de guardrails:**  
    - **Preventivos** → Utilizam **SCPs** (Service Control Policies) para **desativar recursos** ou **bloquear ações indesejadas**.  
    - **Detetivos** → Utilizam **AWS Config** para validar se as configurações das contas estão corretas.  
      ![image-20230131204036833](assets/image-20230131204036833.png)  
  - **Níveis de guardrails:**  
    - **Mandatórios** → Obrigatórios, geralmente relacionados à segurança (ex.: desabilitar acesso a determinado recurso).  
    - **Fortemente Recomendados** → Baseados em boas práticas (ex.: criptografar dados do **EBS**).  
    - **Eletivos** → Definidos pela empresa para um propósito específico (ex.: padronização de nomes no **S3**).  
      ![image-20230309193113465](assets/image-20230309193113465.png)  

- **Monitoramento e Correção Automática**  
  - Detecta **violações de políticas** e pode corrigi-las automaticamente.  
  - Permite monitorar a conformidade do ambiente por meio de um **painel de controle interativo**.  

**Fábrica de Contas**
- Permite a **criação e configuração automatizada de novas contas AWS**.  
- Define como serão configurados os **recursos da conta** (ex.: **VPC, Security Groups**).  
- Utiliza **AWS Service Catalog** para provisionar novas contas.  
  ![image-20230309193317976](assets/image-20230309193317976.png)  

**Como funciona a automação de novas contas?**
- O processo de criação e configuração das contas pode ser **totalmente automatizado**, garantindo conformidade e segurança desde o início.
  ![image-20230309193740658](assets/image-20230309193740658.png)

:::tip Dica para a prova

📌 Qual a diferença entre Control Tower e Organizations?
✅ **Organizations:** estrutura de contas e SCPs
✅ **Control Tower:** automação de boas práticas + guardrails + Account Factory

📌 O que são guardrails no Control Tower?
✅ **Preventivos:** SCPs que bloqueiam ações
✅ **Detetivos:** AWS Config rules que detectam violations

📌 Como criar contas automaticamente com configurações padronizadas?
✅ **Account Factory** (Control Tower + Service Catalog)

📌 Control Tower usa quais serviços por baixo?
✅ **Organizations, SCPs, AWS Config, CloudTrail, IAM Identity Center**

:::

---

## AWS Resource Access Manager (RAM)

![RAM](assets/image-20210907133859114.png)  

### O que é o AWS RAM?
- O **AWS Resource Access Manager (RAM)** permite **compartilhar recursos** entre contas na mesma **AWS Organizations**.  
- **Benefícios:**  
  - **Evita duplicação de recursos**, reduzindo custos e complexidade.  
  - **Mantém o controle** → Somente o dono do recurso compartilhado pode excluí-lo.  

---

### Recursos que podem ser compartilhados no AWS RAM
A seguir, alguns dos recursos que podem ser compartilhados entre contas AWS:  

- **AWS App Mesh** → Serviço de malha de serviços para comunicação segura entre microsserviços.  
- **Amazon Aurora** → Banco de dados relacional totalmente gerenciado, compatível com MySQL e PostgreSQL.  
- **AWS Certificate Manager Private Certificate Authority (ACM PCA)** → Gerenciamento e emissão de certificados privados.  
- **AWS CodeBuild** → Serviço de compilação e testes contínuos para desenvolvimento de software.  
- **Amazon EC2** → Serviço de computação na nuvem para executar servidores virtuais.  
- **EC2 Image Builder** → Automatiza a criação e manutenção de imagens seguras do Amazon Machine Image (AMI).  
- **AWS Glue** → Serviço de ETL para integração e transformação de dados.  
- **AWS License Manager** → Gerenciamento centralizado de licenças de software na AWS.  
- **AWS Network Firewall** → Firewall gerenciado para proteger redes VPC.  
- **AWS Outposts** → Infraestrutura AWS em data centers locais para ambientes híbridos.  
- **Amazon S3 on Outposts** → Armazenamento de objetos do S3 disponível em ambientes locais usando AWS Outposts.  
- **AWS Resource Groups** → Organização e gerenciamento de recursos AWS por grupos lógicos.  
- **Amazon Route 53** → Serviço de DNS escalável e altamente disponível.  
- **AWS Systems Manager Incident Manager** → Gerenciamento de incidentes e resposta a falhas.
- **Amazon VPC** → Serviço para criação de redes virtuais privadas na AWS.
- **Transit Gateway** → Permite compartilhar TGW entre contas.
- **Subnets** → VPC Sharing permite compartilhar subnets.

:::tip Dica para a prova

📌 Como compartilhar uma subnet entre contas?
✅ **AWS RAM** (VPC Sharing)

📌 RAM funciona apenas dentro de uma Organization?
✅ ❌ Não! Pode compartilhar com qualquer conta AWS (precisa aceitar convite)

📌 Quem pode deletar um recurso compartilhado via RAM?
✅ **Apenas o owner** (conta que criou o recurso)

📌 Como compartilhar Transit Gateway entre contas?
✅ **AWS RAM**

:::

---

## Resumo: Escolha do Serviço Certo 🎯

| Cenário | Serviço |
|---------|---------|
| Login único para múltiplas contas AWS | **IAM Identity Center** |
| Federação com AD on-premises | **SAML 2.0 + IAM** ou **IAM Identity Center** |
| Login social em app mobile | **Cognito** |
| Workloads fora da AWS precisam de credenciais | **IAM Roles Anywhere** |
| Gerenciar múltiplas contas AWS | **AWS Organizations** |
| Automatizar criação de contas com boas práticas | **Control Tower** |
| Compartilhar recursos entre contas | **AWS RAM** |
| AD completo na AWS | **Managed Microsoft AD** |
| Proxy para AD on-premises | **AD Connector** |
| AD básico sem on-premises | **Simple AD** |
| Credenciais temporárias cross-account | **STS AssumeRole** |
| Limitar permissões máximas | **Permission Boundaries** |
| Restringir serviços em toda a OU | **SCPs** |  
