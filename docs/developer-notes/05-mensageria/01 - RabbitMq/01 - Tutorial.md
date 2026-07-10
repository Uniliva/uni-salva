---

title: 01 - Tutorial
updated: 2020-08-16 13:51:58Z
created: 2020-08-01 01:09:33Z
---

<!-- TODO: revisar -->



[[toc]]

----

### Instalando RabbitMq no docker

```
docker run -d --hostname my-rabbit --name rabbitMQ -p 15672:15672 -p 5672:5672 -e RABBITMQ_DEFAULT_USER=user -e RABBITMQ_DEFAULT_PASS=unisenha  rabbitmq:3-management
```

Para acessar use:
 
```
localhost:15672
User: user
password: unisenha
```


---

### Criando banco postgres 


```
docker run --name pgbb -e POSTGRES_PASSWORD=unisenha -d -p 5432:5432 postgres
```




