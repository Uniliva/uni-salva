---
title: "Compute & Load Balancing"
sidebar_position: 3
---

![image-20230212210211474](assets/image-20230212210211474.png)

---

## EC2

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

> ### Auto Scaling Group

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