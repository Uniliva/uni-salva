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

Análise:
- [ ] Amazon Athena
- [ ] Amazon Kinesis
- [ ] Amazon OpenSearch Service

Integração de aplicativos:
- [ ] AWS AppSync
- [ ] Amazon EventBridge (Amazon CloudWatch Events)
- [ ] Amazon Simple Notification Service (Amazon SNS)
- [ ] Amazon Simple Queue Service (Amazon SQS)
- [ ] AWS Step Functions

Computação:
- [ ] Amazon EC2
- [ ] AWS Elastic Beanstalk
- [ ] AWS Lambda
- [ ] AWS Serverless Application Model (AWS SAM)

Contêineres:
- [ ] AWS Copilot
- [ ] Amazon Elastic Container Registry (Amazon ECR)
- [ ] Amazon Elastic Container Service (Amazon ECS)
- [ ] Amazon Elastic Kubernetes Services (Amazon EKS)

Banco de dados:
- [ ] Amazon Aurora
- [ ] Amazon DynamoDB
- [ ] Amazon ElastiCache
- [ ] Amazon MemoryDB para Redis
- [ ] Amazon RDS

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
- [ ] AWS CloudFormation
- [ ] AWS CloudTrail
- [ ] Amazon CloudWatch
- [ ] Amazon CloudWatch Logs
- [ ] AWS Command Line Interface (AWS CLI)
- [ ] AWS Systems Manager

Redes e entrega de conteúdo:
- [ ] Amazon API Gateway
- [ ] Amazon CloudFront
- [ ] Elastic Load Balancing
- [ ] Amazon Route 53
- [ ] Amazon VPC

Segurança, identidade e conformidade:
- [ ] AWS Certificate Manager (ACM)
- [ ] AWS Certificate Manager Private Certificate Authority
- [ ] Amazon Cognito
- [ ] AWS Identity and Access Management (IAM)
- [ ] AWS Key Management Service (AWS KMS)
- [ ] AWS Secrets Manager
- [ ] AWS Security Token Service (AWS STS)
- [ ] AWS WAF

Armazenamento:
- [ ] Amazon Elastic Block Store (Amazon EBS)
- [ ] Amazon Elastic File System (Amazon EFS)
- [ ] Amazon S3
- [ ] Amazon S3 Glacier



---



# Gerenciamento e governança:

## AWS CLI

{{% notice style="info" %}}

Pré requisitos:

- Instalar o [AWS CLI install](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html).
- Criar um **Access keys** para o usuario em IAM\Users\NOME_USER.
  - vá até a aba security credentials e depois **Access keys**.


{{% /notice %}}



- Para configurar o **awscli** use o comando:

```shell
aws configure
# preencha os itens com os dados do access key.
```

- Após isso o **awscli** já estara configurado.

```shell
# use o comando para testa e listar o usuarios
aws iam list-user
```



---





# Segurança, identidade e conformidade:

## IAM

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
    - i**dentity-based** - Política que são destinados a usuário / grupos e rules
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

### MFA (multi factory atutenticator)

- combinação de uma senha que você conhece com um dispositivo que é seu

```shell
- Há dois via sofware (dispositivo MFA virtual, Chave de chegurança U2F (ex: YUbiKey))
- Há uma opção de Hardware (ex: token Gemalto)
```

### IAM Security Tools

- **IAM Credencial Report (Account level)** -> Lista todas as contas de usuário e o status de cada uma.
- **IAM Access Advisor** -> Mostras os serviços que o usuário tem acesso e a ultima vez que o mesmo acessou.



AWS CLI
