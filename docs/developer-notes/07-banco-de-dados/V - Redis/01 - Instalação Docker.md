---

title: 01 - Instalação Docker
updated: 2020-12-03 00:26:50Z
created: 2020-12-02 00:33:16Z
---

<!-- TODO: revisar -->



[[toc]]


---


# Redis
## Instalando

```
docker run --name uni-redis  -p 6379:6379 -d redis
```

## Conectado

```
docker exect -it uni-redis sh
```

## Acessando o cli

```
redis-cli
```

## Desconectado 

```
quit ou exit
```


## referencia 

https://www.digitalocean.com/community/cheatsheets/how-to-connect-to-a-redis-database-pt

----

# Ferramenta para conectar 

## Instalando

```
docker run -v redisinsight:/db -p 8001:8001 redislabs/redisinsight:latest

docker run --name uni-redis-cli -v redisinsight:/db -p 8001:8001 --link uni-redis  redislabs/redisinsight:latest
```

## Acessando 

```
http://localhost:8001.
```

## Referencia

https://docs.redislabs.com/latest/ri/installing/install-docker/





