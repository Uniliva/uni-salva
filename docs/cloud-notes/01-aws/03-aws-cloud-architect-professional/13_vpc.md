---
title: "Networking"
sidebar_position: 13
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

- Por padrão, novas VPCs **não habilitam IP público automático nas subnets**.
- Você deve configurar isso manualmente ao criar a subnet se quiser que instâncias recebam IP público automaticamente.


---

:::tip 💡 Dica de Ouro
Sempre planeje o tamanho do seu CIDR antes de criar a VPC! Evite sobreposição de IPs, principalmente se for usar VPC Peering ou conectar com redes on-premises.  
:::

---

### CIDR

![cidr](assets/1By1Z1u0xilCm5OAtOqm3pg.png)

- Classless inter-Domain Routing (Roteamento entre domínios sem classe).
- Usado para repartir os endereços IPs e definir ranges de ips.
  - x.x.x.x/32 -> tem 1 IP
  - 0.0.0.0/0 -> todos os IPs
    ![mask](assets/image-20210907165104378.png)

---

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

---

:::info ℹ️
Subnets públicas são essenciais para recursos que precisam acessar a internet, como Bastion Hosts ou Load Balancers. Subnets privadas são ideais para bancos de dados e aplicações internas.
:::

---

### Internet Gateway

![image-20210907203053110](assets/image-20210907203053110.png)

- Permite que uma **VPC** tenha acesso ao Internet.
- Escala horizontalmente e tem alta disponibilidade.
- Deve haver um **Internet Gateway** para uma **VPC**.
- Também fazem **NAT** para instâncias EC2 que tem IP publico.
- Lembrando que quem permite acesso ou não a Internet e a **tabela de Rotas.**

---

### Route table

![AWS VPC - Internet Gateway, Route Tables, NACLs | 4sysops](assets/Public-and-private-route-table-diagram.png)

- Serve para **direcionar** o tráfego de rede para as **subnets**, permitindo assim que se tenha acesso a Internet ou não.
- É boa pratica criar no mínimo duas tabelas de rotas por VPC:
  - Uma tabela de rotas publica que ter as **subnets** publicas, esta se liberar o tráfego de qualquer lugar colocando como target o **Internet Gateway.**
  - Uma privada onde vai estar as **subnetes** privadas.

---

:::caution ⚠️ Atenção!
Erros em tabelas de rotas podem causar perda de conectividade! Sempre revise as rotas após alterações.
:::

---

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

:::tip Dica para a prova

📌 Qual a diferença entre NAT Gateway e NAT Instance?  
✅ Gateway é gerenciado e escalável. Instance é mais barata mas precisa de manutenção manual.

📌 NAT Gateway pode ser acessado de fora da VPC?  
❌ Não!

📌 NAT Gateway é por AZ?  
✅  Sim. Crie em cada AZ para alta disponibilidade

:::

---

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

- NACLs são **stateless**, precisam de regras de ida e volta.
- SGs são **stateful**, se permitiu entrada, a saída é automática.
- NACLs são ideais para bloqueios em camada de rede (como bloquear uma faixa IP inteira).
- SGs são usados por instância e são mais granulares.

---

:::tip 🔒 Dica de Segurança
Sempre restrinja o acesso por IP nos Security Groups! Nunca deixe portas abertas para 0.0.0.0/0, exceto em casos muito específicos.

📌 Qual camada de segurança se aplica à instância EC2?  
✅ **Security Group**

📌 Como bloquear uma faixa de IP inteira em uma subnet?  
✅ **NACL**

📌 SGs são stateful ou stateless?  
✅ **Stateful**

📌 NACLs podem negar tráfego?  
✅ **Sim**, diferente dos SGs.

:::


---

### NACL

![Learn AWS Network ACL and Security Groups in under 5 minutes | by João  Marcelo Souza | Medium](assets/1K-Se2-uV-Y91vkGW3K0-8w.png)

