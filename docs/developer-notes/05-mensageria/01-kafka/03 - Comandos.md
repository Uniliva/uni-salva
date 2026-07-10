---
title: Comandos
updated: 2020-10-12 12:05:55Z
created: 2020-10-12 11:07:59Z
---

[[toc]]

---

# Comandos úteis

## Baixe o Kafka primeiro.

```
http://kafka.apache.org/
```

## Iniciando Zookeeper

```shell
cd <pasta-kafka>
kafka/bin/zookeeper-server-start.sh kafka/config/zookeeper.properties
```

---

## Iniciando o Kafka Server

```shell
cd <pasta-kafka>
kafka/bin/kafka-server-start.sh kafka/config/server.properties
```

# Tópicos

---

## Criando tópico

```shell
kafka/bin/kafka-topics.sh --create --zookeeper localhost:2181 --replication-factor 1 --partitions 13 --topic my-topic
```

- **partitions** (define o paralelismo — número máximo de consumers que podem processar simultaneamente)

---
## Listar tópicos

```shell
kafka/bin/kafka-topics.sh --list --zookeeper localhost:2181
```

---
## Descrever tópicos

```shell
kafka/bin/kafka-topics.sh --describe --zookeeper localhost:2181 --topic my-topic
```

---
## Descrever grupos

```shell
kafka/bin/kafka-consumer-groups.sh --bootstrap-server localhost:9092 --group topic_group --describe
```

---
### Criando producer

```shell
kafka/bin/kafka-console-producer.sh --broker-list localhost:9092 --topic my-topic
```

---
## Criando consumer

```shell
kafka/bin/kafka-console-consumer.sh --bootstrap-server localhost:9092 --topic my-topic --group topic_group
```

---

# Dicas e informação

## Paralelização

No Kafka, a paralelização é feita pelo número de partições: cada partição é consumida por um único consumer dentro de um consumer group. Ao criar tópicos, configure o número de partições de acordo com o paralelismo desejado.
