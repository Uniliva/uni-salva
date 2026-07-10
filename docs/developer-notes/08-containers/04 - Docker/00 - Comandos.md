---
title: 00 - Comandos
---




## Docker

---

### Lista opções do docker

```shell
docker --help
```

Mostra a ajuda e as opções do cliente Docker.

---

### Verificar o daemon Docker

```shell
sudo systemctl status docker    # status do serviço (Linux com systemd)
docker info                     # informações sobre o daemon e configuração
```

Use `ping docker` apenas se existir um host chamado `docker` na sua rede; não é um comando genérico para verificar o daemon.

---

### Limpar imagens e containers que não estão em uso

:::danger
Cuidado: esses comandos removem recursos e podem causar perda de dados não persistidos.
:::

```shell
# Remove todos os containers parados
docker container prune

# Remove todas as redes sem uso por pelo menos um container
docker network prune

# Remove todas as imagens não referenciadas por containers
docker image prune

# Remove todos os volumes não referenciados por containers
docker volume prune

# Remove containers, networks, volumes e imagens não utilizados
docker system prune

# Remove tudo, inclusive imagens que não estão em uso (use com cuidado)
docker system prune -a
```

## Containers

---

### Criar um contêiner

Cria e executa um container a partir de uma imagem. `-p` mapeia portas, `-it` associa terminal interativo.

```shell
docker run -it --name <nome-do-container> -p <hostPort>:<containerPort> <imagem>:<tag>

# exemplo
docker run -it --name rabbitmq -p 8080:15672 -p 5672:5672 rabbitmq:3-management

# Observação: a opção legacy `--link` cria conexão entre containers, mas é geralmente desaconselhada em favor de redes customizadas.
```

---

### Iniciar, parar e reiniciar o contêiner

```shell
docker start <container-id|nome>
docker stop <container-id|nome>
docker restart <container-id|nome>
```

---

### Listar portas mapeadas

Mostra as portas do container mapeadas para o host.

```shell
docker port <container-id|nome>
```


---

### Entrar em um container em execução (attach)

`docker attach` anexa seu terminal ao processo principal do container. Nem sempre fornece um shell.

```shell
docker attach <container-id|nome>
```

---

### Executar um comando dentro do container (exec) e obter um shell

Use `exec` para abrir um shell em um container já em execução.

```shell
docker exec -it <container-id|nome> /bin/bash   # quando disponível
docker exec -it <container-id|nome> sh         # shell básico
```

---

### Sair do contêiner sem pará-lo

Pressione `CTRL+P` seguido de `CTRL+Q` para desanexar sem parar o container.

---

### Ver logs de um container

Segue o log do container; `-f` para seguir e `--tail` para limitar linhas iniciais.

```shell
docker logs -f --tail 500 <container-id|nome>
# exemplo
docker logs -f --tail 500 predictor-api
```

---

### Remover container

```shell
# Remove um container parado; use -f para forçar (matar e remover)
docker rm <container-id|nome>

# Remover todos os containers (parados)
docker rm $(docker ps -a -q)

# Remover todos os containers (forçado)
docker rm -f $(docker ps -a -q)
```

---

### Listar containers (ativos e não ativos)

```shell
docker container ls        # containers em execução
docker container ls -a     # todos os containers
```

---

### Listar colunas específicas (ID, nome, status)

```shell
docker ps --all --format "table {{.ID}}\t{{.Names}}\t{{.Status}}" --filter=status=running
```

---

### Inspecionar container

Mostra configurações detalhadas e metadados do container.

```shell
docker inspect <container-id|nome>
```

---

---

### Ver consumo de recursos em tempo real

```shell
docker stats <container-id|nome>
```

---

### Mostrar alterações feitas no container (filesystem)

```shell
docker diff <container-id|nome>
```

---

---

## Imagens

### Criar uma imagem a partir de um contêiner

Cria uma nova imagem a partir do estado atual de um container.

```shell
docker commit -a "Autor" -m "mensagem" <container-id> <nome-imagem:tag>

# exemplo
docker commit -a "Uniliva" -m "Teste msg" 1254544 uniliva/ubuntu:1.0
```

---

### Remover imagem

```shell
# Remove uma imagem (por ID ou nome:tag)
docker rmi <image-id|nome:tag>

# Remove todas as imagens (cuidado)
docker rmi $(docker images -a -q)

# Forçar remoção
docker rmi -f $(docker images -a -q)
```

---

### Listar imagens

```shell
docker images
```

---

### Buscar uma imagem no Docker Hub

```shell
docker search <nome>
```

---

### Baixar (pull) uma imagem

```shell
docker pull <imagem>:<tag>

# exemplos
docker pull debian:latest
docker pull fedora:latest
docker pull ubuntu:latest

# Se não for especificada a tag, o Docker baixa a tag `latest` por padrão.
```

---

### Local onde são armazenadas as imagens

```shell
/var/lib/docker/<driver-sistema-de-arquivo>

ex:
/var/lib/docker/overlay2
```