- Network access control list, deve haver uma por **subnet**.
- Deve dizer o que **é permitido e o que é negado**. Seguindo a ideia de procedência indo de **1 - 32766, sendo quanto menor no numero maior a procedência.**
- É a segunda camada de segurança.
- Esta no nível de Subnets. Pode ser entendido como firewall de **subnet**.
- Eles não têm estado (stateless), o que significa que qualquer alteração aplicada a uma regra de entrada não é aplicada automaticamente a uma regra de saída.

---

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

:::info 🔗
VPC Peering é ótimo para conectar ambientes de desenvolvimento e produção, mas lembre-se: não é transitive! Para ambientes complexos, considere Transit Gateway.
:::

:::tip Dica para a prova

📌 VPC Peering permite conexão entre quais tipos de VPCs?  
✅ **Mesmo ou diferentes contas/regiões**, sem sobreposição de CIDR

📌 VPC Peering é transitivo?  
✅ ❌ Não!

📌 Precisa atualizar a tabela de rotas para o peering funcionar?  
✅ Sim!

📌 O que usar para substituir vários peerings entre VPCs?  
✅ **Transit Gateway**

:::

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


:::tip Dica para a prova

📌 Qual a vantagem de usar VPC Endpoints?  
✅ Tráfego **não sai para a Internet** — mais seguro e rápido

📌 Qual tipo de endpoint usar para S3/DynamoDB?  
✅ **Gateway Endpoint**

📌 Qual tipo usar para os demais serviços AWS?  
✅ **Interface Endpoint**

📌 VPC Endpoint substitui NAT Gateway?  
✅ Em muitos casos sim — especialmente em subnets privadas que só acessam AWS APIs

:::

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

:::tip Dica para a prova

📌 Onde posso ativar Flow Logs?  
✅ VPC, Subnet ou ENI

📌 Como analisar os logs?  
✅ **Athena ou CloudWatch Insights**

📌 Qual objetivo principal dos Flow Logs?  
✅ **Troubleshooting de rede e auditoria**

:::

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

:::tip Dica para a prova

📌 Qual a principal vantagem do Direct Connect?  
✅ Conexão dedicada, **baixa latência e alta largura de banda**

📌 O que é necessário para usar VPN com a AWS?  
✅ **Virtual Private Gateway (AWS)** + **Customer Gateway (on-premises)**

📌 Como garantir alta disponibilidade?  
✅ **Duas VPNs** + roteamento dinâmico com BGP

📌 Como conectar várias regiões com Direct Connect?  
✅ **DX Gateway**

:::

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

:::tip Dica para a prova

📌 Transit Gateway é transitive?  
✅ Sim!

📌 É possível compartilhar TGW com outras contas?  
✅ Sim, via AWS RAM

📌 Quantas VPCs posso conectar a um TGW?  
✅ Milhares

:::

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

:::tip Dica para a prova

📌 O que o AWS Network Firewall protege?  
✅ Toda a **VPC**, com inspeção de tráfego **camada 7**

📌 Quais recursos são típicos de um firewall gerenciado?  
✅ **Regras de domínio, filtragem de IP, logs detalhados**

📌 Network Firewall substitui SG e NACL?  
✅ ❌ Não. Ele **complementa** a proteção

:::

---


## Links e recursos adicionais 🔗

- [Documentação oficial AWS VPC](https://docs.aws.amazon.com/vpc/latest/userguide/what-is-amazon-vpc.html)
- [VPC Peering](https://docs.aws.amazon.com/vpc/latest/peering/what-is-vpc-peering.html)
- [AWS Transit Gateway](https://docs.aws.amazon.com/vpc/latest/tgw/what-is-transit-gateway.html)
- [VPC Endpoints](https://docs.aws.amazon.com/vpc/latest/userguide/vpc-endpoints.html)
- [AWS Network Firewall](https://docs.aws.amazon.com/network-firewall/latest/developerguide/what-is-aws-network-firewall.html)
- [Guia de estudo para certificação AWS](https://aws.amazon.com/certification/certified-solutions-architect-professional/)

